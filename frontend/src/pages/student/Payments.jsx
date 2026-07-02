import React, { useState } from 'react';
import { CreditCard, History, Search } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function Payments() {
  const [invoices, setInvoices] = useState([
    { id: 'OUT001', desc: 'Advanced UI/UX Design', dueDate: '2026.05.06', amount: 'Rs.7500.00', status: 'InProgress' },
    { id: 'OUT001', desc: 'Advanced UI/UX Design', dueDate: '2026.05.06', amount: 'Rs.7500.00', status: 'InProgress' },
    { id: 'OUT001', desc: 'Advanced UI/UX Design', dueDate: '2026.05.06', amount: 'Rs.7500.00', status: 'InProgress' },
    { id: 'OUT001', desc: 'Advanced UI/UX Design', dueDate: '2026.05.06', amount: 'Rs.7500.00', status: 'InProgress' },
    { id: 'OUT001', desc: 'Advanced UI/UX Design', dueDate: '2026.05.06', amount: 'Rs.7500.00', status: 'InProgress' }
  ]);

  const [history, setHistory] = useState([
    { id: 'TR001', desc: 'Advanced UI/UX Design', payDate: '2026.05.06', amount: 'Rs.7500.00', status: 'Completed' },
    { id: 'TR001', desc: 'Advanced UI/UX Design', payDate: '2026.05.06', amount: 'Rs.7500.00', status: 'Completed' },
    { id: 'TR001', desc: 'Advanced UI/UX Design', payDate: '2026.05.06', amount: 'Rs.7500.00', status: 'Completed' },
    { id: 'TR001', desc: 'Advanced UI/UX Design', payDate: '2026.05.06', amount: 'Rs.7500.00', status: 'Completed' },
    { id: 'TR001', desc: 'Advanced UI/UX Design', payDate: '2026.05.06', amount: 'Rs.7500.00', status: 'Completed' },
    { id: 'TR001', desc: 'Advanced UI/UX Design', payDate: '2026.05.06', amount: 'Rs.7500.00', status: 'Completed' }
  ]);

  const [paying, setPaying] = useState(null);

  const handlePay = (index) => {
    setPaying(index);
    setTimeout(() => {
      const targetInvoice = invoices[index];
      // Remove from unpaid
      setInvoices(prev => prev.filter((_, i) => i !== index));
      // Add to history
      const newPaid = {
        id: 'TR001',
        desc: targetInvoice.desc,
        payDate: new Date().toLocaleDateString('en-CA').replace(/-/g, '.'),
        amount: targetInvoice.amount,
        status: 'Completed'
      };
      setHistory(prev => [newPaid, ...prev]);
      setPaying(null);
      alert('Tuition fee payment processed successfully!');
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen">
      {/* Top Header Row with Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#1e3a5f]">Payment Overview</h1>
          <p className="text-xs text-gray-400">Review your payment history and transaction details.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-xs outline-none bg-white focus:border-orange-500"
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="flex items-center gap-4 border border-gray-200 p-5 rounded-xl">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Paid</p>
            <h3 className="text-lg font-extrabold text-[#1e3a5f] mt-0.5">Rs.45000.00</h3>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border border-gray-200 p-5 rounded-xl">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Outstanding</p>
            <h3 className="text-lg font-extrabold text-[#1e3a5f] mt-0.5">Rs.50000.00</h3>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border border-gray-200 p-5 rounded-xl">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg shrink-0">
            <History className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Last Payment</p>
            <h3 className="text-lg font-extrabold text-[#1e3a5f] mt-0.5">2026.05.17</h3>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border border-gray-200 p-5 rounded-xl">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Transactions</p>
            <h3 className="text-lg font-extrabold text-[#1e3a5f] mt-0.5">07</h3>
          </div>
        </Card>
      </div>

      {/* Outstanding Invoices */}
      <Card className="border border-gray-200/80">
        <h3 className="font-bold text-[#1e3a5f] text-sm uppercase tracking-wider mb-5">Outstanding Invoices</h3>
        {invoices.length === 0 ? (
          <div className="text-center py-8 text-xs text-gray-400">All settled! No outstanding invoices.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 font-bold uppercase">
                  <th className="py-3 px-4">Outstanding ID</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Due Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((inv, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="py-3.5 px-4 font-mono text-gray-500">{inv.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-gray-800">{inv.desc}</td>
                    <td className="py-3.5 px-4 text-gray-400">{inv.dueDate}</td>
                    <td className="py-3.5 px-4 font-bold text-[#1e3a5f]">{inv.amount}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold bg-green-50 text-green-700 rounded-full border border-green-200">
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Button 
                        onClick={() => handlePay(idx)}
                        disabled={paying === idx}
                        className="py-1 px-4 text-[10px] uppercase font-bold"
                      >
                        {paying === idx ? 'Processing...' : 'Pay'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Payment History */}
      <Card className="border border-gray-200/80">
        <h3 className="font-bold text-[#1e3a5f] text-sm uppercase tracking-wider mb-5">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 font-bold uppercase">
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Payment Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map((h, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-mono text-gray-500">{h.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-gray-800">{h.desc}</td>
                  <td className="py-3.5 px-4 text-gray-400">{h.payDate}</td>
                  <td className="py-3.5 px-4 font-bold text-gray-900">{h.amount}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                      {h.status}
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
