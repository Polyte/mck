import { memo, useMemo } from "react";
import { PageHeader } from "../PageHeader";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useRouter } from "../Router";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import {
  Shield,
  Award,
  Users,
  Building2,
  Target,
  CheckCircle,
  ArrowRight,
  Calendar,
  Phone,
  TrendingUp,
  Clock,
  Zap,
  HardHat,
  Settings,
  Globe,
} from "lucide-react";

const AboutPage = memo(() => {
  const { setCurrentPage } = useRouter();

  // Scroll animations
  const visionSection = useScrollAnimation({ threshold: 0.2 });
  const valuesSection = useScrollAnimation({ threshold: 0.1 });
  const teamSection = useScrollAnimation({ threshold: 0.1 });
  const historySection = useScrollAnimation({ threshold: 0.1 });

  const companyValues = useMemo(
    () => [
      {
        icon: Shield,
        title: "Safety First",
        description:
          "Uncompromising commitment to safety standards with zero-incident protocols across all construction sites.",
        color: "text-red-600",
      },
      {
        icon: Award,
        title: "Quality Excellence",
        description:
          "ISO 9001:2015 certified processes ensuring superior construction standards that exceed expectations.",
        color: "text-blue-600",
      },
      {
        icon: Users,
        title: "Team Collaboration",
        description: "Empowering diverse teams with continuous skills development and inclusive workplace practices.",
        color: "text-green-600",
      },
      {
        icon: Target,
        title: "Client Focus",
        description:
          "Dedicated to understanding and delivering solutions that exceed client expectations and requirements.",
        color: "text-[#d27015]",
      },
      {
        icon: Zap,
        title: "Innovation",
        description:
          "Embracing cutting-edge technologies and sustainable practices to deliver future-ready infrastructure.",
        color: "text-purple-600",
      },
      {
        icon: Globe,
        title: "Social Impact",
        description: "Contributing to community development through local procurement and skills development programs.",
        color: "text-indigo-600",
      },
    ],
    [],
  );

  const keyAchievements = useMemo(
    () => [
      {
        year: "2018",
        title: "Company Founded",
        description:
          "Established McKeywa Projects with a vision to transform South African infrastructure development.",
        milestone: "Level 1 BBBEE Status achieved",
      },
      {
        year: "2019",
        title: "CIDB Certification",
        description:
          "Achieved CIDB PE 5CE rating, qualifying for major infrastructure projects across multiple sectors.",
        milestone: "First major municipal project completed",
      },
      {
        year: "2020",
        title: "Regional Expansion",
        description: "Expanded operations to Western Cape, establishing regional presence and local partnerships.",
        milestone: "50+ projects completed successfully",
      },
      {
        year: "2021",
        title: "Technology Integration",
        description: "Implemented advanced BIM systems and digital project management across all operations.",
        milestone: "ISO 9001:2015 certification obtained",
      },
      {
        year: "2022",
        title: "Sustainability Focus",
        description: "Launched comprehensive environmental compliance and sustainable construction initiatives.",
        milestone: "200+ projects milestone reached",
      },
      {
        year: "2023",
        title: "Excellence Recognition",
        description: "Recognized as leading Black-owned construction company with outstanding safety record.",
        milestone: "500+ projects completed with zero incidents",
      },
      {
        year: "2024",
        title: "Future Innovation",
        description: "Pioneering smart infrastructure solutions and advancing digital construction methodologies.",
        milestone: "Ongoing commitment to excellence",
      },
    ],
    [],
  );

  const headerStats = useMemo(
    () => [
      { value: "25+", label: "Projects Completed", icon: Building2 },
      { value: "12+", label: "Years Excellence", icon: Award },
      { value: "5+", label: "Management Teams", icon: Users },
      { value: "8+", label: "Support Teams", icon: Users },
    ],
    [],
  );

  // Enhanced decorative images for About page
  const decorativeImages = [
    "https://images.unsplash.com/photo-1630288213265-64e4673b6f49?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1575971637203-d6255d9947a9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Page Header with decorative images */}
      <PageHeader
        title="About McKeywa Projects"
        subtitle="Excellence in Construction"
        description="A premier, 100% Black-owned construction company specializing in multi-disciplinary civil construction and infrastructure development across South Africa."
        backgroundImage="https://images.unsplash.com/photo-1610264146566-c233419fb1c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjb25zdHJ1Y3Rpb24lMjB0ZWFtJTIwb2ZmaWNlfGVufDF8fHx8MTc1NzQ1Mzc5Mnww&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[{ label: "Home", href: "home" }, { label: "About Us" }]}
        badge={{
          text: "CIDB PE 5CE • Level 1 BBBEE",
          icon: Shield,
        }}
        ctaButtons={{
          primary: {
            text: "Book An Appointment",
            action: () => setCurrentPage("contact"),
            icon: Phone,
          },
          secondary: {
            text: "View Projects",
            action: () => setCurrentPage("projects"),
            icon: Building2,
          },
        }}
        stats={headerStats}
        decorativeImages={decorativeImages}
      />

      {/* Vision & Mission Section with enhanced images */}
      <section
        ref={visionSection.ref}
        className={`section-padding bg-white animate-on-scroll ${visionSection.isVisible ? "is-visible" : ""}`}
      >
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-8 bg-blue-600 text-white text-lg px-6 py-3 font-semibold">
                <Target className="w-5 h-5 mr-2" />
                Our Vision & Mission
              </Badge>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Building Tomorrow's
                <span className="block text-[#d27015]">Infrastructure Today</span>
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To be the leading Black-owned construction company in South Africa, recognized for excellence in
                    infrastructure development, innovation in construction methodologies, and unwavering commitment to
                    safety and quality standards.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To deliver world-class civil construction and infrastructure solutions that exceed client
                    expectations while contributing to South Africa's economic transformation through skills
                    development, local procurement, and sustainable construction practices.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Main image with enhanced styling */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Modern construction and architecture"
                  className="w-full h-96 object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                {/* Professional badges */}
                <div className="absolute top-4 left-4 space-y-2">
                  <div className="bg-green-500/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-bold">100% Black Owned</span>
                  </div>
                  <div className="bg-blue-500/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2">
                    <Award className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-bold">ISO 9001:2015</span>
                  </div>
                </div>
              </div>

              {/* Floating achievement badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-xl">
                <div className="text-center">
                  <Award className="w-12 h-12 text-[#d27015] mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">6+</div>
                  <div className="text-sm text-gray-600 font-medium">Years of Excellence</div>
                </div>
              </div>

              {/* Small decorative images */}
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl overflow-hidden shadow-lg opacity-80">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1738931786807-45e3f39f332d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBjcmFuZSUyMGNpdHlzY2FwZSUyMG1vZGVybnxlbnwxfHx8fDE3NTYxOTQ3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Construction crane"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section ref={valuesSection.ref} className="section-padding bg-gray-100 relative">
        <div className="absolute inset-0 professional-grid opacity-30"></div>
        <div className="relative max-w-7xl mx-auto container-padding">
          <div className={`text-center mb-20 animate-on-scroll ${valuesSection.isVisible ? "is-visible" : ""}`}>
            <Badge className="mb-8 bg-green-600 text-white text-lg px-6 py-3 font-semibold">
              <HardHat className="w-5 h-5 mr-2" />
              Our Core Values
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Principles That Drive Excellence</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our unwavering commitment to these core values ensures consistent delivery of exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <Card
                key={index}
                className={`card-professional group text-center animate-on-scroll ${valuesSection.isVisible ? "is-visible" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company History Timeline */}
      <section ref={historySection.ref} className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className={`text-center mb-20 animate-on-scroll ${historySection.isVisible ? "is-visible" : ""}`}>
            <Badge className="mb-8 bg-orange-500 text-white text-lg px-6 py-3 font-semibold">
              <Clock className="w-5 h-5 mr-2" />
              Our Journey
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">A Legacy of Excellence</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              From humble beginnings to industry leadership - our journey of continuous growth and achievement
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#d27015] to-[#b8621a] rounded-full hidden lg:block"></div>

            <div className="space-y-12">
              {keyAchievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-8 animate-on-scroll ${historySection.isVisible ? "is-visible" : ""}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Content - alternating sides */}
                  <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:order-2"}`}>
                    <Card className="card-professional">
                      <CardContent className="p-8">
                        <div className="flex items-center space-x-3 mb-4">
                          <Badge className="bg-[#d27015] text-white font-bold">{achievement.year}</Badge>
                          <h3 className="text-2xl font-bold text-gray-900">{achievement.title}</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">{achievement.description}</p>
                        <div className="flex items-center space-x-2 text-sm font-medium text-[#d27015]">
                          <CheckCircle className="w-4 h-4" />
                          <span>{achievement.milestone}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="w-6 h-6 bg-gradient-to-r from-[#d27015] to-[#b8621a] rounded-full border-4 border-white shadow-lg z-10 hidden lg:block"></div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden lg:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Preview */}
      <section ref={teamSection.ref} className="section-padding bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className={`text-center mb-20 animate-on-scroll ${teamSection.isVisible ? "is-visible" : ""}`}>
            <Badge className="mb-8 bg-[#d27015]/20 text-[#d27015] border border-[#d27015]/30 text-lg px-6 py-3 font-semibold">
              <Users className="w-5 h-5 mr-2" />
              Our Leadership
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Experienced Industry Leaders</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Our leadership team brings decades of combined experience in construction, Construction, and project
              management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Executive Leadership",
                role: "Strategic Direction",
                experience: "20+ years combined experience",
                specialization: "Construction Management & Strategic Planning",
              },
              {
                name: "Construction Team",
                role: "Technical Excellence",
                experience: "15+ years average experience",
                specialization: "Civil Construction & Infrastructure Development",
              },
              {
                name: "Project Management",
                role: "Operational Excellence",
                experience: "18+ years combined experience",
                specialization: "Project Delivery & Quality Assurance",
              },
            ].map((team, index) => (
              <Card
                key={index}
                className={`bg-white/10 backdrop-blur-md border border-white/20 text-center hover:bg-white/20 transition-all duration-300 animate-on-scroll ${teamSection.isVisible ? "is-visible" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#d27015] to-[#b8621a] rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                    <Users className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{team.name}</h3>
                  <p className="text-orange-400 font-semibold mb-3">{team.role}</p>
                  <p className="text-gray-300 text-sm mb-4">{team.experience}</p>
                  <p className="text-gray-400 text-sm">{team.specialization}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              onClick={() => setCurrentPage("contact")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-12 py-4 text-lg"
            >
              <Users className="mr-3 w-6 h-6" />
              Meet Our Team
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">Ready to Work With Excellence?</h2>
          <p className="text-xl mb-16 max-w-4xl mx-auto text-white/90 leading-relaxed">
            Partner with a company that combines experience, innovation, and unwavering commitment to quality. Let's
            build your vision together.
          </p>

          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
            <Button
              onClick={() => setCurrentPage("contact")}
              className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-12 py-6 text-xl shadow-lg"
            >
              <Phone className="mr-3 w-7 h-7" />
              Get Free Consultation
              <ArrowRight className="ml-3 w-7 h-7" />
            </Button>

            <Button
              onClick={() => setCurrentPage("projects")}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-12 py-6 text-xl"
            >
              <Building2 className="mr-3 w-7 h-7" />
              View Our Projects
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
});

AboutPage.displayName = "AboutPage";

export { AboutPage };
