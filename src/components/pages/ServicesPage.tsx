import { memo, useMemo, useState } from "react";
import { PageHeader } from "../PageHeader";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { useRouter } from "../Router";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import {
  Building2,
  Truck,
  Wrench,
  Settings,
  ArrowRight,
  Calendar,
  Phone,
  CheckCircle,
  Award,
  Shield,
  Zap,
  Users,
  Construction,
  HardHat,
  Target,
  Clock,
  MapPin,
  TrendingUp,
} from "lucide-react";

const ServicesPage = memo(() => {
  const { setCurrentPage } = useRouter();
  const [selectedService, setSelectedService] = useState<number | null>(null);

  // Scroll animations
  const servicesSection = useScrollAnimation({ threshold: 0.1 });
  const capabilitiesSection = useScrollAnimation({ threshold: 0.1 });
  const processSection = useScrollAnimation({ threshold: 0.1 });

  const mainServices = useMemo(
    () => [
      {
        id: 1,
        icon: Building2,
        title: "Infrastructure Development",
        description:
          "Comprehensive infrastructure solutions including bridges, highways, water treatment facilities, and municipal projects that serve communities across South Africa.",
        features: [
          "Bridge Construction & Rehabilitation",
          "Highway & Road Development",
          "Water Treatment Facilities",
          "Municipal Infrastructure",
          "Airport & Transport Hubs",
          "Industrial Facilities",
        ],
        image:
          "https://plus.unsplash.com/premium_photo-1661873243927-ac13c13485eb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8SW5mcmFzdHJ1Y3R1cmUlMjBEZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D",
        projects: "210+",
        averageValue: "R45M",
        completionTime: "18 months avg",
      },
      {
        id: 2,
        icon: Truck,
        title: "Road Construction",
        description:
          "Advanced road Construction and rehabilitation using state-of-the-art equipment and sustainable construction techniques for long-lasting infrastructure.",
        features: [
          "Asphalt & Concrete Roads",
          "Road Rehabilitation",
          "Traffic Management Systems",
          "Drainage & Stormwater",
          "Sidewalks & Pedestrian Areas",
          "Parking Facilities",
        ],
        image:
          "https://images.unsplash.com/photo-1740485132839-3edd43060988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwY29uc3RydWN0aW9uJTIwaGVhdnklMjBtYWNoaW5lcnl8ZW58MXx8fHwxNzU1NjU3MTgzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        projects: "140+",
        averageValue: "R25M",
        completionTime: "12 months avg",
      },
      {
        id: 3,
        icon: Construction,
        title: "Civil Construction",
        description:
          "Complete civil Construction services from initial planning and design to project completion, maintenance, and lifecycle management.",
        features: [
          "Structural Construction",
          "Geotechnical Analysis",
          "Project Planning & Design",
          "Environmental Compliance",
          "Quality Assurance",
          "Lifecycle Management",
        ],
        image:
          "https://images.unsplash.com/photo-1581674662583-5e89b374fae6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXZpbCUyMGVuZ2luZWVyaW5nJTIwYmx1ZXByaW50cyUyMHBsYW5uaW5nfGVufDF8fHx8MTc1NTY1ODI0MXww&ixlib=rb-4.1.0&q=80&w=1080",
        projects: "150+",
        averageValue: "R35M",
        completionTime: "15 months avg",
      },
      {
        id: 4,
        icon: Wrench,
        title: "Maintenance Services",
        description:
          "Ongoing maintenance and repair services ensuring long-term infrastructure reliability with preventive maintenance programs.",
        features: [
          "Preventive Maintenance",
          "Emergency Repairs",
          "Infrastructure Upgrades",
          "Asset Management",
          "24/7 Support Services",
          "Performance Monitoring",
        ],
        image:
          "https://plus.unsplash.com/premium_photo-1682126164389-6780333faee5?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        projects: "300+",
        averageValue: "R8M",
        completionTime: "6 months avg",
      },
    ],
    [],
  );

  const capabilities = useMemo(
    () => [
      {
        icon: HardHat,
        title: "Safety Excellence",
        description: "Zero-incident safety protocols with continuous monitoring",
        metric: "0 incidents in 2024",
      },
      {
        icon: Award,
        title: "Quality Assurance",
        description: "ISO 9001:2015 certified processes and quality standards",
        metric: "98.5% quality score",
      },
      {
        icon: Zap,
        title: "Innovation",
        description: "Advanced BIM systems and sustainable construction practices",
        metric: "25% efficiency gain",
      },
      {
        icon: Users,
        title: "Expert Team",
        description: "Professional engineers and certified specialists",
        metric: "15+ years avg experience",
      },
    ],
    [],
  );

  const constructionProcess = useMemo(
    () => [
      {
        step: "01",
        title: "Project Assessment",
        description: "Comprehensive site evaluation, feasibility studies, and requirement analysis",
        duration: "2-4 weeks",
      },
      {
        step: "02",
        title: "Design & Planning",
        description: "Detailed Construction design, permit acquisition, and project planning",
        duration: "4-8 weeks",
      },
      {
        step: "03",
        title: "Resource Mobilization",
        description: "Equipment deployment, team assignment, and material procurement",
        duration: "2-3 weeks",
      },
      {
        step: "04",
        title: "Construction Execution",
        description: "Systematic construction with continuous quality monitoring and safety protocols",
        duration: "Project dependent",
      },
      {
        step: "05",
        title: "Quality Assurance",
        description: "Comprehensive testing, inspection, and compliance verification",
        duration: "1-2 weeks",
      },
      {
        step: "06",
        title: "Project Handover",
        description: "Final delivery, documentation, and ongoing maintenance support",
        duration: "1 week",
      },
    ],
    [],
  );

  const headerStats = useMemo(
    () => [
      { value: "4", label: "Core Services", icon: Settings },
      { value: "80+", label: "Projects Delivered", icon: Building2 },
      { value: "100%", label: "Success Rate", icon: Award },
      { value: "24/7", label: "Support Available", icon: Clock },
    ],
    [],
  );

  // Enhanced decorative images for Services page
  const decorativeImages = [
    "https://images.unsplash.com/photo-1754373218882-a9fbc0921e0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NTc0Mjc5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1729551610640-e8adee1172e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMGJsdWVwcmludHMlMjBwbGFuc3xlbnwxfHx8fDE3NTc0NTM4MDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1726589004565-bedfba94d3a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzYWZldHklMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzU3NDUzODA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Page Header with decorative images */}
      <PageHeader
        title="Our Construction Services"
        subtitle="Complete Solutions"
        description="Comprehensive civil construction and infrastructure development services across South Africa. From highways to bridges, we deliver world-class projects with precision and excellence."
        backgroundImage="https://images.unsplash.com/photo-1604225318415-20fddd721f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzZXJ2aWNlcyUyMGVxdWlwbWVudCUyMGhlYXZ5JTIwbWFjaGluZXJ5fGVufDF8fHx8MTc1NzQ1Mzc5NXww&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[{ label: "Home", href: "home" }, { label: "Services" }]}
        badge={{
          text: "Multi-Disciplinary Construction",
          icon: Construction,
        }}
        ctaButtons={{
          primary: {
            text: "Visit Us",
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

      {/* Main Services Section */}
      <section ref={servicesSection.ref} className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className={`text-center mb-20 animate-on-scroll ${servicesSection.isVisible ? "is-visible" : ""}`}>
            <Badge className="mb-8 bg-[#d27015] text-white text-lg px-6 py-3 font-semibold">
              <Building2 className="w-5 h-5 mr-2" />
              Core Services
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Complete Construction Solutions</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              End-to-end construction services from initial planning to project completion and ongoing maintenance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {mainServices.map((service, index) => (
              <Card
                key={service.id}
                className={`card-professional group overflow-hidden animate-on-scroll ${servicesSection.isVisible ? "is-visible" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  {/* Service Image */}
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#d27015] to-[#b8621a] rounded-xl flex items-center justify-center text-white shadow-lg">
                        <service.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[#d27015] text-white font-bold">{service.projects} Projects</Badge>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>

                    {/* Key Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Service Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#d27015]">{service.projects}</div>
                        <div className="text-xs text-gray-600">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{service.averageValue}</div>
                        <div className="text-xs text-gray-600">Avg Value</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{service.completionTime}</div>
                        <div className="text-xs text-gray-600">Timeline</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                            onClick={() => setSelectedService(service.id)}
                          >
                            <Target className="mr-2 w-4 h-4" />
                            Learn More
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{service.title} - Detailed Information</DialogTitle>
                            <DialogDescription>
                              Comprehensive overview of our {service.title.toLowerCase()} services, featuring key
                              capabilities, project highlights, and success metrics.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="p-6">
                            <div className="flex items-center space-x-4 mb-6">
                              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white">
                                <service.icon className="w-8 h-8" />
                              </div>
                              <div>
                                <h3 className="text-3xl font-bold text-gray-900">{service.title}</h3>
                                <p className="text-orange-500 font-medium">{service.projects} Projects Completed</p>
                              </div>
                            </div>

                            <p className="text-lg text-gray-600 mb-8">{service.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-4">Key Features</h4>
                                <div className="space-y-3">
                                  {service.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center space-x-3">
                                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                      <span className="text-gray-600">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-4">Project Highlights</h4>
                                <div className="space-y-4">
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-2xl font-bold text-[#d27015] mb-1">{service.projects}</div>
                                    <div className="text-sm text-gray-600">Successfully Completed Projects</div>
                                  </div>
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600 mb-1">{service.averageValue}</div>
                                    <div className="text-sm text-gray-600">Average Project Value</div>
                                  </div>
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600 mb-1">
                                      {service.completionTime}
                                    </div>
                                    <div className="text-sm text-gray-600">Average Completion Time</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-8 text-center">
                              <Button
                                onClick={() => setCurrentPage("contact")}
                                className="bg-[#d27015] hover:bg-[#b8621a] text-white px-8 py-3"
                              >
                                <Phone className="mr-2 w-5 h-5" />
                                Get Quote for This Service
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage("contact")}
                        className="border-[#d27015] text-[#d27015] hover:bg-[#d27015]/5"
                      >
                        <Calendar className="mr-2 w-4 h-4" />
                        Get Quote
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section ref={capabilitiesSection.ref} className="section-padding bg-gray-100">
        <div className="max-w-7xl mx-auto container-padding">
          <div className={`text-center mb-20 animate-on-scroll ${capabilitiesSection.isVisible ? "is-visible" : ""}`}>
            <Badge className="mb-8 bg-blue-600 text-white text-lg px-6 py-3 font-semibold">
              <Zap className="w-5 h-5 mr-2" />
              Our Capabilities
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">What Sets Us Apart</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Advanced capabilities and proven expertise that ensure exceptional project delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <Card
                key={index}
                className={`card-professional text-center group animate-on-scroll ${capabilitiesSection.isVisible ? "is-visible" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#d27015] to-[#b8621a] rounded-xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <capability.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{capability.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{capability.description}</p>
                  <div className="text-lg font-bold text-[#d27015]">{capability.metric}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Construction Process */}
      <section ref={processSection.ref} className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className={`text-center mb-20 animate-on-scroll ${processSection.isVisible ? "is-visible" : ""}`}>
            <Badge className="mb-8 bg-green-600 text-white text-lg px-6 py-3 font-semibold">
              <Settings className="w-5 h-5 mr-2" />
              Our Process
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Systematic Project Delivery</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our proven 6-step process ensures consistent quality, timely delivery, and exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {constructionProcess.map((step, index) => (
              <Card
                key={index}
                className={`card-professional group animate-on-scroll ${processSection.isVisible ? "is-visible" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#d27015] to-[#b8621a] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      {step.step}
                    </div>
                    <div className="text-sm font-medium text-[#d27015]">{step.duration}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">Ready to Start Your Project?</h2>
          <p className="text-xl mb-16 max-w-4xl mx-auto text-gray-300 leading-relaxed">
            Get expert consultation and detailed project estimates. Our team is ready to transform your construction
            vision into reality with precision and excellence.
          </p>

          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
            <Button
              onClick={() => setCurrentPage("contact")}
              className="bg-[#d27015] hover:bg-[#b8621a] text-white font-semibold px-12 py-6 text-xl shadow-lg"
            >
              <Phone className="mr-3 w-7 h-7" />
              Get Free Consultation
              <ArrowRight className="ml-3 w-7 h-7" />
            </Button>

            <Button
              onClick={() => setCurrentPage("projects")}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-12 py-6 text-xl"
            >
              <Building2 className="mr-3 w-7 h-7" />
              View Our Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
});

ServicesPage.displayName = "ServicesPage";

export { ServicesPage };
