import React, { useState } from 'react';
import { Wallet, Banknote } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function Earnings() {
  const [balance, setBalance] = useState(148500);
  const [amount, setAmount] = useState('');
  const [history, setHistory] = useState([
    { id: 'TXN-E7761', amount: 'LKR 45,000.00', date: 'June 18, 2026', method: 'Bank Transfer (BOC)', status: 'Approved' },
    { id: 'TXN-E1280', amount: 'LKR 38,000.00', date: 'May 10, 2026', method: 'Bank Transfer (Sampath)', status: 'Approved' }
  ]);

  const handleWithdrawalRequest = (e) => {
    e.preventDefault();
    const withdrawVal = parseFloat(amount.replace(/[^0-9.]/g, ''));
    if (isNaN(withdrawVal) || withdrawVal <= 0) {
      alert('Please enter a valid positive withdrawal amount.');
      return;
    }
    if (withdrawVal > balance) {
      alert('Insufficient funds in account balance.');
      return;
    }

    setBalance(prev => prev - withdrawVal);
    const newTxn = {
      id: `TXN-E${Math.floor(Math.random() * 90000 + 10000)}`,
      amount: `LKR ${withdrawVal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      method: 'Bank Transfer (BOC)',
      status: 'Pending Approval'
    };
    setHistory([newTxn, ...history]);
    setAmount('');
    alert('Withdrawal request submitted successfully to admin review queue!');
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Instructor Earnings</h1>
        <p className="text-sm text-gray-500 mt-1">Review student payments share, manage payouts and withdrawals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Payout Form */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-[#1e3a5f] to-[#12253f] text-white">
              <span className="text-xs uppercase text-orange-400 font-bold tracking-wider">Account Balance</span>
              <div className="text-3xl font-extrabold mt-2 text-white">LKR {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            </Card>
            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <span className="text-xs uppercase text-white/80 font-bold tracking-wider">Next Payout Cycle</span>
              <div className="text-3xl font-extrabold mt-2 text-white">July 10, 2026</div>
            </Card>
          </div>

          <Card>
            <h3 className="font-bold text-[#1e3a5f] text-sm uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Wallet className="w-5 h-5 text-orange-500" /> Request Payout Withdrawal
            </h3>

            <form onSubmit={handleWithdrawalRequest} className="flex flex-col gap-4">
              <Input
                label="Withdrawal Amount (LKR)"
                placeholder="e.g. 15,000.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Receiving Bank Account</label>
                <select className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 outline-none">
                  <option>Bank of Ceylon - Acc: 8901***7721</option>
                  <option>Sampath Bank - Acc: 0192***9981</option>
                  <option>Commercial Bank - Acc: 8021***2099</option>
                </select>
              </div>

              <Button type="submit" variant="primary" className="py-3 mt-2 font-bold uppercase tracking-wider text-xs">
                <Banknote className="w-4 h-4" /> Request Payout
              </Button>
            </form>
          </Card>
        </div>

        {/* History Log */}
        <div>
          <Card className="h-full flex flex-col gap-6">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Withdrawal Payout Log</h3>
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[360px] pr-1">
              {history.map((h) => (
                <div key={h.id} className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-gray-400">{h.id}</span>
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                      h.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>{h.status}</span>
                  </div>
                  <h4 className="font-bold text-[#1e3a5f] text-sm mt-1">{h.amount}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">{h.date} • {h.method}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
