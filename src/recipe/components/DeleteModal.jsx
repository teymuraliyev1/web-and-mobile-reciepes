import { Modal, Typography } from "antd";
import { FaExclamationTriangle } from "react-icons/fa";

const { Text, Title } = Typography;

function DeleteModal({ recipe, visible, onCancel, onConfirm }) {
  return (
    <Modal
      title={
        <div className="flex items-center text-red-600 gap-2">
          <FaExclamationTriangle className="text-xl" />
          <span>Delete Recipe</span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      onOk={onConfirm}
      okText="Delete"
      cancelText="Cancel"
      okButtonProps={{
        danger: true,
        className: "bg-red-600 hover:bg-red-700",
      }}
      cancelButtonProps={{
        className: "hover:border-red-600 hover:text-red-600",
      }}
    >
      <div className="py-4 space-y-4">
        <Title level={5} className="!mt-0">
          Are you sure you want to delete this recipe?
        </Title>
        <div className="bg-red-50 border border-red-100 rounded-lg p-4">
          <Text className="text-red-800 font-medium block mb-2">
            You are about to delete:
          </Text>
          <Text className="text-red-600 block">"{recipe.title}"</Text>
        </div>
        <Text type="secondary" className="block">
          This action cannot be undone. This will permanently delete the recipe and
          remove all of its data.
        </Text>
      </div>
    </Modal>
  );
}

export default DeleteModal; 