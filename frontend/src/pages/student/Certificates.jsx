import React, { useEffect, useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  Calendar,
  Clock,
  Download,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import ProgressBar from "../../components/ui/ProgressBar";

const API_URL = "http://localhost:5000/api";

export default function Certificates() {
  const [activeTab, setActiveTab] = useState("all");

  const [certificates, setCertificates] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const tabs = [
    {
      key: "all",
      label: "All Certificates",
    },
    {
      key: "completed",
      label: "Completed",
    },
  ];

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/certificates/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setCertificates(data.certificates || []);
    } catch (err) {
      setError(err.message || "Unable to load certificates.");
    } finally {
      setLoading(false);
    }
  };

  const completedCertificates = useMemo(() => {
    return certificates.filter((item) =>
      item.course.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [certificates, search]);

  const inProgressCertificates = [];

  const downloadCertificate = (certificate) => {
    const doc = new jsPDF("landscape");

    doc.setFont("times");

    doc.setFontSize(30);
    doc.text("Certificate of Completion", 148, 35, {
      align: "center",
    });

    doc.setFontSize(18);

    doc.text(
      "This is proudly presented to",
      148,
      55,
      {
        align: "center",
      }
    );

    doc.setFontSize(28);

    doc.text(
      certificate.student.fullName,
      148,
      75,
      {
        align: "center",
      }
    );

    doc.setFontSize(18);

    doc.text(
      "for successfully completing the course",
      148,
      95,
      {
        align: "center",
      }
    );

    doc.setFontSize(24);

    doc.text(
      certificate.course.title,
      148,
      115,
      {
        align: "center",
      }
    );

    doc.setFontSize(14);

    doc.text(
      `Instructor : ${certificate.instructor.fullName}`,
      20,
      155
    );

    doc.text(
      `Completion Date : ${new Date(
        certificate.completedDate
      ).toLocaleDateString()}`,
      20,
      165
    );

    doc.text(
      `Certificate ID : ${certificate.certificateId}`,
      20,
      175
    );

    doc.text(
      certificate.course.offeredBy || "",
      220,
      175
    );

    doc.save(
      `${certificate.course.title}-Certificate.pdf`
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500 text-lg">
          Loading certificates...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-600">
        {error}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 bg-gray-50 min-h-screen">

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <Card className="p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center">
            <Award className="w-7 h-7 text-orange-600" />
          </div>

          <div>
            <p className="text-xs uppercase text-gray-500 font-semibold">
              Total Certificates
            </p>

            <h2 className="text-3xl font-bold text-[#1e3a5f]">
              {completedCertificates.length}
            </h2>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-green-600" />
          </div>

          <div>
            <p className="text-xs uppercase text-gray-500 font-semibold">
              Completed Courses
            </p>

            <h2 className="text-3xl font-bold text-[#1e3a5f]">
              {completedCertificates.length}
            </h2>
          </div>
        </Card>

        {/* <Card className="p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-yellow-100 flex items-center justify-center">
            <Clock className="w-7 h-7 text-yellow-600" />
          </div>

          <div>
            <p className="text-xs uppercase text-gray-500 font-semibold">
              In Progress
            </p>

            <h2 className="text-3xl font-bold text-[#1e3a5f]">
              {inProgressCertificates.length}
            </h2>
          </div>
        </Card> */}

        <Card className="p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
            <Calendar className="w-7 h-7 text-blue-600" />
          </div>

          <div>
            <p className="text-xs uppercase text-gray-500 font-semibold">
              Ready To Download
            </p>

            <h2 className="text-3xl font-bold text-[#1e3a5f]">
              {completedCertificates.length}
            </h2>
          </div>
        </Card>

      </div>

      {/* Search */}
      {/* 
      <Card className="p-5">

        <div className="relative">

          <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search certificates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-orange-400"
          />

        </div>

      </Card> */}

      {/* Tabs */}

      <div className="flex flex-wrap gap-3">

        {tabs.map((tab) => (

          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition
            ${activeTab === tab.key
                ? "bg-[#1e3a5f] text-white"
                : "bg-white border"
              }`}
          >
            {tab.label}
          </button>

        ))}

      </div>

      {/* Completed Certificates */}

      {(activeTab === "all" || activeTab === "completed") && (

        <div className="flex flex-col gap-5">

          {completedCertificates.length === 0 && (

            <Card className="p-10 text-center">

              <Award className="w-16 h-16 mx-auto text-gray-300" />

              <h3 className="mt-4 text-lg font-semibold">
                No certificates available
              </h3>

              <p className="text-gray-500 mt-2">
                Complete a course to unlock your certificate.
              </p>

            </Card>

          )}

          {completedCertificates.map((certificate) => (

            <Card
              key={certificate.certificateId}
              className="p-5 border border-gray-200 hover:shadow-lg transition"
            >

              <div className="flex flex-col lg:flex-row gap-5 items-center">

                <img
                  src={`http://localhost:5000${certificate.course.image}`}
                  alt=""
                  className="w-44 h-28 rounded-xl object-cover"
                />

                <div className="flex-1">

                  <h2 className="text-xl font-bold text-[#1e3a5f]">
                    {certificate.course.title}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {certificate.course.offeredBy}
                  </p>

                  <div className="flex flex-wrap gap-5 mt-4 text-sm text-gray-600">

                    <span>
                      Instructor :
                      <strong className="ml-2">
                        {certificate.instructor.fullName}
                      </strong>
                    </span>

                    <span>
                      Progress :
                      <strong className="ml-2">
                        {certificate.progress}%
                      </strong>
                    </span>

                    <span>
                      Completed :
                      <strong className="ml-2">
                        {new Date(
                          certificate.completedDate
                        ).toLocaleDateString()}
                      </strong>
                    </span>

                  </div>

                  <div className="mt-3 text-xs font-mono text-gray-500">

                    Certificate ID :
                    {" "}
                    {certificate.certificateId}

                  </div>

                </div>

                <Button
                  variant="primary"
                  onClick={() =>
                    downloadCertificate(certificate)
                  }
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />

                  Download
                </Button>

              </div>

            </Card>

          ))}

        </div>

      )}




    </div>
  );
}