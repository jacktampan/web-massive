import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [paymentProof, setPaymentProof] = useState(null);
  const [uploadedOrderIds, setUploadedOrderIds] = useState([]);
  const [userPoints, setUserPoints] = useState(0); // State untuk menyimpan points user

  useEffect(() => {
    const fetchOrdersAndPoints = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch orders
        const ordersResponse = await axios.get(
          "https://hanabira.co/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(ordersResponse.data);
        const uploadedOrders = ordersResponse.data
          .filter((order) => order.paymentProof)
          .map((order) => order.id);
        setUploadedOrderIds(uploadedOrders);

        // Fetch user points
        const pointsResponse = await axios.get(
          "https://hanabira.co/api/user/points",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserPoints(pointsResponse.data.points);
      } catch (error) {
        console.error("Error fetching orders or points:", error);
      }
    };

    fetchOrdersAndPoints();
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
        `https://hanabira.co/api/orders/${orderId}/upload-proof`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Payment proof uploaded successfully!");
      setUploadedOrderIds([...uploadedOrderIds, orderId]);
      setOrders(
        orders.map((order) =>
          order.id === orderId
            ? { ...order, paymentProof: formData.get("paymentProof").name }
            : order
        )
      );
      setPaymentProof(null); // Reset file input
    } catch (error) {
      console.error("Error uploading payment proof:", error);
      alert("Failed to upload payment proof");
    }
  };

  return (
    <div className="my-orders p-8 bg-white border rounded-lg max-w-2xl mx-auto">
      <h3 className="form-heading text-lg font-semibold mb-4">My Orders</h3>
      <div className="mb-4">
        <span className="font-semibold">Points Available:</span> {userPoints}{" "}
        points
      </div>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="border-b border-gray-300 py-4">
              <div>
                <span className="font-semibold">Nama Kost:</span>{" "}
                {order.Product.namaKost}
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
                {!uploadedOrderIds.includes(order.id) && (
                  <>
                    <input type="file" onChange={handleFileChange} />
                    <button
                      onClick={() => handleUpload(order.id)}
                      className="upload-button bg-custom-orange text-white py-2 px-4 rounded-lg"
                    >
                      Upload Payment Proof
                    </button>
                  </>
                )}
                {uploadedOrderIds.includes(order.id) &&
                  order.status === "pending" && (
                    <p className="text-custom-orange">
                      Payment proof uploaded. Waiting for confirmation.
                    </p>
                  )}
                {order.status === "confirmed" && (
                  <p className="text-green-500">Payment confirmed.</p>
                )}
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
