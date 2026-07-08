import React, { useEffect, useState } from "react";
import { Wallet, Banknote } from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

import {
  getInstructorEarnings,
  createWithdrawal,
  getWithdrawalHistory,
} from "../../services/instructorService";

export default function Earnings() {

  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);
  const [amount, setAmount] = useState("");
  const [history, setHistory] = useState([]);
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Get earnings
      const earnings = await getInstructorEarnings();

      setBalance(earnings.accountBalance);

      setTotalIncome(earnings.totalIncome);

      setTotalWithdraw(earnings.totalWithdraw);

      // Get withdrawal history
      const historyResponse =
        await getWithdrawalHistory();

      setHistory(historyResponse.history);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to load earnings."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawalRequest = async (e) => {
    e.preventDefault();

    const withdrawAmount = Number(amount);

    if (withdrawAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (withdrawAmount > balance) {
      alert("Insufficient balance.");
      return;
    }

    try {
      await createWithdrawal({
        amount: withdrawAmount,
        bankName,
        accountName,
        accountNumber,
      });

      alert("Withdrawal request submitted successfully.");

      // Clear form
      setAmount("");
      setBankName("");
      setAccountName("");
      setAccountNumber("");

      // Reload latest balance/history
      await loadData();

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Withdrawal failed."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <div className="text-lg font-semibold text-gray-500">
          Loading earnings...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">

      {/* ==========================
          Header
      ========================== */}

      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">
          Instructor Earnings
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Review your earnings, request withdrawals and monitor payout history.
        </p>
      </div>

      {/* ==========================
          Summary Cards
      ========================== */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Account Balance */}

        <Card className="bg-gradient-to-br from-[#1e3a5f] to-[#12253f] text-white">

          <span className="text-xs uppercase text-orange-400 font-bold tracking-wider">
            Account Balance
          </span>

          <div className="text-3xl font-extrabold mt-3">
            LKR{" "}
            {Number(balance).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>

          <p className="text-xs text-gray-300 mt-3">
            Available for withdrawal
          </p>

        </Card>

        {/* Total Student Payments */}

        <Card>

          <span className="text-xs uppercase text-gray-500 font-bold tracking-wider">
            Total Student Payments
          </span>

          <div className="text-3xl font-bold mt-3 text-[#1e3a5f]">
            LKR{" "}
            {Number(totalIncome).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>

          <p className="text-xs text-gray-500 mt-3">
            100% student payments
          </p>

        </Card>

        {/* Total Withdrawn */}

        <Card>

          <span className="text-xs uppercase text-gray-500 font-bold tracking-wider">
            Total Withdrawn
          </span>

          <div className="text-3xl font-bold mt-3 text-red-500">
            LKR{" "}
            {Number(totalWithdraw).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>

          <p className="text-xs text-gray-500 mt-3">
            Total withdrawal requests
          </p>

        </Card>

      </div>

      {/* ==========================
          Main Section
      ========================== */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Side */}

        <div className="lg:col-span-2 flex flex-col gap-6">

          <Card>

            <h3 className="font-bold text-[#1e3a5f] text-sm uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Wallet className="w-5 h-5 text-orange-500" />
              Request Withdrawal
            </h3>

            <form
              onSubmit={handleWithdrawalRequest}
              className="space-y-5"
            >

              <Input
                label="Withdrawal Amount (LKR)"
                type="number"
                min="1"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              <Input
                label="Bank Name"
                placeholder="Bank of Ceylon"
                value={bankName}
                onChange={(e) =>
                  setBankName(e.target.value)
                }
                required
              />

              <Input
                label="Account Holder Name"
                placeholder="Kasun Perera"
                value={accountName}
                onChange={(e) =>
                  setAccountName(e.target.value)
                }
                required
              />

              <Input
                label="Account Number"
                placeholder="1234567890"
                value={accountNumber}
                onChange={(e) =>
                  setAccountNumber(e.target.value)
                }
                required
              />

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">

                <div className="flex justify-between text-sm">

                  <span className="font-semibold text-gray-600">
                    Available Balance
                  </span>

                  <span className="font-bold text-[#1e3a5f]">
                    LKR{" "}
                    {Number(balance).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>

                </div>

              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3 font-bold uppercase tracking-wider"
              >
                <Banknote className="w-4 h-4 mr-2" />
                Request Withdrawal
              </Button>

            </form>

          </Card>

        </div>
        {/* ==========================
            Withdrawal History
        ========================== */}

        <div>

          <Card className="h-full">

            <h3 className="font-bold text-[#1e3a5f] text-sm uppercase tracking-wider border-b border-gray-200 pb-3 mb-5">
              Withdrawal History
            </h3>

            {
              history.length === 0 ? (

                <div className="text-center py-10 text-gray-500">

                  No withdrawal history found.

                </div>

              ) : (

                <div className="space-y-4 max-h-[520px] overflow-y-auto">

                  {
                    history.map((item) => (

                      <div
                        key={item._id}
                        className="border rounded-xl p-4 bg-gray-50"
                      >

                        <div className="flex justify-between items-center">

                          <div>

                            <h4 className="font-bold text-[#1e3a5f]">

                              LKR{" "}

                              {Number(
                                item.withdrawAmount
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                              })}

                            </h4>

                            <p className="text-xs text-gray-500 mt-1">

                              {new Date(
                                item.createdAt
                              ).toLocaleDateString()}

                            </p>

                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : item.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                              }`}
                          >
                            {item.status}
                          </span>

                        </div>

                        <div className="mt-3 text-xs text-gray-600 space-y-1">

                          <p>

                            <strong>Bank</strong>

                            {" : "}

                            {item.bankName || "-"}

                          </p>

                          <p>

                            <strong>Account Name</strong>

                            {" : "}

                            {item.accountName || "-"}

                          </p>

                          <p>

                            <strong>Account No</strong>

                            {" : "}

                            {item.accountNumber || "-"}

                          </p>

                          <p>

                            <strong>Remaining Balance</strong>

                            {" : "}

                            LKR{" "}

                            {Number(
                              item.remainingBalance
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}

                          </p>

                        </div>

                      </div>

                    ))
                  }

                </div>

              )
            }

          </Card>

        </div>

      </div>

    </div>

  );

}