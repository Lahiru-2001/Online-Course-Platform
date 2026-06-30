// src/pages/admin/AdminDashboard.jsx
import React from "react";
import "./AdminDashboard.css";

import InstructorNavbar from "../../components/instructor/InstructorNavbar";
import InstructorSidebar from "../../components/instructor/InstructorSidebar";
import Footer from "../../components/Footer";

export default function AdminDashboard() {
    const revenueData = [
        { month: "MAR", height: "95px", color: "#D7E1EA" },
        { month: "APR", height: "140px", color: "#A9BBC8" },
        { month: "MAY", height: "190px", color: "#FDB184" },
        { month: "JUN", height: "165px", color: "#6F8998" },
        { month: "JUL", height: "220px", color: "#3F6678" },
        { month: "AUG", height: "245px", color: "#FC772A" },
    ];

    const approvals = [
        {
            id: 1,
            image:
                "https://randomuser.me/api/portraits/women/65.jpg",
            name: "Prof. Damayanthi Perera",
            email: "d.perera@unidomain.lk",
            subject: "Physics & Quantum Mechanics",
            date: "Aug 24, 2024",
        },
        {
            id: 2,
            image:
                "https://randomuser.me/api/portraits/men/32.jpg",
            name: "Mr. Aruna Jayawardena",
            email: "aruna.j@tech-edu.com",
            subject: "Full Stack Development",
            date: "Aug 25, 2024",
        },
    ];

    return (
        <div className="admin-dashboard">
            <InstructorNavbar activeLink="Dashboard" />
            <div className="admin-body">
                <InstructorSidebar activeMenu="Overview" />

                {/* Main */}
                <main className="admin-main">
                    {/* Top Header */}
                    <section className="overview-header">
                        <div>
                            <h1>Platform Overview</h1>
                            <p>
                                Real-time statistics and system performance metrics for LMS
                                Sri Lanka.
                            </p>
                        </div>
                        <div className="overview-actions">

                            <button className="date-btn">
                                <i className="fa-regular fa-calendar"></i>
                                Aug 01 - Aug 31, 2024
                            </button>
                            <button className="export-btn">
                                <i className="fa-solid fa-download"></i>
                                Export Report
                            </button>

                        </div>
                    </section>

                    {/* Statistics */}
                    <section className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-top">
                                <div className="icon blue">
                                    <i className="fa-solid fa-users"></i>
                                </div>
                                <span className="green">+12%</span>

                            </div>
                            <span>Total Students</span>
                            <h2>42,850</h2>
                        </div>

                        <div className="stat-card">
                            <div className="stat-top">
                                <div className="icon peach">
                                    <i className="fa-solid fa-user-tie"></i>
                                </div>
                                <span className="green">+4%</span>
                            </div>
                            <span>Total Instructors</span>
                            <h2>1,120</h2>
                        </div>

                        <div className="stat-card">
                            <div className="stat-top">
                                <div className="icon yellow">
                                    <i className="fa-solid fa-graduation-cap"></i>
                                </div>
                                <span className="orange">85 New</span>
                            </div>
                            <span>Total Courses</span>
                            <h2>3,490</h2>
                        </div>

                        <div className="income-card">
                            <div className="income-icon">
                                <i className="fa-solid fa-wallet"></i>
                            </div>
                            <span>Monthly</span>
                            <p>Revenue (LKR)</p>
                            <h2>12,450,200</h2>
                        </div>
                    </section>

                    {/* Revenue + Status */}

                    <section className="middle-grid">
                        {/* Revenue */}

                        <div className="revenue-card">
                            <div className="card-header">
                                <h2>Revenue Trends</h2>
                                <select>
                                    <option>Last 6 Months</option>
                                </select>
                            </div>

                            <div className="bar-chart">
                                {revenueData.map((bar) => (
                                    <div className="bar-column" key={bar.month}>
                                        <div
                                            className="bar"
                                            style={{
                                                height: bar.height,
                                                background: bar.color,
                                            }}
                                        ></div>
                                        <span>{bar.month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Status */}
                        <div className="status-card">
                            <h2>System Status</h2>
                            <div className="status-row">
                                <div>
                                    <span className="dot green"></span>
                                    API Gateway
                                </div>
                                <small>99.9% Uptime</small>
                            </div>

                            <div className="status-row">
                                <div>
                                    <span className="dot green"></span>
                                    Video Server
                                </div>
                                <small>Operational</small>
                            </div>

                            <div className="status-row">
                                <div>
                                    <span className="dot orange"></span>
                                    Database
                                </div>
                                <small>Under Heavy Load</small>
                            </div>

                            <h4>STORAGE USAGE</h4>

                            <div className="storage-bar">
                                <div className="storage-fill"></div>
                            </div>

                            <div className="storage-footer">
                                <span>7.8 TB of 10 TB</span>
                                <span>78%</span>
                            </div>
                        </div>

                    </section>

                    {/* Pending Approvals */}

                    <section className="approval-card">
                        <div className="approval-header">
                            <div>
                                <h2>Pending Instructor Approvals</h2>
                                <p>5 applications requiring your review</p>
                            </div>
                            <a href="#">View All Applications</a>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>Applicant</th>
                                    <th>Subject Expertise</th>
                                    <th>Submitted Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {approvals.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="applicant">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                />
                                                <div>
                                                    <strong>{item.name}</strong>
                                                    <span>{item.email}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td>{item.subject}</td>
                                        <td>{item.date}</td>

                                        <td>

                                            <span className="pending">
                                                PENDING
                                            </span>

                                        </td>

                                        <td>
                                            <div className="action-icons">
                                                <i className="fa-regular fa-circle-check approve"></i>
                                                <i className="fa-regular fa-circle-xmark reject"></i>
                                                <i className="fa-regular fa-file-lines view"></i>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>

            {/* Footer */}
            <div className="dashboard-footer">
                <Footer />
            </div>

        </div>
    );
}