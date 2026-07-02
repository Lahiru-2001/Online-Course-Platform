import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../../components/CourseCard';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/Landing.css';

// Import Banners
import banner1 from '../../assets/3.png';
import banner2 from '../../assets/4.png';

// Import Course Thumbnails
import course1Img from '../../assets/Screenshot 2026-06-17 172005.png';
import course2Img from '../../assets/5.png';
import course3Img from '../../assets/Screenshot 2026-06-17 171946.png';
import course4Img from '../../assets/Screenshot 2026-06-17 172625.png';

// Import Recently Viewed Thumbnails
import rv1Img from '../../assets/Screenshot 2026-06-17 173733.png';
import rv2Img from '../../assets/Screenshot 2026-06-17 173922.png';
import rv3Img from '../../assets/Screenshot 2026-06-17 174057.png';
import rv4Img from '../../assets/699055838af7c6.38201554.webp';

// Import Provider Logos & Badges
import moratuwaLogo from '../../assets/images (1).png';
import googleLogo from '../../assets/google.webp';
import kelaniyaLogo from '../../assets/images.jpg';
import companyLogo from '../../assets/images.png';
import openaiLogo from '../../assets/images (1).jpg';
import kelaniyaPartnerBadge from '../../assets/Screenshot 2026-06-17 174339.png';
import moratuwaPartnerBadge from '../../assets/Screenshot 2026-06-17 174546.png';

// Import Testimonial Avatars
import avatar1Img from '../../assets/Skydiving-and-Parachuting-in-sri-lanka-dp-aviation.jpg';
import avatar2Img from '../../assets/KarlsonGoh-LRCropped_20220117033131.jpg';
import avatar3Img from '../../assets/dp.webp';
import avatar4Img from '../../assets/images (2).jpg';

const Landing = ({ onGoToPortal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Banners
  const banners = [
    { id: 1, img: banner1, alt: "LAST CHANCE: SAVE 50%!" },
    { id: 2, img: banner2, alt: "COMBO DISCOUNT: 2 COURSES FOR $99!" },
    { id: 3, img: banner1, alt: "Limited Time Offer" }
  ];

  // Most Popular Certificates Data
  const popularCourses = [
    {
      id: 1,
      title: "Industrial Fluid systems & Smart Factory Automation",
      duration: "3 month",
      price: "LKR 3500",
      provider: "University of moratuwa",
      logo: moratuwaLogo,
      image: course1Img
    },
    {
      id: 2,
      title: "Industrial Fluid systems & Smart Factory Automation",
      duration: "6 month",
      price: "LKR 2500",
      provider: "Google",
      logo: googleLogo,
      image: course2Img
    },
    {
      id: 3,
      title: "Google IT Automation with Python",
      duration: "1 year",
      price: "LKR 1500",
      provider: "University of kelniya",
      logo: kelaniyaLogo,
      image: course3Img
    },
    {
      id: 4,
      title: "Industrial Fluid systems & Smart Factory Automation",
      duration: "3 month",
      price: "LKR 3000",
      provider: "Google",
      logo: googleLogo,
      image: course4Img
    }
  ];

  // Recently Viewed Products Data
  const recentlyViewedCourses = [
    {
      id: 1,
      title: "AI for day today life and industry level for all",
      duration: "3 month",
      price: "LKR 3500",
      provider: "University of moratuwa",
      logo: moratuwaLogo,
      image: rv1Img
    },
    {
      id: 2,
      title: "Learning mechation",
      duration: "2 month",
      price: "LKR 3500",
      provider: "Company",
      logo: companyLogo,
      image: rv2Img
    },
    {
      id: 3,
      title: "Image Segmentation, Filtering, and Region Analysis",
      duration: "3 hours",
      price: "LKR 3500",
      provider: "University",
      logo: companyLogo,
      image: rv3Img
    },
    {
      id: 4,
      title: "Web Development with vibe code",
      duration: "2 Weekes",
      price: "LKR 3500",
      provider: "Open AI",
      logo: openaiLogo,
      image: rv4Img
    }
  ];

  // Testimonials Data
  const testimonials = [
    {
      id: 1,
      name: "K.Kamal",
      avatar: avatar1Img,
      text: "I now feel more prepared to take on leadership roles and have already started mentoring some of my colleagues."
    },
    {
      id: 2,
      name: "Saman S. kumar",
      avatar: avatar2Img,
      text: "I now feel more prepared to take on leadership roles and have already started mentoring some of my colleagues."
    },
    {
      id: 3,
      name: "N. Nimal",
      avatar: avatar3Img,
      text: "I now feel more prepared to take on leadership roles and have already started mentoring some of my colleagues."
    },
    {
      id: 4,
      name: "K.Sumana",
      avatar: avatar4Img,
      text: "I now feel more prepared to take on leadership roles and have already started mentoring some of my colleagues."
    }
  ];

  // Track window resizing for responsive carousel translation
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNextSlide = () => {
    const maxIndex = isMobile ? banners.length - 1 : banners.length - 2;
    setCurrentSlide((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    const maxIndex = isMobile ? banners.length - 1 : banners.length - 2;
    if (index <= maxIndex) {
      setCurrentSlide(index);
    } else {
      setCurrentSlide(maxIndex);
    }
  };

  const maxIndex = isMobile ? banners.length - 1 : banners.length - 2;
  const activeDotIndex = currentSlide > maxIndex ? maxIndex : currentSlide;
  const translationOffset = currentSlide * (isMobile ? 100 : 50);

  return (
    <div className="landing-container">
      <Navbar />
      {/* 1. Banner Carousel Section */}
      <div className="carousel-wrapper">
        <div className="carousel-content">

          <section className="carousel-section">
            <div className="carousel-viewport">
              <div
                className="carousel-track"
                style={{ transform: `translateX(-${translationOffset}%)` }}
              >
                {banners.map((banner) => (
                  <div className="carousel-slide" key={banner.id}>
                    <img src={banner.img} alt={banner.alt} className="carousel-image" />
                  </div>
                ))}
              </div>

              <button
                className="carousel-next-btn"
                onClick={handleNextSlide}
                aria-label="Next slide"
              >
                &raquo;
              </button>
            </div>

            <div className="carousel-indicators">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`indicator-dot ${activeDotIndex === index ? 'active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* 2. Most Popular Certificates & Recently Viewed wrapper */}
      <div className="certificates-wrapper">
        <div className="certificates-content">
          {/* Most Popular Certificates Section */}
          <section className="certificates-section">
            <h2 className="section-title">Most Popular Certificates</h2>

            <div className="certificates-grid">
              {popularCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  duration={course.duration}
                  price={course.price}
                  provider={course.provider}
                  logo={course.logo}
                  image={course.image}
                />
              ))}
            </div>

            <div className="show-more-container">
              <button className="show-more-btn" onClick={() => navigate('/course-list')}>
                Show more
              </button>
            </div>
          </section>

          {/* Recently Viewed Products Section */}
          <section className="certificates-section" style={{ marginTop: '48px' }}>
            <h2 className="section-title">Recently Viewed Products</h2>

            <div className="certificates-grid">
              {recentlyViewedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  duration={course.duration}
                  price={course.price}
                  provider={course.provider}
                  logo={course.logo}
                  image={course.image}
                />
              ))}
            </div>

            <div className="show-more-container">
              <button className="show-more-btn" onClick={() => navigate('/course-list')}>
                Show more
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* 3. Learn with 150+ leading universities and companies */}
      <div className="partners-wrapper">
        <div className="partners-content">
          <section className="partners-section">
            <h2 className="partners-title">Learn with 150+ leading universities and companies</h2>

            <div className="partners-list">
              {/* Google */}
              <div className="partner-badge-pill">
                <img src={googleLogo} alt="Google" className="partner-logo-img" />
                <span className="partner-logo-text">Google</span>
              </div>

              {/* Kelaniya */}
              <div className="partner-badge-image-container">
                <img src={kelaniyaPartnerBadge} alt="University of Kelaniya" className="partner-badge-img-full" />
              </div>

              {/* OpenAI */}
              <div className="partner-badge-pill">
                <img src={openaiLogo} alt="OpenAI" className="partner-logo-img openai" />
                <span className="partner-logo-text">OpenAI</span>
              </div>

              {/* Moratuwa */}
              <div className="partner-badge-image-container">
                <img src={moratuwaPartnerBadge} alt="University of Moratuwa" className="partner-badge-img-full" />
              </div>

              {/* University of Michigan (Custom CSS block logo + text) */}
              <div className="partner-badge-pill">
                <div className="michigan-logo-block">
                  <span className="michigan-letter">M</span>
                </div>
                <span className="partner-logo-text">University of Michigan</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 4. Testimonials: Why people choose us */}
      <div className="testimonials-wrapper">
        <div className="testimonials-content">
          <section className="testimonials-section">
            <h2 className="section-title text-center">Why people choose us</h2>

            <div className="testimonials-grid">
              {testimonials.map((t) => (
                <div className="testimonial-card" key={t.id}>
                  <div className="testimonial-avatar-container">
                    <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                  </div>
                  <h4 className="testimonial-name">{t.name}</h4>
                  <p className="testimonial-text">
                    "{t.text}"
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
