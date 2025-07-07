import React, { useEffect, useState } from 'react';
import { productStore } from '../store/productStore.js';
import { FaList, FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DashboardProductList = () => {
  const { products, getAllProducts, deleteProduct } = productStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      const success = await deleteProduct(id);
      alert(success ? 'Product deleted successfully' : 'Failed to delete product');
    }
  };

  const handleView = (id) => {
    window.open(`/products/${id}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <FaList className="text-blue-600 text-2xl" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
          <p className="text-sm text-gray-500">Manage your product inventory</p>
        </div>
      </div>

      {/* Search & Count */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or category..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-600">
          {filteredProducts.length} product{filteredProducts.length !== 1 && 's'} found
        </div>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 text-gray-500">
          <FaList className="text-4xl mb-4" />
          <h3 className="text-xl font-semibold">No products found</h3>
          <p className="text-sm">Try adjusting your search or add products to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => handleView(product._id)}
                    className="bg-white p-2 rounded-full shadow hover:bg-blue-100"
                    title="View"
                  >
                    <FaEye className="text-blue-600" />
                  </button>
                  <Link to={`/products/update/${product._id}`}>
                    <button
                      className="bg-white p-2 rounded-full shadow hover:bg-yellow-100"
                      title="Edit"
                    >
                      <FaEdit className="text-yellow-600" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id, product.name)}
                    className="bg-white p-2 rounded-full shadow hover:bg-red-100"
                    title="Delete"
                  >
                    <FaTrash className="text-red-600" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-green-600 font-semibold">${product.price}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock < 10
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Stock: {product.stock}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardProductList;
