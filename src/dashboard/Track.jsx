import React, { useEffect, useState } from "react";
import axios from "axios";

function MainComponent() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://104.234.231.224:3000/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched orders:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleConfirm = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://104.234.231.224:3000/api/orders/${orderId}`,
        { status: "confirmed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: "confirmed" } : order
        )
      );
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  return (
    <div className="w-full h-full bg-gray-100 p-6 font-roboto">
      <div className="max-w-[1200px] mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <table className="w-full bg-gray-50 shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left p-4">Order ID</th>
              <th className="text-left p-4">User Name</th>
              <th className="text-left p-4">Nama Kost</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Payment Proof</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">{order.User.username}</td>
                  <td className="p-4">{order.Product.namaKost}</td>
                  <td
                    className={`p-4 ${
                      order.status === "pending"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="p-4">
                    {order.paymentProof ? (
                      <img
                        src={`http://104.234.231.224:3000/${order.paymentProof}`}
                        alt="Payment Proof"
                        className="w-32 h-32 object-cover"
                      />
                    ) : (
                      "No proof uploaded"
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => handleConfirm(order.id)}
                      disabled={order.status === "confirmed"}
                    >
                      Confirm
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4" colSpan="6">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MainComponent;
