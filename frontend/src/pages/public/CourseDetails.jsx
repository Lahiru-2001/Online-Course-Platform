import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, Award, Clock, Laptop, FileText, CheckCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleBuy = () => {
    if (isAuthenticated) {
      alert('Processing payment pathways... Redirecting to payment page.');
      navigate('/student/payments');
    } else {
      alert('Please login or register to enroll in courses.');
      navigate('/login', { state: { from: `/courses/${id}` } });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8 bg-[#F8F9FF] min-h-screen">
      {/* Top Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[21/6] max-h-[300px] bg-slate-900 shrink-0">
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200" 
          alt="Course Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 md:p-8">
          <span className="text-xl md:text-3xl font-extrabold text-white leading-snug block max-w-2xl">
            Industrial Fluid systems & Smart Factory Automation
          </span>
        </div>
      </div>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left side content (2 columns) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div>
            <h2 className="text-[20px] font-semibold text-[#1e3a5f] uppercase tracking-wider mb-3">About</h2>
            <p className="text-[14px] text-[#64748B] leading-relaxed">
              The "Industrial Fluid Systems & Smart Factory Automation" course represents a pivotal opportunity for individuals seeking to delve into the cutting-edge intersection of fluid dynamics, electrical drives, and smart automation technologies. With three comprehensive modules, participants embark on a transformative journey, exploring the intricacies of fluid and electrical drive systems, fluid circuit design, and the implementation of smart factory automation solutions.
            </p>
          </div>

          {/* Performance badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-gray-150 pb-3 md:pb-0 md:pr-4 flex flex-col justify-center">
              <span className="text-xs font-bold text-gray-800">Flexible schedule</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Recommended experience</span>
            </div>
            <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-gray-150 py-3 md:py-0 md:px-4 flex flex-col justify-center">
              <span className="text-xs font-bold text-gray-800">Intermediate level</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Recommended experience</span>
            </div>
            <div className="text-center md:text-left pt-3 md:pt-0 md:pl-4 flex items-center justify-center md:justify-start">
              <span className="text-xs font-bold text-gray-800">3 Month to complete</span>
            </div>
          </div>

          {/* Rating */}
          <Card className="border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="text-center shrink-0">
                <h3 className="text-3xl font-extrabold text-[#1e3a5f]">4 out of 5</h3>
                <div className="flex gap-0.5 justify-center mt-2 text-orange-500">
                  {[...Array(4)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />)}
                  <Star className="w-4 h-4 text-gray-300" />
                </div>
                <span className="text-[10px] text-gray-400 font-bold block uppercase mt-2">Top Rating</span>
              </div>

              <div className="flex-grow w-full flex flex-col gap-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3 text-xs text-[#64748B]">
                    <span className="w-12 text-right shrink-0 font-medium">{stars} Stars</span>
                    <div className="flex-grow h-2 bg-gray-150 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: `${stars === 5 || stars === 4 ? 80 : 40}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Review Block */}
          <div className="flex flex-col gap-3 pt-4 border-t border-gray-200 mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" 
                  alt="Latha" 
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#1e3a5f]">Latha</h4>
                  <div className="flex gap-0.5 mt-1 text-orange-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-gray-400 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>3 Month</span>
              </div>
            </div>
            <p className="text-[14px] text-[#64748B] leading-relaxed font-normal mt-1">
              Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...
            </p>
          </div>
        </div>

        {/* Right side box: Pricing & inclusions (1 column) */}
        <div className="w-full shrink-0 flex flex-col gap-6">
          <Card className="border border-gray-200 shadow-md p-0 overflow-hidden bg-white">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600" 
              alt="Thumbnail" 
              className="w-full h-44 object-cover" 
            />
            <div className="p-6 flex flex-col gap-5">
              <div>
                <h2 className="text-2xl font-black text-gray-900">LKR 3500.00</h2>
                <span className="text-xs text-gray-400 line-through">LKR 5000.00</span>
              </div>

              <Button onClick={handleBuy} variant="primary" className="w-full py-3 text-xs uppercase font-bold tracking-wider">
                Buy Now
              </Button>

              <div className="flex flex-col gap-3 border-t border-gray-150 pt-4 text-xs text-[#64748B]">
                <h3 className="font-bold text-[#1e3a5f] text-[14px]">This Course included</h3>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Money Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Access on all devices</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Certification on completion</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>32 Modules</span>
                </div>
              </div>

              <div className="border-t border-gray-150 pt-4 flex flex-col gap-2">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Offer by university of Moratuwa</span>
                <div className="p-3 bg-gray-50 border border-gray-150 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-700">University of Moratuwa</span>
                </div>
              </div>

              {/* Share links */}
              <div className="border-t border-gray-150 pt-4 flex flex-col gap-2">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Share this course</span>
                <div className="flex gap-2 justify-center">
                  {['T', 'F', 'Y', 'I', 'T', 'W'].map((social, idx) => (
                    <button key={idx} className="w-8 h-8 rounded-full border border-gray-200 text-xs font-bold text-gray-500 hover:bg-orange-500 hover:text-white transition-all">
                      {social}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>

      {/* Recommended for you */}
      <div className="mt-4">
        <h2 className="text-base font-bold text-[#1e3a5f] uppercase tracking-wider mb-6">Recommend for you</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'AI for day today life and industry level for all', price: 'LKR 3500' },
            { title: 'Learning motivation', price: 'LKR 2500' },
            { title: 'Image Segmentation, Filtering, and Region Analysis', price: 'LKR 3500' },
            { title: 'Web Development with vite code', price: 'LKR 3500' }
          ].map((course, idx) => (
            <Card key={idx} onClick={() => navigate(`/courses/${idx + 1}`)} className="flex flex-col h-full justify-between hover:-translate-y-1 transition-transform border border-gray-200 cursor-pointer">
              <div>
                <div className="w-full h-24 bg-gradient-to-br from-blue-50 to-orange-50 rounded-lg flex items-center justify-center">
                  <Award className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="font-bold text-[#1e3a5f] text-xs mt-3 line-clamp-2 min-h-[32px]">{course.title}</h3>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-[10px]">
                <span className="text-gray-500">Duration: 3 Month</span>
                <span className="font-bold text-orange-500">{course.price}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
