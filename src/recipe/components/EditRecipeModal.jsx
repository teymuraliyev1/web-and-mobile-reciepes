import { Modal, Form, Input, Select, Space, Button } from "antd";
import { useState } from "react";
import { toast } from "sonner";

function EditRecipeModal({ recipe, visible, onCancel, onSuccess }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Common recipe tags for suggestions
  const commonTags = [
    "Vegetarian",
    "Vegan",
    "Gluten-free",
    "Quick Meal",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Healthy",
    "Spicy",
    "Italian",
    "Asian",
    "Mexican",
    "Mediterranean",
    "Seafood",
    "Chicken",
    "Beef",
    "Pasta",
    "Soup",
    "Salad",
    "Baking",
    "Grilling",
    "Low-carb",
    "High-protein"
  ];


  const allTags = [...new Set([...recipe.tags, ...commonTags])];

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/recipes/${recipe.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          updatedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update recipe");
      }

      toast.success("Recipe updated successfully");
      onSuccess();
    } catch (err) {
      toast.error("Failed to update recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Recipe"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={720}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={recipe}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter recipe title" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter recipe description" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="difficulty"
          label="Difficulty"
          rules={[{ required: true, message: "Please select difficulty" }]}
        >
          <Select>
            <Select.Option value="Easy">Easy</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="Hard">Hard</Select.Option>
          </Select>
        </Form.Item>

        <Form.List name="ingredients">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  required={false}
                  key={field.key}
                  label={index === 0 ? "Ingredients" : ""}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input ingredient or delete this field",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="Enter ingredient"
                      style={{ width: "90%" }}
                    />
                  </Form.Item>
                  {fields.length > 1 && (
                    <Button
                      type="text"
                      className="text-red-600"
                      onClick={() => remove(field.name)}
                    >
                      Delete
                    </Button>
                  )}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  className="w-full border-red-600 text-red-600"
                >
                  Add Ingredient
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.List name="steps">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  required={false}
                  key={field.key}
                  label={index === 0 ? "Steps" : ""}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input step or delete this field",
                      },
                    ]}
                    noStyle
                  >
                    <Input.TextArea
                      placeholder={`Step ${index + 1}`}
                      style={{ width: "90%" }}
                    />
                  </Form.Item>
                  {fields.length > 1 && (
                    <Button
                      type="text"
                      className="text-red-600"
                      onClick={() => remove(field.name)}
                    >
                      Delete
                    </Button>
                  )}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  className="w-full border-red-600 text-red-600"
                >
                  Add Step
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          name="tags"
          label="Tags"
          rules={[{ required: true, message: "Please add at least one tag" }]}
        >
          <Select
            mode="tags"
            placeholder="Add tags"
            style={{ width: '100%' }}
            tokenSeparators={[',']}
            options={allTags.map(tag => ({ label: tag, value: tag }))}
          />
        </Form.Item>

        <Form.Item className="mb-0 text-right">
          <Space>
            <Button onClick={onCancel}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-red-600"
            >
              Save Changes
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditRecipeModal; 