import { memo, useMemo, useState } from "react";
import { X } from "lucide-react";

// Import all project images
import IMG3335 from "../../assets/images/IMG_3335.jpeg";
import IMG3340 from "../../assets/images/IMG_3340.jpeg";
import IMG3346 from "../../assets/images/IMG_3346.jpeg";
import IMG3356 from "../../assets/images/IMG_3356.jpeg";
import IMG3362 from "../../assets/images/IMG_3362.jpeg";
import IMG3364 from "../../assets/images/IMG_3364.jpeg";
import IMG3415 from "../../assets/images/IMG_3415.jpeg";
import IMG3424 from "../../assets/images/IMG_3424.jpeg";
import IMG3426 from "../../assets/images/IMG_3426.jpeg";
import IMG3435 from "../../assets/images/IMG_3435.jpeg";
import IMG3442 from "../../assets/images/IMG_3442.webp";
import IMG3447 from "../../assets/images/IMG_3447.webp";
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // All project images with categories
  const projectImages = [
    { id: 'img1', src: IMG3335, title: 'Commercial Complex', category: 'Commercial' },
    { id: 'img2', src: IMG3340, title: 'Residential Development', category: 'Residential' },
    { id: 'img3', src: IMG3346, title: 'Infrastructure Project', category: 'Infrastructure' },
    { id: 'img4', src: IMG3356, title: 'Industrial Facility', category: 'Industrial' },
    { id: 'img5', src: IMG3362, title: 'Construction Site A', category: 'Construction' },
    { id: 'img6', src: IMG3364, title: 'Construction Site B', category: 'Construction' },
    { id: 'img7', src: IMG3415, title: 'Modern Architecture', category: 'Commercial' },
    { id: 'img8', src: IMG3424, title: 'Urban Development', category: 'Urban' },
    { id: 'img9', src: IMG3426, title: 'Landscaping Project', category: 'Landscaping' },
    { id: 'img10', src: IMG3435, title: 'Renovation Work', category: 'Renovation' },
    { id: 'img11', src: IMG3442, title: 'Project Planning', category: 'Planning' },
    { id: 'img12', src: IMG3447, title: 'Construction Site C', category: 'Construction' },
  ];

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

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
          "https://plus.unsplash.com/premium_photo-1661873243927-ac13c13485eb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8SW5mcmFzdHJ1Y3R1Y2V8ZW58MHx8fHwxMjA3MjY0MjA4fDA&auto=format&fit=crop",
         
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
        projects: "5+", 
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
        projects: "5+", 
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
          "https://images.unsplash.com/photo-1625722662233-297060231b85?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070&auto=format&fit=crop",
        projects: "5+", 
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
        description: "Advanced IMS systems and sustainable construction practices",
        metric: "25% efficiency gain",
      },
      {
        icon: Users,
        title: "Expert Team",
        description: "Professional engineers and certified specialists",
        metric: "6+ years avg experience",
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
      { value: "25+", label: "Projects Delivered", icon: Building2 },
      { value: "100%", label: "Success Rate", icon: Award },
      { value: "24/7", label: "Support Available", icon: Clock },
    ],
    [],
  );

  // Enhanced decorative images for Services page
  const decorativeImages = [
    // Wind farm and solar projects
    IMG3346,
    IMG3447,
    IMG3442,
    
    // Substations and electrical infrastructure
    IMG3415,
    IMG3435,
    IMG3364,
    
    // Maintenance and industrial sites
    "https://images.unsplash.com/photo-1581093458791-9d15482741a9?auto=format&fit=crop&q=80&w=1080",
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1080",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1080",
    
    // Construction and civil works
    "https://www.spmsa.co.za/wp-content/uploads/WEBP/our-services/sub@2x.webp",
    "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=1080",
    "https://images.unsplash.com/photo-1521661488642-d86e85b99b92?auto=format&fit=crop&q=80&w=1080"
  ];
  
  // Projects list added from user input
  const projects = useMemo(
    () => [
      {
        id: "garob-windfarm",
        title: "GAROB WINDFARM",
        client: "Consolidated Power Projects",
        contractor: "Mckeywa Projects",
        description:
          "Civil Works Construction of Garob Windfarm’s IPP Substation at Prieska, Northern Cape",
        value: "R3,657,650.00",
        duration: "6 months",
        period: "20 July 2019 - 30 January 2020",
      },
      {
        id: "boshof-solar",
        title: "BOSHOF SOLAR PARK",
        client: "Consolidated Power Maintenance",
        contractor: "Mckeywa Projects",
        description:
          "Refurbishment of the facilities at Boshoff Solar Park at Boshoff in the Prieska, Northern Cape",
        value: "R2,126,500.00",
        duration: "4 months",
        period: "20 March 2020 - 30 August 2020",
      },
      {
        id: "city-power",
        title: "CITY POWER EMERGENCIES AND MAINTENANCE PROJECTS",
        client: "City Power",
        contractor: "Mckeywa Projects",
        description:
          "Refurbishment of the MV System at various City Power substations in the Gauteng Region",
        value: "R6,326,550.56",
        duration: "4 months",
        period: "05 December 2020 - 30 November 2021",
      },
      {
        id: "various-maintenance",
        title: "VARIOUS MAINTENANCE PROJECTS",
        client: "Inter Southern Power",
        contractor: "Mckeywa Projects",
        description:
          "Refurbishment and Maintenance of civil infrastructure for various substations",
        value: "R1,256,656.60",
        duration: "4 months",
        period: "05 February 2022 - 30 December 2022",
      },
      {
        id: "eri-refurbishment",
        title: "ERI SUBSTATION REFURBISHMENT PROJECTS",
        client: "Eskom Rotek Industries",
        contractor: "Mckeywa Projects",
        description:
          "Refurbishment of various Eskom Substations at Various Eskom Regions",
        value: "R3,954,111.00",
        duration: "4 months",
        period: "20 February 2023 - 30 March 2024",
      },
      {
        id: "ntcsa-maintenance",
        title: "NTCSA SUBSTATION MAINTENANCE PROJECTS",
        client: "MTS INFRACO",
        contractor: "Mckeywa Projects (Sub-Contractor)",
        description:
          "Refurbishment of various NTCSA Substations in the Northern Cape Region",
        value: "R3,125,111.00",
        duration: "4 months",
        period: "20 October 2024 - 30 March 2025",
      },
    ],
    [],
  );

  // path for the site logo (place the attached PNG here)
  const siteLogo = "../assets/logo/site-logo.png";

  // Partner / client logos (place these files in public/assets/logos/)
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Inline header logo (ensures logo always renders even if PageHeader doesn't accept a logo prop) */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
          <a href="/" aria-label="Home" className="inline-flex items-center">
            <img
              src={siteLogo}
              alt="Mckeywa Projects"
              className="h-14 w-auto object-contain"
              onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
            />
          </a>
        </div>
      </header>

      {/* existing PageHeader (kept in case it provides extra layout) */}
      <PageHeader
        title="Our Construction Services"
        className="page-header-services"
        subtitle="Complete Solutions"
        description="Comprehensive civil construction and infrastructure development services across South Africa. From highways to bridges, we deliver world-class projects with precision and excellence."
        backgroundImage={IMG3447}
        breadcrumbs={[{ label: "Home", href: "home" }, { label: "Services" }]}
        ctaButtons={{          primary: {
            text: "Visit Us",
            action: () => setCurrentPage("contact"),
            icon: Phone,
          },
        }}
        stats={headerStats}
        decorativeImages={decorativeImages}
        logo={siteLogo} // add this prop so the header uses the new logo
      />

      {/* Partner logos - horizontal scroll, grayscale -> color on hover */}
      {/* <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-6 py-4 px-2 w-max">
              {partnerLogos.map((src, idx) => (
                <div
                  key={src}
                  className="group flex-shrink-0 w-44 h-20 bg-white rounded-md flex items-center justify-center p-2 shadow-sm"
                >
                  <ImageWithFallback
                    src={src}
                    alt={`partner-logo-${idx}`}
                    className="w-full h-full object-contain filter grayscale contrast-75 opacity-80 transition duration-300 transform group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

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
                className={`group overflow-hidden animate-on-scroll bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 ${servicesSection.isVisible ? "is-visible" : ""}`}
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
                    
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-8">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d27015] to-[#b8621a]"></div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{service.description}</p>

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
                        
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{service.completionTime}</div>
                     
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          
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
                              
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                     
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Refurbishment Projects</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              A selection of civil and refurbishment projects delivered by Mckeywa Projects across South Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <Card
                key={p.id}
                className="transform perspective-1000 transition duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl group overflow-hidden"
                style={{ willChange: "transform", transformOrigin: "center", animationDelay: `${i * 0.05}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative h-44 overflow-hidden bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
                    <ImageWithFallback
                      src={decorativeImages[i % decorativeImages.length]}
                      alt={p.title}
                      className="w-full h-full object-cover 
                     group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{p.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{p.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        <div><strong>Client:</strong> {p.client}</div>
                        <div><strong>Contractor:</strong> {p.contractor}</div>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="px-3 py-2 bg-[#d27015] hover:bg-[#b8621a] text-white">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{p.title}</DialogTitle>
                            <DialogDescription>
                              Project details and period information
                            </DialogDescription>
                          </DialogHeader>

                          <div className="p-6 space-y-4">
                            <div className="flex items-start space-x-4">
                              <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold">
                                {p.title.split(" ").slice(0,2).map(s=>s[0]).join("")}
                              </div>
                              <div>
                                <h4 className="text-xl font-semibold">{p.title}</h4>
                                <div className="text-sm text-gray-600">{p.period}</div>
                              </div>
                            </div>

                            <div>
                              <p className="text-gray-700">{p.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-gray-50 p-4 rounded">
                                <div className="text-sm text-gray-500">Project Value</div>
                                <div className="text-lg font-bold text-[#d27015]">{p.value}</div>
                              </div>
                              <div className="bg-gray-50 p-4 rounded">
                                <div className="text-sm text-gray-500">Duration</div>
                                <div className="text-lg font-bold text-green-600">{p.duration}</div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

 
      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={closeModal}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            aria-label="Close modal"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-6xl w-full max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="w-full h-full object-contain max-h-[80vh] mx-auto"
            />
          </div>
        </div>
      )}

      {/* Final CTA Section */}
    </div>
  );
});

ServicesPage.displayName = "ServicesPage";

export { ServicesPage };
