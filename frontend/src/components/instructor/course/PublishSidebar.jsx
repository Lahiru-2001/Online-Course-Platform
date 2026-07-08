import React from "react";
import {
  CheckCircle,
  XCircle,
  Clock3,
  BookOpen,
  Video,
  FileText,
  Award,
  UploadCloud,
  Eye,
  Save,
  Globe,
} from "lucide-react";

export default function PublishSidebar({
  courseData,
  lessons,
  certificate,
  onPublish,
}) {
  const hasTitle = courseData.title.trim() !== "";

  const hasDescription =
    courseData.description.trim() !== "";

  const hasPrice =
    courseData.isFree ||
    Number(courseData.discountPrice) > 0;

  const hasLessons = lessons.length > 0;

  const hasVideos = lessons.some(
    (lesson) => lesson.video
  );

  const hasQuiz = lessons.some(
    (lesson) => lesson.quiz.length > 0
  );

  const hasAssignment = lessons.some(
    (lesson) => lesson.assignment.title !== ""
  );

  const completed = [
    hasTitle,
    hasDescription,
    hasPrice,
    hasLessons,
    hasVideos,
    hasQuiz,
    hasAssignment,
    certificate.enabled,
  ].filter(Boolean).length;

  const total = 8;

  const progress = Math.round(
    (completed / total) * 100
  );

  const checklist = [
    {
      label: "Course Title",
      value: hasTitle,
    },
    {
      label: "Course Description",
      value: hasDescription,
    },
    {
      label: "Pricing",
      value: hasPrice,
    },
    {
      label: "Lessons Added",
      value: hasLessons,
    },
    {
      label: "Lesson Videos",
      value: hasVideos,
    },
    {
      label: "Quiz Added",
      value: hasQuiz,
    },
    {
      label: "Assignment Added",
      value: hasAssignment,
    },
    {
      label: "Certificate",
      value: certificate.enabled,
    },
  ];

  return (
    <div className="sticky top-6 space-y-6">

      {/* Publish */}

      <div className="bg-white rounded-xl shadow border border-gray-200">

        <div className="p-6 border-b">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">

              <UploadCloud
                className="text-orange-600"
                size={24}
              />

            </div>

            <div>

              <h2 className="font-bold text-lg">
                Publish Course
              </h2>

              <p className="text-sm text-gray-500">
                Review before publishing.
              </p>

            </div>

          </div>

        </div>

        <div className="p-6">

          <div className="flex justify-between mb-2">

            <span className="text-sm font-medium">
              Completion
            </span>

            <span className="font-bold text-orange-600">
              {progress}%
            </span>

          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">

            <div
              className="bg-orange-500 h-3 rounded-full transition-all"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <p className="text-xs text-gray-500 mt-3">
            {completed} of {total} sections completed
          </p>

        </div>

      </div>

      {/* Course Summary */}

      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">

        <h3 className="font-bold mb-5">
          Course Summary
        </h3>

        <div className="space-y-4">

          <div className="flex justify-between">

            <span className="flex items-center gap-2">
              <BookOpen size={18} />
              Lessons
            </span>

            <strong>{lessons.length}</strong>

          </div>

          <div className="flex justify-between">

            <span className="flex items-center gap-2">
              <Video size={18} />
              Videos
            </span>

            <strong>
              {
                lessons.filter((l) => l.video).length
              }
            </strong>

          </div>

          <div className="flex justify-between">

            <span className="flex items-center gap-2">
              <FileText size={18} />
              Documents
            </span>

            <strong>
              {lessons.reduce(
                (total, lesson) =>
                  total + lesson.documents.length,
                0
              )}
            </strong>

          </div>

          <div className="flex justify-between">

            <span className="flex items-center gap-2">
              <Award size={18} />
              Certificate
            </span>

            <strong>
              {certificate.enabled
                ? "Enabled"
                : "Disabled"}
            </strong>

          </div>

        </div>

      </div>

      {/* Checklist */}

      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">

        <h3 className="font-bold mb-5">
          Publishing Checklist
        </h3>

        <div className="space-y-4">

          {checklist.map((item) => (

            <div
              key={item.label}
              className="flex justify-between items-center"
            >

              <span className="text-sm">
                {item.label}
              </span>

              {item.value ? (
                <CheckCircle
                  size={20}
                  className="text-green-600"
                />
              ) : (
                <XCircle
                  size={20}
                  className="text-red-500"
                />
              )}

            </div>

          ))}

        </div>

      </div>

      {/* Status */}

      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">

        <div className="flex items-center gap-3 mb-5">

          <Clock3
            className="text-orange-500"
            size={22}
          />

          <h3 className="font-bold">
            Status
          </h3>

        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">

          <p className="font-semibold text-yellow-700">
            Draft
          </p>

          <p className="text-sm text-yellow-600 mt-1">
            Your course is not visible to students until
            it is published.
          </p>

        </div>

      </div>

      {/* Actions */}

      <div className="space-y-3">

        {/* <button
          type="button"
          className="w-full flex justify-center items-center gap-2 bg-gray-200 hover:bg-gray-300 py-3 rounded-xl font-semibold"
        >
          <Save size={18} />
          Save Draft
        </button>

        <button
          type="button"
          className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          <Eye size={18} />
          Preview Course
        </button> */}

        <button
          type="button"
          onClick={onPublish}
          className="w-full flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-lg"
        >
          <Globe size={20} />
          Publish Course
        </button>

      </div>

    </div>
  );
}