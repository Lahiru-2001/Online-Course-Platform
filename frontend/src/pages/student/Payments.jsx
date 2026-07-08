import React, { useEffect, useMemo, useState } from "react";
import {
  CreditCard,
  Calendar,
  Receipt,
  CheckCircle2,
  Loader2,
  Wallet,
} from "lucide-react";

import Card from "../../components/ui/Card";

const API_URL = "http://localhost:5000/api/enrollments/my";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setPayments(data.courses || []);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPaid = useMemo(() => {
    return payments.reduce(
      (sum, item) => sum + (item.paymentAmount || 0),
      0
    );
  }, [payments]);

  const lastPaymentDate = useMemo(() => {
    if (!payments.length) return "-";

    return new Date(payments[0].createdAt).toLocaleDateString();
  }, [payments]);

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-[#184B65]">
          Payment History
        </h1>

        <p className="text-gray-500 mt-1">
          View all tuition payments made for your enrolled courses.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-5 md:grid-cols-3">

        <Card className="p-6">

          <div className="flex items-center gap-4">

            <div className="bg-orange-100 p-3 rounded-xl">
              <Wallet className="text-orange-500" size={26} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Total Paid</p>

              <h2 className="text-2xl font-bold text-[#184B65]">
                Rs. {totalPaid.toLocaleString()}
              </h2>
            </div>

          </div>

        </Card>

        <Card className="p-6">

          <div className="flex items-center gap-4">

            <div className="bg-green-100 p-3 rounded-xl">
              <Calendar className="text-green-600" size={26} />
            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Last Payment
              </p>

              <h2 className="text-xl font-bold text-[#184B65]">
                {lastPaymentDate}
              </h2>

            </div>

          </div>

        </Card>

        <Card className="p-6">

          <div className="flex items-center gap-4">

            <div className="bg-blue-100 p-3 rounded-xl">
              <Receipt className="text-blue-600" size={26} />
            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Transactions
              </p>

              <h2 className="text-2xl font-bold text-[#184B65]">
                {payments.length}
              </h2>

            </div>

          </div>

        </Card>

      </div>

      {/* Table */}

      <Card className="p-6">

        <div className="flex items-center gap-2 mb-6">

          <CreditCard
            size={22}
            className="text-[#FC772A]"
          />

          <h2 className="font-bold text-xl text-[#184B65]">
            Payment Records
          </h2>

        </div>

        {loading ? (

          <div className="py-20 flex justify-center">

            <Loader2
              className="animate-spin text-[#FC772A]"
              size={40}
            />

          </div>

        ) : payments.length === 0 ? (

          <div className="text-center py-20">

            <CreditCard
              size={70}
              className="mx-auto text-gray-300 mb-4"
            />

            <h3 className="text-xl font-semibold">
              No Payments Found
            </h3>

            <p className="text-gray-500 mt-2">
              You haven't enrolled in any paid course yet.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b bg-gray-50">

                  <th className="text-left p-4">
                    Course
                  </th>

                  <th className="text-left p-4">
                    Instructor
                  </th>

                  <th className="text-left p-4">
                    Date
                  </th>

                  <th className="text-left p-4">
                    Amount
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {payments.map((payment) => (

                  <tr
                    key={payment._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4 font-semibold">
                      {payment.course?.title}
                    </td>

                    <td className="p-4">
                      {payment.instructor?.fullName}
                    </td>

                    <td className="p-4">
                      {new Date(
                        payment.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4 font-bold">
                      Rs.{" "}
                      {payment.paymentAmount?.toLocaleString()}
                    </td>

                    <td className="p-4">

                      <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">

                        <CheckCircle2 size={16} />

                        {payment.paymentStatus}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </Card>

    </div>
  );
}