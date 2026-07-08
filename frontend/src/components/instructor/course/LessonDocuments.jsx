import React from "react";
import {
  Upload,
  Trash2,
  FileText,
  FileArchive,
  FileSpreadsheet,
  FileImage,
  FileCode,
  File,
} from "lucide-react";

export default function LessonDocuments({
  lesson,
  addLessonDocument,
  removeLessonDocument,
}) {
  const handleUpload = (e) => {
    if (!e.target.files.length) return;

    Array.from(e.target.files).forEach((file) => {
      addLessonDocument(lesson.id, file);
    });

    e.target.value = "";
  };

  const formatSize = (bytes) => {
    if (!bytes) return "0 KB";

    const kb = bytes / 1024;

    if (kb < 1024) return `${kb.toFixed(1)} KB`;

    return `${(kb / 1024).toFixed(2)} MB`;
  };

  const getIcon = (name) => {
    const ext = name.split(".").pop().toLowerCase();

    switch (ext) {
      case "pdf":
        return <FileText className="text-red-500" size={22} />;

      case "doc":
      case "docx":
        return <FileText className="text-blue-600" size={22} />;

      case "ppt":
      case "pptx":
        return <FileText className="text-orange-500" size={22} />;

      case "xls":
      case "xlsx":
      case "csv":
        return (
          <FileSpreadsheet
            className="text-green-600"
            size={22}
          />
        );

      case "zip":
      case "rar":
      case "7z":
        return (
          <FileArchive
            className="text-yellow-600"
            size={22}
          />
        );

      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "webp":
        return (
          <FileImage
            className="text-purple-600"
            size={22}
          />
        );

      case "js":
      case "jsx":
      case "java":
      case "py":
      case "cpp":
      case "c":
      case "html":
      case "css":
        return (
          <FileCode
            className="text-indigo-600"
            size={22}
          />
        );

      default:
        return (
          <File
            className="text-gray-600"
            size={22}
          />
        );
    }
  };

  return (
    <div className="space-y-5">

      {/* Upload Area */}

      <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition">

        <input
          type="file"
          multiple
          className="hidden"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv,.zip,.rar,.7z,.txt,.jpg,.jpeg,.png,.webp"
          onChange={handleUpload}
        />

        <Upload
          size={42}
          className="mx-auto text-orange-500 mb-3"
        />

        <h4 className="text-lg font-semibold text-slate-800">
          Upload Lesson Resources
        </h4>

        <p className="text-sm text-gray-500 mt-2">
          Click to select one or more files
        </p>

        <p className="text-xs text-gray-400 mt-3">
          PDF • DOCX • PPT • XLS • ZIP • Images • TXT
        </p>

      </label>

      {/* Document List */}

      {lesson.documents.length > 0 && (

        <div className="space-y-3">

          {lesson.documents.map((doc, index) => (

            <div
              key={index}
              className="flex justify-between items-center bg-white border rounded-xl p-4"
            >

              <div className="flex items-center gap-4">

                {getIcon(doc.name)}

                <div>

                  <h5 className="font-medium text-slate-800">
                    {doc.name}
                  </h5>

                  <p className="text-sm text-gray-500">
                    {formatSize(doc.size)}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  removeLessonDocument(
                    lesson.id,
                    index
                  )
                }
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
              >
                <Trash2 size={18} />
              </button>

            </div>

          ))}

        </div>

      )}

      {/* Information */}

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">

        <h5 className="font-semibold text-blue-700 mb-2">
          Supported Learning Resources
        </h5>

        <ul className="text-sm text-blue-600 list-disc list-inside space-y-1">
          <li>Lecture Notes (PDF)</li>
          <li>Presentation Slides (PPT/PPTX)</li>
          <li>Assignments & Worksheets</li>
          <li>Datasets (CSV/XLSX)</li>
          <li>Source Code (ZIP)</li>
          <li>Reference Materials</li>
          <li>Images & Diagrams</li>
        </ul>

      </div>

    </div>
  );
}