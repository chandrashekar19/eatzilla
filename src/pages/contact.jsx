const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 p-6">
      {/* Contact Form */}
      <div className="shadow-xl rounded-2xl p-6 max-w-lg w-[600px] text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h1>
        <p className="text-gray-600 mb-6">
          Have questions, feedback, or special requests? We would love to hear
          from you! Fill out the form below, and our team will get back to you
          soon.
        </p>

        <form className="flex flex-col space-y-4">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="Your Name"
          />
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="Your Email"
          />
          <textarea
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="Your Message"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Info */}
      <div className="shadow-xl rounded-2xl p-6 max-w-lg w-[400px] bg-white text-gray-700">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          📞 Contact Information
        </h2>

        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-4">
            <span className="text-2xl">📍</span>
            <div>
              <h3 className="font-semibold text-lg">Visit Us</h3>
              <p className="text-sm text-gray-600">
                123 Food Street, Culinary City, 56789
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-2xl">📞</span>
            <div>
              <h3 className="font-semibold text-lg">Call Us</h3>
              <p className="text-sm text-gray-600">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-2xl">📩</span>
            <div>
              <h3 className="font-semibold text-lg">Email Us</h3>
              <p className="text-sm text-gray-600">contact@restaurant.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
