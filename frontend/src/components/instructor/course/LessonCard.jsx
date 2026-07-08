import React from "react";
import {
  BookOpen,
  Trash2,
  Video,
  FolderOpen,
  ClipboardCheck,
} from "lucide-react";

import LessonVideoUpload from "./LessonVideoUpload";
import LessonDocuments from "./LessonDocuments";
import QuizBuilder from "./QuizBuilder";
import AssignmentBuilder from "./AssignmentBuilder";

export default function LessonCard({
  lesson,
  lessonIndex,
  totalLessons,

  removeLesson,
  updateLessonTitle,

  updateLessonVideo,

  addLessonDocument,
  removeLessonDocument,

  addQuizQuestion,
  removeQuizQuestion,

  updateAssignment,
}) {
  return (
    <div className="border border-gray-200 rounded-xl bg-gray-50 p-6">

      {/* Lesson Header */}

      <div className="flex justify-between items-center mb-6">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <BookOpen className="text-orange-600" size={20} />
          </div>

          <div>

            <h3 className="font-bold text-lg text-slate-800">
              Lesson {lessonIndex + 1}
            </h3>

            <p className="text-sm text-gray-500">
              Add lesson resources
            </p>

          </div>

        </div>

        {totalLessons > 1 && (
          <button
            type="button"
            onClick={() => removeLesson(lesson.id)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
          >
            <Trash2 size={18} />
          </button>
        )}

      </div>

      {/* Lesson Title */}

      <div className="mb-8">

        <label className="block font-semibold mb-2">
          Lesson Title
        </label>

        <input
          type="text"
          value={lesson.title}
          onChange={(e) =>
            updateLessonTitle(lesson.id, e.target.value)
          }
          placeholder="Example : Introduction to React"
          className="w-full border rounded-lg px-4 py-3 focus:border-orange-500 outline-none"
        />

      </div>

      {/* Video */}

      <div className="mb-8">

        <div className="flex items-center gap-2 mb-3">

          <Video size={20} className="text-orange-500" />

          <h4 className="font-semibold">
            Lesson Video
          </h4>

        </div>

        <LessonVideoUpload
          lesson={lesson}
          updateLessonVideo={updateLessonVideo}
        />

      </div>

      {/* Documents */}

      <div className="mb-8">

        <div className="flex items-center gap-2 mb-3">

          <FolderOpen size={20} className="text-orange-500" />

          <h4 className="font-semibold">
            Lesson Documents
          </h4>

        </div>

        <LessonDocuments
          lesson={lesson}
          addLessonDocument={addLessonDocument}
          removeLessonDocument={removeLessonDocument}
        />

      </div>

      {/* Quiz */}

      <div className="mb-8">

        <div className="flex items-center gap-2 mb-3">

          <ClipboardCheck
            size={20}
            className="text-orange-500"
          />

          <h4 className="font-semibold">
            Quiz
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
  );
}