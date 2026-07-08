import React from "react";
import {
  Award,
  Upload,
  CheckCircle,
  Image,
  PenTool,
  Building2,
  ShieldCheck,
} from "lucide-react";

export default function CertificateBuilder({
  certificate,
  setCertificate,
}) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCertificate({
      ...certificate,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFile = (field, file) => {
    setCertificate({
      ...certificate,
      [field]: file,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">

      {/* Header */}

      <div className="flex items-center gap-3 border-b pb-4 mb-6">

        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
          04
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Course Certificate
          </h2>

          <p className="text-sm text-gray-500">
            Configure the certificate students receive after completing this course.
          </p>
        </div>

      </div>

      {/* Enable */}

      <div className="border rounded-xl p-5 mb-6">

        <label className="flex items-center gap-3 cursor-pointer">

          <input
            type="checkbox"
            name="enabled"
            checked={certificate.enabled}
            onChange={handleChange}
            className="w-5 h-5 accent-orange-500"
          />

          <div>

            <h4 className="font-semibold flex items-center gap-2">
              <CheckCircle
                size={18}
                className="text-green-600"
              />
              Issue Certificate
            </h4>

            <p className="text-sm text-gray-500">
              Students will automatically receive a certificate after successfully completing this course.
            </p>

          </div>

        </label>

      </div>

      {certificate.enabled && (
        <>

          {/* Certificate Details */}

          <div className="grid md:grid-cols-2 gap-6 mb-8">

            <div>

              <label className="font-semibold mb-2 flex items-center gap-2">
                <Award
                  size={18}
                  className="text-orange-500"
                />
                Certificate Type
              </label>

              <select
                name="type"
                value={certificate.type}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              >
                <option>Completion</option>
                <option>Achievement</option>
                <option>Professional</option>
                <option>Excellence</option>
              </select>

            </div>

            <div>

              <label className="font-semibold mb-2 flex items-center gap-2">
                <ShieldCheck
                  size={18}
                  className="text-orange-500"
                />
                Certificate Template
              </label>

              <select
                name="template"
                value={certificate.template}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              >
                <option>University</option>
                <option>Professional</option>
                <option>Corporate</option>
                <option>Modern</option>
                <option>Classic</option>
              </select>

            </div>

          </div>

          {/* Uploads */}

          <div className="grid lg:grid-cols-3 gap-6">

            {/* Logo */}

            <div className="border rounded-xl p-5">

              <div className="flex items-center gap-2 mb-4">

                <Building2
                  size={20}
                  className="text-orange-500"
                />

                <h4 className="font-semibold">
                  Organization Logo
                </h4>

              </div>

              <label className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition">

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFile(
                      "logo",
                      e.target.files[0]
                    )
                  }
                />

                <Upload
                  size={40}
                  className="text-orange-500"
                />

                <p className="mt-3 text-sm">
                  Upload Logo
                </p>

              </label>

              {certificate.logo && (
                <p className="mt-3 text-green-600 text-sm">
                  ✓ {certificate.logo.name}
                </p>
              )}

            </div>

            {/* Signature */}

            <div className="border rounded-xl p-5">

              <div className="flex items-center gap-2 mb-4">

                <PenTool
                  size={20}
                  className="text-orange-500"
                />

                <h4 className="font-semibold">
                  Signature
                </h4>

              </div>

              <label className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition">

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFile(
                      "signature",
                      e.target.files[0]
                    )
                  }
                />

                <Upload
                  size={40}
                  className="text-orange-500"
                />

                <p className="mt-3 text-sm">
                  Upload Signature
                </p>

              </label>

              {certificate.signature && (
                <p className="mt-3 text-green-600 text-sm">
                  ✓ {certificate.signature.name}
                </p>
              )}

            </div>

            {/* Background */}

            <div className="border rounded-xl p-5">

              <div className="flex items-center gap-2 mb-4">

                <Image
                  size={20}
                  className="text-orange-500"
                />

                <h4 className="font-semibold">
                  Background
                </h4>

              </div>

              <label className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition">

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFile(
                      "background",
                      e.target.files[0]
                    )
                  }
                />

                <Upload
                  size={40}
                  className="text-orange-500"
                />

                <p className="mt-3 text-sm">
                  Upload Background
                </p>

              </label>

              {certificate.background && (
                <p className="mt-3 text-green-600 text-sm">
                  ✓ {certificate.background.name}
                </p>
              )}

            </div>

          </div>

          {/* Summary */}

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">

            <h3 className="font-bold text-blue-700 mb-4">
              Certificate Summary
            </h3>

            <div className="grid md:grid-cols-2 gap-4 text-sm">

              <div>
                <strong>Type:</strong> {certificate.type}
              </div>

              <div>
                <strong>Template:</strong> {certificate.template}
              </div>

              <div>
                <strong>Logo:</strong>{" "}
                {certificate.logo
                  ? certificate.logo.name
                  : "Not uploaded"}
              </div>

              <div>
                <strong>Signature:</strong>{" "}
                {certificate.signature
                  ? certificate.signature.name
                  : "Not uploaded"}
              </div>

              <div className="md:col-span-2">
                <strong>Background:</strong>{" "}
                {certificate.background
                  ? certificate.background.name
                  : "Default background"}
              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}