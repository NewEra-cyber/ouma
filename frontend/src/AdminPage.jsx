import React, { useState, useEffect } from 'react';
import { Lock, LogOut, Filter, Phone, Mail, MapPin } from 'lucide-react';

const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');

  const fetchLeads = async (pwd) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/leads`, {
        headers: { 'x-admin-password': pwd },
      });
      if (!res.ok) throw new Error('Invalid password');
      const data = await res.json();
      setLeads(data);
      setAuthed(true);
      sessionStorage.setItem('admin_pwd', pwd);
    } catch (err) {
      setError('Wrong password. Try again.');
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_pwd');
    if (saved) fetchLeads(saved);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    fetchLeads(password);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_pwd');
    setAuthed(false);
    setPassword('');
    setLeads([]);
  };

  const filteredLeads = filter === 'All' ? leads : leads.filter(l => l.projectType === filter);
  const projectTypes = ['All', ...new Set(leads.map(l => l.projectType).filter(Boolean))];

  // ---- Login screen ----
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center mb-6">
            <Lock className="text-brandNavy mx-auto mb-3" size={40} />
            <h1 className="text-2xl font-bold text-gray-800">Admin Access</h1>
            <p className="text-gray-500 text-sm">Enter password to view leads</p>
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brandNavy mb-4"
            required
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brandNavy text-white py-3 rounded-lg font-bold hover:bg-brandNavyDark transition"
          >
            {loading ? 'Checking...' : 'Enter'}
          </button>
        </form>
      </div>
    );
  }

  // ---- Dashboard ----
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Leads Dashboard</h1>
            <p className="text-gray-500 text-sm">{leads.length} total submissions</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="flex items-center gap-1 text-sm text-gray-500 mr-2"><Filter size={14} /> Filter:</span>
          {projectTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
                filter === type
                  ? 'bg-brandNavy text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-brandNavy'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {filteredLeads.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No leads yet. Submit one from the website to see it here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-3 font-bold text-gray-700">Name</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-700">Contact</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-700">Service</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-700">Budget</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-700">Timeline</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-blue-50/30 transition">
                      <td className="px-6 py-4 font-semibold text-gray-800">{lead.name}</td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex items-center gap-1 text-xs"><Mail size={12} /> {lead.email}</div>
                        {lead.phone && <div className="flex items-center gap-1 text-xs mt-1"><Phone size={12} /> {lead.phone}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-blue-50 text-brandNavy text-xs font-semibold px-2 py-1 rounded-full">
                          {lead.projectType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{lead.budget}</td>
                      <td className="px-6 py-4 text-gray-600">{lead.timeline}</td>
                      <td className="px-6 py-4 text-gray-500 text-xs">
                        {new Date(lead.createdAt).toLocaleDateString('en-KE', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Message display below (expandable) — simple list */}
        {filteredLeads.some(l => l.message) && (
          <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
            <h2 className="font-bold text-gray-800 mb-4">Additional Notes</h2>
            <div className="space-y-3">
              {filteredLeads.filter(l => l.message).map((lead, i) => (
                <div key={i} className="border-l-4 border-brandNavy pl-4 py-2">
                  <p className="text-sm font-semibold text-gray-700">{lead.name}</p>
                  <p className="text-sm text-gray-500">{lead.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
