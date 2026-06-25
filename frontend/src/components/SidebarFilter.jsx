import "./SidebarFilter.css";

function SidebarFilter() {
  return (
    <aside className="sidebar">

      <div className="filter-group">
        <h3>Category</h3>

        <label><input type="checkbox" /> Computer Science</label>
        <label><input type="checkbox" /> Business Study</label>
        <label><input type="checkbox" /> Data Science</label>
        <label><input type="checkbox" /> Information Technology</label>
        <label><input type="checkbox" /> Health</label>
        <label><input type="checkbox" /> Maths and Logic</label>
        <label><input type="checkbox" /> Language Learning</label>
        <label><input type="checkbox" /> Physical Science & Engineering</label>
        <label><input type="checkbox" /> Personal Development</label>
      </div>

      <div className="filter-group">
        <h3>Level</h3>

        <label><input type="checkbox" /> Beginner</label>
        <label><input type="checkbox" /> Intermediate</label>
        <label><input type="checkbox" /> Advance</label>
      </div>

      <div className="filter-group">
        <h3>Duration</h3>

        <label><input type="checkbox" /> Less than 2 Hours</label>
        <label><input type="checkbox" /> Less than 2 Weeks</label>
        <label><input type="checkbox" /> Less than 3 Months</label>
        <label><input type="checkbox" /> Less than 1 Year</label>
        <label><input type="checkbox" /> More than 1 Year</label>
      </div>

      <div className="filter-group">
        <div className="price-title">
          <h3>Price</h3>
          <span>$0 - $100</span>
        </div>

        <input type="range" min="0" max="100" defaultValue="50" />
      </div>

    </aside>
  );
}

export default SidebarFilter;