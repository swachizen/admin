import React from 'react';
import { ShoppingCart, DollarSign, Users, Package, ArrowUpRight } from 'lucide-react';

const ECommerceDashboard = () => {
  const stats = [
    { label: 'Total Revenue', value: '$45,231.89', icon: DollarSign, trend: '+20.1%' },
    { label: 'Sales', value: '+2,350', icon: ShoppingCart, trend: '+18.5%' },
    { label: 'Active Customers', value: '12,234', icon: Users, trend: '+12.3%' },
    { label: 'Active Products', value: '573', icon: Package, trend: '+4.2%' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Store Overview</h1>
        <p className="text-gray-500">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <stat.icon size={20} />
              </div>
              <span className="text-green-500 text-sm font-medium flex items-center">
                {stat.trend} <ArrowUpRight size={14} className="ml-1" />
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm uppercase">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">#ORD-00{i}</td>
                  <td className="px-6 py-4 text-gray-600">Customer Name</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Shipped</span>
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">$124.00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ECommerceDashboard;

