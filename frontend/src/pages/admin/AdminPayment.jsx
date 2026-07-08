import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle,
  Clock,
  Download,
  Search,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { getAdminPayments } from "../../services/adminService";

export default function AdminPayment() {
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [summary, setSummary] = useState({
    totalRevenue: 0,
    adminRevenue: 0,
    instructorRevenue: 0,
    completedPayments: 0,
    processingPayments: 0,
    failedPayments: 0,
  });

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);

      const res = await getAdminPayments();

      if (res.success) {
        setSummary(res.summary);
        setTransactions(res.transactions || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return `LKR ${Number(amount || 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-CA");
  };

  const summaryCards = [
    {
      label: "Total Revenue",
      value: formatCurrency(summary.totalRevenue),
      change: "100% Student Payments",
      icon: ArrowUpRight,
      color: "text-green-600 bg-green-50",
    },
    {
      label: "Platform Revenue (20%)",
      value: formatCurrency(summary.adminRevenue),
      change: "Platform Commission",
      icon: CheckCircle,
      color: "text-[#1e3a5f] bg-blue-50",
    },
    {
      label: "Instructor Revenue (80%)",
      value: formatCurrency(summary.instructorRevenue),
      change: "Instructor Earnings",
      icon: ArrowDownLeft,
      color: "text-red-600 bg-red-50",
    },
    {
      label: "Completed Payments",
      value: summary.completedPayments,
      change: `${summary.processingPayments} Processing • ${summary.failedPayments} Failed`,
      icon: Clock,
      color: "text-orange-500 bg-orange-50",
    },
  ];

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        (t.student || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (t.course || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        t.paymentStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [transactions, search, statusFilter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-[#1e3a5f] font-semibold text-lg">
          Loading payment data...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen pb-12">

      {/* Header */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#1e3a5f]">
            Payment Overview
          </h1>

          <p className="text-xs text-gray-400">
            Review platform revenue, instructor earnings and payment transactions.
          </p>
        </div>

        {/* <Button
          variant="primary"
          className="py-2.5 px-4 text-xs font-bold uppercase"
        >
          <Download className="w-4 h-4" />
          Export Report
        </Button> */}
      </div>

      {/* Summary */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {summaryCards.map((item, index) => {
          const Icon = item.icon;

          return (
            <Card
              key={index}
              className="border border-gray-200 p-5 flex items-center gap-4"
            >
              <div className={`p-3 rounded-lg ${item.color}`}>
                <Icon className="w-5 h-5" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-gray-400">
                  {item.label}
                </span>

                <h3 className="text-lg font-bold text-[#1e3a5f]">
                  {item.value}
                </h3>

                <p className="text-[10px] text-gray-500">
                  {item.change}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Search & Filter */}
      <Card className="border border-gray-200 shadow-sm p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by student or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>

        <div className="flex gap-2 flex-wrap">
          {["All", "Completed", "Processing", "Failed"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border transition ${statusFilter === status
                ? "bg-[#1e3a5f] text-white border-[#1e3a5f]"
                : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </Card>

      {/* Transactions */}
      <Card className="border border-gray-200 overflow-hidden p-0">

        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h2 className="font-bold text-[#1e3a5f]">
            Payment Transactions
          </h2>

          <span className="text-xs text-gray-500">
            {filtered.length} Records
          </span>
        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full text-sm">

            <thead className="bg-gray-50 border-b">

              <tr>

                <th className="px-4 py-3 text-left">Transaction</th>

                <th className="px-4 py-3 text-left">Student</th>

                <th className="px-4 py-3 text-left">Course</th>

                <th className="px-4 py-3 text-left">Instructor</th>

                <th className="px-4 py-3 text-left">Date</th>

                <th className="px-4 py-3 text-right">
                  Total
                </th>

                <th className="px-4 py-3 text-right text-green-700">
                  Admin 20%
                </th>

                <th className="px-4 py-3 text-right text-blue-700">
                  Instructor 80%
                </th>

                <th className="px-4 py-3 text-center">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.length === 0 ? (

                <tr>

                  <td
                    colSpan={9}
                    className="py-10 text-center text-gray-500"
                  >
                    No payment records found.
                  </td>

                </tr>

              ) : (

                filtered.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="px-4 py-4 font-semibold">
                      {item.transactionId}
                    </td>

                    <td className="px-4 py-4">
                      <div className="font-medium">
                        {item.student}
                      </div>

                      <div className="text-xs text-gray-500">
                        {item.studentEmail}
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      {item.course}
                    </td>

                    <td className="px-4 py-4">
                      {item.instructor}
                    </td>

                    <td className="px-4 py-4">
                      {formatDate(item.paymentDate)}
                    </td>

                    <td className="px-4 py-4 text-right font-semibold">
                      {formatCurrency(item.totalAmount)}
                    </td>

                    <td className="px-4 py-4 text-right font-bold text-green-600">
                      {formatCurrency(item.adminAmount)}
                    </td>

                    <td className="px-4 py-4 text-right font-bold text-blue-600">
                      {formatCurrency(item.instructorAmount)}
                    </td>

                    <td className="px-4 py-4 text-center">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${item.paymentStatus === "Completed"
                          ? "bg-green-100 text-green-700"
                          : item.paymentStatus === "Processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {item.paymentStatus}
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </Card>

    </div>
  );
}