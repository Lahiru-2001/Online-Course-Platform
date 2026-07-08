import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Settings2,
  Trash,
  Search,
  Loader2,
  BookOpen,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

import {
  getCourses,
  deleteCourse,
} from "../../services/adminCourseService";

export default function CourseManagement() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const res = await getCourses();

      setCourses(res.data.courses || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);


  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Delete this course from the platform?"
    );

    if (!ok) return;

    try {
      await deleteCourse(id);
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert("Failed to delete course.");
    }
  };


  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        course.title?.toLowerCase().includes(keyword) ||
        course.category?.toLowerCase().includes(keyword) ||
        course.offeredBy?.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "All" ||
        course.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [courses, search, statusFilter]);


  const totalCourses = courses.length;

  const publishedCourses = courses.filter(
    (c) => c.status === "Published"
  ).length;

  const pendingCourses = courses.filter(
    (c) => c.status === "Pending"
  ).length;

  const rejectedCourses = courses.filter(
    (c) => c.status === "Rejected"
  ).length;


  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
      </div>
    );
  }


  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-600">
        {error}
      </div>
    );
  }
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-[#1e3a5f]">
            Course Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all courses available on the platform.
          </p>
        </div>

        {/* <Button
          onClick={() => navigate("/admin/create-course")}
          variant="primary"
          className="px-5 py-3"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button> */}

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <Card className="p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Total Courses
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {totalCourses}
              </h2>
            </div>

            <BookOpen className="w-10 h-10 text-blue-600" />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Published
              </p>

              <h2 className="text-3xl font-bold mt-2 text-green-600">
                {publishedCourses}
              </h2>
            </div>

            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </Card>

        {/* <Card className="p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Pending
              </p>

              <h2 className="text-3xl font-bold mt-2 text-yellow-500">
                {pendingCourses}
              </h2>
            </div>

            <Clock className="w-10 h-10 text-yellow-500" />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Rejected
              </p>

              <h2 className="text-3xl font-bold mt-2 text-red-500">
                {rejectedCourses}
              </h2>
            </div>

            <XCircle className="w-10 h-10 text-red-500" />
          </div>
        </Card> */}

      </div>

      {/* Search */}

      <Card className="p-5">

        <div className="flex flex-col md:flex-row gap-4">

          <div className="relative flex-1">

            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-4 py-3"
          >
            <option>All</option>
            <option>Published</option>
            <option>Pending</option>
            <option>Rejected</option>
            <option>Draft</option>
          </select>

        </div>

      </Card>

      {/* Courses */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {filteredCourses.length === 0 ? (

          <Card className="col-span-full p-10 text-center">

            <h3 className="font-semibold text-xl">
              No courses found
            </h3>

          </Card>

        ) : (

          filteredCourses.map((course) => (

            <Card
              key={course._id}
              className="overflow-hidden p-0 flex flex-col"
            >

              <img
                src={
                  course.image
                    ? `http://localhost:5000${course.image}`
                    : "/images/course-placeholder.jpg"
                }
                alt={course.title}
                className="w-full h-44 object-cover"
              />

              <div className="p-5 flex flex-col flex-1">

                <span className="text-xs uppercase font-bold tracking-widest text-orange-500">
                  {course.category}
                </span>

                <h3 className="font-bold text-lg mt-2 line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {course.offeredBy}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  ID : {course._id.slice(-6)}
                </p>

                <div className="mt-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${course.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : course.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : course.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {course.status}
                  </span>

                </div>

                <div className="mt-5 border-t pt-4 space-y-2 text-sm">

                  <div className="flex justify-between">
                    <span>Students</span>
                    <span className="font-semibold">
                      {course.enrolledStudents}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Lessons</span>
                    <span className="font-semibold">
                      {course.totalLessons}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Price</span>

                    <span className="font-bold">

                      {course.pricing?.isFree
                        ? "FREE"
                        : `${course.pricing?.currency || "LKR"} ${course.pricing?.discountPrice}`}

                    </span>

                  </div>

                </div>

                <div className="flex gap-2 mt-6">

                  {/* <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                     navigate(`/admin/edit-course/${course._id}`)
                    }
                  >
                    <Settings2 className="w-4 h-4" />
                  </Button> */}

                  <Button
                    variant="danger"
                    className="flex-1"
                    onClick={() => handleDelete(course._id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>

                </div>

              </div>

            </Card>

          ))

        )}

      </div>

    </div>
  );
}