import "./CourseDetails.css";

import courseImage from "../../assets/images/3.jpg";
import universityLogo from "../../assets/images/Moratuwa.png";

function CourseDetails() {
    const recommendedCourses = [
        {
            id: 1,
            title: "AI for day today life and industry level for all",
            provider: "University of Moratuwa",
            duration: "3 month",
            price: "LKR 3500",
            image: courseImage,
        },
        {
            id: 2,
            title: "Learning mechatron",
            provider: "Company",
            duration: "2 month",
            price: "LKR 3500",
            image: courseImage,
        },
        {
            id: 3,
            title: "Image Segmentation, Filtering and Region Analysis",
            provider: "University",
            duration: "3 hours",
            price: "LKR 3500",
            image: courseImage,
        },
        {
            id: 4,
            title: "Web Development with vibe code",
            provider: "Open AI",
            duration: "2 Weeks",
            price: "LKR 3500",
            image: courseImage,
        },
    ];

    return (
        <div className="course-details-page">
            {/* HERO */}
            <div className="course-hero">
                <img src={courseImage} alt="Course" />
            </div>

            <div className="course-details-container">
                {/* LEFT */}
                <div className="course-left">
                    <h1>
                        Industrial Fluid systems & Smart Factory
                        Automation
                    </h1>

                    <hr />

                    <h3>About</h3>

                    <p>
                        The "Industrial Fluid System & Smart Factory
                        Automation" course represents a pivotal
                        opportunity for individuals seeking to delve
                        into the cutting-edge intersection of fluid
                        dynamics, electrical drives, and smart
                        automation technologies.
                    </p>

                    <div className="course-features">
                        <div>
                            <h4>Flexible schedule</h4>
                            <p>Recommended experience</p>
                        </div>

                        <div>
                            <h4>Intermediate level</h4>
                            <p>Recommended experience</p>
                        </div>

                        <div>
                            <h4>3 Month to complete</h4>
                        </div>
                    </div>

                    <div className="rating-section">
                        <div className="rating-card">
                            <h2>4 out of 5</h2>

                            <div className="stars">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>

                            <p>Top Rating</p>
                        </div>

                        <div className="rating-bars">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <div className="bar-row" key={star}>
                                    <span>{star} Stars</span>

                                    <div className="rating-bar">
                                        <div className="rating-fill"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="review">
                        <div className="review-header">
                            <img
                                src="https://randomuser.me/api/portraits/women/44.jpg"
                                alt="user"
                            />
                            <div>
                                <h4>Latha</h4>

                                <div className="stars">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                            </div>

                            <span className="review-time">
                                3 Month
                            </span>
                        </div>

                        <p>
                            Class, launched less than a year ago by
                            Blackboard co-founder Michael Chasen,
                            integrates exclusively...
                        </p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="course-right">
                    <div className="purchase-card">

                        <div className="purchase-image-wrapper">
                            <img
                                src={courseImage}
                                alt="Preview"
                                className="preview-image"
                            />
                        </div>

                        <div className="price-section">
                            <h2>LKR 3500.00</h2>

                            <h4>LKR 5000.00</h4>

                            <button className="buy-btn">
                                Buy Now
                            </button>
                        </div>

                        <div className="purchase-divider"></div>

                        <div className="included-section">

                            <h3>This Course included</h3>

                            <ul className="included-list">

                                <li>
                                    <i className="fa-solid fa-certificate"></i>
                                    Money Back Guarantee
                                </li>

                                <li>
                                    <i className="fa-solid fa-mobile-screen-button"></i>
                                    Access on all devices
                                </li>

                                <li>
                                    <i className="fa-solid fa-file-circle-check"></i>
                                    Certification of completion
                                </li>

                                <li>
                                    <i className="fa-solid fa-chart-column"></i>
                                    32 Modules
                                </li>

                            </ul>

                        </div>

                        <div className="purchase-divider"></div>

                        <div className="university-section">

                            <h3>Offer by university of Moratuwa</h3>

                            <div className="university-box">

                                <img
                                    src={universityLogo}
                                    alt="University"
                                />

                                <span>University of Moratuwa</span>

                            </div>

                        </div>

                        <div className="purchase-divider"></div>

                        <div className="share-section">

                            <h3>Share this course</h3>

                            <div className="share-icons">

                                <a href="#">
                                    <i className="fab fa-twitter"></i>
                                </a>

                                <a href="#">
                                    <i className="fab fa-facebook"></i>
                                </a>

                                <a href="#">
                                    <i className="fab fa-youtube"></i>
                                </a>

                                <a href="#">
                                    <i className="fab fa-instagram"></i>
                                </a>

                                <a href="#">
                                    <i className="fab fa-telegram"></i>
                                </a>

                                <a href="#">
                                    <i className="fab fa-whatsapp"></i>
                                </a>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

            {/* RECOMMENDED */}
            <div className="recommend-section">
                <h2>Recommend for you</h2>

                <div className="recommend-grid">
                    {recommendedCourses.map((course) => (
                        <div
                            className="recommend-card"
                            key={course.id}
                        >
                            <img
                                src={course.image}
                                alt={course.title}
                            />

                            <div className="recommend-content">
                                <span>{course.provider}</span>

                                <h4>{course.title}</h4>

                                <div className="recommend-footer">
                                    <span>{course.duration}</span>

                                    <strong>
                                        {course.price}
                                    </strong>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="show-more-btn">
                    Show more
                </button>
            </div>
        </div>
    );
}

export default CourseDetails;