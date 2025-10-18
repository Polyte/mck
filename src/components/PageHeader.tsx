import { memo } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useRouter } from "./Router";
import {
  ChevronRight,
  Home,
  ArrowRight,
  Phone,
  Calendar,
  Star,
  Award,
  Shield,
} from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description: string;
  backgroundImage: string;
  breadcrumbs: BreadcrumbItem[];
  badge?: {
    text: string;
    icon?: React.ComponentType<{ className?: string }>;
  };
  ctaButtons?: {
    primary?: {
      text: string;
      action: () => void;
      icon?: React.ComponentType<{ className?: string }>;
    };
    secondary?: {
      text: string;
      action: () => void;
      icon?: React.ComponentType<{ className?: string }>;
    };
  };
  stats?: {
    value: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  decorativeImages?: string[];
}

const PageHeader = memo(
  ({
    title,
    subtitle,
    description,
    backgroundImage,
    breadcrumbs,
    badge,
    ctaButtons,
    stats,
    decorativeImages = [],
  }: PageHeaderProps) => {
    const { setCurrentPage } = useRouter();

    const handleBreadcrumbClick = (href?: string) => {
      if (href) {
        setCurrentPage(href as any);
      }
    };

    return (
      <div className="relative min-h-[60vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={backgroundImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Professional gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/70 to-slate-900/80" />
        </div>

        {/* Professional grid overlay */}
        <div className="absolute inset-0 professional-grid opacity-10"></div>

        {/* Floating Decorative Images */}
        {decorativeImages.length > 0 && (
          <>
            {/* Top right decorative image */}
            <div className="absolute top-8 right-8 w-32 h-32 rounded-2xl overflow-hidden shadow-2xl opacity-20 rotate-12 hidden lg:block">
              <ImageWithFallback
                src={decorativeImages[0]}
                alt="Construction detail"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Middle left decorative image */}
            {decorativeImages[1] && (
              <div className="absolute top-1/2 left-8 w-24 h-24 rounded-xl overflow-hidden shadow-xl opacity-15 -rotate-12 hidden lg:block">
                <ImageWithFallback
                  src={decorativeImages[1]}
                  alt="Construction detail"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Bottom right decorative image */}
            {decorativeImages[2] && (
              <div className="absolute bottom-16 right-16 w-28 h-28 rounded-2xl overflow-hidden shadow-xl opacity-25 rotate-6 hidden lg:block">
                <ImageWithFallback
                  src={decorativeImages[2]}
                  alt="Project detail"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </>
        )}

        {/* Floating Accent Elements */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-orange-500 rounded-full opacity-60 animate-pulse hidden lg:block"></div>
        <div
          className="absolute top-32 right-32 w-3 h-3 bg-blue-500 rounded-full opacity-40 animate-pulse hidden lg:block"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-20 left-32 w-2 h-2 bg-green-500 rounded-full opacity-50 animate-pulse hidden lg:block"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Content */}
        <div className="relative z-10 min-h-[60vh] flex items-center">
          <div className="max-w-7xl mx-auto container-padding w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Main Content */}
              <div className="lg:col-span-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm mb-8 animate-fade-in-up">
                  {breadcrumbs.map((crumb, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2"
                    >
                      {index === 0 ? (
                        <Home className="w-4 h-4 text-gray-300" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                      {crumb.href ? (
                        <button
                          onClick={() =>
                            handleBreadcrumbClick(crumb.href)
                          }
                          className="text-gray-300 hover:text-white transition-colors font-medium"
                        >
                          {crumb.label}
                        </button>
                      ) : (
                        <span className="text-orange-400 font-medium">
                          {crumb.label}
                        </span>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Badge */}
                {badge && (
                  <Badge
                    className="mb-6 bg-orange-500/20 text-orange-400 border border-orange-500/30 text-lg px-6 py-3 font-semibold animate-fade-in-up"
                    style={{ animationDelay: "0.1s" }}
                  >
                    {badge.icon && (
                      <badge.icon className="w-5 h-5 mr-2" />
                    )}
                    {badge.text}
                  </Badge>
                )}

                {/* Subtitle */}
                {subtitle && (
                  <h2
                    className="text-xl font-semibold text-orange-400 tracking-wide mb-4 animate-fade-in-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    {subtitle}
                  </h2>
                )}

                {/* Main Title */}
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up"
                  style={{ animationDelay: "0.3s" }}
                >
                  {title}
                </h1>

                {/* Description */}
                <p
                  className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-3xl mb-8 animate-fade-in-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  {description}
                </p>

                {/* CTA Buttons */}
                {ctaButtons && (
                  <div
                    className="flex flex-col sm:flex-row gap-6 mb-12 animate-fade-in-up"
                    style={{ animationDelay: "0.5s" }}
                  >
                    {ctaButtons.primary && (
                      <Button
                        size="lg"
                        onClick={ctaButtons.primary.action}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {ctaButtons.primary.icon && (
                          <ctaButtons.primary.icon className="mr-3 w-6 h-6" />
                        )}
                        {ctaButtons.primary.text}
                        <ArrowRight className="ml-3 w-6 h-6" />
                      </Button>
                    )}

                    {ctaButtons.secondary && (
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={ctaButtons.secondary.action}
                        className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-10 py-6 text-lg backdrop-blur-sm bg-white/10 transition-all duration-300"
                      >
                        {ctaButtons.secondary.icon && (
                          <ctaButtons.secondary.icon className="mr-3 w-6 h-6" />
                        )}
                        {ctaButtons.secondary.text}
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Side Image Panel - Hidden on mobile */}
              <div className="lg:col-span-4 hidden lg:block">
                <div className="relative">
                  {/* Main side image */}
                  

                  {/* Small decorative images */}
                  <div className="absolute -top-6 -left-6 w-20 h-20 rounded-xl overflow-hidden shadow-xl opacity-80">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1568057373106-63057e421d1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMGJsdWVwcmludHMlMjBvZmZpY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU2MTk0NzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Construction blueprints"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-xl overflow-hidden shadow-xl opacity-70">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1630613750908-dd5ce4cd8386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZyYXN0cnVjdHVyZSUyMGNvbnN0cnVjdGlvbiUyMHByb2plY3QlMjBhZXJpYWx8ZW58MXx8fHwxNzU2MTk0NzExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Infrastructure project"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-center hover:bg-white/20 transition-all duration-300"
                  >
                    {stat.icon && (
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white mx-auto mb-3 shadow-lg">
                        <stat.icon className="w-6 h-6" />
                      </div>
                    )}
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-200 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center bg-white/10 backdrop-blur-sm">
            <div className="w-1 h-4 bg-orange-400 rounded-full mt-3 animate-pulse"></div>
          </div>
        </div>

        {/* Professional pattern overlay */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none"></div>
      </div>
    );
  },
);

PageHeader.displayName = "PageHeader";

export { PageHeader };