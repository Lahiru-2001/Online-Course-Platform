import React from "react";
import { ImagePlus, Plus, Trash2 } from "lucide-react";

export default function BasicInfoForm({
  courseData,
  setCourseData,
  courseImage,
  setCourseImage,
  courseIncludes,
  setCourseIncludes,
}) {
  const categories = [
    "Computer Science",
    "Business Study",
    "Data Science",
    "Information Technology",
    "Health",
    "Maths and Logic",
    "Language Learning",
    "Physical Science & Engineering",
    "Personal Development",
    "Social Science",
  ];

  const universities = [
    "University of Moratuwa",
    "University of Colombo",
    "University of Kelaniya",
    "University of Peradeniya",
    "University of Sri Jayewardenepura",
    "Open University of Sri Lanka",
    "SLIIT",
    "NSBM",
    "NIBM",
    "ESOFT",
    "OpenAI",
    "Google",
    "Microsoft",
    "Other",
  ];

  const durations = [
    "2 Hours",
    "5 Hours",
    "10 Hours",
    "20 Hours",
    "1 Week",
    "2 Weeks",
    "1 Month",
    "2 Months",
    "3 Months",
    "6 Months",
    "1 Year",
  ];

  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleImage = (e) => {
    if (e.target.files.length > 0) {
      setCourseImage(e.target.files[0]);
    }
  };

  const addInclude = () => {
    setCourseIncludes([...courseIncludes, ""]);
  };

  const removeInclude = (index) => {
    const updated = [...courseIncludes];
    updated.splice(index, 1);
    setCourseIncludes(updated);
  };

  const updateInclude = (value, index) => {
    const updated = [...courseIncludes];
    updated[index] = value;
    setCourseIncludes(updated);
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">

      {/* Header */}

      <div className="flex items-center gap-3 border-b pb-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
          01
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Basic Information
          </h2>

          <p className="text-sm text-gray-500">
            Fill course basic details.
          </p>
        </div>
      </div>

      {/* Course Image */}

      <div className="mb-8">

        <label className="block font-semibold mb-3">
          Course Thumbnail
        </label>

        <div className="flex flex-col md:flex-row gap-5">

          <div className="w-72 aspect-video rounded-lg border overflow-hidden bg-gray-100">

            {courseImage ? (
              <img
                src={URL.createObjectURL(courseImage)}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex justify-center items-center h-full text-gray-400">
                <ImagePlus size={60} />
              </div>
            )}

          </div>

          <div className="flex flex-col justify-center gap-3">

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />

            <p className="text-xs text-gray-500">
              Recommended Size : 1280 × 720
            </p>

            <p className="text-xs text-gray-500">
              JPG, PNG, WEBP
            </p>

          </div>

        </div>

      </div>

      {/* Course Title */}

      <div className="mb-5">

        <label className="block font-semibold mb-2">
          Course Title
        </label>

        <input
          type="text"
          name="title"
          value={courseData.title}
          onChange={handleChange}
          placeholder="Enter Course Title"
          className="w-full border rounded-lg px-4 py-3 outline-none focus:border-orange-500"
        />

      </div>

      {/* Category */}

      <div className="grid md:grid-cols-2 gap-5 mb-5">

        <div>

          <label className="block font-semibold mb-2">
            Category
          </label>

          <select
            name="category"
            value={courseData.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

        </div>

        <div>

          <label className="block font-semibold mb-2">
            Difficulty Level
          </label>

          <select
            name="difficulty"
            value={courseData.difficulty}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            {difficulties.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

        </div>

      </div>

      {/* Duration + Offered By */}

      <div className="grid md:grid-cols-2 gap-5 mb-5">

        <div>

          <label className="block font-semibold mb-2">
            Duration
          </label>

          <select
            name="duration"
            value={courseData.duration}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            {durations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

        </div>

        <div>

          <label className="block font-semibold mb-2">
            Offered By
          </label>

          <select
            name="offeredBy"
            value={courseData.offeredBy}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            {universities.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

        </div>

      </div>

      {/* Description */}

      <div className="mb-6">

        <label className="block font-semibold mb-2">
          Course Description
        </label>

        <textarea
          rows="6"
          name="description"
          value={courseData.description}
          onChange={handleChange}
          placeholder="Write course description..."
          className="w-full border rounded-lg px-4 py-3 resize-none"
        />

      </div>

      {/* Course Includes */}

      <div>

        <div className="flex justify-between items-center mb-4">

          <h3 className="font-bold text-lg">
            Course Includes
          </h3>

          <button
            type="button"
            onClick={addInclude}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} />
            Add Item
          </button>

        </div>

        <div className="space-y-3">

          {courseIncludes.map((item, index) => (

            <div
              key={index}
              className="flex gap-3"
            >

              <input
                type="text"
                value={item}
                onChange={(e) =>
                  updateInclude(e.target.value, index)
                }
                placeholder="Example : Certificate of Completion"
                className="flex-1 border rounded-lg px-4 py-3"
              />

              <button
                type="button"
                onClick={() => removeInclude(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 rounded-lg"
              >
                <Trash2 size={18} />
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}