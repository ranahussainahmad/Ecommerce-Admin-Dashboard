import React, { useEffect, useState } from 'react';
import { productStore } from '../store/productStore.js';
import {
  FaChartBar,
  FaBoxOpen,
  FaDollarSign,
  FaExclamationTriangle,
  FaChartLine,
} from 'react-icons/fa';

const DashboardAnalytics = () => {
  const { products, getAllProducts } = productStore();
  const [analytics, setAnalytics] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStockItems: 0,
    categories: {},
    averagePrice: 0,
  });

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const totalProducts = products.length;
      const totalValue = products.reduce(
        (sum, p) => sum + p.price * p.stock,
        0
      );
      const lowStockItems = products.filter(p => p.stock < 10).length;
      const averagePrice =
        products.reduce((sum, p) => sum + p.price, 0) / totalProducts;
      const categories = products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      }, {});

      setAnalytics({
        totalProducts,
        totalValue,
        lowStockItems,
        categories,
        averagePrice,
      });
    }
  }, [products]);

  const topCategories = Object.entries(analytics.categories)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const lowStockProducts = products.filter(p => p.stock < 10);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <FaChartBar className="text-blue-600 text-2xl" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
          <p className="text-sm text-gray-500">Overview of your product inventory</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
          <FaBoxOpen className="text-blue-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold">{analytics.totalProducts}</h3>
            <p className="text-sm text-gray-500">Total Products</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
          <FaDollarSign className="text-green-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold">
              ${analytics.totalValue.toFixed(2)}
            </h3>
            <p className="text-sm text-gray-500">Inventory Value</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
          <FaExclamationTriangle className="text-yellow-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold">{analytics.lowStockItems}</h3>
            <p className="text-sm text-gray-500">Low Stock</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
          <FaChartLine className="text-purple-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold">
              ${analytics.averagePrice.toFixed(2)}
            </h3>
            <p className="text-sm text-gray-500">Avg. Price</p>
          </div>
        </div>
      </div>

      {/* Analytics Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Categories */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Top Categories</h3>
          {topCategories.length > 0 ? (
            <div className="space-y-4">
              {topCategories.map(([category, count]) => (
                <div key={category}>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{category}</span>
                    <span>{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                      className="h-2 bg-blue-500 rounded"
                      style={{
                        width: `${(count / analytics.totalProducts) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No categories found</p>
          )}
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Low Stock Alert</h3>
          {lowStockProducts.length === 0 ? (
            <div className="text-sm text-green-600">
              ✅ All products are well stocked!
            </div>
          ) : (
            <div className="space-y-4">
              {lowStockProducts.map(product => (
                <div
                  key={product._id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 rounded object-cover border"
                    />
                    <div>
                      <h4 className="font-medium text-gray-800">{product.name}</h4>
                      <p className="text-sm text-gray-500">
                        Stock: {product.stock} units
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-1 rounded">
                    {product.stock}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
