import { useSelector } from "react-redux";
import PrivateNavbar from "./PrivateNavbar";
import PublicNavbar from "./PublicNavbar";

const Navbar = ({ selectedCity, setSelectedCity }) => {
  const { user } = useSelector((state) => state.auth);

  return user ? <PrivateNavbar /> : <PublicNavbar />;
};

export default Navbar;
