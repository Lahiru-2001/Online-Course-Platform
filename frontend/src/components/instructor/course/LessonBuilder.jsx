import React from "react";
import {
  BookOpen,
  Plus,
  Trash2,
  Video,
  FileText,
  ClipboardCheck,
  FolderOpen,
} from "lucide-react";

import QuizBuilder from "./QuizBuilder";
import AssignmentBuilder from "./AssignmentBuilder";

export default function LessonBuilder({
    lessons,
    addLesson,
    removeLesson,
    updateLessonTitle,
    updateLessonVideo,
    addLessonDocument,
    removeLessonDocument,

    addQuizQuestion,
    removeQuizQuestion,

    updateQuizQuestion,
    updateQuizOption,
    updateQuizAnswer,

    updateAssignment,
}) {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">

      {/* Header */}

      <div className="flex justify-between items-center border-b pb-4 mb-6">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
            02
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Course Lessons
            </h2>

            <p className="text-sm text-gray-500">
              Add lessons, videos, documents, quizzes and assignments.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={addLesson}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add Lesson
        </button>

      </div>

      {/* Lesson List */}

      <div className="space-y-8">

        {lessons.map((lesson, lessonIndex) => (

          <div
            key={lesson.id}
            className="border rounded-xl p-5 bg-gray-50"
          >

            {/* Lesson Header */}

            <div className="flex justify-between items-center mb-5">

              <div className="flex items-center gap-3">

                <BookOpen className="text-orange-500" />

                <h3 className="font-bold text-lg">
                  Lesson {lessonIndex + 1}
                </h3>

              </div>

              {lessons.length > 1 && (
                <button
                  onClick={() => removeLesson(lesson.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              )}

            </div>

            {/* Lesson Title */}

            <div className="mb-6">

              <label className="block font-semibold mb-2">
                Lesson Title
              </label>

              <input
                type="text"
                value={lesson.title}
                onChange={(e) =>
                  updateLessonTitle(lesson.id, e.target.value)
                }
                placeholder="Introduction to Course"
                className="w-full border rounded-lg px-4 py-3"
              />

            </div>

            {/* Video */}

            <div className="mb-6">

              <div className="flex items-center gap-2 mb-3">

                <Video size={20} />

                <h4 className="font-semibold">
                  Lesson Video
                </h4>

              </div>

              <input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  updateLessonVideo(
                    lesson.id,
                    e.target.files[0]
                  )
                }
              />

              {lesson.video && (
                <p className="text-green-600 mt-2 text-sm">
                  {lesson.video.name}
                </p>
              )}

            </div>

            {/* Documents */}

            <div className="mb-6">

              <div className="flex items-center gap-2 mb-3">

                <FolderOpen size={20} />

                <h4 className="font-semibold">
                  Lesson Documents
                </h4>

              </div>

              <input
                type="file"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);

                  files.forEach((file) =>
                    addLessonDocument(lesson.id, file)
                  );
                }}
              />

              {lesson.documents.length > 0 && (

                <div className="mt-4 space-y-2">

                  {lesson.documents.map((doc, index) => (

                    <div
                      key={index}
                      className="flex justify-between items-center bg-white border rounded-lg px-4 py-2"
                    >

                      <div className="flex items-center gap-2">

                        <FileText size={18} />

                        <span className="text-sm">
                          {doc.name}
                        </span>

                      </div>

                      <button
                        onClick={() =>
                          removeLessonDocument(
                            lesson.id,
                            index
                          )
                        }
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  ))}

                </div>

              )}

            </div>

            {/* Quiz */}

            <div className="mb-6">

              <div className="flex items-center gap-2 mb-3">

                <ClipboardCheck size={20} />

                <h4 className="font-semibold">
                  Lesson Quiz
                </h4>

              </div>

              <QuizBuilder
                lesson={lesson}
                lessonId={lesson.id}

                addQuizQuestion={addQuizQuestion}
                removeQuizQuestion={removeQuizQuestion}

                updateQuizQuestion={updateQuizQuestion}
                updateQuizOption={updateQuizOption}
                updateQuizAnswer={updateQuizAnswer}
              />
            </div>

            {/* Assignment */}

            <AssignmentBuilder
              lesson={lesson}
              lessonId={lesson.id}
              updateAssignment={updateAssignment}
            />

          </div>

        ))}

      </div>

    </div>
  );
}