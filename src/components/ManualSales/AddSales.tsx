"use client"

import type React from "react"
import { useState } from "react"
import { Form, Input, InputNumber, Switch, Button, Select, DatePicker, Card } from "antd"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { toast } from "sonner"
import type dayjs from "dayjs" // Ensure dayjs is imported

// Import the new mutation hook
import { useAddSaleMutation } from "../../redux/api/sales/salesApi"

interface CartItem {
  productId: string
  name: string
  imageUrl: string[]
  quantity: number
  size: string
  color: string
  price: number
}

interface FormValues {
  saleTime: dayjs.Dayjs // Use dayjs.Dayjs for DatePicker value
  customerName: string
  phone: string
  address: string
  amount: number
  method: string
  isPaid: boolean
  cartItems: CartItem[]
  status: string
  reference?: string
  saleBy: string
}

const AddSalesPage: React.FC = () => {
  const [form] = Form.useForm<FormValues>()
  const [isPaid, setIsPaid] = useState(true)

  // Initialize the addSale mutation hook
  const [addSale, { isLoading }] = useAddSaleMutation() // Use isLoading from RTK Query

  const handleCancel = () => {
    form.resetFields()
    setIsPaid(true) // Reset isPaid state to default
    toast.info("Form fields reset.")
  }

  const handleSubmit = async (values: FormValues) => {
    try {
      const payload = {
        ...values,
        saleTime: values.saleTime.toDate().toISOString(), // Convert Dayjs to Date then to ISO string
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      console.log("Submitted Sale Payload:", payload)
      await addSale(payload).unwrap() // Call the mutation and unwrap to handle errors
      toast.success("Sale added successfully!")
      handleCancel()
    } catch (error) {
      console.error("Failed to add sale:", error)
      toast.error("Failed to add sale")
    }
  }

  const handleChange = (checked: boolean) => {
    setIsPaid(checked) // Update the state when the switch is toggled
  }

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-full mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[#FB923C] text-2xl font-medium">Add Sale</h1>
        </div>
        {/* Wrap the entire form content with a single Ant Design Form component */}
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-white border border-[#FF9B44]">
            <div className="flex flex-col gap-6 border-r border-[#FF9B44] pr-4">
              {/* Sale Details */}
              <Card title="Sale Details" className="border-[#FF9B44] p-4 border">
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div className="flex gap-10">
                    <div className="flex-1">
                      <Form.Item label="Sale Time" name="saleTime" rules={[{ required: true }]}>
                        <DatePicker showTime className="w-full h-8 rounded" />
                      </Form.Item>
                    </div>
                    <div className="flex-1">
                      <Form.Item label="Status" name="status" rules={[{ required: true }]}>
                        <Select placeholder="Select Status" className="w-full h-10 rounded">
                          <Select.Option value="pending">Pending</Select.Option>
                          <Select.Option value="completed">Completed</Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <div className="flex">
                      <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
                        <InputNumber className="w-full h-8 rounded" placeholder="Amount" />
                      </Form.Item>
                    </div>
                    <div className="flex-1">
                      <Form.Item label="Payment Method" name="method" rules={[{ required: true }]}>
                        <Select placeholder="Select Method" className="w-full h-10 rounded">
                          <Select.Option value="cash">Cash</Select.Option>
                          <Select.Option value="bkash">bKash</Select.Option>
                          <Select.Option value="nagad">Nagad</Select.Option>
                          <Select.Option value="rocket">Rocket</Select.Option>
                          <Select.Option value="card">Card</Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="flex-1">
                      <Form.Item label="Is Paid?" name="isPaid" valuePropName="checked" initialValue={true}>
                        <Switch
                          checkedChildren="Paid"
                          unCheckedChildren="Due"
                          checked={isPaid}
                          onChange={handleChange}
                          style={{
                            backgroundColor: isPaid ? "#4CD964" : "#FF4D4F", // Green for "Paid", Red for "Due"
                            borderColor: isPaid ? "#4CD964" : "#FF4D4F",
                            width: "100%", // Ensures the switch takes up full width of the parent div
                          }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex justify-between gap-10">
                    <div className="flex-1">
                      <Form.Item label="Sale By" name="saleBy" rules={[{ required: true }]}>
                        <Select placeholder="Select Sale By" className="w-full h-10 rounded">
                          <Select.Option value="admin">Admin</Select.Option>
                          <Select.Option value="user">User</Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                  </div>
                  {/* Cart Items Dynamic List */}
                  <Form.List
                    name="cartItems"
                    initialValue={[{ productId: "", name: "", size: "", color: "", price: 0, quantity: 1 }]} // Default first item with select options
                    rules={[
                      {
                        validator: async (_, value) => {
                          if (!value || value.length === 0) {
                            return Promise.reject(new Error("At least one cart item is required"))
                          }
                        },
                      },
                    ]}
                  >
                    {(fields, { add, remove }) => (
                      <>
                        <div className="mb-2">
                          <div className="mb-2">
                            <label className="text-sm font-medium text-gray-800">Cart Items</label>
                          </div>
                          {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <div
                              key={key}
                              className="rounded-md p-4 mb-4 shadow-sm hover:shadow-lg transition duration-200"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                                {/* Product ID Select */}
                                <Form.Item
                                  {...restField}
                                  name={[name, "productId"]}
                                  fieldKey={[fieldKey, "productId"]}
                                  rules={[{ required: true, message: "Product ID is required" }]}
                                >
                                  <Select
                                    placeholder="Product ID"
                                    className="h-10 px-4 rounded-md focus:outline-none focus:border-[#FB923C]"
                                  >
                                    <Select.Option value="prod1">Product 1</Select.Option>
                                    <Select.Option value="prod2">Product 2</Select.Option>
                                    <Select.Option value="prod3">Product 3</Select.Option>
                                  </Select>
                                </Form.Item>
                                {/* Product Name Input */}
                                <Form.Item
                                  {...restField}
                                  name={[name, "name"]}
                                  fieldKey={[fieldKey, "name"]}
                                  rules={[{ required: true, message: "Product Name is required" }]}
                                >
                                  <Input
                                    placeholder="Name"
                                    className="h-8 px-4 rounded-md focus:outline-none focus:border-[#FB923C]"
                                  />
                                </Form.Item>
                                {/* Size Select */}
                                <Form.Item {...restField} name={[name, "size"]} fieldKey={[fieldKey, "size"]}>
                                  <Select
                                    placeholder="Size"
                                    className="h-8 px-4 rounded-md focus:outline-none focus:border-[#FB923C]"
                                  >
                                    <Select.Option value="S">Small</Select.Option>
                                    <Select.Option value="M">Medium</Select.Option>
                                    <Select.Option value="L">Large</Select.Option>
                                    <Select.Option value="XL">Extra Large</Select.Option>
                                  </Select>
                                </Form.Item>
                                {/* Color Select */}
                                <Form.Item {...restField} name={[name, "color"]} fieldKey={[fieldKey, "color"]}>
                                  <Select
                                    placeholder="Color"
                                    className="h-8 px-4 rounded-md focus:outline-none focus:border-[#FB923C]"
                                  >
                                    <Select.Option value="red">Red</Select.Option>
                                    <Select.Option value="blue">Blue</Select.Option>
                                    <Select.Option value="green">Green</Select.Option>
                                    <Select.Option value="black">Black</Select.Option>
                                  </Select>
                                </Form.Item>
                                {/* Price Input */}
                                <Form.Item
                                  {...restField}
                                  name={[name, "price"]}
                                  fieldKey={[fieldKey, "price"]}
                                  rules={[{ required: true, message: "Price is required" }]}
                                >
                                  <InputNumber
                                    placeholder="Price"
                                    className="w-full h-8 px-4 rounded-md focus:outline-none focus:border-[#FB923C]"
                                  />
                                </Form.Item>
                                {/* Quantity Input */}
                                <Form.Item
                                  {...restField}
                                  name={[name, "quantity"]}
                                  fieldKey={[fieldKey, "quantity"]}
                                  rules={[{ required: true, message: "Quantity is required" }]}
                                >
                                  <div className="flex items-center">
                                    <InputNumber
                                      placeholder="Qty"
                                      className="w-full h-8 px-4 rounded-md focus:outline-none focus:border-[#FB923C]"
                                    />
                                    {fields.length > 1 && (
                                      <MinusCircleOutlined
                                        onClick={() => remove(name)}
                                        className="text-red-500 cursor-pointer text-xl mt-2 ml-2 hover:text-red-700"
                                      />
                                    )}
                                  </div>
                                </Form.Item>
                              </div>
                            </div>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() =>
                                add({ productId: "", name: "", size: "", color: "", price: 0, quantity: 1 })
                              }
                              icon={<PlusOutlined />}
                              className="border border-[#FB923C] text-[#FB923C] hover:text-white hover:bg-[#FB923C] transition duration-200"
                            >
                              Add Cart Item
                            </Button>
                          </Form.Item>
                        </div>
                      </>
                    )}
                  </Form.List>
                </div>
              </Card>
            </div>
            <div className="flex flex-col gap-6">
              {/* Customer Details */}
              <Card title="Customer Details" className="p-4">
                {/* These Form.Items are now part of the main Form */}
                <Form.Item label="Customer Name" name="customerName" rules={[{ required: true }]}>
                  <Input placeholder="Customer Name" className="h-10 rounded" />
                </Form.Item>
                <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
                  <Input placeholder="Phone" className="h-10 rounded" />
                </Form.Item>
                <Form.Item label="Address" name="address">
                  <Input.TextArea rows={3} placeholder="Address" className="rounded" />
                </Form.Item>
                <Form.Item label="Reference" name="reference">
                  <Input placeholder="Reference" className="h-10 rounded" />
                </Form.Item>
              </Card>
            </div>
          </div>
          {/* Submit Buttons - now inside the main Form */}
          <div className="flex justify-center gap-4 mt-8">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit" // This will now correctly trigger the onFinish of the parent Form
              loading={isLoading}
              style={{ backgroundColor: "#FB923C", fontSize: "14px" }}
              className="bg-[#FF9B44] hover:bg-[#ff8a29] border-none text-white"
            >
              Add Sale
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default AddSalesPage
