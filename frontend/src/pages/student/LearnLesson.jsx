import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Download, CheckCircle, PlayCircle,
  FileText, FolderArchive, CheckCircle2
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';

import {
  getEnrollment,
  updateProgress,
} from "../../services/api";

const API_URL = "http://localhost:5000";

export default function LearnLesson() {

  const { courseId } = useParams();
  const navigate = useNavigate();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [notes, setNotes] = useState("");

  const [enrollment, setEnrollment] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(1);
  const [progress, setProgress] = useState(0);

  // Derived values
  const lesson =
    enrollment?.course?.lessons?.[currentLesson - 1];

  const video = lesson?.video;

  const documents = lesson?.documents || [];

  const quiz = lesson?.quiz || [];

  const assignment = lesson?.assignment;

  const lessonCount =
    enrollment?.course?.lessons?.length || 0;

  const currentQuiz = quiz[0];

  const quizOptions =
    currentQuiz?.options || [];

  useEffect(() => {

    loadEnrollment();

  }, []);

  const loadEnrollment = async () => {

    try {

      const res = await getEnrollment(courseId);

      setEnrollment(res.data.enrollment);

      setCurrentLesson(
        res.data.enrollment.currentLesson || 1
      );

      setProgress(
        res.data.enrollment.progress || 0
      );

    }

    catch (err) {

      console.log(err);

    }

  };

  const handleCompleteLesson = async () => {

    if (!enrollment) return;

    const totalLessons =
      enrollment.course.lessons.length;

    const completedLessons = [

      ...new Set([
        ...enrollment.completedLessons,
        currentLesson
      ])

    ];

    const newProgress = Math.round(

      (completedLessons.length / totalLessons) * 100

    );

    try {

      await updateProgress(courseId, {

        currentLesson:
          Math.min(currentLesson + 1, totalLessons),

        completedLessons,

        progress: newProgress

      });

      if (newProgress >= 100) {

        alert("Congratulations! Course Completed.");

        navigate(
          `/student/course/${courseId}/completed`
        );

        return;

      }

      alert("Lesson Completed.");

      window.location.reload();

    }

    catch (err) {

      console.log(err);

      alert("Unable to update progress.");

    }

  };

  const handleSubmitQuiz = () => {

    if (
      selectedAnswer === currentQuiz.answer
    ) {

      alert("Correct Answer");

    } else {

      alert("Wrong Answer");

    }

    setQuizSubmitted(true);

  };
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      {/* Main Video Player Area */}
      <Card className="p-0 overflow-hidden border border-gray-200 shadow-sm">

        <img
          src={
            enrollment?.course?.image
              ? API_URL + enrollment.course.image
              : "https://placehold.co/1200x600"
          }
          alt={enrollment?.course?.title}
          className="w-full h-[420px] object-cover"
        />

        <div className="p-6">
          <h2 className="text-3xl font-bold">
            {lesson?.title}
          </h2>

          <p className="text-gray-500 mt-2">
            {enrollment?.course?.title}
          </p>

          <ProgressBar progress={progress} />
        </div>

      </Card>

      {/* Content Grid: Video Lesson + Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Video Lesson Thumbnail */}
        <Card className="p-0 overflow-hidden border border-gray-200">
          <div className="p-4 bg-gray-50/50 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wider">Video Lesson</h3>
          </div>
          <div className="bg-slate-950 aspect-video flex items-center justify-center text-gray-400 relative">
            {video?.fileUrl ? (
              <video
                controls
                className="w-full aspect-video bg-black"
              >
                <source
                  src={API_URL + video.fileUrl}
                  type="video/mp4"
                />
              </video>
            ) : (
              <div className="bg-slate-950 aspect-video flex items-center justify-center">
                No Video
              </div>
            )}
          </div>
        </Card>

        {/* Documents */}
        <Card className="border border-gray-200">
          <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider mb-4">Documents</h3>
          <div className="flex flex-col gap-3">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3.5 bg-gray-50 border rounded-xl"
              >

                <div className="flex items-center gap-3">

                  <FileText className="w-5 h-5 text-red-500" />

                  <span>

                    {doc.fileName}

                  </span>

                </div>

                <a
                  href={API_URL + doc.fileUrl}
                  download
                >

                  <Download className="w-5 h-5" />

                </a>

              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quiz + My Notes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quiz Card */}
        <Card className="border border-gray-200">
          <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider mb-5">Quiz</h3>

          {!quizSubmitted ? (
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold text-gray-800">

                {currentQuiz?.question}

              </p>
              <div className="flex flex-col gap-2.5">
                {quizOptions.map((option, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      checked={selectedAnswer === option}
                      onChange={() => setSelectedAnswer(option)}
                    />

                    {option}

                  </label>
                ))}
              </div>
              <div className="flex justify-between items-center mt-2">
                <Button onClick={handleSubmitQuiz} variant="teal" className="py-2 px-5 text-[10px] font-bold uppercase">
                  Submit
                </Button>
                <Button variant="primary" className="py-2 px-5 text-[10px] font-bold uppercase">
                  Next Quiz
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 text-lg">Answer Submitted!</h4>
              <p className="text-xs text-gray-500 mt-1">Your response has been recorded.</p>
            </div>
          )}
        </Card>
      </div>

      {/* Assignments Card */}
      <Card className="border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider">Assignments</h3>
          <span className="px-2 py-0.5 text-[9px] font-bold bg-green-100 text-green-700 rounded uppercase border border-green-200">On Progress</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-gray-50/50 border border-gray-200 rounded-xl p-4">
          <div>
            <h4 className="font-bold text-gray-800 text-xs">{assignment?.title}</h4>
            <div className="flex items-center gap-2 mt-2.5">
              <FileText className="w-4 h-4 text-red-500" />
              <span className="text-[10px] text-gray-500 font-medium">{assignment?.file?.fileName}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] text-gray-400">{assignment?.dueDate
              ? new Date(assignment.dueDate)
                .toLocaleDateString()
              : "No Due Date"}</span>

            <a
              href={API_URL + assignment?.file?.fileUrl}
              download
            >

              <Button>

                Download

              </Button>

            </a>
          </div>
        </div>
      </Card>

      {/* Bottom Navigation Buttons */}
      <div className="flex justify-between items-center mt-2">
        <Button
          onClick={() =>
            setCurrentLesson(
              Math.max(1, currentLesson - 1)
            )}
          variant="teal"
          className="py-3 px-6 font-bold text-xs uppercase"
        >
          <ArrowLeft className="w-4 h-4" /> Previous Lesson
        </Button>
        <Button
          onClick={handleCompleteLesson}
          className="py-3 px-6 font-bold text-xs uppercase bg-orange-500 text-white hover:bg-orange-600"
        >
          Mark Lesson as Completed
        </Button>
        <Button
          onClick={() =>
            setCurrentLesson(
              Math.min(
                lessonCount,
                currentLesson + 1
              )
            )}
          variant="primary"
          className="py-3 px-6 font-bold text-xs uppercase"
        >
          Next Lesson <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
