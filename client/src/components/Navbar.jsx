import { useState } from "react";
import { Menu, X } from "lucide-react"; // Lucide icons
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  // State to track if the mobile menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useAuthStore();

  // Toggle the menu for mobile responsiveness
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              CKN
            </Link>
          </div>

          {/* Right side - Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {user ? (
              <button
                className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (only visible on small screens) */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <button
                className="block w-full text-left bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="block w-full text-left bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="block w-full text-left bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
