import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { setCity } from "../features/locationSlice";

const PrivateNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    dispatch(setCity(e.target.value));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <span className="text-4xl">🏍️</span>
        <Link to="/" className="text-2xl font-bold">
          Bike<span className="text-red-500">Lo</span>
        </Link>
      </div>

      {/* Right Section */}
      <div className="relative flex items-center gap-12">
        {/*Location */}
        <select onChange={handleChange} className="border p-2 rounded-full">
          <option value="">Location 📍</option>
          <option value="Bhopal">Bhopal</option>
          <option value="Indore">Indore</option>
          <option value="Mumbai">Mumbai</option>
        </select>
        <span className="font-semibold text-gray-700">
          Welcome, {user?.name}
        </span>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            ☰
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                My Details
              </Link>

              <Link
                to="/my-bookings"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                My Bookings
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
