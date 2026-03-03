import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <span className="text-4xl">🏍️</span>
        <h1 className="text-3xl font-bold text-black-500">
          Bike<span className="text-red-500">Lo</span>
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default PublicNavbar;
