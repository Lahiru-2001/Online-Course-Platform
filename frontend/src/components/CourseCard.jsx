import "./CourseCard.css";

function CourseCard({ course }) {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} />

      <div className="provider">
        <img src={course.logo} alt={course.provider} />
        <span>{course.provider}</span>
      </div>

      <h4>{course.title}</h4>

      <div className="course-footer">
        <span>{course.duration}</span>
        <strong>{course.price}</strong>
      </div>
    </div>
  );
}

export default CourseCard;