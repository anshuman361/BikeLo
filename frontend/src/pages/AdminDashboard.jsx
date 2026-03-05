import { useState } from "react";
import { useEffect } from "react";
import API from "../services/api";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const AdminDashboard = () => {
  const [bikes, setBikes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [revenue, setRevenue] = useState(0);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const bikesRes = await API.get("/bikes");
      setBikes(bikesRes.data);

      const bookingRes = await API.get("/bookings", config);
      setBookings(bookingRes.data);

      const revenueRes = await API.get("/bookings/revenue", config);
      setRevenue(revenueRes.data.totalRevenue);
    } catch (error) {
      console.log("ADMIN FETCH ERROR:", error.response?.data);
    }
  };
  const deleteBike = async (id) => {
    await API.delete(`/bikes/${id}`, config);
    fetchData();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    brand: Yup.string().required(),
    city: Yup.string().required(),
    price: Yup.number().required(),
  });

  const chartData = {
    labels: bookings.map((b) => new Date(b.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: "Revenue",
        data: bookings.map((b) => b.totalPrice),
        borderColor: "blue",
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* STATS */}
      <div className="flex gap-6 mb-8">
        <div className="p-4 bg-gray-100 rounded">
          Total Bikes: {bikes.length}
        </div>

        <div className="p-4 bg-gray-100 rounded">
          Total Bookings: {bookings.length}
        </div>

        <div className="p-4 bg-gray-100 rounded">Total Revenue: ₹{revenue}</div>
      </div>

      {/* CHART */}
      <div className="mb-10">
        <Line data={chartData} />
      </div>

      {/* ADD BIKE */}
      <h2 className="text-xl font-bold mb-4">Add Bike</h2>

      <Formik
        initialValues={{
          name: "",
          brand: "",
          city: "",
          price: "",
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const formData = new FormData();

          Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
          });

          await API.post("/bikes", formData, config);

          fetchData();
          alert("Bike Added");
        }}
      >
        {({ setFieldValue }) => (
          <Form className="flex gap-3 mb-10">
            <Field name="name" placeholder="Name" className="border p-2" />
            <Field name="brand" placeholder="Brand" className="border p-2" />
            <Field name="city" placeholder="City" className="border p-2" />
            <Field
              name="price"
              placeholder="Price"
              type="number"
              className="border p-2"
            />

            <input
              type="file"
              onChange={(e) => setFieldValue("image", e.target.files[0])}
            />

            <button type="submit" className="bg-blue-500 text-white px-4">
              Add
            </button>
          </Form>
        )}
      </Formik>

      {/* MANAGE BIKES */}
      <h2 className="text-xl font-bold mb-4">Manage Bikes</h2>

      {bikes.map((bike) => (
        <div key={bike._id} className="flex gap-4 mb-2">
          <img src={bike.image} width="60" />

          <div>
            {bike.name} - ₹{bike.price}
          </div>

          <button
            onClick={() => deleteBike(bike._id)}
            className="bg-red-500 text-white px-3"
          >
            Delete
          </button>
        </div>
      ))}

      {/* BOOKINGS */}
      <h2 className="text-xl font-bold mt-10 mb-4">Bookings</h2>

      {bookings
        .filter((b) => b.bike)
        .map((b) => (
          <div key={b._id} className="border p-3 mb-2">
            <div>Bike: {b.bike.name}</div>
            <div>Price: ₹{b.totalPrice}</div>
            <div>Status: {b.paymentStatus}</div>
          </div>
        ))}
    </div>
  );
};

export default AdminDashboard;
