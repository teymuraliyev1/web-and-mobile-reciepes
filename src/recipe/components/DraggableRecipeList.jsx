import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import RecipeCard from "./RecipeCard";

function DraggableRecipeList({ recipes, onDelete, onSelect, selectedRecipes, onDragEnd }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="recipes" >
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {recipes?.map((recipe, index) => (
              <Draggable
                key={recipe.id}
                draggableId={recipe.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${
                      snapshot.isDragging ? "opacity-50" : ""
                    }`}
                  >
                    <RecipeCard
                      recipe={recipe}
                      onDelete={onDelete}
                      onSelect={onSelect}
                      isSelected={selectedRecipes.includes(recipe.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DraggableRecipeList; 