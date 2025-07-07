import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaBoxOpen,
  FaUserCircle,
  FaBars,
  FaTachometerAlt,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa';
import { authstore } from '../store/authstore';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { authUser, logout } = authstore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
    navigate('/');
  };

  const isAdmin = authUser && authUser.user?.role === 'admin';

  return (
    <header className="bg-white shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MyShop
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/" className="flex items-center gap-1 hover:text-blue-600">
            <FaHome /> Home
          </Link>
          <Link to="/products" className="flex items-center gap-1 hover:text-blue-600">
            <FaBoxOpen /> Products
          </Link>
          {isAdmin && (
            <Link to="/dashboard" className="flex items-center gap-1 hover:text-blue-600">
              <FaTachometerAlt /> Dashboard
            </Link>
          )}
          <input
            type="text"
            placeholder="Search products..."
            className="ml-4 px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </nav>

        {/* Account Section */}
        <div className="relative flex items-center gap-4">
          <FaUserCircle
            size={24}
            className="cursor-pointer text-gray-700 hover:text-blue-600"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className="absolute right-0 top-10 w-48 bg-white border rounded-md shadow-lg z-50 text-sm p-2 space-y-2">
              {authUser ? (
                <>
                  <div className="px-2">
                    <p className="font-medium text-gray-800">
                      Welcome, {authUser.user?.name || 'User'}
                    </p>
                    <span className="text-xs text-gray-500 capitalize">
                      Role: {authUser.user?.role || 'user'}
                    </span>
                  </div>
                  {isAdmin && (
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FaTachometerAlt /> Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded w-full text-left"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                    onClick={() => setShowDropdown(false)}
                  >
                    <FaSignInAlt /> Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                    onClick={() => setShowDropdown(false)}
                  >
                    <FaUserPlus /> Sign Up
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Mobile Toggle */}
          <FaBars
            size={22}
            className="md:hidden cursor-pointer text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-3 space-y-2 px-2 text-gray-700 font-medium">
          <Link to="/" className="flex items-center gap-2 hover:text-blue-600">
            <FaHome /> Home
          </Link>
          <Link to="/products" className="flex items-center gap-2 hover:text-blue-600">
            <FaBoxOpen /> Products
          </Link>
          {isAdmin && (
            <Link to="/dashboard" className="flex items-center gap-2 hover:text-blue-600">
              <FaTachometerAlt /> Dashboard
            </Link>
          )}
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </nav>
      )}
    </header>
  );
};

export default Navbar;
