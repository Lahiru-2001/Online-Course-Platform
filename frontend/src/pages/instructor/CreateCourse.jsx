import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import BasicInfoForm from "../../components/instructor/course/BasicInfoForm";

// These components will be created in the next parts
import LessonBuilder from "../../components/instructor/course/LessonBuilder";
import PricingForm from "../../components/instructor/course/PricingForm";
import CertificateBuilder from "../../components/instructor/course/CertificateBuilder";
import PublishSidebar from "../../components/instructor/course/PublishSidebar";

export default function CreateCourse() {
  const navigate = useNavigate();

  const [courseImage, setCourseImage] = useState(null);

  const [courseData, setCourseData] = useState({
    title: "",
    category: "Computer Science",
    difficulty: "Beginner",
    duration: "3 Months",
    offeredBy: "University of Moratuwa",
    description: "",

    isFree: false,
    originalPrice: "",
    discountPrice: "",
  });

  const [courseIncludes, setCourseIncludes] = useState([
    "Certificate of Completion",
    "Lifetime Access",
    "Downloadable Resources",
    "Assignments",
    "Quizzes",
  ]);

  const [lessons, setLessons] = useState([
    {
      id: 1,

      title: "Introduction",

      video: null,

      documents: [],

      quiz: [],

      assignment: {
        title: "",
        description: "",
        marks: 100,
        dueDate: "",
        file: null,
      },
    },
  ]);

  const [certificate, setCertificate] = useState({
    enabled: true,

    type: "Completion",

    template: "University",

    logo: null,

    signature: null,

    background: null,
  });

  const addLesson = () => {
    setLessons([
      ...lessons,
      {
        id: Date.now(),

        title: "",

        video: null,

        documents: [],

        quiz: [],

        assignment: {
          title: "",
          description: "",
          marks: 100,
          dueDate: "",
          file: null,
        },
      },
    ]);
  };


  const removeLesson = (id) => {
    setLessons(lessons.filter((lesson) => lesson.id !== id));
  };

  const updateLessonTitle = (id, value) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === id
          ? {
            ...lesson,
            title: value,
          }
          : lesson
      )
    );
  };

  const updateLessonVideo = (id, file) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === id
          ? {
            ...lesson,
            video: file,
          }
          : lesson
      )
    );
  };

  const addLessonDocument = (lessonId, file) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === lessonId
          ? {
            ...lesson,
            documents: [...lesson.documents, file],
          }
          : lesson
      )
    );
  };

  const removeLessonDocument = (lessonId, index) => {
    setLessons(
      lessons.map((lesson) => {
        if (lesson.id !== lessonId) return lesson;

        const docs = [...lesson.documents];

        docs.splice(index, 1);

        return {
          ...lesson,
          documents: docs,
        };
      })
    );
  };

  const addQuizQuestion = (lessonId) => {
    setLessons(
      lessons.map((lesson) => {
        if (lesson.id !== lessonId) return lesson;

        return {
          ...lesson,

          quiz: [
            ...lesson.quiz,
            {
              question: "",

              options: ["", "", "", ""],

              answer: "",
            },
          ],
        };
      })
    );
  };

  const removeQuizQuestion = (lessonId, index) => {
    setLessons(
      lessons.map((lesson) => {
        if (lesson.id !== lessonId) return lesson;

        const quiz = [...lesson.quiz];

        quiz.splice(index, 1);

        return {
          ...lesson,
          quiz,
        };
      })
    );
  };

  const updateQuizQuestion = (lessonId, index, value) => {
    setLessons(
      lessons.map((lesson) => {
        if (lesson.id !== lessonId) return lesson;

        const quiz = [...lesson.quiz];

        quiz[index].question = value;

        return {
          ...lesson,
          quiz,
        };
      })
    );
  };

  const updateQuizOption = (lessonId, questionIndex, optionIndex, value) => {
    setLessons(
      lessons.map((lesson) => {
        if (lesson.id !== lessonId) return lesson;

        const quiz = [...lesson.quiz];

        quiz[questionIndex].options[optionIndex] = value;

        return {
          ...lesson,
          quiz,
        };
      })
    );
  };

  const updateQuizAnswer = (lessonId, questionIndex, value) => {
    setLessons(
      lessons.map((lesson) => {
        if (lesson.id !== lessonId) return lesson;

        const quiz = [...lesson.quiz];

        quiz[questionIndex].answer = value;

        return {
          ...lesson,
          quiz,
        };
      })
    );
  };

  const updateAssignment = (lessonId, field, value) => {
    setLessons(
      lessons.map((lesson) => {
        if (lesson.id !== lessonId) return lesson;

        return {
          ...lesson,

          assignment: {
            ...lesson.assignment,
            [field]: value,
          },
        };
      })
    );
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("title", courseData.title);
      formData.append("description", courseData.description);
      formData.append("category", courseData.category);
      formData.append("difficulty", courseData.difficulty);
      formData.append("duration", courseData.duration);
      formData.append("offeredBy", courseData.offeredBy);

      formData.append(
        "pricing",
        JSON.stringify({
          isFree: courseData.isFree,
          originalPrice: Number(courseData.originalPrice || 0),
          discountPrice: Number(courseData.discountPrice || 0),
          currency: "LKR",
        })
      );

      formData.append(
        "courseIncludes",
        JSON.stringify(courseIncludes)
      );

      if (courseImage) {
        formData.append("courseImage", courseImage);
      }

      const lessonData = lessons.map((lesson) => ({
        title: lesson.title,
        quiz: lesson.quiz,
        assignment: {
          title: lesson.assignment.title,
          description: lesson.assignment.description,
          marks: lesson.assignment.marks,
          dueDate: lesson.assignment.dueDate,
        },
      }));

      formData.append("lessons", JSON.stringify(lessonData));

      lessons.forEach((lesson, index) => {

        // Video
        if (lesson.video) {
          formData.append(`lessonVideo${index}`, lesson.video);
        }

        // Documents
        lesson.documents.forEach((doc) => {
          formData.append(`lessonDocument${index}`, doc);
        });

        // Assignment File
        if (lesson.assignment.file) {
          formData.append(
            `assignmentFile${index}`,
            lesson.assignment.file
          );
        }

      });

      formData.append(
        "certificate",
        JSON.stringify({
          enabled: certificate.enabled,
          type: certificate.type,
          template: certificate.template,
        })
      );

      if (certificate.logo) {
        formData.append(
          "certificateLogo",
          certificate.logo
        );
      }

      if (certificate.signature) {
        formData.append(
          "certificateSignature",
          certificate.signature
        );
      }

      if (certificate.background) {
        formData.append(
          "certificateBackground",
          certificate.background
        );
      }

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/courses",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Course created successfully!");

      navigate("/instructor/courses");

    } catch (error) {
      console.error(error);
      alert("Failed to create course.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Create New Course
            </h1>

            <p className="text-gray-500 mt-1">
              Create and publish a professional online course.
            </p>

          </div>

        </div>

        {/* Main Layout */}

        <div className="grid lg:grid-cols-4 gap-6">

          {/* Left Side */}

          <div className="lg:col-span-3 space-y-6">

            <BasicInfoForm
              courseData={courseData}
              setCourseData={setCourseData}
              courseImage={courseImage}
              setCourseImage={setCourseImage}
              courseIncludes={courseIncludes}
              setCourseIncludes={setCourseIncludes}
            />

            <LessonBuilder
              lessons={lessons}
              setLessons={setLessons}
              addLesson={addLesson}
              removeLesson={removeLesson}
              updateLessonTitle={updateLessonTitle}
              updateLessonVideo={updateLessonVideo}
              addLessonDocument={addLessonDocument}
              removeLessonDocument={removeLessonDocument}

              addQuizQuestion={addQuizQuestion}
              removeQuizQuestion={removeQuizQuestion}

              updateQuizQuestion={updateQuizQuestion}
              updateQuizOption={updateQuizOption}
              updateQuizAnswer={updateQuizAnswer}

              updateAssignment={updateAssignment}
            />

            <PricingForm
              courseData={courseData}
              setCourseData={setCourseData}
            />

            <CertificateBuilder
              certificate={certificate}
              setCertificate={setCertificate}
            />

          </div>

          {/* Right Sidebar */}

          <div>

            <PublishSidebar
              courseData={courseData}
              lessons={lessons}
              certificate={certificate}
              onPublish={handleSubmit}
            />

          </div>

        </div>

      </div>
    </div>
  );
}
