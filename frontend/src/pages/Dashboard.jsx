import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authstore } from '../store/authstore';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardAddProduct from '../components/DashboardAddProduct';
import DashboardProductList from '../components/DashboardProductList';
import DashboardAnalytics from '../components/DashboardAnalytics';

const Dashboard = () => {
  const { authUser } = authstore();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('analytics');
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAuthLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!authLoading && (!authUser || authUser.user?.role !== 'admin')) {
      alert('Access denied. Admin privileges required.');
      navigate('/login');
    }
  }, [authUser, authLoading, navigate]);

  const renderContent = () => {
    switch (activeSection) {
      case 'add-product':
        return <DashboardAddProduct />;
      case 'product-list':
        return <DashboardProductList />;
      case 'analytics':
      default:
        return <DashboardAnalytics />;
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <DashboardSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, <span className="font-medium">{authUser.user?.name || 'Admin'}</span>!
          </p>
          <span className="inline-block mt-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold">
            Role: Administrator
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
