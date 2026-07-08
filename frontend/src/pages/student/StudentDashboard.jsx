import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Award,
  Clock,
  FileText,
} from "lucide-react";

import Card from "../../components/ui/Card";
import ProgressBar from "../../components/ui/ProgressBar";
import { getDashboard } from "../../services/studentService";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

export default function StudentDashboard() {

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      setLoading(true);

      const response = await getDashboard();

      setDashboard(response);

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to load dashboard."
      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="flex items-center justify-center h-[70vh]">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-500 font-medium">

            Loading dashboard...

          </p>

        </div>

      </div>

    );

  }

  if (error) {

    return (

      <div className="flex items-center justify-center h-[70vh]">

        <div className="text-center">

          <h2 className="text-red-500 text-lg font-bold">

            {error}

          </h2>

        </div>

      </div>

    );

  }

  const chartData = dashboard?.monthlyLearningProgress || [];

  return (

    <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen">

      {/* KPI Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <Card className="flex items-center gap-4 border border-gray-200/80 p-5 rounded-xl">

          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">

            <BookOpen className="w-5 h-5" />

          </div>

          <div>

            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">

              Enrolled Courses

            </p>

            <h3 className="text-xl font-extrabold text-[#1e3a5f]">

              {dashboard?.stats?.enrolledCourses ?? 0}

            </h3>

          </div>

        </Card>

        <Card className="flex items-center gap-4 border border-gray-200/80 p-5 rounded-xl">

          <div className="p-3 bg-green-50 text-green-600 rounded-lg">

            <Award className="w-5 h-5" />

          </div>

          <div>

            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">

              Completed Courses

            </p>

            <h3 className="text-xl font-extrabold text-[#1e3a5f]">

              {dashboard?.stats?.completedCourses ?? 0}

            </h3>

          </div>

        </Card>

        <Card className="flex items-center gap-4 border border-gray-200/80 p-5 rounded-xl">

          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">

            <Clock className="w-5 h-5" />

          </div>

          <div>

            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">

              Ongoing Courses

            </p>

            <h3 className="text-xl font-extrabold text-[#1e3a5f]">

              {dashboard?.stats?.ongoingCourses ?? 0}

            </h3>

          </div>

        </Card>

        <Card className="flex items-center gap-4 border border-gray-200/80 p-5 rounded-xl">

          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">

            <FileText className="w-5 h-5" />

          </div>

          <div>

            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">

              Certificates Earned

            </p>

            <h3 className="text-xl font-extrabold text-[#1e3a5f]">

              {dashboard?.stats?.certificatesEarned ?? 0}

            </h3>

          </div>

        </Card>

      </div>

      {/* Middle Grid */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Course Progress Summary */}

        <Card className="border border-gray-200/80">

          <div className="flex justify-between items-center mb-6">

            <h3 className="font-bold text-[#1e3a5f] text-sm uppercase tracking-wider">

              Course Progress Summary

            </h3>

            <Link
              to="/student/my-courses"
              className="text-xs text-orange-500 font-bold hover:underline"
            >
              View All Courses
            </Link>

          </div>

          <div className="flex flex-col gap-5">

            {dashboard?.courseProgress?.length > 0 ? (

              dashboard.courseProgress.map((course) => (

                <div
                  key={course.courseId}
                  className="flex flex-col gap-2"
                >

                  <div className="flex justify-between text-xs">

                    <span className="font-bold text-[#1e3a5f] truncate max-w-[75%]">

                      {course.courseTitle}

                    </span>

                    <span className="text-gray-400 font-medium">

                      {course.progress}% Completion

                    </span>

                  </div>

                  <ProgressBar progress={course.progress} />

                </div>

              ))

            ) : (

              <div className="text-center text-gray-400 py-10">

                No enrolled courses.

              </div>

            )}

          </div>

        </Card>

        {/* Monthly Learning Progress */}

        <Card className="border border-gray-200/80">

          <h3 className="font-bold text-[#1e3a5f] text-sm uppercase tracking-wider mb-6">

            Monthly Learning Progress

          </h3>

          <ResponsiveContainer
            width="100%"
            height={230}
          >

            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >

              <XAxis
                dataKey="month"
                stroke="#9ca3af"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="#9ca3af"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                formatter={(value) => [
                  `${value} Hours`,
                  "Learning Hours",
                ]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "11px",
                }}
              />

              <Bar
                dataKey="hours"
                radius={[4, 4, 0, 0]}
                barSize={36}
              >

                {chartData.map((item, index) => (

                  <Cell
                    key={index}
                    fill={
                      index === chartData.length - 1
                        ? "#f97316"
                        : "#3b5c6f"
                    }
                  />

                ))}

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </Card>

      </div>

      {/* Bottom Grid */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Upcoming Deadlines */}

        <Card className="border border-gray-200/80">

          <h3 className="font-bold text-[#1e3a5f] text-sm uppercase tracking-wider mb-6">

            Upcoming Deadlines

          </h3>

          <div className="flex flex-col gap-4">

            {dashboard?.upcomingDeadlines?.length > 0 ? (

              dashboard.upcomingDeadlines.map((item, index) => (

                <div
                  key={index}
                  className="flex justify-between items-center text-xs py-2 border-b border-gray-100 last:border-b-0"
                >

                  <div className="flex flex-col max-w-[70%]">

                    <span className="font-bold text-[#1e3a5f] truncate">

                      {item.assignment}

                    </span>

                    <span className="text-gray-500 truncate">

                      {item.course}

                    </span>

                  </div>

                  <span className="text-gray-400 font-medium whitespace-nowrap">

                    {new Date(item.dueDate).toLocaleDateString()}

                  </span>

                </div>

              ))

            ) : (

              <div className="text-center py-10 text-gray-400">

                No upcoming deadlines.

              </div>

            )}

          </div>

        </Card>

        {/* Total Learning Hours */}

        <Card className="flex flex-col justify-center items-center text-center border border-gray-200/80 p-8">

          <h3 className="font-bold text-[#1e3a5f] text-sm uppercase tracking-wider mb-5">

            Total Learning Hours

          </h3>

          <div className="text-7xl md:text-8xl font-black text-[#1e3a5f] leading-none">

            {dashboard?.stats?.totalLearningHours ?? 0}

          </div>

          <p className="mt-3 text-gray-500 text-sm">

            Hours Completed

          </p>

        </Card>

      </div>

    </div>

  );

}