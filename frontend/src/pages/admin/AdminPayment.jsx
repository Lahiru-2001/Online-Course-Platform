import { useState } from "react";
import "./AdminPayment.css";
import {
  FiBell, FiSearch, FiGrid, FiBookOpen, FiCreditCard,
  FiAward, FiUsers, FiDollarSign, FiSettings, FiLogOut,
  FiBarChart2, FiDownload, FiCheckCircle, FiClock, FiXCircle,
} from "react-icons/fi";

const SUMMARY = [
  { label: "Total Revenue",     value: "Rs.4,50,000.00", icon: <FiDollarSign />, color: "#f97316" },
  { label: "Outstanding",       value: "Rs.75,000.00",   icon: <FiClock />,      color: "#f97316" },
  { label: "This Month",        value: "Rs.85,000.00",   icon: <FiCheckCircle />,color: "#22c55e" },
  { label: "Total Students",    value: "142",             icon: <FiUsers />,      color: "#f97316" },
];

const INVOICES = [
  { id: "OUT001", student: "Michael Fernando",  course: "Advanced UI/UX Design",            due: "2026.05.06", amount: "Rs.7500.00", status: "In Progress" },
  { id: "OUT002", student: "Kumara Perera",     course: "Web Systems Architecture",         due: "2026.05.10", amount: "Rs.9500.00", status: "In Progress" },
  { id: "OUT003", student: "Samana Kumari",     course: "Quantum Physics for Beginners",    due: "2026.05.12", amount: "Rs.6500.00", status: "Overdue"     },
  { id: "OUT004", student: "Saman Somapala",    course: "Strategic Enterprise Management",  due: "2026.05.15", amount: "Rs.8000.00", status: "In Progress" },
  { id: "OUT005", student: "Latha Silva",       course: "Interpersonal Skills (V1.0)",      due: "2026.05.18", amount: "Rs.5500.00", status: "Overdue"     },
];

const HISTORY = [
  { id: "TR001", student: "Michael Fernando",  course: "Advanced UI/UX Design",           date: "2026.05.06", amount: "Rs.7500.00", status: "Completed" },
  { id: "TR002", student: "Kumara Perera",     course: "Web Systems Architecture",        date: "2026.05.06", amount: "Rs.9500.00", status: "Completed" },
  { id: "TR003", student: "Samana Kumari",     course: "Quantum Physics for Beginners",   date: "2026.05.07", amount: "Rs.6500.00", status: "Completed" },
  { id: "TR004", student: "Saman Somapala",    course: "Strategic Enterprise Management", date: "2026.05.08", amount: "Rs.8000.00", status: "Refunded"  },
  { id: "TR005", student: "Latha Silva",       course: "Interpersonal Skills (V1.0)",     date: "2026.05.09", amount: "Rs.5500.00", status: "Completed" },
  { id: "TR006", student: "Michael Fernando",  course: "Advanced UI/UX Design",           date: "2026.05.10", amount: "Rs.7500.00", status: "Completed" },
];

const NAV = [
  { icon: <FiGrid />,       label: "Dashboard" },
  { icon: <FiUsers />,      label: "Students"  },
  { icon: <FiBookOpen />,   label: "Courses"   },
  { icon: <FiCreditCard />, label: "Payments",  active: true },
  { icon: <FiAward />,      label: "Certificates" },
];

export default function AdminPayment() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredInvoices = INVOICES.filter((r) => {
    const matchSearch = r.student.toLowerCase().includes(search.toLowerCase()) ||
                        r.course.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="ap-shell">

      {/* Topbar */}
      <header className="ap-topbar">
        <div className="ap-topbar-left">
          <div className="ap-top-title">
            <strong>Payment Overview</strong>
            <span>Review your payment history and transaction details.</span>
          </div>
        </div>
        <div className="ap-topbar-right">
          <div className="ap-search-wrap">
            <FiSearch className="ap-search-icon" />
            <input
              className="ap-search"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <FiBell className="ap-top-icon" />
        </div>
      </header>

      <div className="ap-body">

        {/* Sidebar */}
        <aside className="ap-sidebar">
          <div className="ap-profile">
            <strong>DashBoard</strong>
            <span>Student Portal</span>
          </div>
          <nav className="ap-sidenav">
            {NAV.map((item) => (
              <div key={item.label} className={`ap-sitem ${item.active ? "ap-sitem-active" : ""}`}>
                {item.icon}<span>{item.label}</span>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="ap-main">

          {/* Summary cards */}
          <div className="ap-summary-grid">
            {SUMMARY.map((s) => (
              <div key={s.label} className="ap-summary-card">
                <div className="ap-summary-icon" style={{ background: s.color + "22", color: s.color }}>
                  {s.icon}
                </div>
                <div>
                  <div className="ap-summary-label">{s.label}</div>
                  <div className="ap-summary-value">{s.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Filter row */}
          <div className="ap-filter-row">
            <div className="ap-filter-btns">
              {["All", "In Progress", "Overdue", "Completed", "Refunded"].map((f) => (
                <button
                  key={f}
                  className={`ap-filter-btn ${statusFilter === f ? "ap-filter-btn-active" : ""}`}
                  onClick={() => setStatusFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <button className="ap-export-btn">
              <FiDownload size={14} /> Export CSV
            </button>
          </div>

          {/* Outstanding Invoices */}
          <div className="ap-section">
            <h2 className="ap-section-title">Outstanding Invoices</h2>
            <div className="ap-table-wrap">
              <table className="ap-table">
                <thead>
                  <tr>
                    <th>Outstanding ID</th>
                    <th>Student</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Due Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((row, i) => (
                    <tr key={i}>
                      <td>{row.id}</td>
                      <td>{row.student}</td>
                      <td>{row.course}</td>
                      <td>{row.due}</td>
                      <td>{row.amount}</td>
                      <td>
                        <span className={`ap-badge ${row.status === "Overdue" ? "ap-badge-overdue" : "ap-badge-progress"}`}>
                          {row.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button className="ap-action-btn ap-action-remind">Remind</button>
                          <button className="ap-action-btn ap-action-waive">Waive</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment History */}
          <div className="ap-section">
            <h2 className="ap-section-title">Payment History</h2>
            <div className="ap-table-wrap">
              <table className="ap-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Student</th>
                    <th>Description</th>
                    <th>Payment Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {HISTORY.map((row, i) => (
                    <tr key={i}>
                      <td>{row.id}</td>
                      <td>{row.student}</td>
                      <td>{row.course}</td>
                      <td>{row.date}</td>
                      <td>{row.amount}</td>
                      <td>
                        <span className={`ap-badge ${
                          row.status === "Completed" ? "ap-badge-completed" :
                          row.status === "Refunded"  ? "ap-badge-refunded"  : "ap-badge-progress"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td>
                        <button className="ap-action-btn ap-action-view">
                          <FiBarChart2 size={12} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      {/* Footer */}
      <footer className="ap-footer">
        <span className="ap-footer-logo">LMS</span>
        <span>© 2024 LMS Sri Lanka. All Rights Reserved.</span>
        <div className="ap-footer-links">
          <span>Support</span>
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>Contact Us</span>
        </div>
        <div className="ap-footer-icons">
          <span>🔗</span><span>🌐</span>
        </div>
      </footer>

    </div>
  );
}
