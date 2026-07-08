import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

import Card from "../../components/ui/Card";
import ProgressBar from "../../components/ui/ProgressBar";

import { getAdminDashboard } from "../../services/adminDashboardService";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

export default function AdminDashboard() {

  const [loading, setLoading] = useState(true);

  const [statistics, setStatistics] = useState({
    totalStudents: 0,
    totalInstructors: 0,
    totalCourses: 0,
    totalRevenue: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await getAdminDashboard();

      setStatistics({
        totalStudents: res.statistics.totalStudents,
        totalInstructors: res.statistics.totalInstructors,
        totalCourses: res.statistics.totalCourses,
        totalRevenue: res.statistics.totalRevenue,
      });

      const colors = [
        "#d1d5db",
        "#9ca3af",
        "#fdb184",
        "#6b8998",
        "#3b5c6f",
        "#f97316",
        "#22c55e",
        "#6366f1",
        "#e11d48",
        "#14b8a6",
        "#f59e0b",
        "#8b5cf6",
      ];

      const chart = res.chartData.map((item, index) => ({
        month: item.month,
        amount: item.enrollments,
        color: colors[index % colors.length],
      }));

      setChartData(chart);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen">
      {/* Header and filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#1e3a5f]">Admin Platform Overview</h1>

        </div>
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{today}</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="border border-gray-200 p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Students</span>
            <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">+18%</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1e3a5f] mt-1">{statistics.totalStudents.toLocaleString()}</h2>
        </Card>

        <Card className="border border-gray-200 p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Instructors</span>
            <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">+4%</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1e3a5f] mt-1">{statistics.totalInstructors.toLocaleString()}</h2>
        </Card>

        <Card className="border border-gray-200 p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Courses</span>
            <span className="text-[10px] text-orange-650 font-bold bg-orange-50 px-2 py-0.5 rounded-full">86 New</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1e3a5f] mt-1">{statistics.totalCourses.toLocaleString()}</h2>
        </Card>

        <Card className="border border-orange-200 bg-orange-55/10 p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">Revenue (LKR)</span>
            <span className="text-[10px] text-orange-650 font-bold bg-orange-100/50 px-2 py-0.5 rounded-full">Monthly</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1e3a5f] mt-1">LKR {statistics.totalRevenue.toLocaleString()}</h2>
        </Card>
      </div>

      {/* Middle section: Chart + Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Line Chart */}
        <Card className="lg:col-span-2 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider">Revenue Trends</h3>
            <select className="px-2 py-1.5 border border-gray-200 text-[10px] rounded-lg font-bold text-gray-500 bg-gray-50 outline-none">
              <option>Last 6 Months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={9} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={9} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value) => [`LKR ${value.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '11px' }} />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]} barSize={36}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* System Status */}
        <Card className="border border-gray-200 flex flex-col gap-5">
          <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider">System Status</h3>

          <div className="flex flex-col gap-4 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>API Gateway</span>
              </div>
              <span className="text-gray-400">99.9% Uptime</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>Video Server</span>
              </div>
              <span className="text-gray-400">Operational</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span>Database</span>
              </div>
              <span className="text-gray-400">Under Heavy Load</span>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                <span>Storage Usage</span>
                <span>76%</span>
              </div>
              <ProgressBar progress={76} />
              <span className="text-[10px] text-gray-400 mt-1">7.6 TB of 10 TB</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}