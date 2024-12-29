import { FaSearch, FaFilter, FaSort } from "react-icons/fa";

function RecipeFilters({ 
  searchTerm, 
  setSearchTerm, 
  difficulty, 
  setDifficulty, 
  sortBy, 
  setSortBy, 
  sortOrder, 
  setSortOrder,
  allTags,
  selectedTags,
  setSelectedTags 
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="relative">
          <FaFilter className="absolute left-3 top-3 text-gray-400" />
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Sort */}
        <div className="relative">
          <FaSort className="absolute left-3 top-3 text-gray-400" />
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [newSortBy, newSortOrder] = e.target.value.split("-");
              setSortBy(newSortBy);
              setSortOrder(newSortOrder);
            }}
            className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="updatedAt-desc">Latest Updated</option>
            <option value="updatedAt-asc">Oldest Updated</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Tags Filter */}
      <div className="mt-4">
        <p className="text-sm text-gray-600 mb-2">Filter by tags:</p>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTags(prev =>
                  prev.includes(tag)
                    ? prev.filter(t => t !== tag)
                    : [...prev, tag]
                );
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipeFilters; 