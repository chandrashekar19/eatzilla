const Grocery = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          🛒 Welcome to Our Online Grocery Store!
        </h1>
        <p className="text-gray-600 mt-3">
          Get fresh groceries delivered to your doorstep. We offer a variety of
          fresh vegetables, fruits, dairy, and daily essentials.
        </p>
      </div>

      {/* Categories Section */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[
          { name: "🥦 Vegetables", color: "bg-green-200" },
          { name: "🍎 Fruits", color: "bg-red-200" },
          { name: "🥛 Dairy Products", color: "bg-blue-200" },
          { name: "🍞 Bakery", color: "bg-yellow-200" },
          { name: "🧃 Beverages", color: "bg-purple-200" },
          { name: "🍪 Snacks", color: "bg-orange-200" },
          { name: "🍚 Rice & Pulses", color: "bg-gray-200" },
          { name: "🛒 Daily Essentials", color: "bg-pink-200" },
        ].map((item, index) => (
          <div
            key={index}
            className={`${item.color} p-4 rounded-lg text-center font-semibold shadow-md`}
          >
            {item.name}
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-8">
        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
          Explore Products
        </button>
      </div>
    </div>
  );
};

export default Grocery;
