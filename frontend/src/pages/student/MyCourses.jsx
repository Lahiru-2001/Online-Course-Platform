import React, {
    useEffect,
    useState
} from "react";

import { Link } from "react-router-dom";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import ProgressBar from "../../components/ui/ProgressBar";

import { getMyCourses } from "../../services/api";

const API_BASE_URL = "http://localhost:5000";

export default function MyCourses() {

    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadCourses();

    }, []);

    const loadCourses = async () => {

        try {

            const res = await getMyCourses();

            setCourses(res.data.courses);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen">

            <div>

                <h1 className="text-xl font-bold text-[#1e3a5f]">
                    My Courses
                </h1>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {courses.map((item) => {

                    const course = item.course;

                    return (

                        <Card
                            key={item._id}
                            className="flex flex-col overflow-hidden p-0 border border-gray-200 rounded-xl"
                        >

                            <img
                                src={
                                    course.image
                                        ? API_BASE_URL + course.image
                                        : "https://placehold.co/600x400"
                                }
                                alt={course.title}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-5">

                                <div className="flex justify-between">

                                    <div>

                                        <h3 className="font-bold">

                                            {course.title}

                                        </h3>

                                        <p className="text-xs">

                                            {course.offeredBy}

                                        </p>

                                    </div>

                                    <span>

                                        {item.completed
                                            ? "Completed"
                                            : "On Track"}

                                    </span>

                                </div>

                                <div className="mt-3">

                                    <ProgressBar
                                        progress={item.progress}
                                    />

                                </div>

                                <div className="flex justify-end mt-5">

                                    {item.completed ?

                                        <Link
                                            to={`/student/course/${course._id}/completed`}
                                        >

                                            <Button>

                                                View

                                            </Button>

                                        </Link>

                                        :

                                        <Link
                                            to={`/student/course/${course._id}/learn`}
                                        >

                                            <Button>

                                                Continue

                                            </Button>

                                        </Link>

                                    }

                                </div>

                            </div>

                        </Card>

                    );

                })}

            </div>

        </div>

    );

}