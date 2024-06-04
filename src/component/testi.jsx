import React from "react";
import user1 from "../assets/orang.jpg"; // Ganti dengan path gambar yang sebenarnya
import user2 from "../assets/orang.jpg";
import user3 from "../assets/orang.jpg";

const reviews = [
  {
    id: 1,
    name: "Jauhar Latifah",
    review:
      "“sangat nyaman, mudah digunakan, dan tentunya sangat aman. dan ini sangat direkomendasikan dipakai untuk teman teman yang sedang mencari kost kostan”.",
    image: user1,
    role: "Pengguna Senang",
  },
  {
    id: 2,
    name: "Laily Khayati",
    review:
      "“sangat nyaman, mudah digunakan, dan tentunya sangat aman. dan ini sangat direkomendasikan dipakai untuk teman teman yang sedang mencari kost kostan”.",
    image: user2,
    role: "Pengguna Senang",
  },
  {
    id: 3,
    name: "Anandha Army Antassa",
    review:
      "“sangat nyaman, mudah digunakan, dan tentunya sangat aman. dan ini sangat direkomendasikan dipakai untuk teman teman yang sedang mencari kost kostan”.",
    image: user3,
    role: "Pengguna Senang",
  },
];

const ReviewCard = ({ review }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-lg p-6 m-4">
      <p className="text-zinc-600 italic mb-4">“{review.review}”</p>
      <div className="flex items-center">
        <img
          src={review.image}
          alt={review.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="font-bold text-zinc-800">{review.name}</p>
          <p className="text-zinc-500">{review.role}</p>
        </div>
      </div>
    </div>
  );
};

const UserReviews = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-orange-500 text-center mb-4">
        Ulasan Pengguna Tentang KostCozy
      </h1>
      <p className="text-zinc-700 text-center mb-8">
        Berikut ulasan pengguna tentang Kost Cozy
      </p>
      <div className="flex flex-wrap justify-center">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
