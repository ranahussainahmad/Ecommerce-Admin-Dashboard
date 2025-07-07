import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productStore } from '../store/productStore.js';
import { authstore } from '../store/authstore.js';

const AddProduct = () => {
  const navigate = useNavigate();
  const { authUser } = authstore();
  const [authLoading, setAuthLoading] = useState(true);

  const [products, setProducts] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stock: ''
  });

  const { addProducts } = productStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!authLoading && (!authUser || authUser.user?.role !== 'admin')) {
      alert('Access denied. Admin privileges required.');
      navigate('/login');
    }
  }, [authUser, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authUser || authUser.user?.role !== 'admin') {
      alert('Access denied. Admin privileges required.');
      navigate('/login');
      return;
    }

    const { name, description, price, imageUrl, category, stock } = products;

    if (!name || !description || !price || !imageUrl || !category || !stock) {
      alert("Please fill all fields");
      return;
    }

    if (price < 0 || stock < 0) {
      alert("Price and stock cannot be negative");
      return;
    }

    try {
      const success = await addProducts(products);
      if (success) {
        setProducts({
          name: '',
          description: '',
          price: '',
          imageUrl: '',
          category: '',
          stock: ''
        });
        alert("Product added successfully!");
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        alert("Failed to add product. Please check your admin privileges.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. You may not have admin privileges.");
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Checking authentication...
      </div>
    );
  }

  if (!authUser || authUser.user?.role !== 'admin') return null;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Product (Admin Only)</h2>

      <div className="mb-6 text-sm text-gray-600">
        Logged in as: <span className="font-medium text-gray-800">{authUser.user?.name}</span>{' '}
        <span className="ml-2 inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">
          Admin
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={products.name}
            onChange={(e) => setProducts({ ...products, name: e.target.value })}
            placeholder="Product name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            rows="3"
            value={products.description}
            onChange={(e) => setProducts({ ...products, description: e.target.value })}
            placeholder="Product description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price ($)</label>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
              value={products.price.toString()}
              onChange={(e) =>
                setProducts({ ...products, price: parseFloat(e.target.value) || 0 })
              }
              placeholder="Price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
              value={products.stock.toString()}
              onChange={(e) =>
                setProducts({ ...products, stock: parseInt(e.target.value) || 0 })
              }
              placeholder="Stock"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={products.imageUrl}
            onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={products.category}
            onChange={(e) => setProducts({ ...products, category: e.target.value })}
            placeholder="Electronics, Fashion, etc."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
