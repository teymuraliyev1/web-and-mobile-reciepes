import { Form, Input, Select, Button, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaArrowLeft } from "react-icons/fa";

function Create() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Common recipe tags for suggestions
  const commonTags = [
    "Vegetarian", "Vegan", "Gluten-free", "Quick Meal",
    "Breakfast", "Lunch", "Dinner", "Dessert",
    "Healthy", "Spicy", "Italian", "Asian",
    "Mexican", "Mediterranean", "Seafood", "Chicken",
    "Beef", "Pasta", "Soup", "Salad", "Baking",
    "Grilling", "Low-carb", "High-protein"
  ];

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      // Get the current highest order value
      const response = await fetch('http://localhost:3001/recipes?_sort=order&_order=desc&_limit=1');
      const [lastRecipe] = await response.json();
      const newOrder = lastRecipe ? (lastRecipe.order + 1) : 0;

      const newRecipe = {
        ...values,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        order: newOrder
      };

      const createResponse = await fetch('http://localhost:3001/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      if (!createResponse.ok) {
        throw new Error('Failed to create recipe');
      }

      toast.success('Recipe created successfully');
      navigate('/recipes');
    } catch (err) {
      toast.error('Failed to create recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate('/recipes')}
          className="flex items-center text-gray-600 hover:text-red-600"
        >
          <FaArrowLeft className="mr-2" />
          Back to Recipes
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Recipe</h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter recipe title" }]}
        >
          <Input placeholder="Enter recipe title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter recipe description" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter recipe description"
          />
        </Form.Item>

        <Form.Item
          name="difficulty"
          label="Difficulty"
          rules={[{ required: true, message: "Please select difficulty" }]}
        >
          <Select placeholder="Select difficulty level">
            <Select.Option value="Easy">Easy</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="Hard">Hard</Select.Option>
          </Select>
        </Form.Item>

        <Form.List
          name="ingredients"
          initialValue={['']}
          rules={[
            {
              validator: async (_, ingredients) => {
                if (!ingredients || ingredients.length < 1) {
                  return Promise.reject(new Error('At least one ingredient is required'));
                }
              },
            },
          ]}
        >
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

        <Form.List
          name="steps"
          initialValue={['']}
          rules={[
            {
              validator: async (_, steps) => {
                if (!steps || steps.length < 1) {
                  return Promise.reject(new Error('At least one step is required'));
                }
              },
            },
          ]}
        >
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
            options={commonTags.map(tag => ({ label: tag, value: tag }))}
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <Space className="w-full justify-end">
            <Button onClick={() => navigate('/recipes')}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-red-600"
            >
              Create Recipe
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Create;
