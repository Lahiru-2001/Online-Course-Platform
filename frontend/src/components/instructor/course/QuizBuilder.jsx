import React from "react";
import { Plus, HelpCircle } from "lucide-react";

import QuizQuestion from "./QuizQuestion";

export default function QuizBuilder({
  lesson,
  lessonId,

  addQuizQuestion,
  removeQuizQuestion,

  updateQuizQuestion,
  updateQuizOption,
  updateQuizAnswer,
}) {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-2">

          <HelpCircle
            size={22}
            className="text-orange-500"
          />

          <div>

            <h4 className="font-semibold text-slate-800">
              Lesson Quiz
            </h4>

            <p className="text-sm text-gray-500">
              Add multiple-choice questions for this lesson.
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={() => addQuizQuestion(lessonId)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add Question
        </button>

      </div>

      {/* Empty State */}

      {lesson.quiz.length === 0 && (

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">

          <HelpCircle
            size={45}
            className="mx-auto text-gray-400 mb-3"
          />

          <h5 className="font-semibold text-gray-700">
            No Quiz Questions
          </h5>

          <p className="text-sm text-gray-500 mt-2">
            Click "Add Question" to create your first quiz question.
          </p>

        </div>

      )}

      {/* Questions */}

      <div className="space-y-6">

        {lesson.quiz.map((question, index) => (

          <QuizQuestion
            key={index}

            lessonId={lessonId}

            index={index}

            question={question}

            removeQuizQuestion={removeQuizQuestion}

            updateQuizQuestion={updateQuizQuestion}

            updateQuizOption={updateQuizOption}

            updateQuizAnswer={updateQuizAnswer}
          />

        ))}

      </div>

    </div>
  );
}