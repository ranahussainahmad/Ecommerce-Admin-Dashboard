import React from 'react';
import { FaPlus, FaList, FaChartBar, FaTachometerAlt } from 'react-icons/fa';

const DashboardSidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <FaChartBar />
    },
    {
      id: 'add-product',
      label: 'Add Product',
      icon: <FaPlus />
    },
    {
      id: 'product-list',
      label: 'Product List',
      icon: <FaList />
    }
  ];

  return (
    <aside className="h-full w-64 bg-white border-r border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 p-6 border-b border-gray-200">
        <FaTachometerAlt className="text-blue-600 text-xl" />
        <h3 className="text-lg font-semibold text-gray-800">Dashboard</h3>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col p-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition 
              ${
                activeSection === item.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
