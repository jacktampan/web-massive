import React from "react";

const reviews = [
  {
    id: 1,
    name: "Jauhar Latifah",
    review:
      "KostCozy sangat membantu dalam mencari kost yang sesuai dengan kebutuhan saya. Antarmukanya mudah digunakan dan informasinya lengkap. Saya sangat merekomendasikan aplikasi ini untuk teman-teman yang sedang mencari kost!.",
  },
  {
    id: 2,
    name: "Laily Khayati",
    review:
      "Pengalaman saya menggunakan aplikasi ini sangat memuaskan. Proses pencarian kost menjadi lebih cepat dan efisien. Fitur-fitur yang disediakan sangat membantu dan membuat saya merasa aman dalam memilih tempat tinggal. Sangat direkomendasikan untuk siapa saja yang sedang mencari kost!",
  },
  {
    id: 3,
    name: "Anandha Army Antassa",
    review:
      "Aplikasi ini benar-benar memudahkan proses pencarian kost. Fitur-fiturnya sangat user-friendly dan memberikan banyak pilihan yang sesuai dengan kebutuhan saya. Saya merasa aman dan puas menggunakan aplikasi ini. Highly recommended untuk teman-teman yang mencari kost!",
  },
];

const ReviewCard = ({ review }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-lg p-6 m-4">
      <p className="text-zinc-600 italic mb-4">“{review.review}”</p>
      <div className="flex items-center">
        <div>
          <p className="font-bold text-zinc-800">{review.name}</p>
        </div>
      </div>
    </div>
  );
};

const UserReviews = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-custom-orange text-center mb-4">
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
