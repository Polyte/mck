import { memo, useMemo, useState } from "react";
import { PageHeader } from "../PageHeader";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { ProjectCalculator } from "../ProjectCalculator";
import { ConsultationBooking } from "../ConsultationBooking";
import { useRouter } from "../Router";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { toast } from "sonner@2.0.3";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  Building2,
  Calculator,
  Calendar,
  ArrowRight,
  Send,
  Headphones,
  Globe,
  Shield,
  Award,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

const ContactPage = memo(() => {
  const { setCurrentPage } = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    location: "",
    timeline: "",
    message: "",
  });
  const [showCalculator, setShowCalculator] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  // Scroll animations
  const contactSection = useScrollAnimation({ threshold: 0.1 });
  const formSection = useScrollAnimation({ threshold: 0.1 });
  const officesSection = useScrollAnimation({ threshold: 0.1 });

  const contactMethods = useMemo(
    () => [
      {
        icon: Phone,
        title: "Call Us",
        primary: "(012) 322 6786",
        secondary: "082 316 9297",
        description: "Head Office & Mobile",
        available: "24/7 Emergency Support",
        action: () => window.open("tel:0123226786"),
      },
      {
        icon: Mail,
        title: "Email Us",
        primary: "info@mckeywa.co.za",
        secondary: "enquiries@mckeywa.co.za",
        description: "General & Project Inquiries",
        available: "Response within 2 hours",
        action: () => window.open("mailto:info@mckeywaprojects.co.za"),
      },
      {
        icon: MapPin,
        title: "Visit Us",
        primary: "Unit 489 Silverwood",
        secondary: "51 Nickel Street, Monavoni",
        description: "Centurion 0157, Gauteng",
        available: "Mon-Fri: 8AM-5PM",
        action: () => window.open("https://maps.google.com/?q=51+Nickel+Street+Monavoni+Centurion"),
      },
      {
        icon: Headphones,
        title: "24/7 Emergency",
        primary: "082 316 9297",
        secondary: "Emergency Hotline",
        description: "Critical Infrastructure Issues",
        available: "Immediate Response",
        action: () => window.open("tel:0823169297"),
      },
    ],
    [],
  );

  const regionalOffices = useMemo(
    () => [
      {
        region: "Head Office - Pretoria",
        address: "Unit 489 Silverwood, 51 Nikkel Street, Monavoni Ext 6, Centurion 0157",
        phone: "(012) 322 6786",
        email: "info@mckeywa.co.za",
        manager: "Regional Operations Manager",
        specialization: "Infrastructure & Civil Construction",
      },
      {
        region: "Western Cape Office",
        address: "Contact Head Office for Western Cape Projects",
        phone: "(021) 569 7124",
        email: "westerncape@mckeywa.co.za",
        manager: "Western Cape Manager",
        specialization: "Road Construction & Maintenance",
      },
      {
        region: "Mobile Operations",
        address: "On-site project management across all provinces",
        phone: "082 316 9297",
        email: "mobile@mckeywa.co.za",
        manager: "Mobile Operations Coordinator",
        specialization: "Emergency Response & Field Services",
      },
    ],
    [],
  );

  const projectTypes = [
    "Infrastructure Development",
    "Road Construction",
    "Bridge Construction",
    "Civil Construction",
    "Water Treatment Facilities",
    "Municipal Projects",
    "Maintenance Services",
    "Emergency Repairs",
    "Other (Please specify in message)",
  ];

  const budgetRanges = ["Under R5M", "R5M - R20M", "R20M - R50M", "R50M - R100M", "Over R100M", "To be discussed"];

  const timelineOptions = [
    "Urgent (Within 3 months)",
    "Short term (3-6 months)",
    "Medium term (6-12 months)",
    "Long term (6+ months)",
    "Planning phase",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast.success("Thank you! Your inquiry has been submitted. We'll contact you within 2 hours.");

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "",
      budget: "",
      location: "",
      timeline: "",
      message: "",
    });
  };

  const headerStats = useMemo(
    () => [
      { value: "24/7", label: "Support Available", icon: Headphones },
      { value: "2hrs", label: "Response Time", icon: Clock },
      { value: "5", label: "Provinces Served", icon: MapPin },
      { value: "100%", label: "Free Consultations", icon: CheckCircle },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <PageHeader
        title="Get In Touch With Us"
        subtitle="Professional Consultation"
        description="Ready to start your construction project? Our expert team is here to provide comprehensive consultation, detailed estimates, and professional guidance for all your infrastructure needs."
        backgroundImage="https://images.unsplash.com/photo-1725772498434-7265ec19fc92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBjb250YWN0JTIwb2ZmaWNlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU3NDUzODAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[{ label: "Home", href: "home" }, { label: "Contact Us" }]}
        badge={{
          text: "Free Consultation & Project Estimates",
          icon: Calculator,
        }}
        ctaButtons={{
          primary: {
            text: "Call Now",
            action: () => window.open("tel:0123226786"),
            icon: Phone,
          }, 
        }}
        stats={headerStats}
      />

      {/* Contact Methods */}
      <section ref={contactSection.ref} className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className={`text-center mb-16 animate-on-scroll ${contactSection.isVisible ? "is-visible" : ""}`}>
            <Badge className="mb-8 bg-blue-600 text-white text-lg px-6 py-3 font-semibold">
              <Phone className="w-5 h-5 mr-2" />
              Multiple Ways to Connect
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Choose Your Preferred Contact Method</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              We're available through multiple channels to ensure you get the support you need, when you need it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className={`card-professional text-center group cursor-pointer animate-on-scroll ${contactSection.isVisible ? "is-visible" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={method.action}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <method.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="font-semibold text-orange-500">{method.primary}</div>
                    <div className="text-sm text-gray-600">{method.secondary}</div>
                    <div className="text-sm text-gray-500">{method.description}</div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    {method.available}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Quick Actions */}
      <section ref={formSection.ref} className="section-padding bg-gray-100">
        <div className="max-w-7xl mx-auto container-padding">
          <div className={`text-center mb-16 animate-on-scroll ${formSection.isVisible ? "is-visible" : ""}`}>
            <Badge className="mb-8 bg-orange-500 text-white text-lg px-6 py-3 font-semibold">
              <Send className="w-5 h-5 mr-2" />
              Project Inquiry Form
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Tell Us About Your Project</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Provide details about your construction needs and we'll respond with a comprehensive proposal
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className={`card-professional animate-on-scroll ${formSection.isVisible ? "is-visible" : ""}`}>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                          required
                          className="form-professional"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                          required
                          className="form-professional"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="083 123 4567"
                          required
                          className="form-professional"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company/Organization</label>
                        <Input
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          placeholder="Your company name"
                          className="form-professional"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Type *</label>
                        <Select onValueChange={(value) => handleInputChange("projectType", value)}>
                          <SelectTrigger className="form-professional">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            {projectTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Budget</label>
                        <Select onValueChange={(value) => handleInputChange("budget", value)}>
                          <SelectTrigger className="form-professional">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Location</label>
                        <Input
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          placeholder="City, Province"
                          className="form-professional"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Timeline</label>
                        <Select onValueChange={(value) => handleInputChange("timeline", value)}>
                          <SelectTrigger className="form-professional">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            {timelineOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Please provide details about your project requirements, specific challenges, or any other information that would help us understand your needs better..."
                        rows={6}
                        required
                        className="form-professional"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 text-lg flex-1"
                      >
                        <Send className="mr-2 w-5 h-5" />
                        Submit Inquiry
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>

                      <Button
                        type="button"
                        onClick={() => window.open("tel:0123226786")}
                        variant="outline"
                        className="border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold px-8 py-4 text-lg"
                      >
                        <Phone className="mr-2 w-5 h-5" />
                        Call Instead
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Info */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <Card className={`card-professional animate-on-scroll ${formSection.isVisible ? "is-visible" : ""}`}>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                  <div className="space-y-4">
                     

                    <Button
                      onClick={() => window.open("tel:0823169297")}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4"
                    >
                      <Headphones className="mr-2 w-5 h-5" />
                      24/7 Emergency Line
                      <Phone className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Company Credentials */}
              <Card className={`card-professional animate-on-scroll ${formSection.isVisible ? "is-visible" : ""}`}>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-6 h-6 text-green-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Level 1 BBBEE</div>
                        <div className="text-sm text-gray-600">100% Black Owned</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="w-6 h-6 text-blue-600" />
                      <div>
                        <div className="font-semibold text-gray-900">CIDB PE 5CE</div>
                        <div className="text-sm text-gray-600">Certified Contractor</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-orange-500" />
                      <div>
                        <div className="font-semibold text-gray-900">25+ Projects</div>
                        <div className="text-sm text-gray-600">Successfully Completed</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-6 h-6 text-purple-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Expert Team</div>
                        <div className="text-sm text-gray-600">6+ years Experience</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
            </div>
          </div>
        </div>
      </section>

      {/* Regional Offices */}
      <section ref={officesSection.ref} className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className={`text-center mb-16 animate-on-scroll ${officesSection.isVisible ? "is-visible" : ""}`}>
            <Badge className="mb-8 bg-green-600 text-white text-lg px-6 py-3 font-semibold">
              <MapPin className="w-5 h-5 mr-2" />
              Our Locations
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Serving All of South Africa</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Strategic locations to provide comprehensive coverage and local expertise across the country
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {regionalOffices.map((office, index) => (
              <Card
                key={index}
                className={`card-professional animate-on-scroll ${officesSection.isVisible ? "is-visible" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{office.region}</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="font-medium text-gray-900 mb-1">Address</div>
                      <div className="text-gray-600 text-sm">{office.address}</div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <div className="font-medium text-gray-900 mb-1">Phone</div>
                        <div className="text-orange-500 font-semibold">{office.phone}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 mb-1">Email</div>
                        <div className="text-blue-600 text-sm">{office.email}</div>
                      </div>
                    </div>

                    <div>
                      <div className="font-medium text-gray-900 mb-1">Manager</div>
                      <div className="text-gray-600 text-sm">{office.manager}</div>
                    </div>

                    <div>
                      <div className="font-medium text-gray-900 mb-1">Specialization</div>
                      <div className="text-gray-600 text-sm">{office.specialization}</div>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <Button
                      onClick={() => window.open(`tel:${office.phone.replace(/[^\d]/g, "")}`)}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <Phone className="mr-2 w-4 h-4" />
                      Call
                    </Button>
                    <Button
                      onClick={() => window.open(`mailto:${office.email}`)}
                      variant="outline"
                      className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50"
                    >
                      <Mail className="mr-2 w-4 h-4" />
                      Email
                    </Button>
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

ContactPage.displayName = "ContactPage";

export { ContactPage };
