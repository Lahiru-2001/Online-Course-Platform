import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import ProgressBar from "../../components/ui/ProgressBar";

import { getInstructorDashboard } from "../../services/instructorService";

export default function InstructorDashboard() {
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            setLoading(true);

            const data = await getInstructorDashboard();

            setDashboard(data);
        } catch (err) {
            console.error(err);

            setError(
                err?.response?.data?.message ||
                "Failed to load dashboard."
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[70vh]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

                    <p className="mt-4 text-gray-500">
                        Loading Dashboard...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-red-600 text-xl font-bold">
                    {error}
                </h2>

                <Button
                    className="mt-5"
                    onClick={fetchDashboard}
                >
                    Retry
                </Button>
            </div>
        );
    }

    const stats = dashboard?.statistics || {};

    const instructor = dashboard?.instructor || {};

    const ongoingCourses = dashboard?.recentCourses || [];

    const enrollments = dashboard?.recentEnrollments || [];

    return (
        <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen">

            {/* Header */}

            <div className="flex flex-col md:flex-row justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold text-[#184B65]">
                        Welcome Back 👋 {instructor.fullName}
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage your courses, students and earnings from one place.
                    </p>

                </div>

                <div className="mt-4 md:mt-0 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                    Instructor Portal
                </div>

            </div>

            {/* KPI Cards */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                {/* Students */}

                <Card className="border border-gray-200 p-5">

                    <div className="flex justify-between items-start">

                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                            Total Students
                        </span>

                    </div>

                    <h2 className="text-3xl font-extrabold text-[#1e3a5f] mt-1">
                        {stats.totalStudents ?? 0}
                    </h2>

                    <p className="text-[10px] text-gray-400 mt-1">
                        Students enrolled in your courses
                    </p>

                </Card>

                {/* Courses */}

                <Card className="border border-gray-200 p-5">

                    <div className="flex justify-between items-start">

                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                            Active Courses
                        </span>

                    </div>

                    <h2 className="text-3xl font-extrabold text-[#1e3a5f] mt-1">
                        {stats.publishedCourses ?? 0}
                    </h2>

                    <p className="text-[10px] text-gray-400 mt-1">
                        Total Courses : {stats.totalCourses ?? 0}
                    </p>

                </Card>

                {/* Earnings */}

                <Card className="border border-orange-200 bg-orange-50/20 p-5">

                    <div className="flex justify-between items-start">

                        <span className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">
                            Total Earnings
                        </span>

                    </div>

                    <h2 className="text-3xl font-extrabold text-[#1e3a5f] mt-1">
                        LKR {(stats.totalEarnings ?? 0).toLocaleString()}
                    </h2>

                    <p className="text-[10px] text-gray-400 mt-1">
                        Average Rating : ⭐ {stats.averageRating ?? 0}
                    </p>

                </Card>

            </div>

            {/* Course Progress + Recent Courses */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Course Progress */}

                <Card className="lg:col-span-2 border border-gray-200">

                    <div className="flex justify-between items-center mb-6">

                        <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider">
                            Recent Courses
                        </h3>

                        <button
                            onClick={() => navigate("/instructor/courses")}
                            className="text-xs text-orange-500 font-bold hover:underline"
                        >
                            View All Courses
                        </button>

                    </div>

                    <div className="flex flex-col gap-6">

                        {ongoingCourses.length === 0 ? (

                            <div className="text-center py-10 text-gray-400">
                                No courses available.
                            </div>

                        ) : (

                            ongoingCourses.map((course) => (

                                <div
                                    key={course._id}
                                    className="flex flex-col gap-2"
                                >

                                    <div className="flex justify-between text-xs font-semibold">

                                        <span className="truncate max-w-[70%]">
                                            {course.title}
                                        </span>

                                        <span className="text-gray-400">

                                            {course.enrolledStudents || 0}
                                            {" "}
                                            Students

                                        </span>

                                    </div>

                                    <ProgressBar
                                        progress={
                                            course.averageRating
                                                ? course.averageRating * 20
                                                : 0
                                        }
                                    />

                                    <div className="flex justify-between text-[10px] text-gray-400">

                                        <span>
                                            Rating :
                                            {" "}
                                            {course.averageRating || 0}
                                            ⭐
                                        </span>

                                        <span className="font-bold text-green-600">

                                            LKR{" "}
                                            {course.pricing?.discountPrice?.toLocaleString() || 0}

                                        </span>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </Card>

                {/* Dashboard Summary */}

                <Card className="border border-gray-200 flex flex-col">

                    <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider mb-6">
                        Dashboard Summary
                    </h3>

                    <div className="space-y-5">

                        <div className="flex justify-between">

                            <span className="text-gray-500">
                                Total Reviews
                            </span>

                            <span className="font-bold">
                                {stats.totalReviews || 0}
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-gray-500">
                                Average Rating
                            </span>

                            <span className="font-bold">
                                ⭐ {stats.averageRating || 0}
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-gray-500">
                                Total Earnings
                            </span>

                            <span className="font-bold text-green-600">

                                LKR{" "}
                                {(stats.totalEarnings || 0).toLocaleString()}

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-gray-500">
                                Published Courses
                            </span>

                            <span className="font-bold">
                                {stats.publishedCourses || 0}
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-gray-500">
                                Total Students
                            </span>

                            <span className="font-bold">
                                {stats.totalStudents || 0}
                            </span>

                        </div>

                    </div>

                    <div className="mt-8">

                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => navigate("/instructor/courses")}
                        >

                            Manage Courses

                            <ChevronRight className="w-4 h-4 ml-2" />

                        </Button>

                    </div>

                </Card>

            </div>

            {/* Monthly Enrollments */}

            {/* <Card className="border border-gray-200">

                <h3 className="font-bold text-[#1e3a5f] mb-5">
                    Monthly Enrollments
                </h3>

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left py-2">
                                    Month
                                </th>

                                <th className="text-left py-2">
                                    Students
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {(dashboard?.monthly || []).map((item) => (

                                <tr
                                    key={item._id.month}
                                    className="border-b"
                                >

                                    <td className="py-3">
                                        {item._id.month}
                                    </td>

                                    <td className="py-3">
                                        {item.students}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </Card> */}

        </div>

    );

}