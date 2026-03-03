import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email required"),
    password: Yup.string().required("Password required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await API.post("/auth/login", values);
      dispatch(loginSuccess(data));
      navigate("/");
      alert("Login Successful 🎉");
      toast.success("Login Successful 🚀");
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    } catch (error) {
      // alert("Invalid credentials");
      console.log("LOGIN ERROR:", error.response?.data);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6">
          Login to <span className="text-red-500">BikeLo</span>
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="relative">
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 border rounded-lg"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
            >
              Login
            </button>
          </Form>
        </Formik>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-500 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
