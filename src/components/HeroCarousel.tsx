import { memo, useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useRouter } from "./Router";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Shield,
  Award,
  Building2,
  Target,
  ArrowRight,
  Video,
  Volume2,
  VolumeX,
  Users,
} from "lucide-react";

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  videoId?: string;
  badge: string;
  cta: {
    primary: { text: string; action: string };
    secondary: { text: string; action: string };
  };
  type: "image" | "video";
}

const HeroCarousel = memo(() => {
  const { setCurrentPage } = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const slides: CarouselSlide[] = [
    {
      id: 1,
      title: "Building Tomorrow's Infrastructure",
      subtitle: "Construction Excellence",
      description:
        "Premier construction and maintanance solutions across South Africa. From substations to specialized civil construction, we deliver world-class infrastructure that stands the test of time.",
      videoId: "CG5D2NHdq7A", // Construction & Construction video
      badge: "Featured: Construction Process",
      type: "video",
      cta: {
        primary: { text: "Our Construction", action: "services" },
        secondary: { text: "Watch More", action: "projects" },
      },
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying) return;

    // Determine interval based on current slide type
    const currentSlideData = slides[currentSlide];
    const interval = currentSlideData.type === "video" ? 30000 : 7000; // 30 seconds for video, 7 seconds for images

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, slides.length, currentSlide]);

  // Handle video autoplay when slide changes
  useEffect(() => {
    const currentSlideData = slides[currentSlide];
    if (currentSlideData.type === "video" && videoRef.current) {
      const videoUrl = `https://www.youtube.com/embed/${currentSlideData.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${currentSlideData.videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`;
      videoRef.current.src = videoUrl;
    }
  }, [currentSlide, isMuted]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleCTA = (action: string) => {
    setCurrentPage(action as any);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Images and Videos */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.type === "image" ? (
              <>
                <ImageWithFallback src={slide.image!} alt={slide.title} className="w-full h-full object-cover" />
                {/* Professional gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 via-slate-800/80 to-orange-500/70" />
              </>
            ) : (
              <>
                <div className="w-full h-full">
                  <iframe
                    ref={index === currentSlide ? videoRef : null}
                    className="w-full h-full object-cover scale-150 transform translate-y-[-10%]"
                    src={
                      index === currentSlide
                        ? `https://www.youtube.com/embed/${slide.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${slide.videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&start=0`
                        : ""
                    }
                    title={slide.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {/* Video overlay for content readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-slate-800/70 to-orange-500/60" />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Professional grid overlay */}
      <div className="absolute inset-0 professional-grid opacity-10"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto container-padding w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div key={currentSlide} className="animate-fade-in-left space-y-8">
                <Badge
                  className={`bg-orange-500/20 text-orange-400 border border-orange-500/30 text-lg px-6 py-3 font-semibold ${
                    currentSlideData.type === "video" ? "animate-pulse" : ""
                  }`}
                >
                  {currentSlideData.type === "video" ? (
                    <Video className="w-5 h-5 mr-2" />
                  ) : (
                    <Shield className="w-5 h-5 mr-2" />
                  )}
                  {currentSlideData.badge}
                </Badge>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-orange-400 tracking-wide">{currentSlideData.subtitle}</h2>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">{currentSlideData.title}</h1>
                </div>

                <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl">
                  {currentSlideData.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-6 pt-8">
                  <Button
                    size="lg"
                    onClick={() => handleCTA(currentSlideData.cta.primary.action)}
                    className="bg-[#d27015] hover:bg-[#b8621a] text-white font-semibold px-10 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Building2 className="mr-3 w-6 h-6" />
                    {currentSlideData.cta.primary.text}
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleCTA(currentSlideData.cta.secondary.action)}
                    className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-10 py-6 text-lg backdrop-blur-sm bg-white/10 transition-all duration-300"
                  >
                    <Target className="mr-3 w-6 h-6" />
                    {currentSlideData.cta.secondary.text}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right side - Statistics/Features */}
            {/*<div className="hidden lg:block">
              <div key={`stats-${currentSlide}`} className="animate-fade-in-right space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Building2, value: "500+", label: "Projects Completed", color: "text-orange-400" },
                    { icon: Shield, value: "100%", label: "Safety Record", color: "text-green-400" },
                    { icon: Award, value: "Level 1", label: "BBBEE Status", color: "text-blue-400" },
                    { icon: Users, value: "75+", label: "Expert Engineers", color: "text-yellow-400" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-center group hover:scale-105 transition-all duration-300 hover:bg-white/20"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <stat.icon className="w-8 h-8" />
                      </div>
                      <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                      <div className="text-sm text-gray-200 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>*/}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-2 
         shadow-lg">
          {/* Play/Pause */}
          <button
            onClick={togglePlayPause}
            className="text-white hover:text-orange-400 transition-colors p-2 hover:scale-110"
            title={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          {/* Mute/Unmute (only show when video slide is active) */}
          {currentSlideData.type === "video" && (
            <button
              onClick={toggleMute}
              className="text-white hover:text-orange-400 transition-colors p-2 hover:scale-110"
              title={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          )}

          {/* Slide indicators */}
          <div className="flex space-x-3">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 relative ${
                  index === currentSlide ? "bg-orange-500 scale-125 shadow-lg" : "bg-white/40 hover:bg-white/70"
                }`}
                title={`Go to slide ${index + 1}: ${slide.title}`}
              >
                {slide.type === "video" && (
                  <Video className="w-2 h-2 absolute -top-3 left-1/2 transform -translate-x-1/2 text-orange-400" />
                )}
              </button>
            ))}
          </div>

          {/* Slide counter */}
          <div className="text-white/80 text-sm font-mono">
            {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </div>

          {/* Video indicator */}
          {currentSlideData.type === "video" && (
            <div className="text-orange-400 text-xs font-semibold flex items-center animate-pulse">
              <Video className="w-3 h-3 mr-1" />
              LIVE
            </div>
          )}
        </div>
      </div>

      {/* Side Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full text-white hover:text-orange-400 transition-all duration-300 hover:scale-110 hover:bg-white/20"
        title="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full text-white hover:text-orange-400 transition-all duration-300 hover:scale-110 hover:bg-white/20"
        title="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-20 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center bg-white/10 backdrop-blur-sm">
          <div className="w-1 h-4 bg-orange-400 rounded-full mt-3 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
});

HeroCarousel.displayName = "HeroCarousel";

export { HeroCarousel };
