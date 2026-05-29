import React from 'react';
import { Layout, Zap, CreditCard, Activity, BarChart3, Settings } from 'lucide-react';

const SaasDashboard = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col p-6">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
            <Zap size={20} fill="currentColor" />
          </div>
          <span className="font-bold text-xl tracking-tight">SaaSify</span>
        </div>
        
        <nav className="space-y-1">
          {['Dashboard', 'Analytics', 'Billing', 'Team', 'Settings'].map((item) => (
            <button key={item} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${item === 'Dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
              {item === 'Dashboard' && <Layout size={18} />}
              {item === 'Analytics' && <BarChart3 size={18} />}
              {item === 'Billing' && <CreditCard size={18} />}
              {item === 'Settings' && <Settings size={18} />}
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Workspace</h1>
            <p className="text-slate-500">Monitor your app performance and usage.</p>
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-shadow shadow-md">
            Invite Team
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">API Usage</h3>
              <select className="bg-slate-50 border border-slate-200 rounded-md text-xs p-1">
                <option>Last 7 days</option>
              </select>
            </div>
            <div className="h-64 bg-slate-50 rounded-xl flex items-end justify-between p-4 gap-2">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <div key={i} className="bg-indigo-200 w-full rounded-t-sm hover:bg-indigo-500 transition-colors" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>

          {/* Sidebar Cards */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">Current Plan</h3>
              <p className="text-2xl font-bold mb-1">Pro Plan</p>
              <p className="text-slate-400 text-sm mb-6">$49.00 / month</p>
              <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
                <div className="bg-indigo-500 h-2 rounded-full w-3/4"></div>
              </div>
              <p className="text-xs text-slate-400">7,500 / 10,000 requests used</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <Activity size={20} />
                </div>
                <h3 className="font-bold">System Status</h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                All systems operational
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SaasDashboard;

