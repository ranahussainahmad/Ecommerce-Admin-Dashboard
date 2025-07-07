import React, { useEffect } from 'react';
import { productStore } from '../store/productStore.js';
import { authstore } from '../store/authstore.js';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash, FaStar, FaShoppingCart } from 'react-icons/fa';

const Products = () => {
  const { products, getAllProducts, deleteProduct } = productStore();
  const { authUser } = authstore();

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!authUser || authUser.user?.role !== 'admin') {
      alert('Access denied. Admin privileges required.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this product?')) {
      const success = await deleteProduct(id);
      alert(success ? 'Product deleted successfully' : 'Failed to delete product');
    }
  };

  const isAdmin = authUser && authUser.user?.role === 'admin';

  const generateRating = () => (Math.random() * 2 + 3).toFixed(1);
  const generateReviews = () => Math.floor(Math.random() * 500 + 50);

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Products</h1>
        <p className="text-gray-600">Discover our amazing collection of quality products</p>
        {isAdmin && (
          <div className="mt-4 inline-block px-3 py-1 bg-blue-100 text-blue-600 font-semibold rounded-full text-sm">
            Admin Mode
          </div>
        )}
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => {
          const rating = generateRating();
          const reviews = generateReviews();

          return (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative group">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      to={`/products/update/${product._id}`}
                      title="Edit"
                      className="p-2 bg-yellow-400 text-white rounded-full shadow hover:bg-yellow-500"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      title="Delete"
                      className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <span className="text-sm text-blue-500 font-medium">{product.category}</span>
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600 flex-grow">{product.description}</p>

                <div className="flex items-center mt-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">{rating} ({reviews})</span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">${product.price}</span>
                  <span
                    className={`text-sm font-medium ${
                      product.stock < 10 ? 'text-red-500' : 'text-green-600'
                    }`}
                  >
                    {product.stock < 10 ? `${product.stock} left` : `${product.stock} in stock`}
                  </span>
                </div>

                <div className="mt-4 flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    <FaShoppingCart /> Add to Cart
                  </button>
                  <Link
                    to={`/products/${product._id}`}
                    className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition"
                  >
                    <FaEye /> View
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
