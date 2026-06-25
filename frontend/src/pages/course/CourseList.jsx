import { useState } from "react";
import courses from "../../data/courses";

// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
import SidebarFilter from "../../components/SidebarFilter";
import CourseCard from "../../components/CourseCard";
import SearchBar from "../../components/SearchBar";

import "./CourseList.css";

function CourseList() {
  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-layout">

      {/* Main Content */}
      <div className="content-wrapper">

        {/* Sidebar */}
        <SidebarFilter />

        {/* Course Section */}
        <main className="content">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <h2 className="title">All Courses</h2>

          <div className="course-grid">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button>&lt;</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>...</button>
            <button>136</button>
            <button>&gt;</button>
          </div>

        </main>

      </div>

    </div>
  );
}

export default CourseList;