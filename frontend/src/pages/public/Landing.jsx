import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Award, ArrowRight, Star } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselSlides = [
    {
      title: "LAST CHANCE: SAVE 50%!",
      sub: "Limited Time Offer. Sale Ends Tonight.",
      desc: "Unlock your potential with premium LMS certification paths.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200"
    },
    {
      title: "COMBO DISCOUNT: 2 COURSES FOR $99",
      sub: "Bundle & Save. Expand your skill set today.",
      desc: "Get industry-recognized certifications from top universities.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200"
    }
  ];

  const popularCerts = [
    { id: 1, title: 'Industrial Fluid systems & Smart Factory Automation', org: 'University of Moratuwa', duration: '3 month', price: 'LKR 3500' },
    { id: 2, title: 'Industrial Fluid systems & Smart Factory Automation', org: 'Google', duration: '6 month', price: 'LKR 2500' },
    { id: 3, title: 'Google IT Automation with Python', org: 'University of Michigan', duration: '1 year', price: 'LKR 1500' },
    { id: 4, title: 'Industrial Fluid systems & Smart Factory Automation', org: 'Google', duration: '3 month', price: 'LKR 3000' }
  ];

  const recentlyViewed = [
    { id: 5, title: 'AI for day today life and industry level for all', org: 'University of Moratuwa', duration: '3 month', price: 'LKR 3500', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400' },
    { id: 6, title: 'Learning motivation', org: 'Company', duration: '2 month', price: 'LKR 2500', img: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=400' },
    { id: 7, title: 'Image Segmentation, Filtering, and Region Analysis', org: 'University', duration: '3 hours', price: 'LKR 3500', img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400' },
    { id: 8, title: 'Web Development with vite code', org: 'Open-AI', duration: '3 Weeks', price: 'LKR 3500', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400' }
  ];

  const universities = [
    { name: 'Google', img: 'https://www.google.com/favicon.ico' },
    { name: 'University of Kelaniya', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
    { name: 'OpenAI', img: 'https://cdn-icons-png.flaticon.com/512/1051/1051275.png' },
    { name: 'University of Moratuwa', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
    { name: 'University of Michigan', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }
  ];

  const testimonials = [
    { name: 'K.Kamal', text: '"I now feel more prepared to take on leadership roles and have already started mentoring some of my colleagues."' },
    { name: 'Saman S. kumar', text: '"I now feel more prepared to take on leadership roles and have already started mentoring some of my colleagues."' },
    { name: 'N. Nimal', text: '"I now feel more prepared to take on leadership roles and have already started mentoring some of my colleagues."' },
    { name: 'K.Susana', text: '"I now feel more prepared to take on leadership roles and have already started mentoring some of my colleagues."' }
  ];

  return (
    <div className="flex flex-col gap-10 bg-gray-50/50 pb-12">
      {/* Hero Carousel */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[21/9] max-h-[380px] bg-slate-900 flex items-center justify-center text-white">
        <img 
          src={carouselSlides[carouselIndex].image} 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-40" 
        />
        <div className="relative z-10 text-center px-6 max-w-2xl flex flex-col items-center">
          <span className="bg-orange-500 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full mb-3 shadow">
            {carouselSlides[carouselIndex].title}
          </span>
          <h1 className="text-xl md:text-3xl font-extrabold tracking-tight leading-snug !text-white">
            {carouselSlides[carouselIndex].sub}
          </h1>
          <p className="text-xs !text-white/80 mt-2 font-medium">
            {carouselSlides[carouselIndex].desc}
          </p>
          <Button onClick={() => navigate('/courses')} variant="primary" className="mt-5 py-2.5 px-6 text-xs uppercase font-bold tracking-wider">
            Explore Courses <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Indicators */}
        <div className="absolute bottom-4 flex gap-2">
          {carouselSlides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCarouselIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                carouselIndex === idx ? 'bg-orange-500 w-6' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Most Popular Certificates */}
      <div>
        <h2 className="text-base font-bold text-[#1e3a5f] uppercase tracking-wider mb-6">Most Popular Certificates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCerts.map((course) => (
            <Card key={course.id} onClick={() => navigate(`/courses/${course.id}`)} className="flex flex-col h-full justify-between hover:-translate-y-1 transition-transform border border-gray-200 cursor-pointer">
              <div>
                <div className="w-full h-32 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg flex items-center justify-center border border-orange-100">
                  <Award className="w-12 h-12 text-orange-500" />
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-3">{course.org}</p>
                <h3 className="font-bold text-[#1e3a5f] text-xs mt-1 line-clamp-2 min-h-[32px]">{course.title}</h3>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-[10px]">
                <span className="text-gray-500 font-medium">{course.duration}</span>
                <span className="font-bold text-orange-500">{course.price}</span>
              </div>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Button onClick={() => navigate('/courses')} variant="primary" className="py-1.5 px-6 text-[10px] font-bold uppercase">
            Show more
          </Button>
        </div>
      </div>

      {/* Recently Viewed Products */}
      <div>
        <h2 className="text-base font-bold text-[#1e3a5f] uppercase tracking-wider mb-6">Recently Viewed Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentlyViewed.map((course) => (
            <Card key={course.id} onClick={() => navigate(`/courses/${course.id}`)} className="flex flex-col h-full justify-between hover:-translate-y-1 transition-transform p-0 overflow-hidden border border-gray-200 shadow-sm cursor-pointer">
              <img src={course.img} alt={course.title} className="w-full h-32 object-cover" />
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{course.org}</p>
                  <h3 className="font-bold text-[#1e3a5f] text-xs mt-1 line-clamp-2 min-h-[32px]">{course.title}</h3>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-[10px]">
                  <span className="text-gray-500 font-medium">{course.duration}</span>
                  <span className="font-bold text-orange-500">{course.price}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Button onClick={() => navigate('/courses')} variant="primary" className="py-1.5 px-6 text-[10px] font-bold uppercase">
            Show more
          </Button>
        </div>
      </div>

      {/* University Logos */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 flex flex-col items-center gap-4 text-center">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Learn with 150+ leading universities and companies</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mt-2">
          {universities.map((uni, idx) => (
            <div key={idx} className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-pointer opacity-70 hover:opacity-100">
              <img src={uni.img} alt={uni.name} className="w-5 h-5 object-contain" />
              <span className="text-xs font-bold text-gray-600">{uni.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <h2 className="text-base font-bold text-[#1e3a5f] uppercase tracking-wider mb-6 text-center">Why people choose us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="border border-gray-200/80 p-5 flex flex-col gap-3 relative">
              <div className="flex items-center gap-2">
                <img src={`https://i.pravatar.cc/32?img=${idx+20}`} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                <span className="font-bold text-xs text-gray-800">{t.name}</span>
              </div>
              <p className="text-xs text-gray-500 italic leading-relaxed">{t.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
