import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [paymentProof, setPaymentProof] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const ordersResponse = await axios.get(
          "http://104.234.231.224:3000/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleFileChange = (e) => {
    setPaymentProof(e.target.files[0]);
  };

  const handleUpload = async (orderId) => {
    if (!paymentProof) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("paymentProof", paymentProof);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://104.234.231.224:3000/api/orders/${orderId}/upload-proof`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Payment proof uploaded successfully!");
    } catch (error) {
      console.error("Error uploading payment proof:", error);
      alert("Failed to upload payment proof");
    }
  };

  return (
    <div className="my-orders p-8 bg-white solid border rounded-lg max-w-2xl mx-auto">
      <h3 className="form-heading text-lg font-semibold mb-4">My Orders</h3>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="border-b border-gray-300 py-4">
              <div>
                <span className="font-semibold">Kost ID:</span> {order.kostId}
              </div>
              <div>
                <span className="font-semibold">Duration:</span>{" "}
                {order.duration}
              </div>
              <div>
                <span className="font-semibold">Total Price:</span> Rp{" "}
                {order.totalPrice.toLocaleString()}
              </div>
              <div>
                <span className="font-semibold">Status:</span> {order.status}
              </div>
              <div>
                <input type="file" onChange={handleFileChange} />
                <button
                  onClick={() => handleUpload(order.id)}
                  className="upload-button bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Upload Payment Proof
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;
