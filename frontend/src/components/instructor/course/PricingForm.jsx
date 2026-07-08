import React from "react";
import {
  CreditCard,
  DollarSign,
  Tag,
  BadgePercent,
  CheckCircle,
  Info,
} from "lucide-react";

export default function PricingForm({
  courseData,
  setCourseData,
}) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCourseData({
      ...courseData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const original = Number(courseData.originalPrice || 0);
  const discount = Number(courseData.discountPrice || 0);

  const savings =
    original > discount ? original - discount : 0;

  const discountPercentage =
    original > 0 && discount > 0
      ? Math.round(((original - discount) / original) * 100)
      : 0;

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">

      {/* Header */}

      <div className="flex items-center gap-3 border-b pb-4 mb-6">

        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
          03
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Course Pricing
          </h2>

          <p className="text-sm text-gray-500">
            Configure your course pricing.
          </p>
        </div>

      </div>

      {/* Free Course */}

      <div className="border rounded-xl p-5 mb-6">

        <label className="flex items-center gap-3 cursor-pointer">

          <input
            type="checkbox"
            name="isFree"
            checked={courseData.isFree}
            onChange={handleChange}
            className="w-5 h-5 accent-orange-500"
          />

          <div>

            <h4 className="font-semibold flex items-center gap-2">
              <CheckCircle
                size={18}
                className="text-green-600"
              />
              This is a Free Course
            </h4>

            <p className="text-sm text-gray-500">
              Students can enroll without payment.
            </p>

          </div>

        </label>

      </div>

      {/* Paid */}

      {!courseData.isFree && (

        <>
          <div className="grid md:grid-cols-2 gap-6">

            {/* Original */}

            <div>

              <label className="flex items-center gap-2 font-semibold mb-2">
                <DollarSign
                  size={18}
                  className="text-orange-500"
                />
                Original Price (LKR)
              </label>

              <input
                type="number"
                min="0"
                name="originalPrice"
                value={courseData.originalPrice}
                onChange={handleChange}
                placeholder="5000"
                className="w-full border rounded-lg px-4 py-3 focus:border-orange-500 outline-none"
              />

            </div>

            {/* Discount */}

            <div>

              <label className="flex items-center gap-2 font-semibold mb-2">
                <Tag
                  size={18}
                  className="text-orange-500"
                />
                Discount Price (LKR)
              </label>

              <input
                type="number"
                min="0"
                name="discountPrice"
                value={courseData.discountPrice}
                onChange={handleChange}
                placeholder="3500"
                className="w-full border rounded-lg px-4 py-3 focus:border-orange-500 outline-none"
              />

            </div>

          </div>

          {/* Summary */}

          <div className="grid md:grid-cols-3 gap-5 mt-8">

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">

              <div className="flex items-center gap-2 mb-2">
                <CreditCard
                  size={20}
                  className="text-orange-600"
                />
                <h4 className="font-semibold">
                  Original
                </h4>
              </div>

              <p className="text-2xl font-bold text-slate-800">
                LKR {original.toLocaleString()}
              </p>

            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-5">

              <div className="flex items-center gap-2 mb-2">
                <DollarSign
                  size={20}
                  className="text-green-600"
                />
                <h4 className="font-semibold">
                  Selling Price
                </h4>
              </div>

              <p className="text-2xl font-bold text-green-700">
                LKR {discount.toLocaleString()}
              </p>

            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">

              <div className="flex items-center gap-2 mb-2">
                <BadgePercent
                  size={20}
                  className="text-blue-600"
                />
                <h4 className="font-semibold">
                  Discount
                </h4>
              </div>

              <p className="text-2xl font-bold text-blue-700">
                {discountPercentage}%
              </p>

            </div>

          </div>

          {/* Savings */}

          {discount > 0 && original > discount && (

            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5">

              <h4 className="font-semibold text-green-700 mb-2">
                Price Summary
              </h4>

              <div className="space-y-2 text-sm">

                <div className="flex justify-between">
                  <span>Original Price</span>
                  <strong>LKR {original.toLocaleString()}</strong>
                </div>

                <div className="flex justify-between">
                  <span>Discount Price</span>
                  <strong>LKR {discount.toLocaleString()}</strong>
                </div>

                <div className="flex justify-between">
                  <span>You Save</span>
                  <strong className="text-green-700">
                    LKR {savings.toLocaleString()}
                  </strong>
                </div>

              </div>

            </div>

          )}

        </>

      )}

      {/* Information */}

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">

        <div className="flex gap-3">

          <Info
            size={22}
            className="text-blue-600 mt-1"
          />

          <div>

            <h4 className="font-semibold text-blue-700 mb-2">
              Pricing Tips
            </h4>

            <ul className="text-sm text-blue-600 space-y-1 list-disc list-inside">

              <li>Set a realistic market price.</li>

              <li>Discounts help increase enrollments.</li>

              <li>Free courses are excellent for promotion.</li>

              <li>Offer certificates to improve conversions.</li>

              <li>Prices are displayed in Sri Lankan Rupees (LKR).</li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}