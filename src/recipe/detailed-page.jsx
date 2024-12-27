import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  FaClock, 
  FaThermometerHalf, 
  FaTags, 
  FaArrowLeft,
  FaEdit,
  FaTrash 
} from "react-icons/fa";
import useFetch from "../hooks/useFetch";

function DetailedRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: recipe, loading, error } = useFetch(`http://localhost:3001/recipes/${id}`);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load recipe");
    }
  }, [error]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`http://localhost:3001/recipes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }

      toast.success("Recipe deleted successfully");
      navigate("/recipes");
    } catch (err) {
      toast.error("Failed to delete recipe");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load recipe</p>
        <button
          onClick={() => navigate("/recipes")}
          className="mt-4 text-red-600 hover:text-red-800"
        >
          Return to recipes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-start mb-8">
        <button
          onClick={() => navigate("/recipes")}
          className="flex items-center text-gray-600 hover:text-red-600"
        >
          <FaArrowLeft className="mr-2" />
          Back to Recipes
        </button>
        
      </div>


      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
        <p className="text-lg text-gray-600">{recipe.description}</p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="flex items-center bg-red-50 p-4 rounded-lg">
          <FaThermometerHalf className="text-red-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Difficulty</p>
            <p className="font-semibold text-gray-900">{recipe.difficulty}</p>
          </div>
        </div>
        <div className="flex items-center bg-red-50 p-4 rounded-lg">
          <FaClock className="text-red-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Last Updated</p>
            <p className="font-semibold text-gray-900">
              {new Date(recipe.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center bg-red-50 p-4 rounded-lg">
          <FaTags className="text-red-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Tags</p>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-white px-2 py-1 rounded-full text-red-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex items-center text-gray-700 bg-white p-3 rounded-lg shadow-sm"
              >
                <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Preparation Steps
          </h2>
          <ol className="space-y-4">
            {recipe.steps.map((step, index) => (
              <li
                key={index}
                className="flex bg-white p-4 rounded-lg shadow-sm"
              >
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full mr-3">
                  {index + 1}
                </span>
                <p className="text-gray-700">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default DetailedRecipe;
