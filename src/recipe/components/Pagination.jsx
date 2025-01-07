import { Button } from "antd";

function Pagination({ currentPage, totalItems, pageSize, onPageChange }) {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="hover:text-red-600 hover:border-red-600"
      >
        Previous
      </Button>
      
      <span className="text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="hover:text-red-600 hover:border-red-600"
      >
        Next
      </Button>

      <span className="text-gray-500 text-sm">
        Total recipes: {totalItems}
      </span>
    </div>
  );
}

export default Pagination; 