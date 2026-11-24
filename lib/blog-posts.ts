export type BlogPostMeta = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
};

/** Newest first. Shared by the homepage Journal section and the /blog grid. */
export const blogPosts: BlogPostMeta[] = [
  {
    slug: "restaurant-marketing-more-reservations",
    date: "November 13, 2026",
    title: "How Restaurants Can Get More Reservations From Google",
    excerpt: "Three local-search fixes that turn people searching 'restaurants near me' into booked tables.",
    category: "Local SEO",
    image: "/home%20page%20images/how_restaurants_get_more_reservations.avif",
  },
  {
    slug: "law-firm-marketing-qualified-leads",
    date: "November 13, 2026",
    title: "Law Firm Marketing: Getting Calls From People Ready to Hire",
    excerpt: "Why most legal ads waste budget, and how to reach clients at the moment they need a lawyer.",
    category: "Paid Media",
    image: "/home%20page%20images/law_firm_marketing.webp",
  },
  {
    slug: "seo-2026-topical-authority",
    date: "January 09, 2026",
    title: "SEO in 2026: Why Topical Authority Beats Keywords",
    excerpt: "How AI overviews and generative search are reshaping organic strategy.",
    category: "SEO",
    image: "/home%20page%20images/why_topical_authorty_beats_keyboards.avif",
  },
  {
    slug: "brand-identity-foundation",
    date: "January 05, 2026",
    title: "Why a Strong Brand Identity Is the Foundation of Growth",
    excerpt: "How coherent brand systems unlock trust, retention and premium pricing.",
    category: "Brand",
    image: "/blog%20images/strong_brand_identity.webp",
  },
  {
    slug: "creative-testing-paid-ads",
    date: "December 22, 2025",
    title: "The Creative Testing System We Use for Every Paid Account",
    excerpt: "Our repeatable framework for finding scalable creative on Meta and TikTok.",
    category: "Paid Media",
    image: "/blog%20images/creative_testing.avif",
  },
  {
    slug: "email-retention-channel",
    date: "December 15, 2025",
    title: "Email Isn't Dead — It's Just Being Underinvested In",
    excerpt: "The compounding revenue channel most brands still leave on the table.",
    category: "Email",
    image: "/blog%20images/email_isnt_dead.webp",
  },
  {
    slug: "full-funnel-reporting-stack",
    date: "November 30, 2025",
    title: "The Full-Funnel Reporting Stack We Build for Clients",
    excerpt: "From ad platforms to the sale — what actually informs decisions.",
    category: "Analytics",
    image: "/blog%20images/full_funel_reporting_stack.avif",
  },
  {
    slug: "content-ops-systems",
    date: "November 12, 2025",
    title: "How We Approach Content Ops for a 12-Person Team",
    excerpt: "Repeatable systems for editorial cadence, quality control and repurposing.",
    category: "Content",
    image: "/blog%20images/content_ops.webp",
  },
];
