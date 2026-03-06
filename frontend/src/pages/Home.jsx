import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const city = useSelector((state) => state.location.city);
  const [bikes, setBikes] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        let url = "https://bikelo-backend.onrender.com/api/bikes";

        if (city) {
          url += `?city=${city}`;
        }

        const { data } = await axios.get(url);
        console.log(data);
        setBikes(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBikes();
  }, [city]);
  return (
    <>
      <Hero />

      {/*Available bike */}
      <div className="px-6 py-10 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-6">Available Bikes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {bikes.map((bike) => (
            <div
              key={bike._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
            >
              <img
                src={bike.image}
                alt={bike.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{bike.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{bike.brand}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-red-600 font-semibold text-xl">
                    ₹{bike.price}/hour
                  </span>
                  <button
                    onClick={() => navigate(`/bike/${bike._id}`)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-md hover:bg-green-700 transition"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
