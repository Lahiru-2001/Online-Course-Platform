import React, { useMemo } from "react";
import {
  Award,
  Building2,
  Calendar,
  User,
  ShieldCheck,
} from "lucide-react";

export default function CertificatePreview({
  certificate,
  courseTitle = "Course Title",
  organization = "University / Organization",
}) {
  const logo = useMemo(() => {
    return certificate.logo
      ? URL.createObjectURL(certificate.logo)
      : null;
  }, [certificate.logo]);

  const signature = useMemo(() => {
    return certificate.signature
      ? URL.createObjectURL(certificate.signature)
      : null;
  }, [certificate.signature]);

  const background = useMemo(() => {
    return certificate.background
      ? URL.createObjectURL(certificate.background)
      : null;
  }, [certificate.background]);

  if (!certificate.enabled) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
        <Award
          size={60}
          className="mx-auto text-gray-300 mb-4"
        />

        <h3 className="text-xl font-semibold text-gray-600">
          Certificate Disabled
        </h3>

        <p className="text-gray-500 mt-2">
          Students will not receive a certificate for this course.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6 border-b pb-4">

        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
          <Award className="text-orange-600" size={22} />
        </div>

        <div>
          <h2 className="text-lg font-bold">
            Certificate Preview
          </h2>

          <p className="text-sm text-gray-500">
            Live preview of the completion certificate.
          </p>
        </div>

      </div>

      {/* Certificate */}

      <div
        className="relative rounded-xl overflow-hidden border-8 border-yellow-500 shadow-xl"
        style={{
          backgroundImage: background
            ? `url(${background})`
            : "linear-gradient(to bottom right,#ffffff,#f8fafc)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "620px",
        }}
      >

        {/* Overlay */}

        <div className="absolute inset-0 bg-white/90"></div>

        <div className="relative z-10 h-full flex flex-col justify-between p-12">

          {/* Top */}

          <div className="flex justify-between items-start">

            <div>

              {logo ? (
                <img
                  src={logo}
                  alt="Logo"
                  className="w-24 h-24 object-contain"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <Building2
                    size={40}
                    className="text-gray-400"
                  />
                </div>
              )}

            </div>

            <div className="text-right">

              <ShieldCheck
                size={45}
                className="text-green-600 ml-auto"
              />

              <p className="text-sm text-gray-500 mt-2">
                Certificate ID
              </p>

              <h4 className="font-semibold">
                CERT-2026-000001
              </h4>

            </div>

          </div>

          {/* Center */}

          <div className="text-center py-10">

            <p className="uppercase tracking-[6px] text-gray-500 text-sm">
              Certificate of
            </p>

            <h1 className="text-5xl font-extrabold text-slate-800 mt-2">
              {certificate.type}
            </h1>

            <p className="mt-10 text-gray-600 text-lg">
              This Certificate is Proudly Presented To
            </p>

            <div className="mt-6 flex justify-center">

              <div className="flex items-center gap-3">

                <User
                  className="text-orange-500"
                  size={28}
                />

                <span className="text-4xl font-serif text-slate-800">
                  Student Name
                </span>

              </div>

            </div>

            <p className="mt-10 text-lg text-gray-600">
              For successfully completing the course
            </p>

            <h2 className="text-3xl font-bold text-orange-600 mt-3">
              {courseTitle}
            </h2>

            <p className="mt-8 text-gray-600 max-w-2xl mx-auto leading-7">
              This certificate verifies that the learner has
              successfully completed all lessons, quizzes,
              assignments and fulfilled the course requirements.
            </p>

          </div>

          {/* Bottom */}

          <div className="grid grid-cols-3 gap-10 items-end">

            <div>

              {signature ? (
                <img
                  src={signature}
                  alt="Signature"
                  className="h-16 object-contain"
                />
              ) : (
                <div className="h-16 flex items-end">
                  <div className="w-48 border-b-2 border-black"></div>
                </div>
              )}

              <p className="font-semibold mt-2">
                Course Instructor
              </p>

            </div>

            <div className="text-center">

              <Award
                size={80}
                className="mx-auto text-yellow-500"
              />

              <p className="text-sm mt-2 text-gray-500">
                {certificate.template} Template
              </p>

            </div>

            <div className="text-right">

              <div className="flex justify-end gap-2 items-center">

                <Calendar
                  size={18}
                  className="text-gray-600"
                />

                <span className="font-medium">
                  {new Date().toLocaleDateString()}
                </span>

              </div>

              <p className="font-semibold mt-5">
                {organization}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-3 gap-4 mt-6">

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500">
            Certificate Type
          </p>

          <h4 className="font-semibold">
            {certificate.type}
          </h4>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500">
            Template
          </p>

          <h4 className="font-semibold">
            {certificate.template}
          </h4>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500">
            Issued By
          </p>

          <h4 className="font-semibold">
            {organization}
          </h4>
        </div>

      </div>

    </div>
  );
}