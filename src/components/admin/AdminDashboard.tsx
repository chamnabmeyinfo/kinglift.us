import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Package, 
  FileText, 
  MessageSquare, 
  Settings, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Save, 
  Search, 
  DollarSign, 
  TrendingUp, 
  LogOut, 
  RefreshCw 
} from 'lucide-react';
import type { Product } from '../../types';

interface AdminStats {
  totalProducts: number;
  inStockProducts: number;
  totalRFQs: number;
  newRFQsCount: number;
  pipelineValue: number;
  totalMessages: number;
  unreadMessagesCount: number;
  totalUsers: number;
}

interface RFQItem {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  zipCode: string;
  deliveryType: string;
  urgency: string;
  items: { modelNumber: string; name: string; quantity: number; msrp: number }[];
  comments?: string;
  status: 'new' | 'in-review' | 'quote-sent' | 'approved' | 'closed';
  internalNotes?: string;
  submittedAt: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: string;
  company?: string;
  phone?: string;
  createdAt: string;
}

import { AIAgentConsole } from './AIAgentConsole';
import { Bot } from 'lucide-react';

export const AdminDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { token, user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'agent' | 'catalog' | 'rfqs' | 'messages' | 'settings' | 'users'>('agent');
  
  // Data states
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [rfqs, setRFQs] = useState<RFQItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [usersList, setUsersList] = useState<UserAccount[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Filters & Modal States
  const [catalogSearch, setCatalogSearch] = useState('');
  const [rfqFilterStatus, setRfqFilterStatus] = useState<string>('all');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const fetchDashboardData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [statsRes, prodRes, rfqRes, msgRes, usersRes, settRes] = await Promise.all([
        fetch('/api/stats', { headers }).then(r => r.ok ? r.json() : null),
        fetch('/api/products').then(r => r.json()),
        fetch('/api/rfqs', { headers }).then(r => r.ok ? r.json() : null),
        fetch('/api/messages', { headers }).then(r => r.ok ? r.json() : null),
        fetch('/api/auth/users', { headers }).then(r => r.ok ? r.json() : null),
        fetch('/api/settings').then(r => r.json())
      ]);

      if (statsRes) setStats(statsRes.stats);
      if (prodRes) setProducts(prodRes.products || []);
      if (rfqRes) setRFQs(rfqRes.rfqs || []);
      if (msgRes) setMessages(msgRes.messages || []);
      if (usersRes) setUsersList(usersRes.users || []);
      if (settRes) setSiteSettings(settRes.settings || null);
    } catch (e) {
      console.error('Failed to load admin data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  // Product actions
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.modelNumber) return;

    try {
      const isEditing = !!editingProduct.id;
      const url = isEditing ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = isEditing ? 'PUT' : 'POST';

      const payload = {
        ...editingProduct,
        pricing: {
          startingMSRP: Number(editingProduct.pricing?.startingMSRP || 2500),
          leadTimeDays: Number(editingProduct.pricing?.leadTimeDays || 3),
          callForCustomQuote: false
        },
        highlightSpecs: {
          capacity: `${editingProduct.specs?.ratedCapacityLbs || 4500} lbs`,
          liftHeight: `${editingProduct.specs?.maxLiftHeightInches || 8} in`,
          power: editingProduct.specs?.powerSource || '48V Lithium-Ion',
          weight: `${editingProduct.specs?.operatingWeightLbs || 400} lbs`
        },
        specs: {
          ...editingProduct.specs,
          ratedCapacityLbs: Number(editingProduct.specs?.ratedCapacityLbs || 4500),
          maxLiftHeightInches: Number(editingProduct.specs?.maxLiftHeightInches || 8),
          operatingWeightLbs: Number(editingProduct.specs?.operatingWeightLbs || 400),
          warrantyMonths: Number(editingProduct.specs?.warrantyMonths || 36)
        },
        images: editingProduct.images || {
          hero: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
          gallery: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80']
        },
        features: editingProduct.features || ['Factory Direct Guarantee', 'Lithium Fast Charging'],
        certifications: editingProduct.certifications || ['OSHA 1910.178 Compliant', 'ANSI B56.1']
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsProductModalOpen(false);
        setEditingProduct(null);
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this machine from the live catalog?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleInStock = async (prod: Product) => {
    try {
      await fetch(`/api/products/${prod.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ inStock: !prod.inStock })
      });
      fetchDashboardData();
    } catch (e) {
      console.error(e);
    }
  };

  // RFQ Status Update
  const handleUpdateRFQStatus = async (id: string, status: RFQItem['status'], notes?: string) => {
    try {
      await fetch(`/api/rfqs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, internalNotes: notes })
      });
      fetchDashboardData();
    } catch (e) {
      console.error(e);
    }
  };

  // Message Status Update
  const handleUpdateMessageStatus = async (id: string, status: ContactMessage['status']) => {
    try {
      await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      fetchDashboardData();
    } catch (e) {
      console.error(e);
    }
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(siteSettings)
      });
      alert('Site configuration successfully updated.');
      fetchDashboardData();
    } catch (e) {
      console.error(e);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
    p.modelNumber.toLowerCase().includes(catalogSearch.toLowerCase())
  );

  const filteredRFQs = rfqs.filter(r => 
    rfqFilterStatus === 'all' ? true : r.status === rfqFilterStatus
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      
      {/* Top Admin Navigation Bar */}
      <header className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-md">
            👑
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight text-white font-industrial">KINGLIFT CONTROL CENTER</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold border border-amber-500/30">
                MASTER ADMIN
              </span>
            </div>
            <div className="text-xs text-slate-400">Signed in as: <strong className="text-slate-200">{user?.name}</strong> ({user?.email})</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            title="Refresh Data"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => { logout(); onClose(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900 text-xs font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* KPI Stats Strip */}
      {stats && (
        <div className="bg-slate-900/60 border-b border-slate-800/80 px-6 py-3 overflow-x-auto">
          <div className="flex items-center gap-6 text-xs min-w-max">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400">Machinery Models:</span>
              <strong className="text-white font-mono">{stats.totalProducts} ({stats.inStockProducts} In-Stock)</strong>
            </div>

            <span className="text-slate-700">|</span>

            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400">Total RFQ Leads:</span>
              <strong className="text-amber-400 font-mono font-bold">{stats.totalRFQs} ({stats.newRFQsCount} New)</strong>
            </div>

            <span className="text-slate-700">|</span>

            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400">Pipeline Value:</span>
              <strong className="text-emerald-400 font-mono font-bold">${stats.pipelineValue.toLocaleString()}</strong>
            </div>

            <span className="text-slate-700">|</span>

            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span className="text-slate-400">Customer Messages:</span>
              <strong className="text-white font-mono">{stats.totalMessages} ({stats.unreadMessagesCount} Unread)</strong>
            </div>

            <span className="text-slate-700">|</span>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-slate-400">Registered Users:</span>
              <strong className="text-white font-mono">{stats.totalUsers}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Main Admin Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-60 bg-slate-900 border-r border-slate-800 p-4 space-y-2 flex-shrink-0">
          {[
            { id: 'agent', label: 'AI Operations Agent', icon: Bot, isSpecial: true },
            { id: 'catalog', label: 'Machinery Catalog', icon: Package, badge: products.length },
            { id: 'rfqs', label: 'RFQ Pipeline', icon: FileText, badge: rfqs.filter(r => r.status === 'new').length },
            { id: 'messages', label: 'Inquiries & Support', icon: MessageSquare, badge: messages.filter(m => m.status === 'unread').length },
            { id: 'settings', label: 'Brand & Site Settings', icon: Settings },
            { id: 'users', label: 'User Accounts', icon: Users, badge: usersList.length }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : (tab as any).isSpecial
                    ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${(tab as any).isSpecial && !isSelected ? 'text-amber-400 animate-pulse' : ''}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isSelected ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-slate-950">
          
          {/* TAB 0: AUTONOMOUS AI AGENT COPILOT */}
          {activeTab === 'agent' && (
            <div className="h-[750px] max-h-[85vh]">
              <AIAgentConsole onDataChanged={fetchDashboardData} />
            </div>
          )}

          {/* TAB 1: MACHINERY CATALOG CMS */}
          {activeTab === 'catalog' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-black text-white font-display uppercase tracking-tight">
                    Machinery Catalog Management
                  </h2>
                  <p className="text-xs text-slate-400">
                    Add, edit, change pricing, and toggle inventory stock status in real-time.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search catalog models..."
                      value={catalogSearch}
                      onChange={(e) => setCatalogSearch(e.target.value)}
                      className="w-full bg-slate-900 text-xs text-slate-200 pl-9 pr-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setEditingProduct({
                        category: 'electric-pallet-trucks',
                        pricing: { startingMSRP: 2950, leadTimeDays: 3, callForCustomQuote: false },
                        specs: {
                          ratedCapacityLbs: 4500,
                          ratedCapacityKg: 2041,
                          maxLiftHeightInches: 8,
                          maxLiftHeightMm: 200,
                          loweredHeightInches: 3.2,
                          turningRadiusInches: 54,
                          powerSource: '48V Lithium-Ion',
                          operatingWeightLbs: 400,
                          wheelType: 'Heavy Polyurethane',
                          warrantyMonths: 36
                        },
                        inStock: true,
                        featured: false
                      });
                      setIsProductModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Machine</span>
                  </button>
                </div>
              </div>

              {/* Machinery Table */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Machine Details</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Capacity / Height</th>
                      <th className="py-3 px-4">Starting MSRP</th>
                      <th className="py-3 px-4 text-center">Stock Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-900/40 transition-colors">
                        
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.images?.hero || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'}
                              alt=""
                              className="w-12 h-12 rounded-lg object-cover bg-slate-950 border border-slate-800 flex-shrink-0"
                            />
                            <div>
                              <div className="font-mono font-bold text-amber-400 text-xs">{prod.modelNumber}</div>
                              <div className="font-semibold text-white truncate max-w-xs">{prod.name}</div>
                              <div className="text-[10px] text-slate-400">{prod.series}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 capitalize text-slate-400">
                          {prod.category.replace('-', ' ')}
                        </td>

                        <td className="py-3 px-4 font-mono">
                          <div>{prod.highlightSpecs?.capacity || `${prod.specs?.ratedCapacityLbs} lbs`}</div>
                          <div className="text-[10px] text-slate-500">{prod.highlightSpecs?.liftHeight || `${prod.specs?.maxLiftHeightInches} in`}</div>
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-amber-300 text-sm">
                          ${prod.pricing?.startingMSRP?.toLocaleString()}
                        </td>

                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleToggleInStock(prod)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                              prod.inStock
                                ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-400'
                                : 'bg-slate-800 border border-slate-700 text-slate-400'
                            }`}
                          >
                            {prod.inStock ? '✓ In Stock' : 'Out of Stock'}
                          </button>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingProduct(prod);
                                setIsProductModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                              title="Edit product"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900 border border-rose-500/30 text-rose-400"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 2: RFQ PIPELINE */}
          {activeTab === 'rfqs' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-black text-white font-display uppercase tracking-tight">
                    RFQ & Customer Quotes Pipeline
                  </h2>
                  <p className="text-xs text-slate-400">
                    Track quote submissions, assign sales engineers, and update fulfillment stage.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Status:</span>
                  <select
                    value={rfqFilterStatus}
                    onChange={(e) => setRfqFilterStatus(e.target.value)}
                    className="bg-slate-900 text-xs text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none"
                  >
                    <option value="all">All Stages ({rfqs.length})</option>
                    <option value="new">New Inquiries</option>
                    <option value="in-review">Under Engineering Review</option>
                    <option value="quote-sent">Quote Sent to Buyer</option>
                    <option value="approved">Approved & PO Issued</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              {filteredRFQs.length === 0 ? (
                <div className="p-12 text-center text-xs text-slate-400 bg-slate-900/50 rounded-xl border border-slate-800">
                  No RFQ submissions found in this status category.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRFQs.map((rfq) => {
                    const totalValue = rfq.items.reduce((s, i) => s + (i.msrp * i.quantity), 0);
                    return (
                      <div key={rfq.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                        
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-amber-400 text-sm">{rfq.id}</span>
                            <span className="text-xs text-slate-400">• {new Date(rfq.submittedAt).toLocaleString()}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-400">Pipeline Stage:</span>
                            <select
                              value={rfq.status}
                              onChange={(e) => handleUpdateRFQStatus(rfq.id, e.target.value as any, rfq.internalNotes)}
                              className="bg-slate-950 text-xs font-bold text-amber-400 px-3 py-1 rounded-lg border border-slate-700"
                            >
                              <option value="new">🔴 New Lead</option>
                              <option value="in-review">🟡 Engineering Review</option>
                              <option value="quote-sent">🔵 Formal Quote Sent</option>
                              <option value="approved">🟢 Purchase Approved</option>
                              <option value="closed">⚪ Closed</option>
                            </select>
                          </div>
                        </div>

                        {/* Customer & Destination details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                            <div className="text-[10px] text-slate-400 uppercase font-semibold">Buyer Profile</div>
                            <div className="font-bold text-white">{rfq.fullName}</div>
                            <div className="text-slate-300">{rfq.companyName}</div>
                            <div className="text-amber-400">{rfq.email} • {rfq.phone}</div>
                          </div>

                          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                            <div className="text-[10px] text-slate-400 uppercase font-semibold">Freight & Delivery Logistics</div>
                            <div className="text-white">ZIP Code: <strong className="font-mono text-amber-400">{rfq.zipCode}</strong></div>
                            <div className="text-slate-300 capitalize">{rfq.deliveryType.replace('-', ' ')}</div>
                            <div className="text-slate-400">Urgency: <strong className="text-slate-200">{rfq.urgency}</strong></div>
                          </div>

                          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                            <div className="text-[10px] text-slate-400 uppercase font-semibold">Requested Equipment</div>
                            <div className="space-y-0.5 max-h-24 overflow-y-auto">
                              {rfq.items.map((it, idx) => (
                                <div key={idx} className="flex justify-between text-slate-300">
                                  <span>{it.quantity}x {it.modelNumber}</span>
                                  <span className="font-mono text-amber-400">${(it.msrp * it.quantity).toLocaleString()}</span>
                                </div>
                              ))}
                            </div>
                            <div className="pt-1 border-t border-slate-800 flex justify-between font-bold">
                              <span>Estimated Total:</span>
                              <span className="text-emerald-400 font-mono">${totalValue.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        {rfq.comments && (
                          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                            <span className="font-bold text-amber-400">Customer Inquiries / Notes: </span>
                            <span className="text-slate-300">{rfq.comments}</span>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

          {/* TAB 3: CONTACT MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <h2 className="text-xl font-black text-white font-display uppercase tracking-tight">
                  Inquiries & Technical Support Messages
                </h2>
                <p className="text-xs text-slate-400">
                  Customer messages transmitted from the public website contact form.
                </p>
              </div>

              {messages.length === 0 ? (
                <div className="p-12 text-center text-xs text-slate-400 bg-slate-900/50 rounded-xl border border-slate-800">
                  No contact messages received yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs">{msg.name}</span>
                          <span className="text-xs text-amber-400">({msg.email})</span>
                          <span className="text-[10px] text-slate-500">• {new Date(msg.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-slate-300">{msg.message}</p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <a
                          href={`mailto:${msg.email}?subject=KingLift Factory Inquiry Response`}
                          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                        >
                          Reply by Email
                        </a>

                        <button
                          onClick={() => handleUpdateMessageStatus(msg.id, msg.status === 'read' ? 'unread' : 'read')}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs"
                        >
                          {msg.status === 'read' ? 'Mark Unread' : 'Mark Read'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SITE & BRAND SETTINGS */}
          {activeTab === 'settings' && siteSettings && (
            <div className="space-y-6 max-w-2xl">
              <div className="pb-4 border-b border-slate-800">
                <h2 className="text-xl font-black text-white font-display uppercase tracking-tight">
                  Site & Brand Configuration
                </h2>
                <p className="text-xs text-slate-400">
                  Control the public website phone numbers, top announcement banner, and warranty policy text.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">Top Announcement Banner Text</label>
                  <input
                    type="text"
                    value={siteSettings.announcementText}
                    onChange={(e) => setSiteSettings({ ...siteSettings, announcementText: e.target.value })}
                    className="w-full bg-slate-900 text-slate-200 p-2.5 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase">Toll-Free Phone</label>
                    <input
                      type="text"
                      value={siteSettings.phone}
                      onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                      className="w-full bg-slate-900 text-slate-200 p-2.5 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase">Sales Email</label>
                    <input
                      type="email"
                      value={siteSettings.email}
                      onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                      className="w-full bg-slate-900 text-slate-200 p-2.5 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">Warranty Standard Guarantee</label>
                  <input
                    type="text"
                    value={siteSettings.warrantyStandard}
                    onChange={(e) => setSiteSettings({ ...siteSettings, warrantyStandard: e.target.value })}
                    className="w-full bg-slate-900 text-slate-200 p-2.5 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wide shadow-lg shadow-amber-500/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Site Configuration</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: USERS MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <h2 className="text-xl font-black text-white font-display uppercase tracking-tight">
                  User Accounts & Access Control
                </h2>
                <p className="text-xs text-slate-400">
                  Registered administrator accounts, sales engineering reps, and commercial fleet buyers.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">User Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Company</th>
                      <th className="py-3 px-4">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {usersList.map((usr) => (
                      <tr key={usr.id} className="hover:bg-slate-900/40">
                        <td className="py-3 px-4 font-bold text-white">{usr.name}</td>
                        <td className="py-3 px-4 font-mono text-amber-400">{usr.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            usr.role === 'admin'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : usr.role === 'sales'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {usr.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400">{usr.company || '—'}</td>
                        <td className="py-3 px-4 text-slate-500">{new Date(usr.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div 
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase font-display">
                {editingProduct.id ? 'Edit Machine Specifications' : 'Add New Machine to Live Catalog'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">Model Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. KL-EP45Li"
                    value={editingProduct.modelNumber || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, modelNumber: e.target.value })}
                    className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">Category *</label>
                  <select
                    value={editingProduct.category || 'electric-pallet-trucks'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700"
                  >
                    <option value="electric-pallet-trucks">Electric Pallet Trucks</option>
                    <option value="scissor-lifts">Scissor Lifts</option>
                    <option value="hydraulic-stackers">Hydraulic Walkie Stackers</option>
                    <option value="tail-lifts">Commercial Tail Lifts</option>
                    <option value="dock-equipment">Dock Equipment</option>
                    <option value="shop-cranes">Floor Cranes</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 uppercase">Full Machine Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KingLift Pro-Lithium 4,500 lbs Pallet Jack"
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">Starting MSRP ($)</label>
                  <input
                    type="number"
                    value={editingProduct.pricing?.startingMSRP || 2850}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      pricing: { ...(editingProduct.pricing as any), startingMSRP: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">Load Capacity (lbs)</label>
                  <input
                    type="number"
                    value={editingProduct.specs?.ratedCapacityLbs || 4500}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      specs: { ...(editingProduct.specs as any), ratedCapacityLbs: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">Max Lift Height (in)</label>
                  <input
                    type="number"
                    value={editingProduct.specs?.maxLiftHeightInches || 8}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      specs: { ...(editingProduct.specs as any), maxLiftHeightInches: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 uppercase">Tagline Summary</label>
                <input
                  type="text"
                  placeholder="Short one-line machine description..."
                  value={editingProduct.tagline || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 uppercase">Hero Image URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={editingProduct.images?.hero || ''}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    images: { hero: e.target.value, gallery: [e.target.value] }
                  })}
                  className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Save to Catalog
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
