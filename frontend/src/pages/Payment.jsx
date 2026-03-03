import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";

const Payment = () => {
  const { id } = useParams(); // bookingId from URL
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;
  // const bike = location.state?.bike;
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const token = userInfo?.token;

  if (!booking) {
    return <h2 className="text-center mt-10">Booking not found</h2>;
  }

  const handlePayment = async () => {
    try {
      // Create Razorpay order from backend
      const { data } = await axios.post(
        "payments/create-order",
        { bookingId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Razorpay Checkout options
      const options = {
        key: "rzp_test_SIY3Gh9wktCcpS", // test key
        amount: data.amount,
        currency: data.currency,
        name: "BikeLo",
        description: "Bike Booking Payment",
        order_id: data.id,

        handler: async function (response) {
          try {
            await axios.post(
              "payments/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: id,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

            alert("Payment Successful 🎉! Check Email for further Details");
            navigate("/my-bookings");
          } catch (err) {
            console.error(err);
            alert("Payment verification failed");
          }
        },

        theme: {
          color: "#e11d48",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed to initialize");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Payment Page</h2>

      <p className="mb-2">
        Booking ID: <span className="font-semibold">{booking._id}</span>
      </p>

      <p>
        <strong>City:</strong> {booking.bike?.city}
      </p>
      <p>
        <strong>Bike:</strong> {booking.bike?.name}
      </p>

      <p className="text-xl font-semibold text-green-600">
        Total Amount: ₹{booking.totalPrice}
      </p>

      <button
        onClick={handlePayment}
        className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
      >
        Pay Now
      </button>
    </div>
  );
};
export default Payment;
