const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-gray-100 to-blue-100 px-6 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold mb-4">
            Explore & Rent the Best Stylish Bikes!
          </h2>

          <p className="text-gray-600 mb-6">
            Find your perfect ride effortlessly. Discover a wide range of
            stylish, well-maintained bikes available for rent.
          </p>

          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Explore Bikes
          </button>
        </div>

        {/* Right Image */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc"
            alt="Bike"
            className="rounded-xl w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
