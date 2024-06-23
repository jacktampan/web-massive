import React, { useState, useEffect } from "react";
import axios from "axios";
import { StarIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://hanabira.co/api/products/${productId}/reviews`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://hanabira.co/api/products/${productId}/reviews`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews([...reviews, response.data]);
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="bg-white">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Customer Reviews</h2>

        <div className="-my-10">
          {reviews.map((review, reviewIdx) => (
            <div
              key={review.id}
              className="flex space-x-4 text-sm text-gray-500"
            >
              <div className="flex-none py-10">
                <img
                  src={review.avatarSrc}
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-100"
                />
              </div>
              <div
                className={classNames(
                  reviewIdx === 0 ? "" : "border-t border-gray-200",
                  "flex-1 py-10"
                )}
              >
                <h3 className="font-medium text-gray-900">{review.author}</h3>
                <p>
                  <time dateTime={review.datetime}>{review.date}</time>
                </p>

                <div className="mt-4 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        review.rating > rating
                          ? "text-yellow-400"
                          : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{review.rating} out of 5 stars</p>

                <div
                  className="prose prose-sm mt-4 max-w-none text-gray-500"
                  dangerouslySetInnerHTML={{ __html: review.content }}
                />
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Add a Review</h3>
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
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
