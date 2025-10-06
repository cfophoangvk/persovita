const FeaturedReviews: React.FC = () => (
  <div className="max-w-7xl mx-auto px-6 py-12 bg-white">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-extrabold text-orange-800">
        What Our Patients Say
      </h2>
      <a
        href="/testimonials"
        className="text-md text-orange-600 hover:underline font-medium"
      >
        See all testimonials
      </a>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Testimonial 1 */}
      <div className="bg-blue-50 p-7 rounded-lg shadow-md border border-blue-100 transform hover:scale-105 transition duration-300">
        <div className="text-yellow-500 text-xl mb-3">★★★★★</div>
        <p className="text-gray-800 leading-relaxed">
          "The examination service was very professional, and the doctor was
          attentive. I am very satisfied with the treatment results."
        </p>
        <div className="text-sm text-gray-600 font-semibold mt-4">
          — Nguyen Thi Mai
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-blue-50 p-7 rounded-lg shadow-md border border-blue-100 transform hover:scale-105 transition duration-300">
        <div className="text-yellow-500 text-xl mb-3">★★★★★</div>
        <p className="text-gray-800 leading-relaxed">
          "The clinic is clean, and the equipment is modern. The consultation
          process was quick and effective. Highly recommended!"
        </p>
        <div className="text-sm text-gray-600 font-semibold mt-4">
          — Tran Van Hung
        </div>
      </div>

      {/* Testimonial 3 */}
      <div className="bg-blue-50 p-7 rounded-lg shadow-md border border-blue-100 transform hover:scale-105 transition duration-300">
        <div className="text-yellow-500 text-xl mb-3">★★★★★</div>
        <p className="text-gray-800 leading-relaxed">
          "I used this medication following my doctor's advice, and my health
          condition has significantly improved."
        </p>
        <div className="text-sm text-gray-600 font-semibold mt-4">
          — Le Thanh Truc
        </div>
      </div>
    </div>
  </div>
);

export default FeaturedReviews;
