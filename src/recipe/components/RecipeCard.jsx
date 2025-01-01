import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditRecipeModal from "./EditRecipeModal";
import DeleteModal from "./DeleteModal";

function RecipeCard({ recipe, onDelete, onSelect, isSelected }) {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleDelete = () => {
    setIsDeleteModalVisible(false);
    onDelete(recipe.id);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group relative">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {recipe.title}
            </h2>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2 p-2">
              <button
                onClick={() => setIsEditModalVisible(true)}
                className="text-gray-600 hover:text-red-600"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => setIsDeleteModalVisible(true)}
                className="text-gray-600 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
          <div className="flex items-center justify-between">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                recipe.difficulty === "Easy"
                  ? "bg-green-100 text-green-800"
                  : recipe.difficulty === "Medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {recipe.difficulty}
            </span>
            <Link
              to={`/recipes/${recipe.id}`}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              View Recipe →
            </Link>
          </div>
        </div>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(recipe.id)}
          className="absolute top-4 right-4"
        />
      </div>

      {/* Edit Modal */}
      <EditRecipeModal
        recipe={recipe}
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onSuccess={() => {
          setIsEditModalVisible(false);
          window.location.reload();
        }}
      />

      {/* Delete Modal */}
      <DeleteModal
        recipe={recipe}
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default RecipeCard; 