import axios from "axios";
import React, { useEffect, useState } from "react";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  // const token = localStorage.getItem("user");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      const token = userInfo?.token;
      const { data } = await axios.get(
        "http://localhost:3000/api/bookings/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setBookings(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings
            .filter((booking) => booking.bike)
            .map((booking) => (
              <div
                key={booking._id}
                className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition"
              >
                {/*Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {booking.bike?.name || "Bike not available"}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>
                </div>

                {/*Details */}
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Booking ID:</strong>
                    {booking._id}
                  </p>
                  <p>
                    <strong>Bike Price:</strong>Rs.{booking.bike.price} / hour
                  </p>
                  <p>
                    <strong>City:</strong>
                    {booking.bike.city}
                  </p>

                  <p>
                    <strong>Start:</strong>{" "}
                    {new Date(booking.startTime).toLocaleString()}
                  </p>

                  <p>
                    <strong>End:</strong>{" "}
                    {new Date(booking.endTime).toLocaleString()}
                  </p>
                  <p className="text-lg font-bold text-red-600 mt-2">
                    Total: ₹{booking.totalPrice}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
