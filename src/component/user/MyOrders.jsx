import React, { useEffect, useState } from "react";
import axios from "axios";
import { StarIcon } from "@heroicons/react/20/solid";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [paymentProof, setPaymentProof] = useState(null);
  const [uploadedOrderIds, setUploadedOrderIds] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(null); // State untuk menampilkan form review
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
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
    } catch (error) {
      console.error("Error uploading payment proof:", error);
      alert("Failed to upload payment proof");
    }
  };

  const handleSubmitReview = async (productId) => {
    console.log("Submitting review for productId:", productId);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://hanabira.co/api/products/${productId}/reviews`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Review submitted successfully!");
      setRating(0);
      setComment("");
      setShowReviewForm(null);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review");
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
                      className="upload-button bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                      Upload Payment Proof
                    </button>
                  </>
                )}
                {uploadedOrderIds.includes(order.id) &&
                  order.status === "pending" && (
                    <p className="text-yellow-500">
                      Payment proof uploaded. Waiting for confirmation.
                    </p>
                  )}
                {order.status === "confirmed" && (
                  <>
                    <p className="text-green-500">Payment confirmed.</p>
                    <button
                      onClick={() => setShowReviewForm(order.id)}
                      className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                      Add Review
                    </button>
                    {showReviewForm === order.id && (
                      <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Add a Review
                        </h3>
                        <div className="mt-2">
                          <label
                            htmlFor="rating"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Rating
                          </label>
                          <select
                            id="rating"
                            name="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          >
                            <option value={0}>Select a rating</option>
                            <option value={1}>1 star</option>
                            <option value={2}>2 stars</option>
                            <option value={3}>3 stars</option>
                            <option value={4}>4 stars</option>
                            <option value={5}>5 stars</option>
                          </select>
                        </div>
                        <div className="mt-4">
                          <label
                            htmlFor="comment"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Comment
                          </label>
                          <textarea
                            id="comment"
                            name="comment"
                            rows="4"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          ></textarea>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={() => handleSubmitReview(order.Product.id)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Submit Review
                          </button>
                        </div>
                      </div>
                    )}
                  </>
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
