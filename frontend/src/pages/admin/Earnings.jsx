import React, { useState } from "react";
import InstructorNavbar from "../../components/instructor/InstructorNavbar";
import InstructorSidebar from "../../components/instructor/InstructorSidebar";
import Footer from "../../components/Footer";
import "./Earnings.css";

const EARNINGS_HISTORY = [
  { id: "PAY-0091", amount: "LKR 45,000.00", date: "June 25, 2026", status: "Transferred", method: "Bank Transfer (Sampath Bank)" },
  { id: "PAY-0082", amount: "LKR 38,000.00", date: "May 28, 2026", status: "Transferred", method: "Bank Transfer (Sampath Bank)" }
];

export default function Earnings() {
  const [balance, setBalance] = useState("LKR 52,400.00");
  const [amountInput, setAmountInput] = useState("");

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!amountInput.trim()) return;
    alert(`Withdrawal request of ${amountInput} submitted successfully for review.`);
    setAmountInput("");
  };

  return (
    <div className="admin-earnings-page">
      <InstructorNavbar activeLink="Reports" />
      <div className="admin-body">
        <InstructorSidebar activeMenu="Earnings (LKR)" />
        <main className="admin-main earnings-main">
          <div className="earnings-header">
            <h1>Instructor Earnings</h1>
            <p>Monitor your performance income, payouts history, and manage withdrawals.</p>
          </div>

          <div className="earnings-summary-row">
            <div className="earning-box balance-box">
              <span>Current Account Balance</span>
              <h2>{balance}</h2>
            </div>
            <div className="earning-box promo-box">
              <span>Next Payout Cycle</span>
              <h4>July 10, 2026</h4>
            </div>
          </div>

          <div className="earnings-grid">
            {/* Request Withdrawal Form */}
            <div className="earnings-card">
              <h2>Request Payout</h2>
              <form onSubmit={handleWithdraw}>
                <div className="earnings-form-group">
                  <label>Withdrawal Amount (LKR)</label>
                  <input
                    type="text"
                    placeholder="e.g. 15,000.00"
                    value={amountInput}
                    onChange={e => setAmountInput(e.target.value)}
                  />
                </div>
                <div className="earnings-form-group">
                  <label>Receiving Bank Account</label>
                  <select defaultValue="sampath">
                    <option value="sampath">Sampath Bank - Acc: 0102***9281</option>
                    <option value="commercial">Commercial Bank - Acc: 8021***2099</option>
                  </select>
                </div>
                <button type="submit" className="withdraw-btn">Request Payout</button>
              </form>
            </div>

            {/* Payout Logs */}
            <div className="earnings-card">
              <h2>Payout History Logs</h2>
              <div className="table-responsive-wrapper">
                <table className="payouts-table">
                  <thead>
                    <tr>
                      <th>Reference ID</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Method</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EARNINGS_HISTORY.map(log => (
                      <tr key={log.id}>
                        <td>{log.id}</td>
                        <td><strong>{log.amount}</strong></td>
                        <td>{log.date}</td>
                        <td>{log.method}</td>
                        <td><span className="badge-success">{log.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
