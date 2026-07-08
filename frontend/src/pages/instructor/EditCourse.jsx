import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BasicInfoForm from "../../components/instructor/course/BasicInfoForm";
import LessonBuilder from "../../components/instructor/course/LessonBuilder";
import PricingForm from "../../components/instructor/course/PricingForm";
import CertificateBuilder from "../../components/instructor/course/CertificateBuilder";
import PublishSidebar from "../../components/instructor/course/PublishSidebar";

import { Loader2 } from "lucide-react";

export default function EditCourse() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [courseImage, setCourseImage] = useState(null);
    const [courseData, setCourseData] = useState({

        title: "",
        description: "",
        category: "Computer Science",
        difficulty: "Beginner",
        duration: "3 Months",
        offeredBy: "",
        isFree: false,
        originalPrice: "",
        discountPrice: "",

    });


    const [courseIncludes, setCourseIncludes] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [certificate, setCertificate] = useState({

        enabled: true,
        type: "Completion",
        template: "University",
        logo: null,
        signature: null,
        background: null,

    });

    useEffect(() => {

        loadCourse();

    }, [id]);

    const loadCourse = async () => {

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await fetch(

                `http://localhost:5000/api/courses/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                }

            );

            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                navigate("/instructor/courses");
                return;

            }

            const course = data.course;
            setCourseData({

                title: course.title,
                description: course.description,
                category: course.category,
                difficulty: course.difficulty,
                duration: course.duration,
                offeredBy: course.offeredBy,
                isFree: course.pricing?.isFree || false,
                originalPrice: course.pricing?.originalPrice || 0,
                discountPrice: course.pricing?.discountPrice || 0,

            });

            setCourseIncludes(course.courseIncludes || []);
            setCertificate({

                enabled: course.certificate?.enabled,
                type: course.certificate?.type,
                template: course.certificate?.template,
                logo: null,
                signature: null,
                background: null,

            });

            const loadedLessons = course.lessons.map((lesson, index) => ({

                id: Date.now() + index,
                title: lesson.title,
                video: lesson.video || null,
                documents: lesson.documents || [],
                quiz: lesson.quiz || [],
                assignment: {
                    title: lesson.assignment?.title || "",
                    description: lesson.assignment?.description || "",
                    marks: lesson.assignment?.marks || 100,
                    dueDate: lesson.assignment?.dueDate || "",
                    file: lesson.assignment?.file || null,

                }

            }));

            setLessons(loadedLessons);

        }

        catch (err) {
            console.error(err);
            alert("Failed to load course.");

        }

        finally {
            setLoading(false);

        }

    };
    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500" />

            </div>

        );

    }

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

    const removeLesson = (lessonId) => {
        setLessons(
            lessons.filter((lesson) => lesson.id !== lessonId)
        );

    };
    const updateLessonTitle = (lessonId, value) => {

        setLessons(
            lessons.map((lesson) =>
                lesson.id === lessonId
                    ? {

                        ...lesson,

                        title: value,

                    }

                    : lesson

            )

        );

    };

    const updateLessonVideo = (lessonId, file) => {
        setLessons(
            lessons.map((lesson) =>
                lesson.id === lessonId

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

                        documents: [

                            ...lesson.documents,

                            file

                        ],

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

                        }

                    ]

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

    const updateQuizOption = (

        lessonId,
        questionIndex,
        optionIndex,
        value

    ) => {

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

    const updateQuizAnswer = (
        lessonId,
        questionIndex,
        value

    ) => {

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

    const updateAssignment = (
        lessonId,
        field,
        value

    ) => {

        setLessons(
            lessons.map((lesson) => {
                if (lesson.id !== lessonId) return lesson;
                return {

                    ...lesson,

                    assignment: {

                        ...lesson.assignment,

                        [field]: value,

                    }

                };

            })

        );

    };

    const handleUpdate = async () => {
        try {

            setSaving(true);
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

                    originalPrice: Number(
                        courseData.originalPrice || 0
                    ),

                    discountPrice: Number(
                        courseData.discountPrice || 0
                    ),

                    currency: "LKR",

                })

            );

            formData.append(
                "courseIncludes",
                JSON.stringify(courseIncludes)

            );

            if (courseImage instanceof File) {

                formData.append(

                    "courseImage",

                    courseImage

                );

            }

            const lessonData = lessons.map((lesson) => ({
                title: lesson.title,
                quiz: lesson.quiz,
                assignment: {
                    title: lesson.assignment.title,
                    description: lesson.assignment.description,
                    marks: lesson.assignment.marks,
                    dueDate: lesson.assignment.dueDate,

                }

            }));

            formData.append(

                "lessons",
                JSON.stringify(lessonData)

            );

            lessons.forEach((lesson, index) => {

                // ---------------- Video ----------------

                if (lesson.video instanceof File) {

                    formData.append(

                        `lessonVideo${index}`,

                        lesson.video

                    );

                }

                // ---------------- Documents ----------------

                lesson.documents.forEach((doc) => {

                    if (doc instanceof File) {

                        formData.append(

                            `lessonDocument${index}`,

                            doc

                        );

                    }

                });

                // ---------------- Assignment ----------------

                if (

                    lesson.assignment.file instanceof File

                ) {

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

            if (certificate.logo instanceof File) {

                formData.append(

                    "certificateLogo",

                    certificate.logo

                );

            }

            if (certificate.signature instanceof File) {

                formData.append(

                    "certificateSignature",

                    certificate.signature

                );

            }

            if (certificate.background instanceof File) {

                formData.append(

                    "certificateBackground",

                    certificate.background

                );

            }

            const token = localStorage.getItem("token");

            const response = await fetch(

                `http://localhost:5000/api/courses/${id}`,

                {

                    method: "PUT",

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                    body: formData,

                }

            );

            const data = await response.json();

            if (!response.ok) {

                alert(

                    data.message ||

                    "Failed to update course."

                );

                return;

            }

            alert("Course updated successfully.");

            navigate("/instructor/courses");

        }

        catch (err) {

            console.error(err);

            alert("Failed to update course.");

        }

        finally {

            setSaving(false);

        }

    };


    return (
        <div className="min-h-screen bg-gray-100 py-6 px-6">

            <div className="max-w-7xl mx-auto">

                {/* Header */}

                <div className="flex justify-between items-center mb-6">

                    <div>

                        <h1 className="text-3xl font-bold text-slate-800">
                            Edit Course
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Update your course information, lessons and pricing.
                        </p>

                    </div>

                </div>

                {/* Main Layout */}

                <div className="grid lg:grid-cols-4 gap-6">

                    {/* Left */}

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
                            loading={saving}
                            publishText={
                                saving
                                    ? "Updating..."
                                    : "Update Course"
                            }
                            onPublish={handleUpdate}
                        />

                    </div>

                </div>

            </div>

        </div>
    );

}