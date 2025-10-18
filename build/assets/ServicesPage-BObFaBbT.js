import {
    r as a,
    u as D,
    b as l,
    A as j,
    U as A,
    j as e,
    P as g,
    B as r,
    a as n,
    T
} from "./index-B5pdoKEE.js";
import {
    P
} from "./PageHeader-CASUuK3t.js";
import {
    u as p,
    d as V,
    C as h,
    a as u,
    I as W,
    b,
    A as z
} from "./useScrollAnimation-DgykiPAu.js";
import {
    D as R,
    a as k,
    b as B,
    c as Y,
    d as I,
    e as J
} from "./dialog-Tj7_9H7O.js";
import {
    T as X,
    C as f,
    W as G
} from "./wrench-DxnD3ZLt.js";
import {
    H as q,
    Z as N
} from "./zap-my6MKtb3.js";
import {
    S as v
} from "./settings-BVI8YmtE.js";
import {
    C as Z
} from "./calendar-RWGDy4bF.js";
const F = a.memo(() => {
    const {
        setCurrentPage: i
    } = D(), [U, w] = a.useState(null), c = p({
        threshold: .1
    }), o = p({
        threshold: .1
    }), d = p({
        threshold: .1
    }), y = a.useMemo(() => [{
        id: 1,
        icon: l,
        title: "Infrastructure Development",
        description: "Comprehensive infrastructure solutions including bridges, highways, water treatment facilities, and municipal projects that serve communities across South Africa.",
        features: ["Bridge Construction & Rehabilitation", "Highway & Road Development", "Water Treatment Facilities", "Municipal Infrastructure", "Airport & Transport Hubs", "Industrial Facilities"],
        image: "https://plus.unsplash.com/premium_photo-1661873243927-ac13c13485eb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8SW5mcmFzdHJ1Y3R1cmUlMjBEZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D",
        projects: "210+",
        averageValue: "R45M",
        completionTime: "18 months avg"
    }, {
        id: 2,
        icon: X,
        title: "Road Construction",
        description: "Advanced road Construction and rehabilitation using state-of-the-art equipment and sustainable construction techniques for long-lasting infrastructure.",
        features: ["Asphalt & Concrete Roads", "Road Rehabilitation", "Traffic Management Systems", "Drainage & Stormwater", "Sidewalks & Pedestrian Areas", "Parking Facilities"],
        image: "https://images.unsplash.com/photo-1740485132839-3edd43060988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwY29uc3RydWN0aW9uJTIwaGVhdnklMjBtYWNoaW5lcnl8ZW58MXx8fHwxNzU1NjU3MTgzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        projects: "140+",
        averageValue: "R25M",
        completionTime: "12 months avg"
    }, {
        id: 3,
        icon: f,
        title: "Civil Construction",
        description: "Complete civil Construction services from initial planning and design to project completion, maintenance, and lifecycle management.",
        features: ["Structural Construction", "Geotechnical Analysis", "Project Planning & Design", "Environmental Compliance", "Quality Assurance", "Lifecycle Management"],
        image: "https://images.unsplash.com/photo-1581674662583-5e89b374fae6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXZpbCUyMGVuZ2luZWVyaW5nJTIwYmx1ZXByaW50cyUyMHBsYW5uaW5nfGVufDF8fHx8MTc1NTY1ODI0MXww&ixlib=rb-4.1.0&q=80&w=1080",
        projects: "150+",
        averageValue: "R35M",
        completionTime: "15 months avg"
    }, {
        id: 4,
        icon: G,
        title: "Maintenance Services",
        description: "Ongoing maintenance and repair services ensuring long-term infrastructure reliability with preventive maintenance programs.",
        features: ["Preventive Maintenance", "Emergency Repairs", "Infrastructure Upgrades", "Asset Management", "24/7 Support Services", "Performance Monitoring"],
        image: "https://plus.unsplash.com/premium_photo-1682126164389-6780333faee5?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        projects: "300+",
        averageValue: "R8M",
        completionTime: "6 months avg"
    }], []), M = a.useMemo(() => [{
        icon: q,
        title: "Safety Excellence",
        description: "Zero-incident safety protocols with continuous monitoring",
        metric: "0 incidents in 2024"
    }, {
        icon: j,
        title: "Quality Assurance",
        description: "ISO 9001:2015 certified processes and quality standards",
        metric: "98.5% quality score"
    }, {
        icon: N,
        title: "Innovation",
        description: "Advanced BIM systems and sustainable construction practices",
        metric: "25% efficiency gain"
    }, {
        icon: A,
        title: "Expert Team",
        description: "Professional engineers and certified specialists",
        metric: "6+ years avg experience"
    }], []), H = a.useMemo(() => [{
        step: "01",
        title: "Project Assessment",
        description: "Comprehensive site evaluation, feasibility studies, and requirement analysis",
        duration: "2-4 weeks"
    }, {
        step: "02",
        title: "Design & Planning",
        description: "Detailed Construction design, permit acquisition, and project planning",
        duration: "4-8 weeks"
    }, {
        step: "03",
        title: "Resource Mobilization",
        description: "Equipment deployment, team assignment, and material procurement",
        duration: "2-3 weeks"
    }, {
        step: "04",
        title: "Construction Execution",
        description: "Systematic construction with continuous quality monitoring and safety protocols",
        duration: "Project dependent"
    }, {
        step: "05",
        title: "Quality Assurance",
        description: "Comprehensive testing, inspection, and compliance verification",
        duration: "1-2 weeks"
    }, {
        step: "06",
        title: "Project Handover",
        description: "Final delivery, documentation, and ongoing maintenance support",
        duration: "1 week"
    }], []), C = a.useMemo(() => [{
        value: "4",
        label: "Core Services",
        icon: v
    }, {
        value: "80+",
        label: "Projects Delivered",
        icon: l
    }, {
        value: "100%",
        label: "Success Rate",
        icon: j
    }, {
        value: "24/7",
        label: "Support Available",
        icon: V
    }], []), S = ["https://images.unsplash.com/photo-1754373218882-a9fbc0921e0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NTc0Mjc5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1729551610640-e8adee1172e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMGJsdWVwcmludHMlMjBwbGFuc3xlbnwxfHx8fDE3NTc0NTM4MDN8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1726589004565-bedfba94d3a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzYWZldHklMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzU3NDUzODA2fDA&ixlib=rb-4.1.0&q=80&w=1080"];
    return e.jsxs("div", {
        className: "min-h-screen bg-gray-50",
        children: [e.jsx(P, {
            title: "Our Construction Services",
            subtitle: "Complete Solutions",
            description: "Comprehensive civil construction and infrastructure development services across South Africa. From highways to bridges, we deliver world-class projects with precision and excellence.",
            backgroundImage: "https://images.unsplash.com/photo-1604225318415-20fddd721f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzZXJ2aWNlcyUyMGVxdWlwbWVudCUyMGhlYXZ5JTIwbWFjaGluZXJ5fGVufDF8fHx8MTc1NzQ1Mzc5NXww&ixlib=rb-4.1.0&q=80&w=1080",
            breadcrumbs: [{
                label: "Home",
                href: "home"
            }, {
                label: "Services"
            }],
            badge: {
                text: "Multi-Disciplinary Construction",
                icon: f
            },
            ctaButtons: {
                primary: {
                    text: "Visit Us",
                    action: () => i("contact"),
                    icon: g
                },
                secondary: {
                    text: "View Projects",
                    action: () => i("projects"),
                    icon: l
                }
            },
            stats: C,
            decorativeImages: S
        }), e.jsx("section", {
            ref: c.ref,
            className: "section-padding bg-white",
            children: e.jsxs("div", {
                className: "max-w-7xl mx-auto container-padding",
                children: [e.jsxs("div", {
                    className: `text-center mb-20 animate-on-scroll ${c.isVisible?"is-visible":""}`,
                    children: [e.jsxs(r, {
                        className: "mb-8 bg-[#d27015] text-white text-lg px-6 py-3 font-semibold",
                        children: [e.jsx(l, {
                            className: "w-5 h-5 mr-2"
                        }), "Core Services"]
                    }), e.jsx("h2", {
                        className: "text-4xl lg:text-5xl font-bold text-gray-900 mb-6",
                        children: "Complete Construction Solutions"
                    }), e.jsx("p", {
                        className: "text-xl text-gray-600 max-w-4xl mx-auto",
                        children: "End-to-end construction services from initial planning to project completion and ongoing maintenance"
                    })]
                }), e.jsx("div", {
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-12",
                    children: y.map((s, t) => e.jsx(h, {
                        className: `card-professional group overflow-hidden animate-on-scroll ${c.isVisible?"is-visible":""}`,
                        style: {
                            animationDelay: `${t*.1}s`
                        },
                        children: e.jsxs(u, {
                            className: "p-0",
                            children: [e.jsxs("div", {
                                className: "relative h-64 overflow-hidden",
                                children: [e.jsx(W, {
                                    src: s.image,
                                    alt: s.title,
                                    className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                }), e.jsx("div", {
                                    className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                                }), e.jsx("div", {
                                    className: "absolute bottom-4 left-4",
                                    children: e.jsx("div", {
                                        className: "w-12 h-12 bg-gradient-to-r from-[#d27015] to-[#b8621a] rounded-xl flex items-center justify-center text-white shadow-lg",
                                        children: e.jsx(s.icon, {
                                            className: "w-6 h-6"
                                        })
                                    })
                                }), e.jsx("div", {
                                    className: "absolute top-4 right-4",
                                    children: e.jsxs(r, {
                                        className: "bg-[#d27015] text-white font-bold",
                                        children: [s.projects, " Projects"]
                                    })
                                })]
                            }), e.jsxs("div", {
                                className: "p-8",
                                children: [e.jsx("h3", {
                                    className: "text-2xl font-bold text-gray-900 mb-4",
                                    children: s.title
                                }), e.jsx("p", {
                                    className: "text-gray-600 leading-relaxed mb-6",
                                    children: s.description
                                }), e.jsx("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6",
                                    children: s.features.slice(0, 4).map((x, m) => e.jsxs("div", {
                                        className: "flex items-center space-x-2",
                                        children: [e.jsx(b, {
                                            className: "w-4 h-4 text-green-600 flex-shrink-0"
                                        }), e.jsx("span", {
                                            className: "text-sm text-gray-600",
                                            children: x
                                        })]
                                    }, m))
                                }), e.jsxs("div", {
                                    className: "grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg",
                                    children: [e.jsxs("div", {
                                        className: "text-center",
                                        children: [e.jsx("div", {
                                            className: "text-lg font-bold text-[#d27015]",
                                            children: s.projects
                                        }), e.jsx("div", {
                                            className: "text-xs text-gray-600",
                                            children: "Projects"
                                        })]
                                    }), e.jsxs("div", {
                                        className: "text-center",
                                        children: [e.jsx("div", {
                                            className: "text-lg font-bold text-blue-600",
                                            children: s.averageValue
                                        }), e.jsx("div", {
                                            className: "text-xs text-gray-600",
                                            children: "Avg Value"
                                        })]
                                    }), e.jsxs("div", {
                                        className: "text-center",
                                        children: [e.jsx("div", {
                                            className: "text-lg font-bold text-green-600",
                                            children: s.completionTime
                                        }), e.jsx("div", {
                                            className: "text-xs text-gray-600",
                                            children: "Timeline"
                                        })]
                                    })]
                                }), e.jsxs("div", {
                                    className: "flex space-x-3",
                                    children: [e.jsxs(R, {
                                        children: [e.jsx(k, {
                                            asChild: !0,
                                            children: e.jsxs(n, {
                                                className: "flex-1 bg-orange-500 hover:bg-orange-600 text-white",
                                                onClick: () => w(s.id),
                                                children: [e.jsx(T, {
                                                    className: "mr-2 w-4 h-4"
                                                }), "Learn More"]
                                            })
                                        }), e.jsxs(B, {
                                            className: "max-w-4xl max-h-[90vh] overflow-y-auto",
                                            children: [e.jsxs(Y, {
                                                children: [e.jsxs(I, {
                                                    children: [s.title, " - Detailed Information"]
                                                }), e.jsxs(J, {
                                                    children: ["Comprehensive overview of our ", s.title.toLowerCase(), " services, featuring key capabilities, project highlights, and success metrics."]
                                                })]
                                            }), e.jsxs("div", {
                                                className: "p-6",
                                                children: [e.jsxs("div", {
                                                    className: "flex items-center space-x-4 mb-6",
                                                    children: [e.jsx("div", {
                                                        className: "w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white",
                                                        children: e.jsx(s.icon, {
                                                            className: "w-8 h-8"
                                                        })
                                                    }), e.jsxs("div", {
                                                        children: [e.jsx("h3", {
                                                            className: "text-3xl font-bold text-gray-900",
                                                            children: s.title
                                                        }), e.jsxs("p", {
                                                            className: "text-orange-500 font-medium",
                                                            children: [s.projects, " Projects Completed"]
                                                        })]
                                                    })]
                                                }), e.jsx("p", {
                                                    className: "text-lg text-gray-600 mb-8",
                                                    children: s.description
                                                }), e.jsxs("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                                                    children: [e.jsxs("div", {
                                                        children: [e.jsx("h4", {
                                                            className: "text-xl font-bold text-gray-900 mb-4",
                                                            children: "Key Features"
                                                        }), e.jsx("div", {
                                                            className: "space-y-3",
                                                            children: s.features.map((x, m) => e.jsxs("div", {
                                                                className: "flex items-center space-x-3",
                                                                children: [e.jsx(b, {
                                                                    className: "w-5 h-5 text-green-600 flex-shrink-0"
                                                                }), e.jsx("span", {
                                                                    className: "text-gray-600",
                                                                    children: x
                                                                })]
                                                            }, m))
                                                        })]
                                                    }), e.jsxs("div", {
                                                        children: [e.jsx("h4", {
                                                            className: "text-xl font-bold text-gray-900 mb-4",
                                                            children: "Project Highlights"
                                                        }), e.jsxs("div", {
                                                            className: "space-y-4",
                                                            children: [e.jsxs("div", {
                                                                className: "bg-gray-50 p-4 rounded-lg",
                                                                children: [e.jsx("div", {
                                                                    className: "text-2xl font-bold text-[#d27015] mb-1",
                                                                    children: s.projects
                                                                }), e.jsx("div", {
                                                                    className: "text-sm text-gray-600",
                                                                    children: "Successfully Completed Projects"
                                                                })]
                                                            }), e.jsxs("div", {
                                                                className: "bg-gray-50 p-4 rounded-lg",
                                                                children: [e.jsx("div", {
                                                                    className: "text-2xl font-bold text-blue-600 mb-1",
                                                                    children: s.averageValue
                                                                }), e.jsx("div", {
                                                                    className: "text-sm text-gray-600",
                                                                    children: "Average Project Value"
                                                                })]
                                                            }), e.jsxs("div", {
                                                                className: "bg-gray-50 p-4 rounded-lg",
                                                                children: [e.jsx("div", {
                                                                    className: "text-2xl font-bold text-green-600 mb-1",
                                                                    children: s.completionTime
                                                                }), e.jsx("div", {
                                                                    className: "text-sm text-gray-600",
                                                                    children: "Average Completion Time"
                                                                })]
                                                            })]
                                                        })]
                                                    })]
                                                }), e.jsx("div", {
                                                    className: "mt-8 text-center",
                                                    children: e.jsxs(n, {
                                                        onClick: () => i("contact"),
                                                        className: "bg-[#d27015] hover:bg-[#b8621a] text-white px-8 py-3",
                                                        children: [e.jsx(g, {
                                                            className: "mr-2 w-5 h-5"
                                                        }), "Get Quote for This Service"]
                                                    })
                                                })]
                                            })]
                                        })]
                                    }), e.jsxs(n, {
                                        variant: "outline",
                                        onClick: () => i("contact"),
                                        className: "border-[#d27015] text-[#d27015] hover:bg-[#d27015]/5",
                                        children: [e.jsx(Z, {
                                            className: "mr-2 w-4 h-4"
                                        }), "Get Quote"]
                                    })]
                                })]
                            })]
                        })
                    }, s.id))
                })]
            })
        }), e.jsx("section", {
            ref: o.ref,
            className: "section-padding bg-gray-100",
            children: e.jsxs("div", {
                className: "max-w-7xl mx-auto container-padding",
                children: [e.jsxs("div", {
                    className: `text-center mb-20 animate-on-scroll ${o.isVisible?"is-visible":""}`,
                    children: [e.jsxs(r, {
                        className: "mb-8 bg-blue-600 text-white text-lg px-6 py-3 font-semibold",
                        children: [e.jsx(N, {
                            className: "w-5 h-5 mr-2"
                        }), "Our Capabilities"]
                    }), e.jsx("h2", {
                        className: "text-4xl lg:text-5xl font-bold text-gray-900 mb-6",
                        children: "What Sets Us Apart"
                    }), e.jsx("p", {
                        className: "text-xl text-gray-600 max-w-4xl mx-auto",
                        children: "Advanced capabilities and proven expertise that ensure exceptional project delivery"
                    })]
                }), e.jsx("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
                    children: M.map((s, t) => e.jsx(h, {
                        className: `card-professional text-center group animate-on-scroll ${o.isVisible?"is-visible":""}`,
                        style: {
                            animationDelay: `${t*.1}s`
                        },
                        children: e.jsxs(u, {
                            className: "p-8",
                            children: [e.jsx("div", {
                                className: "w-16 h-16 bg-gradient-to-r from-[#d27015] to-[#b8621a] rounded-xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300",
                                children: e.jsx(s.icon, {
                                    className: "w-8 h-8"
                                })
                            }), e.jsx("h3", {
                                className: "text-xl font-bold text-gray-900 mb-4",
                                children: s.title
                            }), e.jsx("p", {
                                className: "text-gray-600 mb-4 leading-relaxed",
                                children: s.description
                            }), e.jsx("div", {
                                className: "text-lg font-bold text-[#d27015]",
                                children: s.metric
                            })]
                        })
                    }, t))
                })]
            })
        }), e.jsx("section", {
            ref: d.ref,
            className: "section-padding bg-white",
            children: e.jsxs("div", {
                className: "max-w-7xl mx-auto container-padding",
                children: [e.jsxs("div", {
                    className: `text-center mb-20 animate-on-scroll ${d.isVisible?"is-visible":""}`,
                    children: [e.jsxs(r, {
                        className: "mb-8 bg-green-600 text-white text-lg px-6 py-3 font-semibold",
                        children: [e.jsx(v, {
                            className: "w-5 h-5 mr-2"
                        }), "Our Process"]
                    }), e.jsx("h2", {
                        className: "text-4xl lg:text-5xl font-bold text-gray-900 mb-6",
                        children: "Systematic Project Delivery"
                    }), e.jsx("p", {
                        className: "text-xl text-gray-600 max-w-4xl mx-auto",
                        children: "Our proven 6-step process ensures consistent quality, timely delivery, and exceptional results"
                    })]
                }), e.jsx("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                    children: H.map((s, t) => e.jsx(h, {
                        className: `card-professional group animate-on-scroll ${d.isVisible?"is-visible":""}`,
                        style: {
                            animationDelay: `${t*.1}s`
                        },
                        children: e.jsxs(u, {
                            className: "p-8",
                            children: [e.jsxs("div", {
                                className: "flex items-center space-x-4 mb-6",
                                children: [e.jsx("div", {
                                    className: "w-12 h-12 bg-gradient-to-r from-[#d27015] to-[#b8621a] rounded-lg flex items-center justify-center text-white font-bold text-lg",
                                    children: s.step
                                }), e.jsx("div", {
                                    className: "text-sm font-medium text-[#d27015]",
                                    children: s.duration
                                })]
                            }), e.jsx("h3", {
                                className: "text-xl font-bold text-gray-900 mb-4",
                                children: s.title
                            }), e.jsx("p", {
                                className: "text-gray-600 leading-relaxed",
                                children: s.description
                            })]
                        })
                    }, t))
                })]
            })
        }), e.jsx("section", {
            className: "section-padding bg-slate-900 text-white",
            children: e.jsxs("div", {
                className: "max-w-7xl mx-auto container-padding text-center",
                children: [e.jsx("h2", {
                    className: "text-4xl lg:text-5xl font-bold mb-8",
                    children: "Ready to Start Your Project?"
                }), e.jsx("p", {
                    className: "text-xl mb-16 max-w-4xl mx-auto text-gray-300 leading-relaxed",
                    children: "Get expert consultation and detailed project estimates. Our team is ready to transform your construction vision into reality with precision and excellence."
                }), e.jsxs("div", {
                    className: "flex flex-col lg:flex-row gap-8 justify-center items-center",
                    children: [e.jsxs(n, {
                        onClick: () => i("contact"),
                        className: "bg-[#d27015] hover:bg-[#b8621a] text-white font-semibold px-12 py-6 text-xl shadow-lg",
                        children: [e.jsx(g, {
                            className: "mr-3 w-7 h-7"
                        }), "Get Free Consultation", e.jsx(z, {
                            className: "ml-3 w-7 h-7"
                        })]
                    }), e.jsxs(n, {
                        onClick: () => i("projects"),
                        variant: "outline",
                        className: "border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-12 py-6 text-xl",
                        children: [e.jsx(l, {
                            className: "mr-3 w-7 h-7"
                        }), "View Our Portfolio"]
                    })]
                })]
            })
        })]
    })
});
F.displayName = "ServicesPage";
export {
    F as ServicesPage
};