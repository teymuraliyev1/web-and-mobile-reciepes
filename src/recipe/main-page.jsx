import { useState } from "react";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";
import useFetch from "../hooks/useFetch";
import RecipeHeader from "./components/RecipeHeader";
import RecipeFilters from "./components/RecipeFilters";
import Pagination from "./components/Pagination";
import DraggableRecipeList from "./components/DraggableRecipeList";

function MainPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [difficulty, setDifficulty] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Number of items per page


  const countUrl = `http://localhost:3001/recipes?${
    debouncedSearch ? `title_like=${debouncedSearch}&` : ''
  }${difficulty ? `difficulty=${difficulty}&` : ''}`;
  
  const { data: totalData } = useFetch(countUrl);
  const totalItems = totalData?.length || 0;


  const baseUrl = "http://localhost:3001/recipes";
  const queryParams = new URLSearchParams();
  
  if (debouncedSearch) {
    queryParams.append("title_like", debouncedSearch);
  }
  if (difficulty) {
    queryParams.append("difficulty", difficulty);
  }
  queryParams.append("_sort", "order");
  queryParams.append("_order", "asc");
  queryParams.append("_page", currentPage);
  queryParams.append("_limit", pageSize);

  const url = `${baseUrl}?${queryParams.toString()}`;
  const { data: recipes, loading, error } = useFetch(url);

  const allTags = [...new Set(recipes?.flatMap(recipe => recipe.tags) || [])];

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/recipes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }

      toast.success("Recipe deleted successfully");
      window.location.reload();
    } catch (err) {
      toast.error("Failed to delete recipe");
    }
  };

  const handleSelect = (id) => {
    setSelectedRecipes((prev) =>
      prev.includes(id) ? prev.filter((recipeId) => recipeId !== id) : [...prev, id]
    );
  };

  const handleShare = () => {
    const selectedData = recipes.filter((recipe) => selectedRecipes.includes(recipe.id));
    const jsonData = JSON.stringify(selectedData, null, 2);
    const mailtoLink = `mailto:?subject=Shared Recipes&body=${encodeURIComponent(jsonData)}`;
    window.location.href = mailtoLink;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredRecipes = recipes?.filter(recipe => {
    if (selectedTags.length === 0) return true;
    return selectedTags.every(tag => recipe.tags.includes(tag));
  });

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const reorderedRecipes = Array.from(filteredRecipes);
    const [removed] = reorderedRecipes.splice(source.index, 1);
    reorderedRecipes.splice(destination.index, 0, removed);

    // Calculate new order values
    const updatedRecipes = reorderedRecipes.map((recipe, index) => ({
      ...recipe,
      order: index + (currentPage - 1) * pageSize,
    }));

    // Update the order in the database for affected recipes
    try {
      await Promise.all(
        updatedRecipes.map((recipe) =>
          fetch(`http://localhost:3001/recipes/${recipe.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ order: recipe.order }),
          })
        )
      );

      toast.success("Recipe order updated successfully");
      // Refresh the data
      window.location.reload();
    } catch (error) {
      toast.error("Failed to update recipe order");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <RecipeHeader />

      <RecipeFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        allTags={allTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />

      <div className="flex justify-end mb-4">
        <button
          onClick={handleShare}
          disabled={selectedRecipes.length === 0}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          Share Selected Recipes ({selectedRecipes.length})
        </button>
      </div>

      {error && (
        <div className="text-center text-red-600 py-8">
          Error loading recipes: {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <>
          <DraggableRecipeList
            recipes={filteredRecipes}
            onDelete={handleDelete}
            onSelect={handleSelect}
            selectedRecipes={selectedRecipes}
            onDragEnd={handleDragEnd}
          />

          {filteredRecipes?.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {filteredRecipes?.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-600">No recipes found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

export default MainPage;
