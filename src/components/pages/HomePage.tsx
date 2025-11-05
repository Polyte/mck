/** @jsxImportSource react */

import { memo, useMemo, useState, useEffect } from "react";
import IMG3335 from "../../assets/images/IMG_3335.jpeg";
import IMG3340 from "../../assets/images/IMG_3340.jpeg";
import IMG3346 from "../../assets/images/IMG_3346.jpeg";
import IMG3356 from "../../assets/images/IMG_3356.jpeg";
import IMG3424 from "../../assets/images/IMG_3424.jpeg";
import IMG3447 from "../../assets/images/IMG_3447.webp";
import { HeroCarousel } from "../HeroCarousel";
import { ProjectCalculator } from "../ProjectCalculator";
import { TestimonialsCarousel } from "../TestimonialsCarousel";
import { ConsultationBooking } from "../ConsultationBooking";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useRouter } from "../Router";
import { useScrollAnimation, useAnimatedCounter, useStaggeredAnimation } from "../hooks/useScrollAnimation";
import {
  Shield,
  Award,
  Users,
  Building2,
  HardHat,
  Zap,
  Settings,
  CheckCircle,
  ArrowRight,
  Wrench,
  Truck,
  Construction,
  Calculator,
  Calendar,
  PhoneCall,
  Star,
  Quote,
  Gift,
  Clock,
  TrendingUp,
  Phone,
} from "lucide-react";

 

// Animated Counter Component
const AnimatedCounter = memo(
  ({
    end,
    suffix = "",
    prefix = "",
    duration = 2000,
  }: {
    end: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
  }) => {
    const { ref, isVisible } = useScrollAnimation({
      threshold: 0.5,
    });
    const { count, startAnimation } = useAnimatedCounter(end, duration);

    useEffect(() => {
      if (isVisible) {
        startAnimation();
      }
    }, [isVisible, startAnimation]);

    return (
      <div ref={ref} className="animate-count-up">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
    );
  },
);

AnimatedCounter.displayName = "AnimatedCounter";

const HomePage = memo(() => {
  const { setCurrentPage } = useRouter();
  const [showCalculator, setShowCalculator] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  // Scroll animations
  const aboutSection = useScrollAnimation({ threshold: 0.2 });
  const capabilitiesSection = useScrollAnimation({
    threshold: 0.1,
  });
  const testimonialsSection = useScrollAnimation({
    threshold: 0.1,
  });
  const servicesSection = useScrollAnimation({
    threshold: 0.1,
  });

  const stats = useMemo(
    () => [
      {
        icon: Building2,
        value: 5,
        suffix: "+",
        label: "Projects Completed",
        color: "text-[#fff]",
      },
      {
        icon: Users,
        value: 5,
        suffix: "+",
        label: "Expert Engineers",
        color: "text-blue-600",
      },
      {
        icon: Award,
        value: 100,
        suffix: "%",
        label: "Client Satisfaction",
        color: "text-green-600",
      },
      {
        icon: Shield,
        value: 1,
        prefix: "Level ",
        label: "BBBEE Status",
        color: "text-[#b8621a]",
      },
    ],
    [],
  );

  const capabilities = useMemo(
    () => [
      {
        icon: HardHat,
        title: "Safety Excellence",
        description:
          "Zero-incident safety protocols with continuous monitoring and industry-leading safety standards across all construction sites.",
        metric: "0 incidents in 2024",
        color: "text-orange-600",
        image:
          "https://plus.unsplash.com/premium_photo-1677529102407-0d075eb2cbb9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        icon: Award,
        title: "Quality Assurance",
        description:
          "We follow ISO 9001-certified processes to deliver construction excellence that consistently surpasses client expectations.",
        metric: "98.5% quality score",
        color: "text-blue-600",
        image:
          "https://images.unsplash.com/photo-1714765445826-582769cf22ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbmZyYXN0cnVjdHVyZSUyMGRldmVsb3BtZW50JTIwcHJvamVjdHxlbnwxfHx8fDE3NTU2NTgyMzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        icon: Zap,
        title: "Innovation",
        description:
          "Cutting-edge construction technologies and sustainable building practices that set new industry benchmarks.",
        metric: "25% efficiency gain",
        color: "text-[#d27015]",
        image:
          "https://images.unsplash.com/premium_photo-1677529102407-0d075eb2cbb9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        icon: Users,
        title: "Expert Team",
        description:
          "Professional engineers and certified construction specialists with decades of combined experience.",
        metric: "6+ years avg experience",
        color: "text-green-600",
        image:
          "https://images.unsplash.com/photo-1581674662583-5e89b374fae6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXZpbCUyMGVuZ2luZWVyaW5nJTIwYmx1ZXByaW50cyUyMHBsYW5uaW5nfGVufDF8fHx8MTc1NTY1ODI0MXww&ixlib=rb-4.1.0&q=80&w=1080",
      },
    ],
    [],
  );

  const services = useMemo(
    () => [
      {
        icon: Building2,
        title: "Infrastructure Development",
        description: "Comprehensive infrastructure solutions including bridges, highways, and municipal projects.",
        projects: "5+",
      },
      {
        icon: Truck,
        title: "Road Construction",
        description: "Road construction and maintenance expertise with advanced techniques, ensuring efficient maintenance.",
        projects: "5+",
      },
      {
        icon: Construction,
        title: "Civil Construction",
        description: "Comprehensive civil construction services from planning to project completion and maintenance services.",
        projects: "5+",
      },
      {
        icon: Wrench,
        title: "Maintenance Services",
        description: "Ongoing maintenance and repair services ensuring long-term infrastructure reliability.",
        projects: "5+",
      },
    ],
    [],
  );

  // Staggered animations for capabilities
  const { visibleItems: visibleCapabilities, setRef: setCapabilityRef } = useStaggeredAnimation(capabilities, 200);

  return (
    <div className="min-h-screen font-['Josefin_Sans'] relative overflow-x-hidden bg-gray-50">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Professional Offer Banner */}

      {/* Company Metrics Section */}
      <section className="section-padding bg-white relative">
        <div className="absolute inset-0 professional-grid opacity-30"></div>
        <div className="relative max-w-7xl mx-auto container-padding">
          <div className="text-center mb-20">
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Welcome to <span className="text-[#d27015] font-bold">Mckeywa</span> Projects</h2>
            <p className="text-xl text-gray-600 max-w-6xl mx-auto">
              We create measurable results that demonstrate our commitment to superior construction and construction
              standards, we deliver world-class civil construction and infrastructure solutions that exceed client
              expectations while contributing to South Africa's economic transformation through skills development,
              local procurement, and sustainable construction practices.
            </p>
          </div>

          {/* Professional CTA Section */}
        </div>
      </section>

      {/* About Preview Section */}
      <section
        ref={aboutSection.ref}
        className={`section-padding bg-slate-900 text-white relative overflow-hidden animate-on-scroll ${aboutSection.isVisible ? "is-visible" : ""}`}
      >
        <div className="absolute inset-0 professional-grid opacity-10"></div>
        <div className="relative max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className={`animate-on-scroll-left ${aboutSection.isVisible ? "is-visible" : ""}`}>
              <Badge className="mb-8 bg-[#d27015]/20 text-[#f2b777] border border-[#d27015]/30 text-lg px-6 py-3 font-semibold">
                <Building2 className="w-5 h-5 mr-2" />
                CONSTRUCTION LEADERSHIP
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                Pioneering South Africa's
                <span className="block text-[#f2b777]">Infrastructure Future</span>
              </h2>
              <p className="text-xl mb-10 leading-relaxed text-gray-300">
                McKeywa Projects (Pty) Ltd stands as South Africa's premier construction innovator, combining advanced
                construction methodologies with sustainable construction practices. Our Level 1 BBBEE status and CIDB PE
                5CE rating position us to deliver transformative infrastructure projects across multiple sectors.
              </p>

              <div className="space-y-6 mb-12">
                {[
                  "Advanced IMS and 3D modeling capabilities",
                  "Certified project management professionals",
                  "Comprehensive quality assurance systems",
                  "Environmental sustainability compliance",
                  "Continuous safety monitoring protocols",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-white font-medium text-lg">{item}</span>
                  </div>
                ))}
              </div>

               
            </div>

            <div className={`animate-on-scroll-right ${aboutSection.isVisible ? "is-visible" : ""}`}>
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1664728796715-465b06b19050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBlbmdpbmVlcmluZyUyMHRlYW0lMjBoYXJkaGF0JTIwc2FmZXR5fGVufDF8fHx8MTc1NTY1Njk3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Construction Construction excellence and safety"
                  className="w-full rounded-2xl shadow-2xl"
                />

                {/* Professional overlay badges */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-[#d27015]" />
                    <span className="font-bold text-gray-900">Safety First</span>
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-gray-900">24/7</div>
                    <div className="text-sm text-gray-600 font-semibold">Monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section ref={capabilitiesSection.ref} className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 professional-grid opacity-30"></div>
        <div className="relative max-w-7xl mx-auto container-padding">
          <div className={`text-center mb-20 animate-on-scroll ${capabilitiesSection.isVisible ? "is-visible" : ""}`}>
            <Badge className="mb-8 bg-blue-600 text-white text-lg px-6 py-3 font-semibold">
              <Zap className="w-5 h-5 mr-2" />
              Core Capabilities
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Advanced Construction Expertise</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Cutting-edge technical expertise across multiple construction disciplines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {capabilities.map((capability, index) => (
              <Card
                key={index}
                ref={setCapabilityRef(index)}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:border-[#d27015]/40 group transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] overflow-hidden ${
                  visibleCapabilities.has(index) ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-0 overflow-hidden">
                  <div className="relative">
                    <ImageWithFallback
                      src={capability.image}
                      alt={capability.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#d27015] to-[#b8621a] rounded-xl flex items-center justify-center text-white shadow-lg">
                        <capability.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-orange-900 mb-4">{capability.title}</h3>
                    <p className="text-white leading-relaxed mb-6 text-lg">{capability.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-[#d27015]">{capability.metric}</span>
                     
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsSection.ref}
        className={`section-padding bg-gray-100 relative animate-on-scroll ${testimonialsSection.isVisible ? "is-visible" : ""}`}
      >
        <div className="absolute inset-0 professional-grid opacity-20"></div>
        <div className="relative max-w-7xl mx-auto container-padding">
          <div className="text-center mb-20">
            <Badge className="mb-8 bg-green-600 text-white text-lg px-6 py-3 font-semibold">
              <Quote className="w-5 h-5 mr-2" />
              Client Success Stories
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-500  mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-600  max-w-4xl mx-auto">
              Real testimonials from satisfied clients who trusted us with their construction projects
            </p>
          </div>

          <div>
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

 
       

      {/* Services Preview */}
      <section ref={servicesSection.ref} className="section-padding bg-white relative">
        <div className="absolute inset-0 professional-grid opacity-30"></div>
        <div className="relative max-w-7xl mx-auto container-padding">
          <div className={`text-center mb-20 animate-on-scroll ${servicesSection.isVisible ? "is-visible" : ""}`}>
            <Badge className="mb-8 bg-[#d27015] text-white text-lg px-6 py-3 font-semibold">
              <Construction className="w-5 h-5 mr-2" />
              Our Services
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Complete Construction Solutions</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              End-to-end construction services from initial planning to project completion and ongoing maintenance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:border-[#d27015]/30 group text-center transition-all duration-300 text-white hover:-translate-y-2 hover:scale-[1.02] ${servicesSection.isVisible ? "animate-fade-in-up" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#d27015] to-[#b8621a] rounded-xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-white mb-6 leading-relaxed">{service.description}</p>
                  <div className="text-sm font-semibold text-[#d27015]">{service.projects} projects completed</div>
                </CardContent>
              </Card>
            ))}
          </div>
 
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 professional-grid opacity-10"></div>

        <div className="relative max-w-7xl mx-auto container-padding text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">Ready to Build Your Vision?</h2>
          <p className="text-xl mb-16 max-w-4xl mx-auto text-gray-300 leading-relaxed">
            Partner with South Africa's leading construction Construction firm. Let's transform your infrastructure
            vision into reality with precision, innovation, and excellence.
          </p>

          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
            

            <Dialog open={showBooking} onOpenChange={setShowBooking}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-12 py-6 text-xl"
                >
                  <Phone className="mr-3 w-7 h-7" />
                  Call Now: (012) 322 6786
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </section>
    </div>
  );
});

HomePage.displayName = "HomePage";

export { HomePage };
