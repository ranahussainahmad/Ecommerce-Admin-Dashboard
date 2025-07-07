import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productStore } from '../store/productStore.js';
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaCreditCard,
  FaShieldAlt,
  FaTruck,
  FaUndo
} from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const { getProductById } = productStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const generateRating = () => (Math.random() * 2 + 3).toFixed(1);
  const generateReviews = () => Math.floor(Math.random() * 500 + 50);

  const getStockStatus = (stock) => {
    if (stock === 0) return { class: 'text-red-500', text: 'Out of Stock', icon: '❌' };
    if (stock < 10) return { class: 'text-yellow-500', text: `Only ${stock} left`, icon: '⚠️' };
    return { class: 'text-green-600', text: 'In Stock', icon: '✅' };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-gray-500 text-lg">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-96 text-red-500 text-lg">
        Product not found
      </div>
    );
  }

  const rating = generateRating();
  const reviews = generateReviews();
  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <div className="relative">
            <span className="absolute top-4 left-4 bg-yellow-300 text-sm px-2 py-1 rounded-md font-semibold">
              Premium
            </span>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full rounded-xl object-cover shadow-md"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <span className="text-blue-600 text-sm font-medium">{product.category}</span>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-gray-500 text-sm">{rating} ({reviews} reviews)</span>
          </div>

          <div className="text-2xl font-semibold text-gray-900">${product.price}</div>

          {/* Stock status */}
          <div className={`flex items-center gap-2 text-sm font-medium ${stockStatus.class}`}>
            <span>{stockStatus.icon}</span>
            <span>{stockStatus.text}</span>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mt-4">
            <div>
              <div className="font-medium text-gray-800">Category</div>
              {product.category}
            </div>
            <div>
              <div className="font-medium text-gray-800">Stock</div>
              {product.stock} units
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-purple-600 text-white flex items-center justify-center gap-2 px-4 py-2 rounded-md hover:bg-purple-700 transition">
              <FaCreditCard /> Buy Now
            </button>
            <button className="flex-1 bg-blue-600 text-white flex items-center justify-center gap-2 px-4 py-2 rounded-md hover:bg-blue-700 transition">
              <FaShoppingCart /> Add to Cart
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 flex items-center justify-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 transition">
              <FaHeart /> Wishlist
            </button>
          </div>

          {/* Features */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Product Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <FaShieldAlt className="text-green-500" /> 1 Year Warranty
              </li>
              <li className="flex items-center gap-2">
                <FaTruck className="text-blue-500" /> Free Shipping
              </li>
              <li className="flex items-center gap-2">
                <FaUndo className="text-yellow-500" /> 30-Day Return Policy
              </li>
              <li className="flex items-center gap-2">
                <FaCreditCard className="text-purple-500" /> Secure Payment
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
