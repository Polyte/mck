import { memo, useMemo, useState } from "react";
import { PageHeader } from "../PageHeader";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { toast } from "sonner";
import { postToApi } from "../../utils/api";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Users,
  Calculator,
  ArrowRight,
  Send,
  Headphones,
  Shield,
  Award,
  CheckCircle,
} from "lucide-react";

const HEAD_OFFICE_ADDRESS = "Unit 489 Silverwood, 51 Nikkel Street, Monavoni Ext 6, Centurion 0157";
const GOOGLE_MAPS_QUERY = encodeURIComponent(HEAD_OFFICE_ADDRESS);
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${GOOGLE_MAPS_QUERY}`;
const WHATSAPP_URL = "https://wa.me/27823169297";

const ContactPage = memo(() => {
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

  // Scroll animations
  const contactSection = useScrollAnimation({ threshold: 0.1 });
  const formSection = useScrollAnimation({ threshold: 0.1 });

  const contactMethods = useMemo(
    () => [
      {
        icon: Phone,
        title: "Call Us",
        primary: "(012) 322 6786",
        secondary: "082 316 9297",
        description: "Head Office & Mobile",
        available: "24/7 Emergency Support",
        actionLabel: "Call Now",
        image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=900&q=80",
        action: () => window.open("tel:0123226786"),
      },
      {
        icon: MessageCircle,
        title: "WhatsApp",
        primary: "082 316 9297",
        secondary: "Chat with our team",
        description: "Fast support for quick questions",
        available: "Quick mobile response",
        actionLabel: "Open WhatsApp",
        image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=900&q=80",
        action: () => window.open(WHATSAPP_URL),
      },
      {
        icon: Mail,
        title: "Email Us",
        primary: "info@mckeywa.co.za",
        secondary: "info@mckeywa.co.za",
        description: "General & Project Enquiries",
        available: "Response within 2 hours",
        actionLabel: "Send Email",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        action: () => window.open("mailto:info@mckeywa.co.za"),
      },
      {
        icon: MapPin,
        title: "Visit Us",
        primary: "Unit 489 Silverwood",
        secondary: "51 Nikkel Street, Monavoni",
        description: "Centurion 0157, Gauteng",
        available: "Mon-Fri: 8AM-5PM",
        actionLabel: "Get Directions",
        image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80",
        action: () => window.open(GOOGLE_MAPS_URL),
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.projectType) {
      toast.error("Please select a project type before submitting.");
      return;
    }

    setIsSubmitting(true);

    const toastId = toast.loading("Submitting your enquiry…");
    try {
      const data = await postToApi<{ success: boolean; message?: string }>("contact", formData);

      if (data.success) {
        toast.success(data.message || "Enquiry submitted successfully.", { id: toastId });
        setFormData({ name: "", email: "", phone: "", company: "", projectType: "", budget: "", location: "", timeline: "", message: "" });
      } else {
        toast.error(data.message || 'Failed to submit. Please try again.', { id: toastId });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to submit. Please call us directly on (012) 322 6786.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
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
        title="Get in Touch with Us"
        subtitle="Professional Consultation"
        description="Ready to start your construction project? Our expert team is here to provide comprehensive consultation, detailed estimates, and professional guidance for all your infrastructure needs."
        backgroundImage="https://images.unsplash.com/photo-1725772498434-7265ec19fc92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBjb250YWN0JTIwb2ZmaWNlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU3NDUzODAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[{ label: "Home", href: "home" }, { label: "Contact Us" }]}
        badge={{
          text: "..",
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
              Get in touch with us anytime by using any of the following channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className={`card-professional overflow-hidden text-center group animate-on-scroll ${contactSection.isVisible ? "is-visible" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0 flex h-full flex-col">
                  <div className="relative h-28 overflow-hidden">
                    <img
                      src={method.image}
                      alt={`${method.title} contact option`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-4 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg ring-4 ring-white">
                      <method.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex h-full flex-col p-5 pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                    <div className="space-y-1.5 mb-3">
                      <div className="font-semibold text-orange-500">{method.primary}</div>
                      <div className="text-sm text-gray-600">{method.secondary}</div>
                      <div className="text-sm text-gray-500">{method.description}</div>
                    </div>
                    <Badge variant="secondary" className="mx-auto bg-green-100 text-green-800 text-xs">
                      {method.available}
                    </Badge>
                    <Button
                      onClick={method.action}
                      className="mt-4 h-auto w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 py-2.5 font-bold text-white shadow-md shadow-orange-500/20 hover:-translate-y-0.5 hover:from-orange-600 hover:to-amber-700 hover:shadow-lg"
                    >
                      <method.icon className="mr-2 w-4 h-4" />
                      {method.actionLabel}
                    </Button>
                  </div>
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
              Project Enquiry Form
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
                        <Select value={formData.projectType} onValueChange={(value: string) => handleInputChange("projectType", value)}>
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
                        <Select value={formData.budget} onValueChange={(value: string) => handleInputChange("budget", value)}>
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
                        <Select value={formData.timeline} onValueChange={(value: string) => handleInputChange("timeline", value)}>
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
                        disabled={isSubmitting}
                        className="h-auto min-h-14 flex-1 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-orange-500/25 hover:-translate-y-0.5 hover:from-orange-600 hover:to-amber-700 hover:shadow-xl hover:shadow-orange-500/35 disabled:translate-y-0 disabled:opacity-70"
                      >
                        <Send className="mr-2 w-5 h-5" />
                        {isSubmitting ? 'Submitting…' : 'Submit Enquiry'}
                        {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.open("tel:0123226786")}
                        className="h-auto min-h-14 rounded-xl border-2 border-orange-500 bg-white px-8 py-4 text-lg font-bold text-orange-600 shadow-sm hover:-translate-y-0.5 hover:bg-orange-50 hover:text-orange-700 hover:shadow-lg"
                      >
                        <Phone className="mr-2 w-5 h-5" />
                        Call Instead
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Quick Info */}
            <div className="space-y-8">
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

      {/* Final CTA Section */}
      
    </div>
  );
});

ContactPage.displayName = "ContactPage";

export { ContactPage };
