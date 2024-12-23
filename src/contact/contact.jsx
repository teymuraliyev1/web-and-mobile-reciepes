import { Form, Input, Button, Typography, Card } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const { Title, Text } = Typography;
const { TextArea } = Input;

function Contact() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const messageData = {
        ...values,
        createdAt: new Date().toISOString(),
        status: "unread",
      };

      const response = await fetch("http://localhost:3001/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully!");
      form.resetFields();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="space-y-6">
          <div>
            <Title level={2} className="!text-gray-900 mb-4">
              Get in Touch
            </Title>
            <Text className="text-gray-600 block mb-6">
              Have questions about the Recipe Manager? Want to collaborate? Feel
              free to reach out!
            </Text>
          </div>

          <div className="space-y-4">
            <Card className="border-none shadow-sm">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-red-600 text-xl" />
                <div>
                  <Text className="text-gray-600 block">Email</Text>
                  <Text className="text-gray-900 font-medium">
                    teymuraliyev2004@gmail.com
                  </Text>
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-sm">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-red-600 text-xl" />
                <div>
                  <Text className="text-gray-600 block">Location</Text>
                  <Text className="text-gray-900 font-medium">
                    Azerbaijan, Baku
                  </Text>
                </div>
              </div>
            </Card>

            <div className="pt-6">
              <Text className="text-gray-900 font-medium block mb-4">
                Connect with me
              </Text>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  <FaGithub className="text-2xl" />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>


        <div className="bg-white rounded-lg shadow-md p-6">
          <Title level={3} className="!text-gray-900 mb-6">
            Send a Message
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-4"
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Your name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="your.email@example.com" />
            </Form.Item>

            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: "Please enter a subject" }]}
            >
              <Input placeholder="Message subject" />
            </Form.Item>

            <Form.Item
              name="message"
              label="Message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <TextArea
                rows={4}
                placeholder="Your message here..."
                className="resize-none"
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="bg-red-600 w-full"
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
