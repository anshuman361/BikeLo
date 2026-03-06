import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BikeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bike, setBike] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleBooking = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      const token = userInfo?.token;
      const { data } = await axios.post(
        "https://bike-l0.vercel.app/api/bookings",
        {
          bikeId: id,
          startTime: new Date(startTime).toISOString(),
          endTime: new Date(endTime).toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Booking Response:", data);
      navigate(`/payment/${data._id}`, {
        state: {
          booking: {
            ...data,
            bike: bike,
          },
        },
      });
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchBike = async () => {
      const res = await axios.get(`https://bike-l0.vercel.app/api/bikes/${id}`);
      setBike(res.data);
    };
    fetchBike();
  }, [id]);

  if (!bike) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{bike.name}</h1>
      <p className="mb-4">Price per hour: ₹{bike.price}</p>

      <div className="bg-white p-6 shadow-xl rounded-xl mt-6">
        <h2 className="text-xl font-bold mb-4">Book This Bike</h2>

        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        />

        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        />

        <button
          type="button"
          onClick={handleBooking}
          className="bg-red-500 text-white px-6 py-2 rounded"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};
export default BikeDetails;
