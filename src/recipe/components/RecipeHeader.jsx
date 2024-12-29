import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

function RecipeHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Recipes</h1>
      <Link
        to="/recipes/create"
        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        <FaPlus className="mr-2" />
        Add Recipe
      </Link>
    </div>
  );
}

export default RecipeHeader; 