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
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Phone,
  ExternalLink,
  Clock,
  Target,
  TrendingUp,
  Shield,
  Truck,
  Construction,
  Wrench,
} from "lucide-react";

const ProjectsPage = memo(() => {
  const { setCurrentPage } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Scroll animations
  const portfolioSection = useScrollAnimation({ threshold: 0.1 });
  const statsSection = useScrollAnimation({ threshold: 0.1 });
  const featuredSection = useScrollAnimation({ threshold: 0.1 });

  const projectCategories = useMemo(
    () => [
      { id: "all", label: "All Projects", count: 25 },
      { id: "infrastructure", label: "Infrastructure", count: 210 },
      { id: "roads", label: "Road Construction", count: 140 },
      { id: "civil", label: "Civil Construction", count: 150 },
      { id: "maintenance", label: "Maintenance", count: 300 },
    ],
    [],
  );

  const featuredProjects = useMemo(
    () => [
      {
        id: 1,
        title: "N3 Highway Bridge Rehabilitation",
        category: "infrastructure",
        client: "South African National Roads Agency",
        location: "KwaZulu-Natal",
        value: "R47.5M",
        duration: "16 months",
        status: "Completed",
        completedDate: "March 2024",
        description:
          "Complete rehabilitation of a critical highway bridge including structural reinforcement, deck replacement, and advanced safety systems installation.",
        image:
          "https://images.unsplash.com/photo-1733045841060-cfac1a111e51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbmZyYXN0cnVjdHVyZSUyMGJyaWRnZSUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3NTU2NTcxODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        highlights: [
          "Zero safety incidents during construction",
          "Completed 2 months ahead of schedule",
          "Advanced seismic resistance upgrades",
          "15% under budget delivery",
          "Minimal traffic disruption achieved",
        ],
        awards: ["Best Infrastructure Project 2024", "Safety Excellence Award"],
      },
      {
        id: 2,
        title: "Johannesburg Water Treatment Facility",
        category: "infrastructure",
        client: "City of Johannesburg",
        location: "Gauteng",
        value: "R78.2M",
        duration: "24 months",
        status: "Completed",
        completedDate: "September 2023",
        description:
          "State-of-the-art water treatment facility serving 65,000 residents with advanced filtration technology and sustainable design principles.",
        image:
          "https://images.unsplash.com/photo-1714765445826-582769cf22ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbmZyYXN0cnVjdHVyZSUyMGRldmVsb3BtZW50JTIwcHJvamVjdHxlbnwxfHx8fDE3NTU2NTgyMzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        highlights: [
          "Serves 65,000 residents daily",
          "Advanced membrane filtration system",
          "Energy-efficient design reduces costs by 30%",
          "ISO 14001 environmental compliance",
          "Smart monitoring and control systems",
        ],
        awards: ["Municipal Excellence Award", "Green Building Recognition"],
      },
      {
        id: 3,
        title: "R21 Provincial Road Upgrade",
        category: "roads",
        client: "Mpumalanga Department of Transport",
        location: "Mpumalanga",
        value: "R32.8M",
        duration: "14 months",
        status: "Completed",
        completedDate: "November 2023",
        description:
          "28km provincial road rehabilitation with smart road technology integration and comprehensive drainage systems.",
        image:
          "https://images.unsplash.com/photo-1740485132839-3edd43060988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwY29uc3RydWN0aW9uJTIwaGVhdnklMjBtYWNoaW5lcnl8ZW58MXx8fHwxNzU1NjU3MTgzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        highlights: [
          "28km of road rehabilitation",
          "Smart traffic monitoring systems",
          "Local skills development program",
          "Improved drainage and flood management",
          "Enhanced road safety features",
        ],
        awards: ["Provincial Infrastructure Award"],
      },
      {
        id: 4,
        title: "Cape Town Industrial Complex",
        category: "civil",
        client: "Private Sector Client",
        location: "Western Cape",
        value: "R125M",
        duration: "18 months",
        status: "In Progress",
        completedDate: "Expected June 2024",
        description:
          "Large-scale industrial facility construction with advanced Construction solutions and sustainable construction practices.",
        image:
          "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NTU2NTgyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        highlights: [
          "Premium construction quality standards",
          "Innovative structural design solutions",
          "LEED Gold certification target",
          "Advanced project management systems",
          "Local supplier development program",
        ],
        awards: ["Design Excellence Recognition"],
      },
      {
        id: 5,
        title: "Gauteng Emergency Infrastructure Repair",
        category: "maintenance",
        client: "Gauteng Provincial Government",
        location: "Multiple Sites, Gauteng",
        value: "R15.3M",
        duration: "8 months",
        status: "Completed",
        completedDate: "January 2024",
        description:
          "Rapid response infrastructure repair and maintenance across multiple critical facilities with 24/7 emergency support.",
        image:
          "https://images.unsplash.com/photo-1644980055228-aafe48a1ac5c?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        highlights: [
          "24/7 emergency response capability",
          "Multi-site coordination excellence",
          "Rapid mobilization and deployment",
          "Asset lifecycle optimization",
          "Cost-effective maintenance solutions",
        ],
        awards: ["Emergency Response Excellence"],
      },
      {
        id: 6,
        title: "Eastern Cape Bridge Construction",
        category: "infrastructure",
        client: "Eastern Cape Department of Transport",
        location: "Eastern Cape",
        value: "R42.1M",
        duration: "20 months",
        status: "In Progress",
        completedDate: "Expected August 2024",
        description:
          "New bridge construction connecting rural communities with advanced Construction and environmental protection measures.",
        image:
          "https://images.unsplash.com/photo-1707405644831-fdd2e6506083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwYWVyaWFsJTIwdmlldyUyMHByb2dyZXNzfGVufDF8fHx8MTc1NTY1ODIzOHww&ixlib=rb-4.1.0&q=80&w=1080",
        highlights: [
          "Connects isolated communities",
          "Environmentally sensitive construction",
          "Community engagement programs",
          "Advanced foundation technology",
          "Long-term durability design",
        ],
        awards: ["Community Impact Recognition"],
      },
    ],
    [],
  );

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return featuredProjects;
    return featuredProjects.filter((project) => project.category === selectedCategory);
  }, [featuredProjects, selectedCategory]);

  const projectStats = useMemo(
    () => [
      {
        value: "R200+",
        label: "Total Project Value",
        icon: DollarSign,
        description: "Cumulative value delivered",
      },
      {
        value: "25+",
        label: "Projects Completed",
        icon: Building2,
        description: "Successfully delivered",
      },
      {
        value: "98.5%",
        label: "On-Time Delivery",
        icon: Clock,
        description: "Exceptional track record",
      },
      {
        value: "99.3%",
        label: "Client Satisfaction",
        icon: Award,
        description: "Consistently exceeded expectations",
      },
    ],
    [],
  );

  const headerStats = useMemo(
    () => [
      { value: "20+", label: "Projects Delivered", icon: Building2 },
      { value: "R2.1B+", label: "Total Value", icon: TrendingUp },
      { value: "9", label: "Provinces Served", icon: MapPin },
      { value: "100%", label: "Success Rate", icon: Award },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <PageHeader
        title="Our Project Portfolio"
        subtitle="Excellence Delivered"
        description="Showcasing our project construction and management expertise through meticulous planning."
        backgroundImage="https://images.unsplash.com/photo-1700625027839-9fed2cfbb97e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBwcm9qZWN0JTIwcG9ydGZvbGlvfGVufDF8fHx8MTc1NzQ0Njg5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[{ label: "Home", href: "home" }, { label: "Projects" }]}
        badge={{
          text: "500+ Projects Delivered Successfully",
          icon: Building2,
        }}
        ctaButtons={{
          primary: {
            text: "Start Your Project",
            action: () => setCurrentPage("contact"),
            icon: Phone,
          },
          secondary: {
            text: "Our Services",
            action: () => setCurrentPage("services"),
            icon: Construction,
          },
        }}
        stats={headerStats}
      />

      {/* Project Statistics */}
      <section ref={statsSection.ref} className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className={`text-center mb-16 animate-on-scroll ${statsSection.isVisible ? "is-visible" : ""}`}>
            <Badge className="mb-8 bg-blue-600 text-white text-lg px-6 py-3 font-semibold">
              <TrendingUp className="w-5 h-5 mr-2" />
              Project Impact
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Measurable Results</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our project portfolio demonstrates consistent delivery of exceptional results across diverse sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectStats.map((stat, index) => (
              <Card
                key={index}
                className={`card-professional text-center group animate-on-scroll ${statsSection.isVisible ? "is-visible" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Portfolio */}
      <section ref={portfolioSection.ref} className="section-padding bg-gray-100">
        <div className="max-w-7xl mx-auto container-padding">
          <div className={`text-center mb-16 animate-on-scroll ${portfolioSection.isVisible ? "is-visible" : ""}`}>
            <Badge className="mb-8 bg-orange-500 text-white text-lg px-6 py-3 font-semibold">
              <Building2 className="w-5 h-5 mr-2" />
              Featured Projects
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Excellence in Action</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Discover our most impactful projects that showcase our expertise across different construction sectors
            </p>
          </div>

          {/* Project Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {projectCategories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-orange-500 text-white shadow-lg"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category.label}
                <Badge
                  variant="secondary"
                  className={`ml-2 ${
                    selectedCategory === category.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className={`card-professional group overflow-hidden animate-on-scroll ${portfolioSection.isVisible ? "is-visible" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge
                        className={`font-bold ${
                          project.status === "Completed" ? "bg-green-600 text-white" : "bg-blue-600 text-white"
                        }`}
                      >
                        {project.status}
                      </Badge>
                    </div>

                    {/* Project Value */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-orange-500 text-white font-bold">{project.value}</Badge>
                    </div>

                    {/* Category Icon */}
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                        {project.category === "infrastructure" && <Building2 className="w-6 h-6" />}
                        {project.category === "roads" && <Truck className="w-6 h-6" />}
                        {project.category === "civil" && <Construction className="w-6 h-6" />}
                        {project.category === "maintenance" && <Wrench className="w-6 h-6" />}
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                        <p className="text-orange-500 font-medium">{project.client}</p>
                      </div>
                      {project.awards && project.awards.length > 0 && (
                        <Award className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                      )}
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>

                    {/* Project Info Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{project.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{project.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{project.value}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{project.completedDate}</span>
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Highlights</h4>
                      <div className="space-y-2">
                        {project.highlights.slice(0, 3).map((highlight, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                            onClick={() => setSelectedProject(project.id)}
                          >
                            <Target className="mr-2 w-4 h-4" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{project.title} - Project Details</DialogTitle>
                            <DialogDescription>
                              Comprehensive project overview including specifications, achievements, timeline, and key
                              milestones for {project.title}.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                              <div>
                                <ImageWithFallback
                                  src={project.image}
                                  alt={project.title}
                                  className="w-full h-64 object-cover rounded-lg"
                                />
                              </div>
                              <div>
                                <div className="flex items-center space-x-3 mb-4">
                                  <Badge
                                    className={`${
                                      project.status === "Completed"
                                        ? "bg-green-600 text-white"
                                        : "bg-blue-600 text-white"
                                    }`}
                                  >
                                    {project.status}
                                  </Badge>
                                  <Badge className="bg-orange-500 text-white">{project.value}</Badge>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h3>
                                <p className="text-orange-500 font-medium mb-4">{project.client}</p>
                                <p className="text-gray-600 leading-relaxed">{project.description}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-4">Project Details</h4>
                                <div className="space-y-3">
                                  <div className="flex items-center space-x-3">
                                    <MapPin className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-600">{project.location}</span>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <Calendar className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-600">{project.duration}</span>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <DollarSign className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-600">{project.value}</span>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <Clock className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-600">{project.completedDate}</span>
                                  </div>
                                </div>

                                {project.awards && project.awards.length > 0 && (
                                  <div className="mt-6">
                                    <h5 className="font-semibold text-gray-900 mb-3">Awards & Recognition</h5>
                                    <div className="space-y-2">
                                      {project.awards.map((award, idx) => (
                                        <div key={idx} className="flex items-center space-x-2">
                                          <Award className="w-4 h-4 text-yellow-500" />
                                          <span className="text-sm text-gray-600">{award}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-4">Key Achievements</h4>
                                <div className="space-y-3">
                                  {project.highlights.map((highlight, idx) => (
                                    <div key={idx} className="flex items-center space-x-3">
                                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                      <span className="text-gray-600">{highlight}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="mt-8 text-center">
                              <Button
                                onClick={() => setCurrentPage("contact")}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
                              >
                                <Phone className="mr-2 w-5 h-5" />
                                Start Similar Project
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage("contact")}
                        className="border-orange-500 text-orange-500 hover:bg-orange-50"
                      >
                        <ExternalLink className="mr-2 w-4 h-4" />
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

      {/* Final CTA Section */}

    </div>
  );
});

ProjectsPage.displayName = "ProjectsPage";

export { ProjectsPage };
