import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './CourseList.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// SVG Illustrations for Course Cards (matching the screenshot designs)
const CourseSVGs = {
    roboticsOrange: () => (
        <svg width="100%" height="100%" viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="160" fill="#E2E8F0" />
            <path d="M40 140V70H60V140H40Z" fill="#F97316" />
            <path d="M60 90H120V100H60V90Z" fill="#F97316" />
            <circle cx="120" cy="95" r="15" fill="#475569" />
            <circle cx="50" cy="70" r="10" fill="#334155" />
            <path d="M120 95L180 60" stroke="#F97316" strokeWidth="6" strokeLinecap="round" />
            <rect x="180" y="45" width="40" height="30" rx="4" fill="#0EA5E9" />
            <rect x="220" y="30" width="60" height="100" rx="8" fill="#1E293B" />
            <circle cx="250" cy="60" r="12" fill="#EF4444" />
            <circle cx="250" cy="100" r="12" fill="#22C55E" />
        </svg>
    ),
    googlePass: () => (
        <svg width="100%" height="100%" viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="160" fill="#1E293B" />
            <rect x="20" y="20" width="120" height="120" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="2" />
            <text x="30" y="50" fill="#FFFFFF" fontSize="10" fontWeight="bold">Unlock Your Potential</text>
            <text x="30" y="75" fill="#F8FAFC" fontSize="12" fontWeight="bold">ANNUAL PASS</text>
            <text x="30" y="95" fill="#F8FAFC" fontSize="12" fontWeight="bold">SALE: UNLOCK</text>
            <text x="30" y="115" fill="#F8FAFC" fontSize="12" fontWeight="bold">ALL ACCESS!</text>
            <circle cx="220" cy="80" r="45" fill="#475569" opacity="0.3" />
            {/* Woman avatar silhouette */}
            <path d="M190 140C190 110 210 100 220 100C230 100 250 110 250 140H190Z" fill="#94A3B8" />
            <circle cx="220" cy="75" r="20" fill="#E2E8F0" />
        </svg>
    ),
    googleAutomation: () => (
        <svg width="100%" height="100%" viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="160" fill="#0284C7" />
            <path d="M0 0H90V160H0V0Z" fill="#F8FAFC" />
            {/* Google G logo */}
            <path d="M45 55C33.95 55 25 63.95 25 75C25 86.05 33.95 95 45 95C55.25 95 62.5 88.5 64.25 80H45V70H74.5C74.9 71.7 75 73.4 75 75.3C75 93.3 62.9 106.1 45 106.1C27.8 106.1 13.9 92.2 13.9 75C13.9 57.8 27.8 43.9 45 43.9C53.3 43.9 60.2 46.9 65.6 52L56.8 60.5C53.7 57.6 49.9 55.8 45 55.8" fill="#EA4335" />
            <rect x="110" y="40" width="170" height="80" rx="6" fill="#0F172A" opacity="0.8" />
            <text x="120" y="70" fill="#FFFFFF" fontSize="14" fontWeight="bold">IT AUTOMATION</text>
            <text x="120" y="95" fill="#38BDF8" fontSize="13" fontWeight="bold">WITH PYTHON</text>
        </svg>
    ),
    factoryInside: () => (
        <svg width="100%" height="100%" viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="160" fill="#E2E8F0" />
            <path d="M20 140L100 20H130L210 140H20Z" fill="#94A3B8" opacity="0.5" />
            <rect x="60" y="80" width="80" height="60" fill="#475569" />
            <rect x="160" y="60" width="60" height="80" fill="#334155" />
            <path d="M10 140H290" stroke="#1E293B" strokeWidth="4" />
            <circle cx="100" cy="110" r="15" stroke="#F97316" strokeWidth="3" />
            <line x1="100" y1="95" x2="100" y2="125" stroke="#F97316" strokeWidth="3" />
            <line x1="85" y1="110" x2="115" y2="110" stroke="#F97316" strokeWidth="3" />
        </svg>
    ),
    aiLife: () => (
        <svg width="100%" height="100%" viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="160" fill="#F8FAFC" />
            <circle cx="80" cy="80" r="40" fill="#38BDF8" opacity="0.2" />
            <circle cx="220" cy="80" r="50" fill="#818CF8" opacity="0.3" />
            {/* Laptop illustration */}
            <rect x="110" y="60" width="80" height="50" rx="4" fill="#475569" />
            <rect x="120" y="66" width="60" height="38" fill="#1E293B" />
            <rect x="90" y="110" width="120" height="6" rx="3" fill="#94A3B8" />
            {/* Brain node sparks */}
            <circle cx="150" cy="85" r="4" fill="#F97316" />
            <line x1="150" y1="85" x2="135" y2="75" stroke="#F97316" strokeWidth="1" />
            <line x1="150" y1="85" x2="165" y2="75" stroke="#F97316" strokeWidth="1" />
        </svg>
    ),
    mechatronBlue: () => (
        <svg width="100%" height="100%" viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="160" fill="#0284C7" />
            <circle cx="150" cy="80" r="60" fill="#0369A1" />
            {/* Multiple gears */}
            <circle cx="130" cy="70" r="20" stroke="#F8FAFC" strokeWidth="4" strokeDasharray="8 4" />
            <circle cx="170" cy="95" r="25" stroke="#38BDF8" strokeWidth="5" strokeDasharray="10 5" />
            <circle cx="170" cy="95" r="8" fill="#38BDF8" />
            <circle cx="130" cy="70" r="6" fill="#F8FAFC" />
        </svg>
    ),
    imageSegmentation: () => (
        <svg width="100%" height="100%" viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="160" fill="#E2E8F0" />
            <rect x="20" y="20" width="120" height="120" rx="4" fill="#0F172A" />
            {/* Brain MRI style slice */}
            <circle cx="80" cy="80" r="35" fill="#334155" />
            <path d="M80 50C70 50 60 65 60 80C60 95 70 110 80 110C90 110 100 95 100 80C100 65 90 50 80 50Z" fill="#8B5CF6" opacity="0.6" />
            <rect x="160" y="30" width="110" height="100" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="170" y1="50" x2="250" y2="50" stroke="#E2E8F0" strokeWidth="8" />
            <line x1="170" y1="70" x2="230" y2="70" stroke="#E2E8F0" strokeWidth="8" />
            <line x1="170" y1="90" x2="260" y2="90" stroke="#E2E8F0" strokeWidth="8" />
        </svg>
    ),
    webDevIsometric: () => (
        <svg width="100%" height="100%" viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="160" fill="#2563EB" />
            <path d="M150 20L260 80L150 140L40 80L150 20Z" fill="#3B82F6" />
            <path d="M150 35L240 80L150 125L60 80L150 35Z" fill="#60A5FA" />
            <circle cx="150" cy="80" r="20" fill="#F59E0B" />
            {/* Code markers */}
            <path d="M135 80L145 75V85L135 80Z" fill="#F8FAFC" />
            <path d="M165 80L155 75V85L165 80Z" fill="#F8FAFC" />
        </svg>
    )
};

// University / Publisher logo SVGs
const Logos = {
    moratuwa: () => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#D97706" />
            <rect x="6" y="5" width="8" height="10" rx="1" fill="#FFFFFF" />
            <path d="M8 8H12M8 11H12" stroke="#D97706" strokeWidth="1.5" />
        </svg>
    ),
    google: () => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#F1F5F9" />
            <path d="M10 6C7.79 6 6 7.79 6 10C6 12.21 7.79 14 10 14C12.05 14 13.5 12.7 13.85 11H10V9.4H15.8C15.9 9.8 16 10.2 16 10.6C16 13.8 13.5 16 10 16C6.69 16 4 13.31 4 10C4 6.69 6.69 4 10 4C11.65 4 13 4.6 14.1 5.6L12.3 7.4C11.6 6.8 10.9 6 10 6" fill="#EA4335" />
        </svg>
    ),
    kelaniya: () => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#854D0E" />
            <circle cx="10" cy="10" r="6" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="10" cy="10" r="3" fill="#EAB308" />
        </svg>
    ),
    company: () => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" rx="4" fill="#0F172A" />
            <text x="6" y="14" fill="#FFFFFF" fontSize="12" fontWeight="bold">C</text>
        </svg>
    ),
    genericUniversity: () => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" rx="10" fill="#475569" />
            <path d="M6 14V9L10 6L14 9V14H6Z" fill="#FFFFFF" />
            <circle cx="10" cy="10" r="2" fill="#475569" />
        </svg>
    ),
    openai: () => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" rx="4" fill="#10A37F" />
            <path d="M10 5V15M5 10H15M6.5 6.5L13.5 13.5M6.5 13.5L13.5 6.5" stroke="#FFFFFF" strokeWidth="2" />
        </svg>
    )
};

export default function CourseList() {
    // Course Data matching the image exactly
    const initialCourses = [
        {
            id: 1,
            title: "Industrial Fluid systems & Smart Factory Automation",
            publisher: "University of moratuwa",
            logo: Logos.moratuwa,
            image: CourseSVGs.roboticsOrange,
            duration: "3 month",
            price: "LKR 3500",
            priceNum: 3500,
            category: "Physical Science & Engineering",
            level: "Intermediate",
            durationVal: "less than 3 month"
        },
        {
            id: 2,
            title: "Industrial Fluid systems & Smart Factory Automation",
            publisher: "Google",
            logo: Logos.google,
            image: CourseSVGs.googlePass,
            duration: "6 month",
            price: "LKR 2500",
            priceNum: 2500,
            category: "Information Technology",
            level: "Intermediate",
            durationVal: "less than 1 year"
        },
        {
            id: 3,
            title: "Google IT Automation with Python",
            publisher: "University of kelaniya",
            logo: Logos.kelaniya,
            image: CourseSVGs.googleAutomation,
            duration: "1 year",
            price: "LKR 1500",
            priceNum: 1500,
            category: "Computer Science",
            level: "Advance",
            durationVal: "less than 1 year"
        },
        {
            id: 4,
            title: "Industrial Fluid systems & Smart Factory Automation",
            publisher: "Google",
            logo: Logos.google,
            image: CourseSVGs.factoryInside,
            duration: "3 month",
            price: "LKR 3000",
            priceNum: 3000,
            category: "Physical Science & Engineering",
            level: "Advance",
            durationVal: "less than 3 month"
        },
        {
            id: 5,
            title: "AI for day today life and industry level for all",
            publisher: "University of moratuwa",
            logo: Logos.moratuwa,
            image: CourseSVGs.aiLife,
            duration: "3 month",
            price: "LKR 3500",
            priceNum: 3500,
            category: "Computer Science",
            level: "Intermediate",
            durationVal: "less than 3 month"
        },
        {
            id: 6,
            title: "Learning mechatron",
            publisher: "Company",
            logo: Logos.company,
            image: CourseSVGs.mechatronBlue,
            duration: "3 month",
            price: "LKR 3500",
            priceNum: 3500,
            category: "Physical Science & Engineering",
            level: "Bilginer",
            durationVal: "less than 3 month"
        },
        {
            id: 7,
            title: "Image Segmentation, Filtering, and Region Analysis",
            publisher: "University",
            logo: Logos.genericUniversity,
            image: CourseSVGs.imageSegmentation,
            duration: "3 hours",
            price: "LKR 2500",
            priceNum: 2500,
            category: "Data Science",
            level: "Advance",
            durationVal: "less than 2 weeks"
        },
        {
            id: 8,
            title: "Web Development with vibe code",
            publisher: "Open AI",
            logo: Logos.openai,
            image: CourseSVGs.webDevIsometric,
            duration: "2 weekes",
            price: "LKR 3500",
            priceNum: 3500,
            category: "Information Technology",
            level: "Bilginer",
            durationVal: "less than 2 weeks"
        },
        {
            id: 9,
            title: "Industrial Fluid systems & Smart Factory Automation",
            publisher: "University of moratuwa",
            logo: Logos.moratuwa,
            image: CourseSVGs.roboticsOrange,
            duration: "3 month",
            price: "LKR 3500",
            priceNum: 3500,
            category: "Physical Science & Engineering",
            level: "Intermediate",
            durationVal: "less than 3 month"
        }
    ];

    // States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [selectedDurations, setSelectedDurations] = useState([]);
    const [priceLimit, setPriceLimit] = useState(5000); // LKR 0 - 5000

    // Categories list
    const categoriesList = [
        "Computer Science",
        "Business Study",
        "Data Science",
        "Information Technology",
        "Health",
        "Maths and logic",
        "Language Learning",
        "Physical Science & Engineering",
        "Personal development"
    ];

    // Levels List
    const levelsList = ["Bilginer", "Intermediate", "Advance"];

    // Durations List
    const durationsList = [
        "less than 2 hour",
        "less tha 2 weeks",
        "less than 3 month",
        "less than 1 year",
        "more than 1 year"
    ];

    // Handlers
    const handleCategoryChange = (cat) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const handleLevelChange = (lvl) => {
        setSelectedLevels(prev =>
            prev.includes(lvl) ? prev.filter(l => l !== lvl) : [...prev, lvl]
        );
    };

    const handleDurationChange = (dur) => {
        setSelectedDurations(prev =>
            prev.includes(dur) ? prev.filter(d => d !== dur) : [...prev, dur]
        );
    };

    // Filtered Courses
    const filteredCourses = initialCourses.filter(course => {
        // Search Filter
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.publisher.toLowerCase().includes(searchQuery.toLowerCase());

        // Category Filter
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category);

        // Level Filter
        const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);

        // Duration Filter
        const matchesDuration = selectedDurations.length === 0 || selectedDurations.includes(course.durationVal);

        // Price Filter
        const maxAllowedPrice = priceLimit;
        const matchesPrice = course.priceNum <= maxAllowedPrice;

        return matchesSearch && matchesCategory && matchesLevel && matchesDuration && matchesPrice;
    });

    return (
        <div className="course-list-page-wrapper">
        <Navbar />
        <div className="course-list-container">
            {/* Sidebar Filters */}
            <aside className="course-list-sidebar">
                {/* Category */}
                <div className="filter-section">
                    <h3 className="filter-title">Category</h3>
                    <div className="filter-group">
                        {categoriesList.map(cat => (
                            <label key={cat} className="filter-checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => handleCategoryChange(cat)}
                                />
                                <span className="custom-checkbox"></span>
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Level */}
                <div className="filter-section">
                    <h3 className="filter-title">Level</h3>
                    <div className="filter-group">
                        {levelsList.map(lvl => (
                            <label key={lvl} className="filter-checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={selectedLevels.includes(lvl)}
                                    onChange={() => handleLevelChange(lvl)}
                                />
                                <span className="custom-checkbox"></span>
                                {lvl}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Duration */}
                <div className="filter-section">
                    <h3 className="filter-title">Duration</h3>
                    <div className="filter-group">
                        {durationsList.map(dur => (
                            <label key={dur} className="filter-checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={selectedDurations.includes(dur)}
                                    onChange={() => handleDurationChange(dur)}
                                />
                                <span className="custom-checkbox"></span>
                                {dur}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Slider */}
                <div className="filter-section">
                    <h3 className="filter-title">Price</h3>
                    <div className="price-slider-container">
                        <div className="price-range-info">
                            <span>Price</span>
                            <span>LKR 0-{priceLimit}</span>
                        </div>
                        <div className="price-slider-wrapper">
                            <div
                                className="price-slider-track"
                                style={{ width: `${(priceLimit / 5000) * 100}%` }}
                            ></div>
                            <input
                                type="range"
                                min="0"
                                max="5000"
                                value={priceLimit}
                                onChange={(e) => setPriceLimit(Number(e.target.value))}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '6px',
                                    top: '-10px',
                                    opacity: 0,
                                    cursor: 'pointer',
                                    zIndex: 2
                                }}
                            />
                            <div
                                className="price-slider-thumb"
                                style={{ left: `${(priceLimit / 5000) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="course-list-main">
                {/* Search Input */}
                <div className="search-container">
                    <Search className="search-icon" />
                    <input
                        type="text"
                        placeholder="search....."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <h2 className="section-title">All courses</h2>

                {/* Courses Grid */}
                <div className="courses-grid">
                    {filteredCourses.map(course => {
                        const ImageComponent = course.image;
                        const LogoComponent = course.logo;
                        return (
                            <div key={course.id} className="course-card">
                                <div className="course-card-image-wrapper">
                                    <ImageComponent />
                                </div>
                                <div className="course-card-content">
                                    <div className="publisher-info">
                                        <div className="publisher-logo-container">
                                            <LogoComponent />
                                        </div>
                                        <span className="publisher-name">{course.publisher}</span>
                                    </div>
                                    <h4 className="course-card-title">{course.title}</h4>
                                    <div className="course-card-footer">
                                        <span className="course-duration">{course.duration}</span>
                                        <span className="course-price">{course.price}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {filteredCourses.length === 0 && (
                        <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#64748b' }}>
                            No courses match your selected filters.
                        </p>
                    )}
                </div>

                {/* Pagination Section */}
                <div className="pagination-container">
                    <button className="pagination-btn">&lt;</button>
                    <button className="pagination-btn active">1</button>
                    <button className="pagination-btn">2</button>
                    <button className="pagination-btn">3</button>
                    <span className="pagination-dots">...</span>
                    <button className="pagination-btn">106</button>
                    <button className="pagination-btn">&gt;</button>
                </div>
            </main>
        </div>
        <Footer />
        </div>
    );
}
