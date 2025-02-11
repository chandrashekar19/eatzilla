import { LOGO_URL } from "../constants/end-points";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../hooks/use-online-status";
import UserContext from "../hooks/user-context";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const [menuOpen, setMenuOpen] = useState(false);

  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

  // Subscribing to Redux store
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-md shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img className="w-14 h-14 rounded-full" src={LOGO_URL} alt="Logo" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            EatZilla
          </span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6">
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Online Status: {onlineStatus ? "✅" : "🔴"}
          </span>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About Us
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
          {/* <Link to="/grocery" className="nav-link">
            Grocery
          </Link> */}
          <Link to="/cart" className="relative nav-link">
            Cart <span className="ml-1">({cartItems.length})</span>
          </Link>

          {/* Login Button */}
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
            onClick={() =>
              setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login")
            }
          >
            {btnNameReact}
          </button>

          {/* Logged-in User */}
          {loggedInUser && (
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {loggedInUser}
            </span>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900 dark:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/70 backdrop-blur-md absolute top-full left-0 w-full shadow-lg transition-all duration-300">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link
              to="/"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/grocery"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Grocery
            </Link>
            <Link
              to="/cart"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Cart ({cartItems.length})
            </Link>

            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
              onClick={() =>
                setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login")
              }
            >
              {btnNameReact}
            </button>

            {loggedInUser && (
              <span className="text-lg font-medium">{loggedInUser}</span>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
