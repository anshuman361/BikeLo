const BikeCard = ({ bike }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={bike.image}
        alt={bike.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold">{bike.name}</h3>
        <p className="text-gray-500 text-sm">{bike.type}</p>

        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-green-600">₹{bike.price}/day</span>

          <button className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
