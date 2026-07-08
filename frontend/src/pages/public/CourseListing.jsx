import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

import { getCourses } from "../../services/api.js";


const API_BASE_URL = "http://localhost:5000";
export default function CourseListing() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100000);

  const categories = [
    "Computer Science",
    "Business Study",
    "Data Science",
    "Health",
    "Information Technology",
    "Maths and Logic",
    "Language Learning",
    "Physical Science & Engineering",
    "Personal Development",
    "Social Science",
  ];

  const levels = ['Beginner', 'Intermediate', 'Advance'];

  const durations = [
    'less than 2 hour', 'less than 2 weeks', 'less than 3 month', 'less than 1 year', 'more than 1 year'
  ];

  useEffect(() => {

    loadCourses();

  }, []);

  const loadCourses = async () => {

    try {

      setLoading(true);

      const response = await getCourses();

      setCourses(response.data.courses || []);

    } catch (err) {

      console.error(err);

      setError("Failed to load courses.");

    } finally {

      setLoading(false);

    }

  };

  const filteredCourses = courses.filter((course) => {

    const title = course.title?.toLowerCase() || "";
    const category = course.category || "";
    const level = course.difficulty || "";
    const duration = course.duration || "";

    const price = course.pricing?.isFree
      ? 0
      : Number(course.pricing?.discountPrice || 0);

    const matchesSearch =
      title.includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(category);

    const matchesLevel =
      selectedLevel === "" ||
      selectedLevel === level;

    const matchesDuration =
      selectedDurations.length === 0 ||
      selectedDurations.includes(duration);

    const matchesPrice =
      price <= maxPrice;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLevel &&
      matchesDuration &&
      matchesPrice
    );
  });
  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-screen">
      {/* Left sidebar filters */}
      <div className="w-full lg:w-64 shrink-0 bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-6 shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <SlidersHorizontal className="w-4.5 h-4.5 text-gray-500" />
          <h3 className="text-sm font-bold text-gray-800">Filters</h3>
        </div>

        {/* Category */}
        <div>
          <h4 className="text-xs font-bold text-gray-800 mb-2">Category</h4>
          <div className="flex flex-col gap-2">
            {categories.map((cat, idx) => (
              <label key={idx} className="flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-orange-500 w-3.5 h-3.5"
                  checked={selectedCategories.includes(cat)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories([...selectedCategories, cat]);
                    } else {
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== cat)
                      );
                    }
                  }}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Level */}
        <div>
          <h4 className="text-xs font-bold text-gray-800 mb-2">Level</h4>
          <div className="flex flex-col gap-2">
            {levels.map((lvl, idx) => (
              <label key={idx} className="flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer">
                <input
                  type="radio"
                  name="level"
                  className="accent-orange-500 w-3.5 h-3.5"
                  checked={selectedLevel === lvl}
                  onChange={() => setSelectedLevel(lvl)}
                />
                <span>{lvl}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <h4 className="text-xs font-bold text-gray-800 mb-2">Duration</h4>
          <div className="flex flex-col gap-2">
            {durations.map((dur, idx) => (
              <label key={idx} className="flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-orange-500 w-3.5 h-3.5"
                  checked={selectedDurations.includes(dur)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedDurations([...selectedDurations, dur]);
                    } else {
                      setSelectedDurations(
                        selectedDurations.filter((d) => d !== dur)
                      );
                    }
                  }}
                />
                <span>{dur}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div>
          <h4 className="text-xs font-bold text-gray-800 mb-2">Price</h4>
          <input
            type="range"
            min="0"
            max="100000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>Free</span>
            <span>Rs. {maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Right panel: Course listing */}
      <div className="flex-grow flex flex-col gap-6">
        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-white outline-none focus:border-orange-500"
          />

          <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
        </div>
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto"></div>

              <p className="mt-4 text-gray-500 font-medium">
                Loading courses...
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-red-600 font-semibold">
              {error}
            </h3>

            <button
              onClick={loadCourses}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <Card
                  key={course._id}
                  onClick={() => {
                    const isStudent = window.location.pathname.startsWith("/student");

                    navigate(
                      isStudent
                        ? `/student/courses/${course._id}`
                        : `/courses/${course._id}`
                    );
                  }}
                  className="flex flex-col h-full justify-between hover:-translate-y-1 transition-all p-0 overflow-hidden border border-gray-200 shadow-sm cursor-pointer"
                >
                  <img
                    src={
                      course.image
                        ? `${API_BASE_URL}${course.image}`
                        : "https://placehold.co/600x400?text=No+Course+Image"
                    }
                    alt={course.title}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/600x400?text=No+Course+Image";
                    }}
                  />

                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase">
                        {course.offeredBy}
                      </span>

                      <h3 className="font-bold text-[#1e3a5f] text-xs mt-1 line-clamp-2 min-h-[32px]">
                        {course.title}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-[10px]">
                      <span className="text-gray-500 font-medium">
                        {course.duration}
                      </span>

                      <span className="font-bold text-orange-500">
                        {course.pricing?.isFree
                          ? "FREE"
                          : `${course.pricing?.currency || "LKR"} ${course.pricing?.discountPrice ?? 0
                          }`}
                      </span>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-gray-500">
                No courses match your filters.
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {/* Pagination */}
        {!loading && !error && filteredCourses.length > 0 && (
          <div className="flex justify-end items-center gap-1.5 mt-4 text-xs font-semibold">
            <button className="px-3 py-1.5 rounded border border-gray-200 text-gray-400 hover:bg-gray-50 cursor-pointer">
              Previous
            </button>

            <button className="px-3.5 py-1.5 rounded bg-orange-500 text-white font-bold">
              1
            </button>

            <button className="px-3.5 py-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">
              2
            </button>

            <button className="px-3.5 py-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">
              3
            </button>

            <span className="px-2 text-gray-400">...</span>

            <button className="px-3.5 py-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">
              108
            </button>

            <button className="px-3 py-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
