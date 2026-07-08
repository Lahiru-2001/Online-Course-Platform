import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pencil,
  Plus,
  Trash2,
  Eye,
  Star,
  Users,
  Loader2,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

import {
  getInstructorCourses,
  deleteCourse,
} from "../../services/courseApi";

const BASE_URL = "http://localhost:5000";

export default function ManageCourses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadCourses = async () => {
    try {
      setLoading(true);

      const res = await getInstructorCourses();

      setCourses(res.data.courses || []);
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
        "Failed to load instructor courses."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await deleteCourse(id);

      setCourses((prev) =>
        prev.filter((course) => course._id !== id)
      );

      alert("Course deleted successfully.");
    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
        "Unable to delete course."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#184B65]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 min-h-screen bg-gray-50/40">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-2xl font-bold text-[#184B65]">
            Manage Courses
          </h1>

          <p className="text-gray-500 text-sm">
            View, edit and delete your published courses.
          </p>

        </div>

        <Button
          onClick={() =>
            navigate("/instructor/create-course")
          }
        >
          <Plus className="w-4 h-4" />
          Create Course
        </Button>

      </div>

      {/* Empty */}

      {!courses.length ? (
        <Card className="py-20 flex flex-col items-center">

          <h2 className="text-lg font-bold text-gray-700">
            No Courses Found
          </h2>

          <p className="text-gray-500 mt-2">
            You haven't created any courses yet.
          </p>

          <Button
            className="mt-6"
            onClick={() =>
              navigate("/instructor/create-course")
            }
          >
            <Plus className="w-4 h-4" />
            Create First Course
          </Button>

        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

          {courses.map((course) => (

            <Card
              key={course._id}
              className="overflow-hidden p-0"
            >

              {/* Image */}

              <div className="relative">

                <img
                  src={
                    course.image
                      ? BASE_URL + course.image
                      : "https://placehold.co/600x400?text=Course"
                  }
                  alt={course.title}
                  className="w-full h-52 object-cover"
                />

                <span className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">

                  {course.status}

                </span>

              </div>

              {/* Content */}

              <div className="p-5 space-y-4">

                <h3 className="font-bold text-lg text-[#184B65] line-clamp-2">

                  {course.title}

                </h3>

                <p className="text-sm text-gray-500">

                  {course.category}

                </p>

                <div className="flex justify-between text-sm">

                  <div className="flex items-center gap-2">

                    <Users size={18} />

                    {course.enrolledStudents}

                  </div>

                  <div className="flex items-center gap-2">

                    <Star
                      size={18}
                      className="text-yellow-500"
                    />

                    {course.averageRating}

                  </div>

                </div>

                <div className="text-sm">

                  <strong>Price :</strong>{" "}

                  {course.pricing?.isFree
                    ? "Free"
                    : `${course.pricing?.currency} ${course.pricing?.discountPrice}`}

                </div>

                <div className="text-sm">

                  <strong>Lessons :</strong>

                  {" "}

                  {course.totalLessons}

                </div>

                {/* Buttons */}

                <div className="grid grid-cols-3 gap-2 pt-3">



                  <Button
                    className="bg-[#184B65]"
                    onClick={() =>
                      navigate(
                        `/instructor/edit-course/${course._id}`
                      )
                    }
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className="border-red-400 text-red-600"
                    disabled={deletingId === course._id}
                    onClick={() =>
                      handleDelete(course._id)
                    }
                  >
                    {deletingId === course._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>

                </div>

              </div>

            </Card>

          ))}

        </div>
      )}
    </div>
  );
}