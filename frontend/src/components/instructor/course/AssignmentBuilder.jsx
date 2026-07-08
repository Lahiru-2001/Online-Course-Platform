import React from "react";
import {
  ClipboardList,
  FileText,
  Upload,
  Calendar,
  Award,
  File,
} from "lucide-react";

export default function AssignmentBuilder({
  lesson,
  lessonId,
  updateAssignment,
}) {
  const assignment = lesson.assignment;

  const handleFile = (e) => {
    if (!e.target.files.length) return;

    updateAssignment(
      lessonId,
      "file",
      e.target.files[0]
    );
  };

  const formatSize = (bytes) => {
    if (!bytes) return "0 KB";

    const kb = bytes / 1024;

    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`;
    }

    return `${(kb / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center">
          <ClipboardList className="text-orange-600" size={22} />
        </div>

        <div>
          <h3 className="font-bold text-slate-800">
            Lesson Assignment
          </h3>

          <p className="text-sm text-gray-500">
            Create an assignment for this lesson.
          </p>
        </div>

      </div>

      {/* Assignment Title */}

      <div className="mb-5">

        <label className="block font-semibold mb-2">
          Assignment Title
        </label>

        <input
          type="text"
          value={assignment.title}
          placeholder="Example: React Mini Project"
          onChange={(e) =>
            updateAssignment(
              lessonId,
              "title",
              e.target.value
            )
          }
          className="w-full border rounded-lg px-4 py-3 focus:border-orange-500 outline-none"
        />

      </div>

      {/* Description */}

      <div className="mb-5">

        <label className="block font-semibold mb-2">
          Assignment Description
        </label>

        <textarea
          rows="5"
          value={assignment.description}
          placeholder="Describe what students should complete..."
          onChange={(e) =>
            updateAssignment(
              lessonId,
              "description",
              e.target.value
            )
          }
          className="w-full border rounded-lg px-4 py-3 resize-none focus:border-orange-500 outline-none"
        />

      </div>

      {/* Marks & Due Date */}

      <div className="grid md:grid-cols-2 gap-5 mb-6">

        <div>

          <label className="flex items-center gap-2 font-semibold mb-2">
            <Award size={18} className="text-orange-500" />
            Total Marks
          </label>

          <input
            type="number"
            min="1"
            value={assignment.marks}
            onChange={(e) =>
              updateAssignment(
                lessonId,
                "marks",
                Number(e.target.value)
              )
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        <div>

          <label className="flex items-center gap-2 font-semibold mb-2">
            <Calendar size={18} className="text-orange-500" />
            Due Date
          </label>

          <input
            type="date"
            value={assignment.dueDate}
            onChange={(e) =>
              updateAssignment(
                lessonId,
                "dueDate",
                e.target.value
              )
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

      </div>

      {/* Upload */}

      <div className="mb-6">

        <label className="block font-semibold mb-3">
          Assignment File
        </label>

        <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition">

          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.zip,.rar,.ppt,.pptx"
            onChange={handleFile}
          />

          <Upload
            size={42}
            className="mx-auto text-orange-500 mb-3"
          />

          <h4 className="font-semibold text-slate-800">
            Upload Assignment
          </h4>

          <p className="text-sm text-gray-500 mt-2">
            Click to browse assignment instructions or starter files
          </p>

        </label>

      </div>

      {/* Uploaded File */}

      {assignment.file && (

        <div className="border rounded-xl p-4 flex justify-between items-center bg-gray-50 mb-6">

          <div className="flex items-center gap-3">

            <FileText
              size={24}
              className="text-orange-500"
            />

            <div>

              <h5 className="font-semibold">
                {assignment.file.name}
              </h5>

              <p className="text-sm text-gray-500">
                {formatSize(assignment.file.size)}
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              updateAssignment(
                lessonId,
                "file",
                null
              )
            }
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>

        </div>

      )}

      {/* Information */}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">

        <div className="flex gap-3">

          <File
            size={22}
            className="text-blue-600 mt-1"
          />

          <div>

            <h4 className="font-semibold text-blue-700 mb-2">
              Assignment Guidelines
            </h4>

            <ul className="text-sm text-blue-600 space-y-1 list-disc list-inside">

              <li>Provide clear instructions.</li>

              <li>Upload starter files if needed.</li>

              <li>Set a submission deadline.</li>

              <li>Specify the total marks.</li>

              <li>Students will submit through the LMS.</li>

              <li>Assignments contribute to course completion.</li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}