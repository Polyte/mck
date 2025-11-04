import { lazy, Suspense, memo, useCallback, useState, useEffect, useRef } from "react";
import { RouterProvider, useRouter } from "./components/Router";
import { ThemeProvider } from "./components/hooks/useTheme";
import { Navigation } from "./components/Navigation";
import { PageLoader } from "./components/PageLoader";
import { ConstructionPreloader } from "./components/ConstructionPreloader";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUp,
  Phone,
  Mail,
  MapPin,
  Award,
  Shield,
  Target,
  Building2,
  Headphones,
  Globe,
  ChevronRight,
  Eye,
  Heart,
  Users,
} from "lucide-react";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./components/pages/HomePage").then((module) => ({ default: module.HomePage })));
const AboutPage = lazy(() => import("./components/pages/AboutPage").then((module) => ({ default: module.AboutPage })));
const ServicesPage = lazy(() =>
  import("./components/pages/ServicesPage").then((module) => ({ default: module.ServicesPage })),
);
const ProjectsPage = lazy(() =>
  import("./components/pages/ProjectsPage").then((module) => ({ default: module.ProjectsPage })),
);
const ContactPage = lazy(() =>
  import("./components/pages/ContactPage").then((module) => ({ default: module.ContactPage })),
);

const AppContent = memo(() => {
  const { currentPage, setCurrentPage } = useRouter();
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Show preloader on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloaderComplete(true);
    }, 2000); // Faster loading for better UX
    return () => clearTimeout(timer);
  }, []);

  // Enhanced scroll functionality with progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setShowScrollToTop(scrollTop > 300);
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatic scroll to top on page change with transition
  useEffect(() => {
    // Always scroll to top immediately when page changes
    if (mainContentRef.current) {
      mainContentRef.current.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    }
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = useCallback(() => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "about":
        return <AboutPage />;
      case "services":
        return <ServicesPage />;
      case "projects":
        return <ProjectsPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  }, [currentPage]);

  const handleNavigation = useCallback(
    async (page: string) => {
      setIsPageTransitioning(true);

      // Scroll to top immediately
      window.scrollTo({ top: 0, behavior: "instant" });

      // Small delay for smooth transition
      setTimeout(() => {
        setCurrentPage(page.toLowerCase() as any);
        setIsPageTransitioning(false);
      }, 150);
    },
    [setCurrentPage],
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Show preloader if not completed
  if (!isPreloaderComplete) {
    return <ConstructionPreloader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-['Josefin_Sans'] relative transition-colors duration-300">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d27015] to-[#b8621a] z-[60] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      />

      {/* Navigation */}
      <Navigation />

      <main ref={mainContentRef} className="relative" id="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <Suspense fallback={<PageLoader />}>{renderPage()}</Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Enhanced Professional Footer */}
      <motion.footer
        className="bg-slate-900 dark:bg-gray-950 text-white relative overflow-hidden transition-colors duration-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#d27015]/10 to-blue-600/10" />
          <div className="professional-grid" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 relative z-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Information */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-4">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-[#d27015] to-[#b8621a] rounded-lg flex items-center justify-center text-white shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Building2 className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white">McKeywa Projects</h3>
                  <p className="text-[#d27015] font-medium text-sm">Civil Construction Excellence</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed max-w-md">
                A premier, 100% Black-owned construction company specializing in multi-disciplinary civil construction
                and infrastructure development across South Africa.
              </p>

              {/* Enhanced Credentials */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Shield, text: "Level 1 BBBEE", color: "text-green-400", bg: "bg-green-400/10" },
                  { icon: Award, text: "CIDB PE 5CE", color: "text-blue-400", bg: "bg-blue-400/10" },
                  { icon: Target, text: "100% Black Owned", color: "text-[#d27015]", bg: "bg-[#d27015]/10" },
                ].map((credential, index) => (
                  <motion.div
                    key={credential.text}
                    className={`flex items-center space-x-2 p-3 rounded-lg ${credential.bg} border border-gray-700/50`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <credential.icon className={`w-4 h-4 ${credential.color}`} />
                    <span className="text-sm font-medium text-gray-300">{credential.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Primary Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                   
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => window.open("tel:0823169297")}
                    variant="outline"
                    className="border-gray-400 text-gray-800 hover:bg-gray-200 hover:text-black dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-white dark:hover:border-gray-500 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                  >
                    <Headphones className="mr-2 w-4 h-4" />
                    24/7 Support
                  </Button>
                </motion.div>
              </div>

              {/* Trust Indicators */}
              <motion.div
                className="flex items-center space-x-6 pt-4 border-t border-gray-700/50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>50+ Happy Clients</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span>100% Satisfaction</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Eye className="w-4 h-4 text-green-400" />
                  <span>24/7 Monitoring</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Quick Links */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white flex items-center">
                Quick Links
                <motion.div
                  className="w-12 h-0.5 bg-gradient-to-r from-[#d27015] to-transparent ml-3"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                />
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Home", id: "home" },
                  { name: "About Us", id: "about" },
                  { name: "Services", id: "services" },
                  { name: "Projects", id: "projects" },
                  { name: "Contact", id: "contact" },
                ].map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.button
                      onClick={() => handleNavigation(link.id)}
                      className="text-gray-300 hover:text-white transition-all duration-200 font-medium text-sm flex items-center group w-full text-left"
                      whileHover={{ x: 5 }}
                    >
                      <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200 text-[#d27015]" />
                      {link.name}
                    </motion.button>
                  </motion.li>
                ))}
              </ul>

              <div className="pt-4 border-t border-gray-700/50">
                <h5 className="text-sm font-semibold text-white mb-3 flex items-center">
                  <Building2 className="w-4 h-4 mr-2 text-[#d27015]" />
                  Resources
                </h5>
                <ul className="space-y-2">
                  {["Safety Standards", "Quality Policy", "Environmental Compliance"].map(
                    (item, index) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.button
                          className="text-gray-400 hover:text-gray-300 transition-colors text-sm hover:translate-x-1 transform duration-200"
                          whileHover={{ x: 3 }}
                        >
                          {item}
                        </motion.button>
                      </motion.li>
                    ),
                  )}
                </ul>
              </div>
            </motion.div>

            {/* Enhanced Contact Information */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-[#d27015]" />
                Contact Info
                <motion.div
                  className="w-12 h-0.5 bg-gradient-to-r from-[#d27015] to-transparent ml-3"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </h4>

              <div className="space-y-4">
                {/* Phone */}
                <div className="space-y-2">
                  <div className="flex items-center text-gray-300">
                    <Phone className="w-4 h-4 mr-2 text-[#d27015]" />
                    <span className="text-sm font-medium">Phone</span>
                  </div>
                  <div className="text-sm text-gray-400 space-y-1 ml-6">
                    <div>Head Office: (012) 322 6786</div>
                    <div>Mobile: 082 316 9297</div>
                    <div>Western Cape: (021) 569 7124</div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <div className="flex items-center text-gray-300">
                    <Mail className="w-4 h-4 mr-2 text-[#d27015]" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <div className="text-sm text-gray-400 ml-6">info@mckeywaprojects.co.za</div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-[#d27015]" />
                    <span className="text-sm font-medium">Head Office</span>
                  </div>
                  <div className="text-sm text-gray-400 ml-6 space-y-1">
                    <div>Unit 489 Silverwood</div>
                    <div>51 Nikkel Street</div>
                    <div>Monavoni Ext 6, Centurion 0157</div>
                    <div>Gauteng, South Africa</div>
                  </div>
                </div>

                {/* Enhanced Emergency */}
                <motion.div
                  className="bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-700/40 rounded-lg p-4 relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Background pulse effect */}
                  <motion.div
                    className="absolute inset-0 bg-red-500/5 rounded-lg"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center mb-2">
                      <Headphones className="w-4 h-4 mr-2 text-red-400" />
                      <span className="text-sm font-semibold text-white">24/7 Emergency</span>
                      <Badge className="ml-2 bg-red-600/20 text-red-400 border-red-600/40 text-xs">LIVE</Badge>
                    </div>
                    <motion.div className="text-lg font-bold text-red-400 mb-1" whileHover={{ scale: 1.05 }}>
                      082 316 9297
                    </motion.div>
                    <div className="text-xs text-gray-400">For urgent construction matters</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="text-center lg:text-left">
                <p className="text-gray-400 text-sm">© 2025 McKeywa Projects (Pty) Ltd. All rights reserved.</p>
                <div className="text-gray-500 text-xs mt-1">
                  REG: 2018/632727/07 • VAT: 4310309382 • CIDB: PE 5CE (CR 10400028)
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6">
              

                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-900/20 text-green-400 border-green-800/30 text-xs">
                    ISO 9001:2015
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-900/20 text-blue-400 border-blue-800/30 text-xs">
                    SAFCEC
                  </Badge>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {/* <div className="flex justify-center lg:justify-end mt-6 space-x-3">
              {[
                { name: "LinkedIn", href: "#" },
                { name: "Facebook", href: "#" },
                { name: "Twitter", href: "#" },
                { name: "Instagram", href: "#" },
              ].map((social) => (
                <button
                  key={social.name}
                  className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                  title={social.name}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <Globe className="w-4 h-4" />
                </button>
              ))}
            </div> */}
          </div>
        </div>
      </motion.footer>

      {/* Enhanced Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-[#d27015] to-[#b8621a] hover:from-[#b8621a] hover:to-[#a55618] text-white rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#d27015] focus:ring-offset-2 group"
            title="Scroll to top"
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 10px 25px rgba(210, 112, 21, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 2, repeat: Infinity }}>
              <ArrowUp className="w-5 h-5" />
            </motion.div>

            {/* Progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="26" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
              <motion.circle
                cx="28"
                cy="28"
                r="26"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                style={{
                  pathLength: scrollProgress / 100,
                }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: scrollProgress / 100 }}
                transition={{ duration: 0.1 }}
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1e293b",
            color: "white",
            border: "1px solid #475569",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
          },
        }}
      />
    </div>
  );
});

AppContent.displayName = "AppContent";

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </ThemeProvider>
  );
}
