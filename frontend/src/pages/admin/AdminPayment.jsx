import React, { useState } from 'react';
import { CreditCard, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, Search, Download } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function AdminPayment() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const summary = [
    { label: 'Total Revenue', value: 'LKR 4,500,000.00', change: '+12.5% this month', icon: ArrowUpRight, color: 'text-green-600 bg-green-50' },
    { label: 'Outstanding Invoices', value: 'LKR 75,000.00', change: '5 invoices pending', icon: Clock, color: 'text-orange-500 bg-orange-50' },
    { label: 'Net Earnings', value: 'LKR 3,850,000.00', change: 'After instructor payouts', icon: CheckCircle, color: 'text-[#1e3a5f] bg-blue-50' },
    { label: 'Instructor Payouts', value: 'LKR 650,000.00', change: 'LKR 50,000 pending', icon: ArrowDownLeft, color: 'text-red-600 bg-red-50' }
  ];

  const transactions = [
    { id: 'TXN-9021', student: 'Michael Fernando', course: 'Advanced UI/UX Design', date: '2026.05.06', amount: 'LKR 7,500.00', method: 'Card Payment', status: 'Completed' },
    { id: 'TXN-9022', student: 'Kumara Perera', course: 'Web Systems Architecture', date: '2026.05.10', amount: 'LKR 9,500.00', method: 'Bank Transfer', status: 'Completed' },
    { id: 'TXN-9023', student: 'Samana Kumari', course: 'Quantum Physics for Beginners', date: '2026.05.12', amount: 'LKR 6,500.00', method: 'Card Payment', status: 'Processing' },
    { id: 'TXN-9024', student: 'Saman Somapala', course: 'Strategic Enterprise Management', date: '2026.05.15', amount: 'LKR 8,000.00', method: 'Mobile Money', status: 'Failed' },
    { id: 'TXN-9025', student: 'Latha Silva', course: 'Interpersonal Skills (V1.0)', date: '2026.05.18', amount: 'LKR 5,500.00', method: 'Card Payment', status: 'Completed' }
  ];

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.student.toLowerCase().includes(search.toLowerCase()) || 
                          t.course.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#1e3a5f]">Payment Overview</h1>
          <p className="text-xs text-gray-400">Review platform revenues, outstanding student invoices, and instructor payouts.</p>
        </div>
        <Button variant="primary" className="py-2.5 px-4 text-xs font-bold uppercase whitespace-nowrap">
          <Download className="w-4 h-4" /> Export Report
        </Button>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {summary.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Card key={idx} className="border border-gray-200 p-5 flex items-center gap-4">
              <div className={`p-3 rounded-lg shrink-0 ${s.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[9px] text-gray-400 font-bold uppercase block">{s.label}</span>
                <h3 className="text-sm md:text-base font-extrabold text-[#1e3a5f] mt-0.5">{s.value}</h3>
                <span className="text-[9px] text-gray-450 mt-1 block">{s.change}</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <Card className="border border-gray-200 shadow-sm p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by student or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-xs outline-none bg-white focus:border-orange-500"
          />
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {['All', 'Completed', 'Processing', 'Failed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                statusFilter === st 
                  ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]' 
                  : 'bg-white text-gray-655 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </Card>

      {/* Transaction Records Table */}
      <Card className="border border-gray-200/80 p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider">Transaction History</h3>
          <span className="text-[10px] text-gray-400">Showing {filtered.length} entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 font-bold uppercase">
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Course Pathway</th>
                <th className="py-3 px-4">Payment Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filtered.map((t, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">{t.id}</td>
                  <td className="py-3.5 px-4 font-bold text-gray-800">{t.student}</td>
                  <td className="py-3.5 px-4 text-gray-600">{t.course}</td>
                  <td className="py-3.5 px-4 text-gray-400 font-mono">{t.date}</td>
                  <td className="py-3.5 px-4 font-bold text-gray-900">{t.amount}</td>
                  <td className="py-3.5 px-4 text-gray-400">{t.method}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded border uppercase ${
                      t.status === 'Completed'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : t.status === 'Processing'
                          ? 'bg-orange-50 text-orange-700 border-orange-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
