import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productStore } from '../store/productStore.js';
import { authstore } from '../store/authstore.js';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = authstore();
  const { getProductById, updateProduct } = productStore();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stock: ''
  });

  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
        } else {
          alert("Product not found");
          navigate('/products');
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Failed to load product");
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && authUser?.user?.role === 'admin') {
      fetchProduct();
    }
  }, [id, authUser, authLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authUser || authUser.user?.role !== 'admin') {
      alert('Access denied. Admin privileges required.');
      navigate('/login');
      return;
    }

    try {
      const success = await updateProduct(id, product);
      if (success) {
        alert("✅ Product updated successfully!");
        navigate('/dashboard');
      } else {
        alert("❌ Update failed! Please try again.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("❌ Update failed! Please try again.");
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Checking authentication...
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading product...
      </div>
    );
  }

  if (!authUser || authUser.user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Update Product (Admin Only)</h2>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          You are logged in as: <strong>{authUser.user?.name}</strong>
        </p>
        <span className="inline-block mt-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold">
          Role: Admin
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              step="0.01"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
