import React, { useState } from 'react';
import { productStore } from '../store/productStore.js';
import { FaPlus, FaImage, FaDollarSign, FaBoxes } from 'react-icons/fa';

const DashboardAddProduct = () => {
  const [products, setProducts] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stock: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const { addProducts } = productStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, imageUrl, category, stock } = products;

    if (!name || !description || !price || !imageUrl || !category || !stock) {
      alert("Please fill all fields");
      return;
    }

    if (price < 0 || stock < 0) {
      alert("Price and stock cannot be negative");
      return;
    }

    setIsLoading(true);
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
        alert("✅ Product added successfully!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-6 flex items-center gap-3">
        <FaPlus className="text-blue-600 text-2xl" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
          <p className="text-sm text-gray-500">
            Fill in the details below to add a new product to your inventory.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={products.name}
              onChange={(e) => setProducts({ ...products, name: e.target.value })}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              placeholder="e.g., Electronics, Fashion"
              value={products.category}
              onChange={(e) => setProducts({ ...products, category: e.target.value })}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FaDollarSign /> Price ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={products.price}
              onChange={(e) => setProducts({ ...products, price: parseFloat(e.target.value) || '' })}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FaBoxes /> Stock Quantity
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={products.stock}
              onChange={(e) => setProducts({ ...products, stock: parseInt(e.target.value) || '' })}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Describe your product..."
            value={products.description}
            onChange={(e) => setProducts({ ...products, description: e.target.value })}
            rows="4"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FaImage /> Image URL
          </label>
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={products.imageUrl}
            onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          {products.imageUrl && (
            <div className="mt-3">
              <img
                src={products.imageUrl}
                alt="Preview"
                className="w-full max-w-sm rounded shadow border"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Adding Product...
            </>
          ) : (
            <>
              <FaPlus /> Add Product
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default DashboardAddProduct;
