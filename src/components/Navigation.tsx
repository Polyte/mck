import { memo, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useRouter } from "./Router";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Building2, Phone, Shield, Award } from "lucide-react";

const Navigation = memo(() => {
  const { currentPage, setCurrentPage } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const handleNavigation = (page: string) => {
    setCurrentPage(page as any);
    setIsOpen(false);
    // Immediate scroll to top for better UX
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <>
      {/* Professional announcement bar */}
       

      <nav
        className={`sticky top-0 z-50 transition-all duration-300 font-['Josefin_Sans'] ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
            : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative backdrop-blur-xl transition-all duration-500 ease-out group ${
            isScrolled
              ? "bg-white/95 dark:bg-gray-900/95 rounded-none mx-0 mt-0 border-0 border-b border-gray-200/30 dark:border-gray-700/30 shadow-xl hover:bg-white dark:hover:bg-gray-900"
              : "bg-white/80 dark:bg-gray-900/80 rounded-2xl mx-4 mt-2 border border-white/20 dark:border-gray-800/20 shadow-2xl hover:bg-white/90 dark:hover:bg-gray-900/90 hover:shadow-3xl hover:border-white/40 dark:hover:border-gray-700/40"
          }`}
        >
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigation("home")}>
              {/* <div className="w-10 h-10 bg-gradient-to-r from-[#d27015] to-[#b8621a] rounded-lg flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div> */}
              <div>
                <h1 className="text-lg font-bold text-orange-900 dark:text-white">
                  <span class="text-lg">MC</span>KEYWA
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium"></p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    currentPage === item.id
                      ? "bg-[#d27015]/10 text-[#d27015] border border-[#d27015]/20"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Desktop CTA & Credentials */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Credentials */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 text-xs">
                  <Shield className="w-3 h-3 text-green-600" />
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Level 1 BBBEE</span>
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <Award className="w-3 h-3 text-blue-600" />
                  <span className="text-gray-600 dark:text-gray-400 font-medium">CIDB PE 5CE</span>
                </div>
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* CTA Button */}
              {/* <Button
                onClick={() => handleNavigation("contact")}
                className="bg-[#d27015] hover:bg-[#b8621a] text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors"
              >
                <Phone className="mr-2 w-4 h-4" />
                Book Consultation
              </Button> */}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl mt-2 p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      currentPage === item.id
                        ? "bg-[#d27015]/10 text-[#d27015] border border-[#d27015]/20"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}

                {/* Mobile Credentials */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700 mt-3">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center justify-center space-x-1 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg border border-green-200 dark:border-green-800">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-green-800 dark:text-green-400">Level 1 BBBEE</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg border border-blue-200 dark:border-blue-800">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-800 dark:text-blue-400">CIDB PE 5CE</span>
                    </div>
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="space-y-2">
                  <Button
                    onClick={() => window.open("tel:0823169297")}
                    variant="outline"
                    className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 py-3 rounded-lg font-medium"
                  >
                    <Phone className="mr-2 w-4 h-4" />
                    Emergency: 082 316 9297
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
});

Navigation.displayName = "Navigation";

export { Navigation };
