"use client"

import React, { useState } from "react"
import {
    Form,
    Input,
    InputNumber,
    Button,
    Select,
    DatePicker,
    Card,
    Switch,
} from "antd"
import { toast } from "sonner"
import dayjs from "dayjs"
import TextArea from "antd/es/input/TextArea"

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
    saleTime: string
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

const AddExpensePage: React.FC = () => {
    const [form] = Form.useForm<FormValues>()
    const [isLoading, setIsLoading] = useState(false)
    const [isPaid, setIsPaid] = useState(true)

    const handleCancel = () => {
        form.resetFields()
    }

    const handleSubmit = async (values: any) => {
        try {
            setIsLoading(true)
            const payload = {
                ...values,
                saleTime: dayjs(values.saleTime).toISOString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }

            console.log("Submitted Sale Payload:", payload)

            await new Promise((res) => setTimeout(res, 1000))
            toast.success("Sale added successfully!")
            handleCancel()
        } catch (error) {
            console.error(error)
            toast.error("Failed to add sale")
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (checked: boolean) => {
        setIsPaid(checked); // Update the state when the switch is toggled
    };
    
    return (
        <div className="bg-white min-h-screen p-8">
            <div className="max-w-full mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-[#FB923C] text-2xl font-medium">Add Expense</h1>
                </div>

                <div className="w-full gap-4 mb-4 p-4 bg-white">
                    <div className="w-1/2 mx-auto flex flex-col gap-6 border border-[#FF9B44]"> {/* Divider added here */}
                        {/* Sale Details */}
                        <Card title="Expense Details" className="border-[#FF9B44] p-4 border">
                            <Form form={form} layout="vertical" onFinish={handleSubmit} className="w-full">
                                <div className="grid grid-cols-1 gap-4 mb-4">

                                    <div className="flex gap-10">
                                        <div className="flex-1">
                                            <Form.Item label="Expense Time" name="expenseTime" rules={[{ required: true }]}>
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

                                        <div className="flex">
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
                                                        backgroundColor: isPaid ? '#4CD964' : '#FF4D4F', // Green for "Paid", Red for "Due"
                                                        borderColor: isPaid ? '#4CD964' : '#FF4D4F',
                                                        width: '100%' // Ensures the switch takes up full width of the parent div
                                                    }}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <Form.Item label="Title" name="title" rules={[{ required: true }]}>
                                        <Input placeholder="Title" className="h-10 rounded" />
                                    </Form.Item>

                                    <Form.Item label="Description" name="description">
                                        <TextArea placeholder="Description" className="h-20 rounded" />
                                    </Form.Item>

                                    <div className="flex justify-between gap-10">

                                        <div className="flex-1">
                                            <Form.Item label="Reference" name="reference">
                                                <Input placeholder="Reference" className="h-8 rounded" />
                                            </Form.Item>
                                        </div>
                                        <div className="flex-1">
                                            <Form.Item label="Expense By" name="expenseBy" rules={[{ required: true }]}>
                                                <Select placeholder="Expense By" className="w-full h-12 rounded">
                                                    <Select.Option value="admin">Admin</Select.Option>
                                                    <Select.Option value="user">User</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </div>

                                </div>
                            </Form>
                        </Card>
                    </div>
                </div>


                {/* Submit Buttons */}
                <div className="flex justify-center gap-4 mt-8">
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        style={{ backgroundColor: "#FB923C", fontSize: "14px" }}
                        className="bg-[#FF9B44] hover:bg-[#ff8a29] border-none text-white"
                    >
                        Add Expense
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddExpensePage
