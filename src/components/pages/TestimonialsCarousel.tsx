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
        "Mckeywa Projects transformed our infrastructure vision into reality. Their Level 1 BBBEE status and exceptional Construction expertise made them our preferred partner.",
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
        "Outstanding water treatment facility construction. Mckeywa's innovative approach and advanced Construction solutions delivered a world-class facility that serves 65,000 residents.",
      videoTestimonial: false,
    },
    {
      id: 3,
      name: "Nomsa Mthembu",
      title: "Roads & Transport Manager",
      company: "Mpumalanga Department of Transport",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJ1c2luZXNzJTIwYWZyaWNhbnxlbnwxfHx8fDE3NTU2NTcxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      testimonial:
        "6+ years.",
      videoTestimonial: true,
    },
    {
      id: 4,
      name: "David Wilson",
      title: "Development Manager",
      company: "Private Sector Client",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMHN1aXR8ZW58MXx8fHwxNzU1NjU3MTkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      testimonial:
        "Mckeywa Projects consistently delivers excellence. Their CIDB PE 5CE rating speaks to their capability, but their results speak even louder.",
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
      value: "25+",
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
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Compact Stats Header */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-300 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:border-orange-500/40 dark:hover:border-orange-500/60 text-center transition-all duration-300 hover:-translate-y-2 hover:scale-105 group overflow-hidden dark:text-white"
          >
            <CardContent className="p-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white mx-auto mb-2">
                <stat.icon className="w-4 h-4" />
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-gray-600 dark:text-white">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compact Main Testimonial - Fixed 200px height */}
      <div className="relative h-[200px]">
        <Card className="card-professional bg-white dark:bg-gray-800 overflow-hidden h-full">
          <CardContent className="p-0 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
              {/* Compact Image Side */}
              <div className="lg:col-span-2 relative h-[200px]">
                <ImageWithFallback
                  src={currentTest.image}
                  alt={currentTest.name}
                  className="w-full h-full object-cover"
                />
                {/* Video overlay */}
                {currentTest.videoTestimonial && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
                      <PlayCircle className="w-8 h-8 text-orange-500" />
                    </div>
                  </div>
                )}

                {/* Project badge */}
                
              </div>

              {/* Compact Content Side */}
              <div className="lg:col-span-3 p-4 h-[200px] overflow-hidden">
                <div className="h-full flex flex-col justify-between">
                  {/* Quote and stars in one line */}
                  <div className="flex items-center justify-between mb-2">
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
                  <blockquote className="text-sm text-gray-600 dark:text-gray-300 leading-tight mb-2 italic line-clamp-3">
                    "{currentTest.testimonial}"
                  </blockquote>

                  {/* Compact Author Info */}
                  <div className="mb-2">
                    <div className="font-bold text-sm text-gray-900 dark:text-white">
                      {currentTest.name}
                    </div>
                    <div className="text-xs text-orange-500 dark:text-orange-400 font-medium">
                      {currentTest.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
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
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={nextTestimonial}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Compact Testimonial Indicators */}
      <div className="flex justify-center items-center space-x-3">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.id}
            onClick={() => goToTestimonial(index)}
            className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ${
              index === currentTestimonial
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-orange-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-orange-900/50"
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

      {/* Compact Trust Indicators */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-6 text-white text-center">
        <h3 className="text-lg font-bold mb-4">
          Trusted by Leading Organizations
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Eskom Holdings", logo: "⚡" },
            { name: "Inter-Southern Power", logo: "🔌" },
            { name: "City Power", logo: "🏙️" },
            { name: "MTS Infraco", logo: "🚧" },
          ].map((client, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
            >
              <div className="text-2xl mb-1">{client.logo}</div>
              <div className="font-medium text-xs">
                {client.name}
              </div>
            </div>
          ))}
        </div>

    
      </div>
    </div>
  );
});

TestimonialsCarousel.displayName = "TestimonialsCarousel";

export { TestimonialsCarousel };