import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Sneha Patil",
    review:
      "QuickServe made my home deep cleaning so smooth. The professionals were polite and did an amazing job!",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: "⭐ 4.9",
  },
  {
    name: "Rohit Sharma",
    review:
      "Excellent AC servicing. The technician arrived on time and fixed everything quickly. Highly recommended!",
    img: "https://randomuser.me/api/portraits/men/15.jpg",
    rating: "⭐ 4.8",
  },
  {
    name: "Aditi Deshmukh",
    review:
      "Bathroom cleaning was flawless. Booking was super easy and the team was very professional.",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: "⭐ 5.0",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-[#f2fbf8]" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-10">
          What Our Customers Say
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          className="max-w-3xl mx-auto"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-8 rounded-2xl shadow-md mx-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {t.name}
                </h3>
                <p className="text-yellow-600 mt-1">{t.rating}</p>
                <p className="text-gray-600 mt-4">{t.review}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
