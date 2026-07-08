import React from "react";
import {
  Trash2,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

export default function QuizQuestion({
  lessonId,
  index,
  question,

  removeQuizQuestion,

  updateQuizQuestion,
  updateQuizOption,
  updateQuizAnswer,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div className="flex items-center gap-2">

          <HelpCircle
            size={20}
            className="text-orange-500"
          />

          <h4 className="font-semibold text-slate-800">
            Question {index + 1}
          </h4>

        </div>

        <button
          type="button"
          onClick={() =>
            removeQuizQuestion(lessonId, index)
          }
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
        >
          <Trash2 size={18} />
        </button>

      </div>

      {/* Question */}

      <div className="mb-6">

        <label className="block font-medium mb-2">
          Question
        </label>

        <textarea
          rows="3"
          value={question.question}
          onChange={(e) =>
            updateQuizQuestion(
              lessonId,
              index,
              e.target.value
            )
          }
          placeholder="Enter your question..."
          className="w-full border rounded-lg px-4 py-3 resize-none focus:border-orange-500 outline-none"
        />

      </div>

      {/* Options */}

      <div className="space-y-4">

        <h5 className="font-semibold">
          Answer Options
        </h5>

        {question.options.map((option, optionIndex) => (

          <div
            key={optionIndex}
            className="flex items-center gap-4"
          >

            <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold">
              {String.fromCharCode(65 + optionIndex)}
            </span>

            <input
              type="text"
              value={option}
              placeholder={`Option ${optionIndex + 1}`}
              onChange={(e) =>
                updateQuizOption(
                  lessonId,
                  index,
                  optionIndex,
                  e.target.value
                )
              }
              className="flex-1 border rounded-lg px-4 py-3 focus:border-orange-500 outline-none"
            />

          </div>

        ))}

      </div>

      {/* Correct Answer */}

      <div className="mt-8">

        <label className="flex items-center gap-2 font-semibold mb-3">

          <CheckCircle
            size={18}
            className="text-green-600"
          />

          Correct Answer

        </label>

        <select
          value={question.answer}
          onChange={(e) =>
            updateQuizAnswer(
              lessonId,
              index,
              e.target.value
            )
          }
          className="w-full border rounded-lg px-4 py-3 focus:border-green-500 outline-none"
        >
          <option value="">
            Select Correct Answer
          </option>

          {question.options.map((option, optionIndex) => (

            <option
              key={optionIndex}
              value={option}
            >
              {String.fromCharCode(65 + optionIndex)}
              {" - "}
              {option || `Option ${optionIndex + 1}`}
            </option>

          ))}

        </select>

      </div>

      {/* Preview */}

      {question.answer && (

        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">

          <p className="text-sm text-green-700">

            <strong>Correct Answer:</strong>{" "}
            {question.answer}

          </p>

        </div>

      )}

    </div>
  );
}