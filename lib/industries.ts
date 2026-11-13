export type Industry = {
  slug: string;
  name: string;
  headline: string;
  problem: string;
  painPoints: string[];
  solutions: { title: string; desc: string; href: string }[];
};

export const industries: Industry[] = [
  {
    slug: "restaurants",
    name: "Restaurants",
    headline: "Fill more tables without relying on delivery apps",
    problem:
      "Diners decide in seconds from what they see on Google and social media. If your listing is out of date or booking is hard, they go next door.",
    painPoints: ["Slow nights and empty tables", "Few reviews, or unanswered ones", "Menu and hours wrong online"],
    solutions: [
      { title: "Google Business Profile", desc: "Photos, hours, menu and a booking button, kept current every week.", href: "/services" },
      { title: "Local SEO", desc: "Show up when people search 'restaurants near me'.", href: "/services/new-york-seo-services" },
      { title: "Social Media", desc: "Short videos and posts that bring people through the door.", href: "/services/new-york-social-media-services" },
    ],
  },
  {
    slug: "clinics",
    name: "Clinics & Healthcare",
    headline: "Keep your calendar full with the right patients",
    problem:
      "Patients search for a nearby provider they can trust, and they want to book quickly. Practices lose them with slow sites and unanswered calls.",
    painPoints: ["Missed calls after hours", "Hard-to-use booking", "Too few new-patient inquiries"],
    solutions: [
      { title: "AI Calling Solutions", desc: "Answer calls and book appointments 24/7.", href: "/services/new-york-ai-calling-services" },
      { title: "Local SEO", desc: "Be found for the treatments you offer in your neighborhood.", href: "/services/new-york-seo-services" },
      { title: "Website Development", desc: "A fast, clear site with online booking.", href: "/services" },
    ],
  },
  {
    slug: "law-firms",
    name: "Law Firms",
    headline: "Get calls from people ready to hire a lawyer",
    problem:
      "Clients search when they urgently need help and call the first firm that seems credible. Generic ads and slow follow-up waste budget.",
    painPoints: ["Paying for clicks that don't call", "Slow follow-up on new inquiries", "Hard to stand out from other firms"],
    solutions: [
      { title: "Google and Meta Ads", desc: "Reach people searching for your practice area.", href: "/services/new-york-paid-ads-services" },
      { title: "AI Chatbot", desc: "Answer questions and capture details at any hour.", href: "/services/new-york-ai-chatbot-services" },
      { title: "Local SEO", desc: "Be visible when someone searches near you.", href: "/services/new-york-seo-services" },
    ],
  },
  {
    slug: "contractors",
    name: "Contractors & Home Services",
    headline: "More estimate requests, fewer missed jobs",
    problem:
      "Homeowners call the first few contractors they find. If you're not near the top or you miss the call, the job goes to someone else.",
    painPoints: ["Missed calls while on a job", "Feast-or-famine lead flow", "Competitors ranking above you"],
    solutions: [
      { title: "AI Calling Solutions", desc: "Never miss a call, even on the job site.", href: "/services/new-york-ai-calling-services" },
      { title: "Local SEO", desc: "Rank in the map results for your trade and area.", href: "/services/new-york-seo-services" },
      { title: "Google Ads", desc: "Steady estimate requests with a controlled budget.", href: "/services/new-york-paid-ads-services" },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    headline: "Turn online interest into booked showings",
    problem:
      "Buyers and sellers inquire with several agents at once. The one who responds first, and looks most credible, usually wins.",
    painPoints: ["Slow response to new leads", "Spending on leads that never reply", "Little local visibility"],
    solutions: [
      { title: "CRM Automation", desc: "Automatic follow-up on every new inquiry.", href: "/services/new-york-ai-automation-services" },
      { title: "Meta and Google Ads", desc: "Reach buyers and sellers in your neighborhoods.", href: "/services/new-york-paid-ads-services" },
      { title: "Website Development", desc: "Listing pages that load fast and capture inquiries.", href: "/services" },
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
