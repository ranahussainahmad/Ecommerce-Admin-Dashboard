import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaShoppingBag,
  FaUsers,
  FaDollarSign,
  FaShieldAlt,
  FaTruck,
  FaHeadset,
  FaStar,
  FaBoxOpen,
} from 'react-icons/fa';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to MyShop</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover amazing products with unbeatable quality and prices. Your one-stop destination for premium shopping experience.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/products"
              className="flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              <FaShoppingBag />
              Shop Now
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-2 border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition"
            >
              <FaUsers />
              Join Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: <FaBoxOpen />, number: '1,200+', label: 'Products' },
            { icon: <FaDollarSign />, number: '$2.5M+', label: 'Total Sales' },
            { icon: <FaUsers />, number: '50K+', label: 'Happy Customers' },
            { icon: <FaStar />, number: '4.9', label: 'Average Rating' },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-6">
              <div className="text-3xl text-indigo-600 mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose MyShop?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            We provide exceptional service and quality products that exceed your expectations.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <FaShieldAlt />,
                title: 'Secure Shopping',
                desc: 'Your data and transactions are protected with industry-leading security measures.',
              },
              {
                icon: <FaTruck />,
                title: 'Fast Delivery',
                desc: 'Get your orders delivered quickly with our reliable shipping partners.',
              },
              {
                icon: <FaHeadset />,
                title: '24/7 Support',
                desc: 'Our customer support team is always ready to help you with any questions.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 border rounded-xl p-6 hover:shadow-lg transition"
              >
                <div className="text-3xl text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
