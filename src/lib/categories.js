export const CATEGORIES_DATA = {
  "Finance & Accounting": {
    label: "Finance & Accounting",
    id: "finance-accounting",
    color: "from-purple-500 to-indigo-600",
    icon: "bank",
    subcategories: {
      "Finance Modeling & Valuation": [
        "3-Statement Finance Modeling",
        "Startup & Pitch Desk Financials",
        "Project Finance & Underwriting"
      ],
      "Global Tax Strategy & Compliance": [
        "Cross-Border Corporate Structuring",
        "Statutory Tax Filing",
        "Expat & Personal Tax Returns"
      ],
      "Fractional CFO & Advisory": [
        "Cash Flow Forecasting",
        "Budget Variance Analysis",
        "Merger & Acquisition (M&A) Due Diligence"
      ],
      "Finance & Auditing": [
        "Physical Asset & Inventory Verification",
        "On-site Project Cost Auditing",
        "Bureaucracy & Compliance"
      ],
      "General Finance": [
        "Accounts Payable & Receivable (AP/AR)",
        "Payroll Administration"
      ]
    }
  },
  "Legal Services": {
    label: "Legal Services",
    id: "legal-services",
    color: "from-violet-600 to-fuchsia-600",
    icon: "scale",
    subcategories: {
      "Intellectual Property (IP)": [
        "Trademark Search & Filing",
        "Patent Drafting",
        "Copyright & DMCA Takedown"
      ],
      "Legal Research & Paralegal Services": [
        "Case Law & Precedent Research",
        "Demand Letter Drafting"
      ],
      "International Trade & Immigration": [
        "Cross-Border Trade Compliance",
        "Immigration & Visa Assistance"
      ],
      "Real Estate & Personal Law": [
        "Real Estate & Construction Contracts",
        "Estate Planning"
      ],
      "On-ground Legal Service": [
        "Company Incorporation & Registration",
        "Notary Public Services",
        "Physical Title & Property Searches"
      ],
      "Process Serving & Support": [
        "Process Serving"
      ]
    }
  },
  "Video & Animation": {
    label: "Video & Animation",
    id: "video-animation",
    color: "from-fuchsia-500 to-pink-600",
    icon: "video",
    subcategories: {
      "Animation & Motions Graphics": [
        "2D & 3D Explainer Video",
        "Motion Graphics & Kinetic Typography",
        "3D Product Animation",
        "UI/UX & Lottie Animations"
      ],
      "Streamer & Creator Support": [
        "Stream Overlays & Assets",
        "Youtuber Rigging",
        "Intro/Outro & Logo Animation"
      ],
      "AI Video & Generative Media": [
        "AI Video Generation & Prompt Engineering",
        "AI Video Translation & Dubbing"
      ],
      "On-ground Video Services": [
        "Local Videography & Cinematography",
        "Commercial Drone Piloting",
        "On-Site Production Crew",
        "Live Event Broadcasting"
      ],
      "On-screen Talent & Commercial Modeling": [
        "UGC (User-Generated Content) Creators",
        "Spokesperson Presenters",
        "Commercial & Fashion Modeling"
      ],
      "3D Modeling, VFX & CGI": [
        "3D Character Modeling & Rigging",
        "3D Product & Environment Modeling",
        "VFX & Compositing"
      ],
      "Video Post-Production & Editing": [
        "Short-Form Video Editing",
        "Corporate & Documentary Editing",
        "Color Grading & Correction",
        "Audio Post & Sound Design"
      ],
      "Pre-Production & Creative Writing": [
        "Screenwriting & Youtube Scriptwriting",
        "Storyboarding",
        "Virtual Casting Directors"
      ],
      "Video, Film & Modeling": [
        "Local Cinematography & Videography",
        "Commercial Drone Piloting",
        "On-set Makeup & Wardrobe Styling",
        "Set Design & Grip/Lighting"
      ],
      "Corporate & Commercial Editing": [
        "Corporate & Commercial Editing",
        "Faceless \"Cash Cow\" Youtube Editing",
        "Color Grading & VFX"
      ]
    }
  },
  "Design & Graphics": {
    label: "Design & Graphics",
    id: "design-graphics",
    color: "from-indigo-500 to-purple-600",
    icon: "palette",
    subcategories: {
      "Architecture & Spatial Design": [
        "CAD Drafting & Floor Plans",
        "BIM Modeling",
        "3D Architectural Renderings",
        "Landscape Design"
      ],
      "UI/UX & Web Design": [
        "Website & Landing Page",
        "Mobile App UI/UX",
        "Iconography"
      ],
      "Marketing & Promotional Design": [
        "Social Media Design",
        "Digital Ads & Banners",
        "Email Newsletter Templates",
        "Infographics"
      ],
      "Packaging, Print & Product Design": [
        "Product Packaging & Labels",
        "3D Product Mockups",
        "Industrial Design"
      ],
      "On-ground Graphics Service": [
        "Physical Signage & Wayfinding",
        "Vehicle Wrap Design & Prototyping",
        "Trade Show Booth Design",
        "Print Production Liaison"
      ],
      "Brand Style Guides & Assets": [
        "Brand Style Guides",
        "Corporate Imagery & Asset Integration",
        "Presentation Design"
      ]
    }
  }
};

export const ALL_SERVICES = Object.values(CATEGORIES_DATA).reduce((acc, cat) => {
  Object.values(cat.subcategories).forEach(services => {
    services.forEach(service => {
      if (!acc.includes(service)) {
        acc.push(service);
      }
    });
  });
  return acc;
}, []);
