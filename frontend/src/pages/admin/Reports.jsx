import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Download,
  Users,
  CheckSquare,
  BarChart3,
  Sliders,
  AlertTriangle,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import ProgressBar from "../../components/ui/ProgressBar";

import { useAuth } from "../../context/AuthContext";
import { getReport } from "../../services/reportService";

export default function Reports() {
  const { user } = useAuth();

  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);

      const data = await getReport(user.userType);

      setReport(data);

      setError("");
    } catch (err) {
      console.error(err);

      setError(err.message || "Unable to load report.");
    } finally {
      setLoading(false);
    }
  };


  const summary = report?.summary || {
    totalStudents: 0,
    totalCourses: 0,
    completedStudents: 0,
    averageProgress: 0,
  };


  const students = useMemo(() => {
    if (!report?.students) return [];

    return report.students.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.student.fullName.toLowerCase().includes(keyword) ||
        item.course.title.toLowerCase().includes(keyword)
      );
    });
  }, [report, search]);


  const courses = report?.courses || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <h2 className="font-semibold text-gray-700">
            Loading report...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Card className="max-w-md p-8 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />

          <h2 className="font-bold text-xl mb-2">
            Something went wrong
          </h2>

          <p className="text-gray-500 mb-5">{error}</p>

          <Button onClick={loadReport}>
            Retry
          </Button>
        </Card>
      </div>
    );
  }


  const exportCSV = () => {
    const rows = students.map((item) => ({
      Student: item.student.fullName,
      Email: item.student.email,
      Course: item.course.title,
      Progress: item.progress,
      Completed: item.completed ? "Yes" : "No",
      CurrentLesson: item.currentLesson,
    }));

    if (!rows.length) return;

    const headers = Object.keys(rows[0]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers.map((key) => `"${row[key]}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "student-progress-report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (

    <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">

        <div>

          <h1 className="text-2xl font-bold text-[#1e3a5f]">

            {user.userType === "Administrator"
              ? "Student Progress Tracking"
              : "My Course Progress"}

          </h1>

          <p className="text-sm text-gray-500 mt-1">

            {user.userType === "Administrator"
              ? "View all students and courses"
              : "View your students and course performance"}

          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student or course..."
            className="border rounded-lg px-4 py-2 text-sm w-72 outline-none focus:ring-2 focus:ring-orange-400"
          />

          <Button
            variant="primary"
            onClick={exportCSV}
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>

        </div>

      </div>

      {/* ================= KPI ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <Card className="p-5">

          <span className="text-xs uppercase text-gray-500 font-semibold">

            Average Progress

          </span>

          <h2 className="text-3xl font-bold mt-2 text-[#1e3a5f]">

            {summary.averageProgress}%

          </h2>

          <div className="mt-3">

            <ProgressBar progress={summary.averageProgress} />

          </div>

        </Card>

        <Card className="p-5 flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

            <Users className="w-6 h-6 text-[#1e3a5f]" />

          </div>

          <div>

            <p className="text-xs uppercase text-gray-500">

              Students

            </p>

            <h2 className="text-3xl font-bold text-[#1e3a5f]">

              {summary.totalStudents}

            </h2>

          </div>

        </Card>

        <Card className="p-5 flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">

            <CheckSquare className="w-6 h-6 text-green-600" />

          </div>

          <div>

            <p className="text-xs uppercase text-gray-500">

              Completed

            </p>

            <h2 className="text-3xl font-bold text-[#1e3a5f]">

              {summary.completedStudents}

            </h2>

          </div>

        </Card>

        <Card className="p-5 flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">

            <BarChart3 className="w-6 h-6 text-orange-500" />

          </div>

          <div>

            <p className="text-xs uppercase text-gray-500">

              Courses

            </p>

            <h2 className="text-3xl font-bold text-[#1e3a5f]">

              {summary.totalCourses}

            </h2>

          </div>

        </Card>

      </div>

      {/* ================= COURSE PERFORMANCE ================= */}

      <Card>

        <div className="flex justify-between items-center mb-5">

          <h3 className="font-bold text-[#1e3a5f]">

            Course Success Rates

          </h3>

          <span className="text-xs text-gray-400">

            {courses.length} Courses

          </span>

        </div>

        <div className="space-y-5">

          {courses.map((course) => {

            return (

              <div key={course.id}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">

                    {course.title}

                  </span>

                  <span className="font-bold text-orange-500">

                    {course.averageProgress}%

                  </span>

                </div>

                <ProgressBar
                  progress={course.averageProgress}
                />

                <div className="flex justify-between text-xs text-gray-500 mt-2">

                  <span>

                    Students : {course.enrolledStudents}

                  </span>

                  <span>

                    Completed : {course.completedStudents}

                  </span>

                </div>

              </div>

            )

          })}

        </div>

      </Card>
      {/* ================= STUDENT TABLE ================= */}

      <Card>
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-[#1e3a5f]">
            Student Performance Registry
          </h3>

          <span className="text-xs text-gray-400">
            {students.length} Students
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-50 border-b">

              <tr>

                <th className="text-left py-3 px-4">Student</th>

                <th className="text-left py-3 px-4">Course</th>

                <th className="text-left py-3 px-4">Progress</th>

                <th className="text-left py-3 px-4">Current Lesson</th>

                <th className="text-left py-3 px-4">Status</th>

              </tr>

            </thead>

            <tbody>

              {students.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-400"
                  >
                    No students found.
                  </td>

                </tr>

              ) : (

                students.map((student) => (

                  <tr
                    key={student.enrollmentId}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="px-4 py-4">

                      <div>

                        <p className="font-semibold">

                          {student.student.fullName}

                        </p>

                        <p className="text-xs text-gray-500">

                          {student.student.email}

                        </p>

                      </div>

                    </td>

                    <td className="px-4 py-4">

                      {student.course.title}

                    </td>

                    <td className="px-4 py-4 w-72">

                      <div className="flex items-center gap-3">

                        <div className="flex-1">

                          <ProgressBar
                            progress={student.progress}
                          />

                        </div>

                        <span className="font-semibold">

                          {student.progress}%

                        </span>

                      </div>

                    </td>

                    <td className="px-4 py-4">

                      Lesson {student.currentLesson}

                    </td>

                    <td className="px-4 py-4">

                      {student.completed ? (

                        <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">

                          Completed

                        </span>

                      ) : student.progress >= 75 ? (

                        <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold">

                          On Track

                        </span>

                      ) : student.progress >= 40 ? (

                        <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-semibold">

                          In Progress

                        </span>

                      ) : (

                        <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-semibold">

                          At Risk

                        </span>

                      )}

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </Card>

      {/* ================= ACTION REQUIRED ================= */}

      <Card>

        <div className="flex items-center gap-2 mb-6">

          <AlertTriangle className="w-5 h-5 text-orange-500" />

          <h3 className="font-bold text-[#1e3a5f]">

            Action Required

          </h3>

        </div>

        <div className="space-y-4">

          {students
            .filter(
              (student) =>
                !student.completed &&
                student.progress < 50
            )
            .slice(0, 5)
            .map((student) => (

              <div
                key={student.enrollmentId}
                className="border rounded-xl p-4 bg-red-50"
              >

                <h4 className="font-semibold">

                  {student.student.fullName}

                </h4>

                <p className="text-sm text-gray-600 mt-1">

                  Progress is only{" "}
                  <strong>{student.progress}%</strong>

                  {" "}in{" "}

                  <strong>{student.course.title}</strong>

                </p>

              </div>

            ))}

          {students.filter(
            (student) =>
              !student.completed &&
              student.progress < 50
          ).length === 0 && (

              <div className="text-green-600 font-semibold">

                🎉 No students currently require attention.

              </div>

            )}

        </div>

      </Card>

    </div>

  );
}
