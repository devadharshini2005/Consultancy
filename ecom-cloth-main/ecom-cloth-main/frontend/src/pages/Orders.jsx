import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrderData = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/order/userOrders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allOrderItems = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrderItems.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });

        setOrderData(allOrderItems.reverse());
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching order data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadOrderData();
    }
  }, [token]);

  return (
    <div className='border-t pt-16 px-4 sm:px-8'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {loading ? (
        <p className='mt-4 text-gray-600'>Loading orders...</p>
      ) : orderData.length === 0 ? (
        <p className='mt-4 text-gray-600'>You have no orders yet.</p>
      ) : (
        <div className='mt-6'>
          {orderData.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className='py-4 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
            >
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.images?.[0]} alt={item.name} />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <h1>Order Status</h1>
                  <span className='w-2 h-2 rounded-full bg-green-500'></span>
                  
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                {/* <button
                  onClick={loadOrderData}
                  className='border px-4 py-2 text-sm font-medium rounded-sm'
                >
                  Track Order
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
