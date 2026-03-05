import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import API from "../services/api";
import { useState } from "react";

const Register = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Initial Form Values
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(4, "Minimum 4 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm your password"),
  });
  const sendOTP = async (email) => {
    try {
      await API.post("/auth/send-otp", { email });

      alert("OTP sent to email");

      setOtpSent(true);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };
  const verifyOTP = async (email, otp) => {
    try {
      await API.post("/auth/verify-otp", { email, otp });

      alert("Email verified");

      setOtpVerified(true);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };
  // Submit Function
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { name, email, password } = values;

      if (!otpVerified) {
        alert("Please verify OTP first");
        setSubmitting(false);
        return;
      }

      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      resetForm();

      alert("Registration Successful 🎉");

      navigate("/login");
    } catch (error) {
      console.log("Signup Error:", error);

      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create <span className="text-blue-500">Account</span>
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="space-y-4">
              {/* Name */}
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div className="flex gap-2">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                  type="button"
                  onClick={() => sendOTP(values.email)}
                  className="bg-blue-500 text-white px-4 rounded-lg"
                >
                  Send OTP
                </button>
              </div>

              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              {otpSent && (
                <div className="flex gap-2 mt-3">
                  <Field
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    className="flex-1 p-3 border rounded-lg"
                  />

                  <button
                    type="button"
                    onClick={() => verifyOTP(values.email, values.otp)}
                    className="bg-green-500 text-white px-4 rounded-lg"
                  >
                    Verify
                  </button>
                </div>
              )}

              {/* Password */}
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!otpVerified}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-60"
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
