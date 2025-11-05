import { memo, useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Award,
  Building2,
  CheckCircle,
  TrendingUp,
  Users,
  PlayCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const TestimonialsCarousel = memo(() => {
  const [currentTestimonial, setCurrentTestimonial] =
    useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Municipal Manager",
      company: "City of Johannesburg",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b6fc3b7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU1NjU3MTg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      testimonial:
        "McKeywa Projects transformed our infrastructure vision into reality. Their Level 1 BBBEE status and exceptional Construction expertise made them our preferred partner.",
      projectType: "Bridge Construction", 
      completionTime: "16 months",
      results: [
        "Completed ahead of schedule",
        "Zero safety incidents",
        "15% under budget",
      ],
      videoTestimonial: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Infrastructure Director",
      company: "KwaZulu-Natal Provincial Government",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NTY1NzE4OHww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      testimonial:
        "Outstanding water treatment facility construction. McKeywa's innovative approach and advanced Construction solutions delivered a world-class facility that serves 65,000 residents.",
      projectType: "Water Infrastructure", 
      completionTime: "24 months",
      results: [
        "Serves 65,000 residents",
        "Advanced filtration tech",
        "Sustainable design",
      ],
      videoTestimonial: false,
    },
     
    {
      id: 3,
      name: "David Wilson",
      title: "Development Manager",
      company: "Private Sector Client",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMHN1aXR8ZW58MXx8fHwxNzU1NjU3MTkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      testimonial:
        "McKeywa Projects consistently delivers excellence. Their CIDB PE 5CE rating speaks to their capability, but their results speak even louder.",
      projectType: "Commercial Development", 
      completionTime: "18 months",
      results: [
        "Premium construction quality",
        "Innovative design solutions",
        "Excellent project management",
      ],
      videoTestimonial: false,
    },
  ];

  const stats = [
    {
      label: "Client Satisfaction",
      value: "100%",
      icon: Users,
    },
    {
      label: "Projects Completed",
      value: "5+",
      icon: Building2,
    },
    { label: "Average Rating", value: "5.0", icon: Star },
    { label: "Repeat Clients", value: "89%", icon: TrendingUp },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial(
        (prev) => (prev + 1) % testimonials.length,
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const nextTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev + 1) % testimonials.length,
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) =>
        (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const currentTest = testimonials[currentTestimonial];

  return (
    <div className="max-w-7xl mx-auto space-y-8 justify-center align-center">
      {/* Compact Stats Header */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-2xl hover:border-[#14184c]/40 text-center transition-all duration-300 hover:-translate-y-2 hover:scale-105 group overflow-hidden"
          >
            <CardContent className="p-4">
              <div className="w-8 h-8 bg-gradient-to-r from-[#14184c] to-[#0f1340] rounded-lg flex items-center justify-center text-white mx-auto mb-2">
                <stat.icon className="w-4 h-4" />
              </div>
              <div className="text-lg font-bold text-gray-500 dark:text-gray-300 mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compact Main Testimonial - Fixed 200px height */}
      <div className="relative h-[250px] flex items-center justify-center">
        <Card className="card-professional overflow-hidden h-full ">
          <CardContent className="p-0 h-full ">
            <div className="flex h-full items-center justify-center">
              

              {/* Compact Content Side */}
              <div className=" h-[200px] overflow-hidden">
                <div className="h-full flex flex-col items-center justify-between">
                  {/* Quote and stars in one line */}
                  <div className="flex items-center justify-between">
                    <Quote className="w-6 h-6 text-yellow-500" />
                    <div className="flex space-x-1">
                      {[...Array(currentTest.rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-yellow-500 text-yellow-500"
                          />
                        ),
                      )}
                    </div>
                  </div>

                  {/* Compact Testimonial */}
                  <blockquote className="text-sm text-gray-600 leading-tight italic text-center">
                    "{currentTest.testimonial}"
                  </blockquote>

                  {/* Compact Author Info */}
                  <div className=" text-center">
                    <div className="font-bold text-sm text-gray-900">
                      {currentTest.name}
                    </div>
                    <div className="text-xs text-orange-500 font-medium text-center">
                      {currentTest.title}
                    </div>
                    <div className="text-xs text-gray-500  text-center">
                      {currentTest.company}
                    </div>
                  </div>
 
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compact Navigation Arrows */}
        <button
          onClick={prevTestimonial}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-orange-500 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={nextTestimonial}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-orange-500 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Compact Testimonial Indicators */}
      <div className="flex justify-center items-center space-x-3 mt-6">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.id}
            onClick={() => goToTestimonial(index)}
            className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ${
              index === currentTestimonial
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-orange-100"
            }`}
          >
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <ImageWithFallback
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block text-left">
              <div className="font-semibold text-xs">
                {testimonial.name}
              </div>
              <div className="text-xs opacity-80 truncate max-w-[100px]">
                {testimonial.company}
              </div>
            </div>
            {testimonial.videoTestimonial && (
              <PlayCircle className="w-3 h-3" />
            )}
          </button>
        ))}
      </div>

      {/* Trusted Organizations Marquee */}
      <div className="bg-white dark:from-slate-800 py-4 dark:to-blue-800 rounded-2xl text-white overflow-hidden relative">
        <h3 className="text-2xl font-bold mb-8 text-center text-[#d27015]">
          Trusted by Leading Organizations
        </h3>
       
        {/* Navigation Arrows - Only show on larger screens */}
         
        
        <div className="hidden md:block absolute top-1/2 right-4 -translate-y-1/2 z-20">
         <hr />
          <button 
            onClick={() => {
              const container = document.querySelector('.marquee-container');
              if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
            }}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        <div className="relative w-full overflow-hidden marquee-container">
          {/* First row of logos */}
           
          
          {/* Second row of logos (duplicate for seamless looping) */}
          <div className="flex w-max animate-marquee whitespace-nowrap ">
            {[
              { 
                name: "Eskom National Transmission", 
                logo: "/src/assets/logos/eskom-national-transmission.png",
            
                height: 100
              },
              { 
                name: "City Power", 
                logo: "/src/assets/logos/citypower.jpg",
                 
                height: 100
              },
              { 
                name: "MTS Infraco", 
                logo: "/src/assets/logos/mts-infraco.png",
                
                height: 100
              },
              { 
                name: "Consolidated Power Projects", 
                logo: "/src/assets/logos/consolidated-power-projects.png",
                 
                height: 100
              },
              { 
                name: "Eskom Rotek", 
                logo: "/src/assets/logos/eskom-rotek.jpg",
                 
                height: 100
              },
              { 
                name: "Consolidated Power Maintenance", 
                logo: "/src/assets/logos/consolidated-power-maintenance.png",
               
                height: 150
              },
              { 
                name: "SPM", 
                logo: "/src/assets/logos/spm.jpg",
                height: 130
                
              },
            ].map((client, index) => (
              <div 
                key={`logo-dup-${index}`} 
                className="mx-6 flex flex-col items-center justify-center min-w-[150px]   bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="h-20 flex items-center justify-center">
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    className="max-h-full max-w-full p-4 object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                    style={{
                      width: client.width,
                      height: client.height,
                      objectFit: 'contain'
                    }}
                    loading="lazy"
                  />
                </div>
                <div className="text-sm font-medium text-center text-white/80 group-hover:text-white transition-colors">
                  {client.name}
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient fades */}
           </div>
        
        {/* Add the animation keyframes */}
        <style jsx global>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
            scroll-behavior: smooth;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
          .marquee-container {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .marquee-container::-webkit-scrollbar {
            display: none;
          }
          @media (max-width: 768px) {
            .animate-marquee {
              animation: marquee 60s linear infinite;
            }
          }
        `}</style>
      </div>
    </div>
  );
});

TestimonialsCarousel.displayName = "TestimonialsCarousel";

export { TestimonialsCarousel };