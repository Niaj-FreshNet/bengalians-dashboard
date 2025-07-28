import { Modal, Descriptions, Image, Tag, Divider, Typography } from 'antd';
import { useGetAdminOrderDetilsQuery } from '../../redux/api/order/orderApi';

const { Text } = Typography;

interface OrderDetailsModalProps {
  orderId: string;
  visible: boolean;
  onClose: () => void;
}

const ExpenseDetailsModal = ({ orderId, visible, onClose }: OrderDetailsModalProps) => {
  const { data, isLoading } = useGetAdminOrderDetilsQuery(orderId);
  const order = data?.Data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'green';
      case 'PENDING': return 'red';
      case 'CANCEL': return 'gray';
      default: return 'blue';
    }
  };

  return (
    <Modal
      title="Expense Details"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
    >
      {isLoading ? (
        <div className="text-center py-8">Loading expense details...</div>
      ) : (
        <div className="space-y-6">
          {/* Expense Info */}
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Expense ID">{order?.id}</Descriptions.Item>
            <Descriptions.Item label="Expense Time">
              {new Date(order?.orderTime).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={getStatusColor(order?.status)}>{order?.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Expense By">
              <Tag color={getStatusColor(order?.status)}>{order?.status}</Tag>
            </Descriptions.Item>
          </Descriptions>

          {/* Customer Info */}
          <Divider orientation="left">Case Information</Divider>
          <Descriptions bordered>
            <Descriptions.Item label="Title" span={5}>{order?.customer?.name}</Descriptions.Item>
            <Descriptions.Item label="Description" span={5}>{order?.email}</Descriptions.Item>
            <Descriptions.Item label="Reference" span={5}>{order?.address}</Descriptions.Item>
            {/* <Descriptions.Item label="Phone">{order?.phone}</Descriptions.Item>
            <Descriptions.Item label="Note" span={2}>{order?.note || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Zip Code">{order?.zipcode || 'N/A'}</Descriptions.Item> */}
          </Descriptions>

          {/* Payment Info */}
          <Divider orientation="left">Payment Information</Divider>
          <Descriptions bordered>
            <Descriptions.Item label="Payment Method">
              {order?.method}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Status">
              <Tag color={order?.isPaid ? 'green' : 'red'}>
                {order?.isPaid ? 'PAID' : 'DUE'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Total Amount">
              <Text strong>{order?.amount} BDT</Text>
            </Descriptions.Item>
          </Descriptions>

          <div className='mb-4'></div>

          {/* Expense Items */}
          {/* <Divider orientation="left">Expense Items</Divider>
          {order?.cartItems?.map((item: any, index: number) => (
            <div key={index} className="border rounded p-4 mb-4">
              <div className="flex gap-4">
                <Image
                  width={100}
                  src={item.productImageUrls?.[0] || item.product?.imageUrl?.[0]}
                  alt={item.productName}
                  className="rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-lg">{item.productName}</h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <Text type="secondary">Size:</Text> {item.size}
                    </div>
                    <div>
                      <Text type="secondary">Color:</Text> {item.color}
                    </div>
                    <div>
                      <Text type="secondary">Price:</Text> ${item.price}
                    </div>
                    <div>
                      <Text type="secondary">Quantity:</Text> {item.quantity}
                    </div>
                    <div className="col-span-2">
                      <Text type="secondary">Subtotal:</Text> ${item.price * item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      )}
    </Modal>
  );
};

export default ExpenseDetailsModal;