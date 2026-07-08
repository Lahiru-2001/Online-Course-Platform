import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Star,
  Award,
  Clock,
  Laptop,
  FileText,
  CheckCircle,
  BookOpen,
  Globe,
  Users,
  TrendingUp,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

import {
  getCourseById,
  getCourses,
  enrollCourse,
  getCourseRatings,
  addCourseRating,
} from "../../services/api";

const API_BASE_URL = "http://localhost:5000";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [course, setCourse] = useState(null);
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    try {
      setLoading(true);

      const response = await getCourseById(id);

      setCourse(response.data.course);

      // Load ratings
      await loadRatings();

      const recommended = await getCourses();

      setRecommendedCourses(
        (recommended.data.courses || [])
          .filter((c) => c._id !== id)
          .slice(0, 4)
      );
    } catch (err) {
      console.error(err);
      setError("Failed to load course details.");
    } finally {
      setLoading(false);
    }
  };

  const loadRatings = async () => {
    try {
      const response = await getCourseRatings(id);

      setReviews(response.data.reviews || []);

      setCourse((prev) => ({
        ...prev,
        averageRating: response.data.averageRating,
        totalRatings: response.data.totalRatings,
        ratingBreakdown: response.data.ratingBreakdown,
      }));
    } catch (error) {
      console.error("Failed to load ratings:", error);
    }
  };

  const handleBuy = () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: `/student/courses/${id}`,
        },
      });
      return;
    }

    enrollStudent();
  };

  const enrollStudent = async () => {
    try {
      const response = await enrollCourse(id);

      alert(response.data.message);

      navigate("/student/my-courses");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to enroll in this course."
      );
    }
  };

  const handleSubmitRating = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await addCourseRating(id, {
        rating,
        comment,
      });

      setReviews(response.data.reviews);

      setCourse((prev) => ({
        ...prev,
        averageRating: response.data.averageRating,
        totalRatings: response.data.totalRatings,
        ratingBreakdown: response.data.ratingBreakdown,
      }));

      setRating(0);
      setComment("");

      alert("Thank you for your review!");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to submit rating."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />

          <h2 className="mt-6 text-lg font-semibold text-slate-700">
            Loading Course...
          </h2>

          <p className="text-sm text-gray-500">
            Please wait a moment.
          </p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">

          <h2 className="text-2xl font-bold text-red-600">
            {error || "Course Not Found"}
          </h2>

          <Button
            className="mt-6"
            onClick={() => navigate("/courses")}
          >
            Back to Courses
          </Button>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-16">

      <section className="relative">

        <div className="h-[470px] overflow-hidden">

          <img
            src={
              course.image
                ? `${API_BASE_URL}${course.image}`
                : "https://placehold.co/1600x700"
            }
            alt={course.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/1600x700";
            }}
          />

        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#071D34]/95 via-[#102B49]/85 to-[#071D34]/50" />

        <div className="absolute inset-0">

          <div className="max-w-7xl mx-auto px-6 h-full flex items-center">

            <div className="max-w-3xl text-white">

              <span className="inline-flex items-center gap-2 bg-orange-500 px-4 py-2 rounded-full text-sm font-semibold">

                <BookOpen size={16} />

                {course.category}

              </span>
              <h1 className="mt-6 text-5xl font-extrabold leading-tight !text-white">
                {course.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-200">

                {course.shortDescription}

              </p>

              <div className="flex flex-wrap gap-6 mt-8">

                <div className="flex items-center gap-2">

                  <Star
                    className="fill-yellow-400 text-yellow-400"
                    size={20}
                  />

                  <span className="font-semibold">

                    {course.averageRating || 0}

                  </span>

                  <span className="text-gray-300">

                    ({course.totalRatings || 0} Ratings)

                  </span>

                </div>

              </div>

              <div className="flex flex-wrap gap-4 mt-8">

                <Button
                  onClick={handleBuy}
                  className="px-8 py-3"
                >
                  Enroll Now
                </Button>
              </div>

            </div>

          </div>

        </div>

      </section>

      <div className="max-w-7xl mx-auto px-6 mt-10 grid lg:grid-cols-3 gap-8">

        {/* LEFT CONTENT */}

        <div className="lg:col-span-2 space-y-8">

          <div className="grid md:grid-cols-4 gap-5">

            <Card className="p-6">

              <Clock className="text-orange-500 mb-3" />

              <h4 className="font-semibold text-slate-800">
                Duration
              </h4>

              <p className="text-gray-500 mt-1">
                {course.duration}
              </p>

            </Card>

            <Card className="p-6">

              <Award className="text-orange-500 mb-3" />

              <h4 className="font-semibold text-slate-800">
                Certificate
              </h4>

              <p className="text-gray-500 mt-1">
                Included
              </p>

            </Card>

            <Card className="p-6">

              <Laptop className="text-orange-500 mb-3" />

              <h4 className="font-semibold text-slate-800">
                Access
              </h4>

              <p className="text-gray-500 mt-1">
                Lifetime
              </p>

            </Card>

            <Card className="p-6">

              <TrendingUp className="text-orange-500 mb-3" />

              <h4 className="font-semibold text-slate-800">
                Level
              </h4>

              <p className="text-gray-500 mt-1">
                {course.difficulty}
              </p>

            </Card>

          </div>

          <Card className="p-8">

            <h2 className="text-2xl font-bold text-slate-800 mb-5">
              About this Course
            </h2>

            <p className="leading-8 text-gray-600">

              {course.description}

            </p>

          </Card>
          <Card className="p-8">

            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Course Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="border rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Category
                </p>

                <h4 className="font-bold text-lg mt-1">
                  {course.category}
                </h4>

              </div>

              <div className="border rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Difficulty
                </p>

                <h4 className="font-bold text-lg mt-1">
                  {course.difficulty}
                </h4>

              </div>

              <div className="border rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Duration
                </p>

                <h4 className="font-bold text-lg mt-1">
                  {course.duration}
                </h4>

              </div>

              <div className="border rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Lessons
                </p>

                <h4 className="font-bold text-lg mt-1">
                  {course.lessons?.length || 0}
                </h4>

              </div>

            </div>

          </Card>

          <Card className="p-8">

            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              This Course Includes
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="flex items-center gap-4">

                <div className="bg-orange-100 p-3 rounded-xl">

                  <Clock
                    className="text-orange-500"
                    size={22}
                  />

                </div>

                <div>

                  <h4 className="font-semibold">
                    Duration
                  </h4>

                  <p className="text-gray-500">
                    {course.duration}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="bg-orange-100 p-3 rounded-xl">

                  <Laptop
                    className="text-orange-500"
                    size={22}
                  />

                </div>

                <div>

                  <h4 className="font-semibold">
                    Lifetime Access
                  </h4>

                  <p className="text-gray-500">
                    Learn anytime
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="bg-orange-100 p-3 rounded-xl">

                  <Award
                    className="text-orange-500"
                    size={22}
                  />

                </div>

                <div>

                  <h4 className="font-semibold">
                    Certificate
                  </h4>

                  <p className="text-gray-500">
                    Upon completion
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="bg-orange-100 p-3 rounded-xl">

                  <FileText
                    className="text-orange-500"
                    size={22}
                  />

                </div>

                <div>

                  <h4 className="font-semibold">
                    Lessons
                  </h4>

                  <p className="text-gray-500">
                    {course.lessons?.length || 0} Lessons
                  </p>

                </div>

              </div>

            </div>

          </Card>

          <Card className="p-8">

            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              Student Ratings
            </h2>

            <div className="grid md:grid-cols-[220px,1fr] gap-10">

              <div className="text-center">

                <h2 className="text-6xl font-black text-slate-800">
                  {course.averageRating || "0.0"}
                </h2>

                <div className="flex justify-center gap-1 mt-4">

                  {[1, 2, 3, 4, 5].map((star) => (

                    <Star
                      key={star}
                      size={24}
                      className={
                        star <= Math.round(course.averageRating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />

                  ))}

                </div>

                <p className="text-gray-500 mt-3">
                  {course.totalRatings || 0} Ratings
                </p>

              </div>

              <div>

                {[5, 4, 3, 2, 1].map((star) => {

                  const percentage =
                    course.ratingBreakdown?.[star] || 0;

                  return (

                    <div
                      key={star}
                      className="flex items-center gap-4 mb-5"
                    >

                      <span className="w-14 text-sm">
                        {star} Star
                      </span>

                      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">

                        <div
                          className="bg-orange-500 h-full rounded-full"
                          style={{
                            width: `${percentage}%`
                          }}
                        />

                      </div>

                      <span className="w-10 text-right text-sm text-gray-500">
                        {percentage}%
                      </span>

                    </div>

                  );

                })}

              </div>

            </div>

          </Card>


          <Card className="p-8">

            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Write a Review
            </h2>

            <div className="flex items-center gap-2 mb-6">

              {[1, 2, 3, 4, 5].map((star) => (

                <Star
                  key={star}
                  size={34}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer transition ${star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 hover:text-yellow-400"
                    }`}
                />

              ))}

            </div>

            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this course..."
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />

            <Button
              onClick={handleSubmitRating}
              disabled={submitting}
              className="mt-5"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>

          </Card>



          <Card className="p-8">

            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              Student Reviews
            </h2>

            {reviews.length === 0 ? (

              <p className="text-gray-500">
                No reviews yet. Be the first to review this course.
              </p>

            ) : (

              <div className="space-y-6">

                {reviews.map((review) => (

                  <div
                    key={review._id}
                    className="border rounded-2xl p-6"
                  >

                    <div className="flex justify-between items-start">

                      <div>

                        <h4 className="font-bold text-slate-800">
                          {review.studentName}
                        </h4>

                        <div className="flex gap-1 mt-2">

                          {[1, 2, 3, 4, 5].map((star) => (

                            <Star
                              key={star}
                              size={18}
                              className={
                                star <= review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }
                            />

                          ))}

                        </div>

                      </div>

                      <span className="text-sm text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>

                    </div>

                    {review.comment && (

                      <p className="mt-4 text-gray-600 leading-7">
                        {review.comment}
                      </p>

                    )}

                  </div>

                ))}

              </div>

            )}

          </Card>

        </div>


        <div className="space-y-6 lg:sticky lg:top-6 self-start">

          {/* PURCHASE CARD */}

          <Card className="overflow-hidden border-0 shadow-2xl rounded-3xl">

            <div className="relative">

              <img
                src={
                  course.image
                    ? `${API_BASE_URL}${course.image}`
                    : "https://placehold.co/600x400"
                }
                alt={course.title}
                className="w-full h-56 object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/600x400";
                }}
              />

              <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg">

                <span className="font-bold text-orange-500">
                  {course.category}
                </span>

              </div>

            </div>

            <div className="p-7">

              {/* PRICE */}

              {course.pricing?.isFree ? (

                <div className="mb-6">

                  <h2 className="text-4xl font-black text-green-600">
                    FREE
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Start learning today
                  </p>

                </div>

              ) : (

                <div className="mb-6">

                  <div className="flex items-end gap-3">

                    <h2 className="text-4xl font-black text-slate-800">

                      {course.pricing?.currency || "LKR"}{" "}
                      {course.pricing?.discountPrice ||
                        course.pricing?.price}

                    </h2>

                    {course.pricing?.discountPrice > 0 && (

                      <span className="line-through text-gray-400 text-lg">

                        {course.pricing?.currency || "LKR"}{" "}
                        {course.pricing?.originalPrice}

                      </span>

                    )}

                  </div>


                </div>

              )}

              {/* ENROLL BUTTON */}

              <Button
                onClick={handleBuy}
                className="w-full py-4 text-lg font-semibold rounded-xl"
              >
                Enroll Now
              </Button>
              {/* COURSE FEATURES */}

              <div className="border-t mt-8 pt-7">

                <h3 className="font-bold text-xl text-slate-800 mb-5">
                  This Course Includes
                </h3>

                <div className="space-y-5">

                  <div className="flex items-center gap-4">

                    <div className="bg-orange-100 p-2 rounded-lg">

                      <Clock
                        className="text-orange-500"
                        size={18}
                      />

                    </div>

                    <div>

                      <h4 className="font-medium">
                        Duration
                      </h4>

                      <p className="text-sm text-gray-500">
                        {course.duration}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-4">

                    <div className="bg-orange-100 p-2 rounded-lg">

                      <Laptop
                        className="text-orange-500"
                        size={18}
                      />

                    </div>

                    <div>

                      <h4 className="font-medium">
                        Lifetime Access
                      </h4>

                      <p className="text-sm text-gray-500">
                        Learn anytime
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-4">

                    <div className="bg-orange-100 p-2 rounded-lg">

                      <Award
                        className="text-orange-500"
                        size={18}
                      />

                    </div>

                    <div>

                      <h4 className="font-medium">
                        Certificate
                      </h4>

                      <p className="text-sm text-gray-500">
                        Upon completion
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-4">

                    <div className="bg-orange-100 p-2 rounded-lg">

                      <FileText
                        className="text-orange-500"
                        size={18}
                      />

                    </div>

                    <div>

                      <h4 className="font-medium">
                        Lessons
                      </h4>

                      <p className="text-sm text-gray-500">
                        {course.lessons?.length || 0} Lessons
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-4">

                    <div className="bg-orange-100 p-2 rounded-lg">

                      <CheckCircle
                        className="text-orange-500"
                        size={18}
                      />

                    </div>

                    <div>

                      <h4 className="font-medium">
                        Downloadable Resources
                      </h4>

                      <p className="text-sm text-gray-500">
                        Course materials included
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </Card>



          {/* OFFERED BY */}

          <Card className="p-7 rounded-3xl shadow-lg border-0">

            <h3 className="text-xl font-bold text-slate-800 mb-5">
              Offered By
            </h3>

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">

                <BookOpen
                  className="text-orange-500"
                  size={28}
                />

              </div>

              <div>

                <h4 className="font-bold text-slate-800">

                  {course.offeredBy}

                </h4>

                <p className="text-sm text-gray-500">
                  Trusted Education Partner
                </p>

              </div>

            </div>
          </Card>

        </div>

      </div>


      <div className="max-w-7xl mx-auto px-6 mt-14">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-slate-800">
            Recommended Courses
          </h2>

          <Button
            variant="outline"
            onClick={() => navigate("/courses")}
          >
            View All
          </Button>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">

          {recommendedCourses.map((item) => (

            <Card
              key={item._id}
              onClick={() =>
                navigate(`/courses/${item._id}`)
              }
              className="overflow-hidden rounded-3xl cursor-pointer border-0 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >

              <img
                src={
                  item.image
                    ? `${API_BASE_URL}${item.image}`
                    : "https://placehold.co/600x400"
                }
                alt={item.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/600x400";
                }}
              />

              <div className="p-5">

                <span className="text-xs uppercase tracking-wider text-orange-500 font-bold">

                  {item.offeredBy}

                </span>

                <h3 className="font-bold text-slate-800 mt-3 line-clamp-2 min-h-[56px]">

                  {item.title}

                </h3>

                <div className="flex justify-between items-center mt-5">

                  <span className="text-sm text-gray-500">

                    {item.duration}

                  </span>

                  <span className="font-bold text-orange-500">

                    {item.pricing?.isFree
                      ? "FREE"
                      : `${item.pricing?.currency || "LKR"} ${item.pricing?.discountPrice ||
                      item.pricing?.price
                      }`}

                  </span>

                </div>

              </div>

            </Card>

          ))}

        </div>

      </div>

    </div >
  );
}




