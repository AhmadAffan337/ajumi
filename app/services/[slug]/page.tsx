import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { CTABanner } from "@/components/CTABanner";
import { ServiceContent } from "./ServiceContent";

type ServiceDetail = {
  title: string;
  eyebrow: string;
  intro: string;
  overviewHeading?: string;
  overviewText?: string;
  what: string[];
  process: { n: string; t: string; d: string }[];
  deliverables?: { title: string; desc: string }[];
  kpis?: { value: string; label: string }[];
  caseStudy?: { title: string; metric: string; desc: string };
  faqs?: { q: string; a: string }[];
  techStack?: { name: string; category: string }[];
  strategicApproach?: { title: string; desc: string }[];
  comparisonTable?: { feature: string; us: string; traditional: string }[];
  teamExpertise?: { role: string; bio: string; experience: string }[];
  tiers?: { name: string; price: string; desc: string; features: string[]; highlight?: boolean }[];
  guarantees?: { title: string; desc: string }[];
  industries?: string[];
  locations?: string[];
  image?: string;
  tone: string;
};

const details: Record<string, ServiceDetail> = {
 "new-york-seo-services": {
    "title": "Results-Driven SEO Services Across the US",
    "eyebrow": "01 SEO SERVICES",
    "intro": "Get discovered by customers actively searching for your products and services across the US. We help businesses improve visibility in Google Search, Google Maps, and local search results. Ajumi AI provides SEO services that US businesses rely on to improve Google rankings, attract qualified local traffic, and generate more leads through customized SEO strategies designed for long-term growth.",
    "overviewHeading": "Custom SEO Solutions Built for Long-Term Growth Across the US",
    "overviewText": "Ranking on Google across the US requires more than adding keywords to your website. Our team develops customized SEO strategies based on your industry, local competition, and customer search intent. Whether you need Local SEO Services across the US, technical optimization, content improvements, or authority building, we align every campaign with your business goals. At Ajumi AI, we provide Custom Website SEO Services by optimizing website architecture, improving page speed and Core Web Vitals, strengthening on-page SEO, building high-quality backlinks, and increasing local search visibility to drive qualified traffic and long-term organic growth.",
    "what": [
      "Develop customized SEO strategies for US businesses",
      "Conduct local keyword research based on local search intent",
      "Optimize website structure and on-page SEO",
      "Optimize Google Business Profile and improve Google Maps visibility",
      "Build authoritative backlinks with ethical Off Page SEO Services",
      "Fix technical SEO issues, including crawlability, indexing, schema, and Core Web Vitals",
      "Optimize service pages to increase conversions",
      "Improve local rankings for businesses targeting US customers",
      "Track rankings, traffic, leads, and conversions with Google Analytics and Search Console",
      "Continuously optimize campaigns to keep pace with Google algorithm updates"
    ],
    "deliverables": [
      {
        "title": "Local SEO Services",
        "desc": "Improve your local search visibility with Local SEO Services designed to optimize your Google Business Profile, local citations, location pages, maps rankings, and city and neighborhood searches. We help customers across the US find your business when they're ready to buy."
      },
      {
        "title": "Custom Website SEO Services",
        "desc": "Our Custom Website SEO Services are tailored to your industry, website structure, and competitive landscape throughout the US. We optimize technical SEO, website content, internal linking, and user experience to improve rankings and increase qualified organic traffic."
      },
      {
        "title": "On-Page SEO Services",
        "desc": "Our on-page SEO services improve every important ranking factor, including page titles, meta descriptions, headings, internal linking, structured content, image optimization, schema markup, schema implementation, and keyword targeting, to help search engines better understand your website."
      },
      {
        "title": "Off-Page SEO Services",
        "desc": "Our Off-Page SEO services improve your website authority through ethical backlink building, digital PR, local citations, brand mentions, trusted industry references, and local citations that strengthen your search visibility across the US."
      }
    ],
    "kpis": [
      {
        "value": "95%+",
        "label": "Technical SEO Issues Resolved"
      },
      {
        "value": "3x",
        "label": "Growth in Qualified Organic Traffic"
      },
      {
        "value": "24/7",
        "label": "Search Visibility Working for Your Business"
      },
      {
        "value": "100%",
        "label": "White-Hat SEO Best Practices"
      }
    ],
    "caseStudy": {
      "title": "Helping US Businesses Grow Through Smarter SEO",
      "metric": "45,000+ Hours Saved Annually",
      "desc": "Our SEO services for US businesses are designed to increase local visibility, improve organic rankings, and generate qualified leads. Whether customers search for SEO Services Near Me, SEO Company USA, or industry-specific solutions, we help your website appear where it matters most."
    },
    "faqs": [
      {
        "q": "What are SEO services across the US?",
        "a": "SEO Services helps businesses improve their visibility in Google Search by optimizing website content, technical SEO, technical performance, local SEO, and authority signals. The goal is to attract more qualified customers searching for products or services throughout the US."
      },
      {
        "q": "What are local SEO services across the US?",
        "a": "Local SEO services across the US focus on improving your visibility in Google Maps and local search results through Google Business Profile optimization, local citations, location pages, and reputation management, helping nearby customers find your business."
      },
      {
        "q": "How can I find reliable SEO services near me?",
        "a": "When searching for SEO services near me, choose an agency with proven SEO experience, measurable results, transparent reporting, ethical optimization practices, and customized strategies focused on your industry, competitors, and long-term business growth."
      },
      {
        "q": "What is included in your custom website SEO services?",
        "a": "Our custom website SEO services include SEO audits, keyword research, technical SEO, schema markup, on-page optimization, off-page SEO, content optimization, local SEO improvements, performance tracking, and ongoing strategy refinement."
      },
      {
        "q": "How long does SEO take to produce results?",
        "a": "SEO timelines vary depending on your competition, website condition, and industry. Most US businesses begin seeing measurable improvements within a few months as technical fixes, content optimization, and authority-building efforts strengthen their search visibility."
      }
    ],
    "strategicApproach": [
      {
        "title": "Local SEO Strategies That Drive Visibility",
        "desc": "Our Local SEO Services across the US help your business appear in Google Search and Maps when nearby customers are looking for your products or services. We optimize your Google Business Profile, local citations, NAP consistency, location pages, and location-specific keywords to improve rankings and drive more qualified local leads."
      },
      {
        "title": "Custom Website SEO Services",
        "desc": "Every business has unique goals and challenges. Our custom website SEO services are tailored to your industry, competition, and target audience. We optimize your website architecture, content, internal linking, and user experience to improve rankings, improve user experience, and maximize conversions."
      },
      {
        "title": "Technical, On-Page & Off-Page SEO",
        "desc": "We deliver complete SEO solutions by combining on-page and off-page SEO services and technical SEO. From optimizing page titles, metadata, and content to improving Core Web Vitals, fixing crawl errors, improving XML sitemaps, robots.txt, and indexing, and building high-quality backlinks, we strengthen every ranking factor that supports sustainable organic growth."
      },
      {
        "title": "Transparent Reporting & Continuous Optimization",
        "desc": "SEO is an ongoing process. We continuously monitor keyword rankings, Google Search Console insights, organic traffic, user behavior, and conversions using Google Analytics and Google Search Console. With regular reporting and continuous optimization, we refine your SEO strategy to keep your business competitive in the US market."
      }
    ],
    "process": [
      {
        "n": "01",
        "t": "SEO Audit & Opportunity Analysis",
        "d": "We evaluate your website, your competitors, keyword opportunities, competitor gaps, and technical performance to identify ranking improvements that can drive more qualified traffic."
      },
      {
        "n": "02",
        "t": "Strategy & Optimization Plan",
        "d": "Our SEO specialists create a customized roadmap based on your industry, customer search behavior, and business goals throughout the US."
      },
      {
        "n": "03",
        "t": "Implementation & Technical Optimization",
        "d": "We implement technical SEO improvements, optimize on-page content, improve website speed and Core Web Vitals, and strengthen local search visibility for US customers."
      },
      {
        "n": "04",
        "t": "Monitor, Refine & Grow",
        "d": "SEO is an ongoing process. We continuously monitor rankings, traffic, user behavior, and conversions while refining your strategy to maintain long-term growth."
      }
    ],
    "industries": [
      "Healthcare & Medical Practices",
      "Law Firms",
      "Financial Services",
      "Real Estate Agencies",
      "Insurance Companies",
      "Retail Businesses",
      "Home Service Companies",
      "HVAC & Plumbing",
      "Construction Companies",
      "Automotive Businesses",
      "Hospitality",
      "Education",
      "SaaS Companies",
      "Professional Services",
      "E-commerce Businesses"
    ],
    "locations": [
      "Northeast",
      "Southeast",
      "Midwest",
      "Southwest",
      "West Coast",
      "Nationwide (Remote)",
      "Buffalo",
      "Rochester",
      "Syracuse",
      "Albany",
      "Yonkers",
      "White Plains",
      "Long Island"
    ],
    "image": "/images/blog_seo.png",
    "tone": "linear-gradient(135deg,#0a1628,#1a2a4a)"
  },
  "new-york-social-media-services": {
      "title": "Social Media Marketing Services",
    "eyebrow": "02 SOCIAL MEDIA",
    "intro": "US businesses struggle to stand out in a crowded digital market, reach the right customers, and turn social engagement into real growth. Ajumi AI helps brands increase visibility, attract qualified leads, and build stronger customer connections through strategic content, social media management, and performance-driven campaigns across Facebook, Instagram, LinkedIn, TikTok, YouTube, X (Twitter), and Pinterest.",
    "overviewHeading": "Social Media Strategies Built for US Businesses",
    "overviewText": "America's competitive business environment demands more than occasional posting. Ajumi AI provides Social Media Strategy Services tailored to your industry, audience, competitors, and business goals. We help US businesses increase brand visibility, boost engagement, and turn social media into a consistent source of leads and growth. From startups to established companies, our Social Media Management Services help brands build a stronger online presence, connect with customers, and succeed across today's leading social platforms.",
    "what": [
      "Create customized social media strategies aligned with your business goals",
      "Develop engaging social media content plans for US audiences",
      "Manage Facebook and Instagram marketing campaigns focused on reach and conversions",
      "Build LinkedIn marketing strategies for B2B networking and lead generation",
      "Create TikTok and YouTube campaigns to increase audience reach",
      "Optimize X (Twitter) and Pinterest marketing for stronger brand awareness",
      "Manage targeted Social Media Advertising Services to reach ideal customers",
      "Monitor audience behavior, engagement, and campaign performance",
      "Provide detailed reporting and insights to improve future campaigns"
    ],
    "deliverables": [
      {
        "title": "Facebook Marketing Services",
        "desc": "Our Facebook marketing services help US businesses reach targeted audiences through strategic content, community engagement, and conversion-focused advertising campaigns. We create Facebook strategies designed to increase brand awareness, customer interactions, and qualified leads."
      },
      {
        "title": "Instagram Marketing Services",
        "desc": "Our Instagram marketing services help brands build a powerful visual presence through creative content, reels, stories, paid promotions, and audience engagement strategies. We help US businesses connect with customers and increase visibility through Instagram."
      },
      {
        "title": "LinkedIn Marketing Services",
        "desc": "Our LinkedIn Marketing Services help businesses strengthen professional relationships, increase industry authority, and generate B2B leads. We create LinkedIn strategies focused on connecting with decision-makers and building business credibility."
      },
      {
        "title": "TikTok Marketing Services",
        "desc": "Our TikTok marketing services help brands reach new audiences through engaging short-form videos, trend-based strategies, creative campaigns, and audience-focused content designed for higher visibility."
      },
      {
        "title": "X (Twitter) Marketing Services",
        "desc": "Our X (Twitter) Marketing Services help businesses improve customer communication, participate in industry conversations, and increase brand visibility through strategic content and community engagement."
      },
      {
        "title": "YouTube Marketing Services",
        "desc": "Our YouTube marketing services help businesses grow through video content strategies, channel optimization, audience targeting, and campaigns designed to increase engagement and brand awareness."
      },
      {
        "title": "Pinterest Marketing Services",
        "desc": "Our Pinterest marketing services help businesses improve online discovery through visual content strategies, optimized pins, and campaigns that attract users through Pinterest search."
      }
    ],
    "kpis": [
      {
        "value": "50%+",
        "label": "Stronger Audience Engagement Through Targeted Content Strategies"
      },
      {
        "value": "3x",
        "label": "More Growth Opportunities With Data-Driven Social Campaigns"
      },
      {
        "value": "24/7",
        "label": "Social Monitoring and Community Engagement Support"
      },
      {
        "value": "100%",
        "label": "Customized Social Media Strategies Built Around Business Goals"
      }
    ],
    "caseStudy": {
      "title": "Building Stronger Customer Connections Through Ajumi AI Social Media",
      "metric": "45,000+ Hours Saved Annually",
      "desc": "Ajumi AI provides social media growth services. US businesses use to expand their audience, improve engagement, and build stronger customer relationships. Our approach combines audience research, Social Media Content Creation Services, platform management, paid advertising, and performance analysis to help US brands achieve consistent growth across digital channels."
    },
    "faqs": [
      {
        "q": "What are social media marketing services across the US?",
        "a": "Social Media Marketing Services helps businesses improve their online presence, engage customers, and generate leads through platforms like Facebook, Instagram, LinkedIn, TikTok, YouTube, X (Twitter), and Pinterest. These services include strategy development, content creation, social media management, advertising, and performance optimization."
      },
      {
        "q": "Why does my business need social media marketing?",
        "a": "The US has some of the most competitive business markets in the world. A strong social media strategy helps businesses increase visibility, connect with local customers, build trust, and compete effectively online."
      },
      {
        "q": "What is included in social media management services?",
        "a": "Social media management includes content planning, posting, audience engagement, community management, campaign monitoring, analytics tracking, and ongoing optimization across social platforms."
      },
      {
        "q": "Do you provide social media advertising services?",
        "a": "Yes. Ajumi AI provides social media advertising services that help businesses reach targeted audiences through paid campaigns on Facebook, Instagram, LinkedIn, TikTok, YouTube, and other platforms."
      },
      {
        "q": "How can social media content creation services help my business?",
        "a": "Social Media Content Creation Services help businesses maintain consistent branding, create engaging posts, improve customer interactions, and communicate their value effectively across social media channels."
      },
      {
        "q": "Which social media platforms do you manage?",
        "a": "We manage Facebook, Instagram, LinkedIn, TikTok, X (Twitter), YouTube, and Pinterest based on your audience, industry, and marketing goals."
      },
      {
        "q": "How long does it take to see social media marketing results?",
        "a": "Results depend on your industry, audience, campaign goals, content strategy, and advertising investment. Consistent management and optimization help businesses achieve long-term social media growth."
      }
    ],
    "strategicApproach": [
      {
        "title": "Data-Driven Social Media Strategies",
        "desc": "Build a stronger online presence with customized social media strategies based on audience behavior, industry trends, and business goals. We use performance insights to create campaigns that improve reach, engagement, and customer connections."
      },
      {
        "title": "Creative Content That Drives Engagement",
        "desc": "Capture audience attention with platform-specific content designed around your brand identity and customer interests. Our Social Media Content Creation Services help US businesses maintain consistent messaging, increase interactions, and strengthen their digital presence."
      },
      {
        "title": "Targeted Campaign Optimization",
        "desc": "Reach potential customers more effectively with optimized Social Media Advertising Services focused on audience targeting, campaign tracking, and continuous improvement. We refine paid campaigns to maximize engagement, leads, and marketing performance."
      },
      {
        "title": "Consistent Brand Growth Across Platforms",
        "desc": "Maintain a strong and recognizable brand presence across Facebook, Instagram, LinkedIn, TikTok, YouTube, X (Twitter), and Pinterest. Our social media management approach helps businesses build long-term relationships with customers and grow sustainably."
      }
    ],
    "process": [
      {
        "n": "01",
        "t": "Audience & Platform Research",
        "d": "We analyze your business, competitors, customers, and industry trends to identify the platforms and content strategies that can deliver the strongest results."
      },
      {
        "n": "02",
        "t": "Strategy & Content Development",
        "d": "Our team creates customized social media strategy services. US businesses need, including content calendars, campaign ideas, messaging frameworks, and platform-specific strategies."
      },
      {
        "n": "03",
        "t": "Campaign Management & Optimization",
        "d": "We manage organic and paid campaigns by monitoring performance, improving audience targeting, testing content, and optimizing campaigns for better results."
      },
      {
        "n": "04",
        "t": "Measure, Improve & Scale",
        "d": "Through detailed reporting and performance analysis, we identify opportunities to improve engagement, increase conversions, and scale your social media presence."
      }
    ],
    "industries": [
      "Healthcare & Medical Practices",
      "Law Firms",
      "Financial Services",
      "Real Estate Agencies",
      "Insurance Companies",
      "Retail Businesses",
      "Home Service Companies",
      "HVAC & Plumbing",
      "Construction Companies",
      "Automotive Businesses",
      "Hospitality",
      "Education",
      "SaaS Companies",
      "Professional Services",
      "E-commerce Businesses"
    ],
    "locations": [
      "Northeast",
      "Southeast",
      "Midwest",
      "Southwest",
      "West Coast",
      "Nationwide (Remote)",
      "Buffalo",
      "Rochester",
      "Syracuse",
      "Albany",
      "Yonkers",
      "White Plains",
      "Long Island"
    ],
    "image": "/images/blog_brand.png",
    "tone": "linear-gradient(135deg,#0a1628,#1a2a4a)"
  },
  "new-york-paid-ads-services": {
      "title": "Performance-Driven Paid Advertising Services in NY",
    "eyebrow": "03 PAID ADVERTISING",
    "intro": "US businesses face rising ad costs, intense competition, and wasted budgets from campaigns that fail to reach the right customers. Ajumi AI provides paid advertising services across the US that improve targeting, reduce wasted spend, and connect businesses with high-intent customers through Google Ads, Meta Ads, LinkedIn Ads, YouTube Ads, and more.",
    "overviewHeading": "Performance-Focused Paid Advertising Campaigns Built Around Your Goals Across the US",
    "overviewText": "Every business has different customers, competition levels, and growth goals. Our PPC (Pay-Per-Click) Advertising Services across the US are customized to generate qualified leads, increase sales, improve brand visibility, and maximize your advertising investment. Ajumi AI develops targeted advertising strategies for US businesses using audience research, conversion tracking, and continuous optimization. From Google Ads Management Services to Display Advertising Services and Remarketing & Retargeting Services, we help companies improve campaign performance, lower acquisition costs, and create measurable customer acquisition strategies.",
    "what": [
      "Create and manage PPC campaigns focused on qualified traffic and conversions",
      "Develop Google Ads campaigns for lead generation and customer acquisition",
      "Build Display Advertising campaigns to increase brand awareness",
      "Implement Remarketing & Retargeting Services to re-engage potential customers",
      "Manage Facebook & Instagram ad campaigns for engagement and sales",
      "Optimize LinkedIn Ads Management Services for B2B lead generation",
      "Launch YouTube Ads Management Services to reach targeted audiences",
      "Manage Microsoft (Bing) Ads Management Services for additional search visibility",
      "Track campaign performance with analytics, conversion tracking, and detailed reporting"
    ],
    "deliverables": [
      {
        "title": "Google Ads Management Services",
        "desc": "Launch and optimize high-performing Google Ads campaigns designed around local search behavior, customer intent, and business goals. Our Google Ads Management Services focus on improving visibility, driving qualified traffic, and generating measurable leads through data-backed keyword strategies and conversion optimization."
      },
      {
        "title": "Meta Ads Management Services",
        "desc": "Reach your ideal customers with Meta Ads Management Services designed for Facebook and Instagram campaigns. We create targeted audience strategies, test creative variations, and optimize campaigns to improve engagement, customer acquisition, and sales performance."
      },
      {
        "title": "Facebook & Instagram Ads Services",
        "desc": "Engage targeted audiences with Facebook & Instagram Ads services that combine platform-native creative, precise audience segmentation, and data-driven optimization to increase brand awareness and drive conversions."
      },
      {
        "title": "LinkedIn Ads Management Services",
        "desc": "Generate valuable B2B opportunities with LinkedIn Ads Management Services that connect US businesses with decision-makers and professional audiences. Our campaigns focus on precise targeting, lead generation, and continuous optimization."
      },
      {
        "title": "YouTube Ads Management Services",
        "desc": "Build brand awareness and increase customer engagement with YouTube Ads Management Services that use targeted video advertising strategies. We help businesses reach relevant audiences at important stages of the customer journey."
      },
      {
        "title": "Microsoft (Bing) Ads Management Services",
        "desc": "Expand your search visibility with Microsoft (Bing) Ads management services that capture additional customer opportunities, improve audience reach, and support cost-effective lead generation campaigns."
      }
    ],
    "kpis": [
      {
        "value": "40%+",
        "label": "Improved Budget Efficiency Through Campaign Optimization"
      },
      {
        "value": "3x",
        "label": "More Opportunities From Targeted Audience Reach"
      },
      {
        "value": "24/7",
        "label": "Campaign Monitoring and Performance Tracking"
      },
      {
        "value": "100%",
        "label": "Data-Driven Advertising Strategies Built Around Goals"
      }
    ],
    "caseStudy": {
      "title": "Helping US Businesses Generate Better Results Through Ajumi AI Advertising",
      "metric": "45,000+ Hours Saved Annually",
      "desc": "Ajumi AI helps US businesses build smarter advertising campaigns that improve visibility, reduce wasted budget, and generate better customer acquisition results. From PPC management and display advertising to remarketing campaigns, we use performance-focused strategies to reach customers throughout the buying journey."
    },
    "faqs": [
      {
        "q": "What are paid advertising services across the US?",
        "a": "Paid advertising services across the US are digital marketing solutions that help businesses reach targeted customers through paid campaigns across search engines, social media platforms, and display networks. These services include PPC advertising, Google Ads, Meta Ads, LinkedIn Ads, YouTube Ads, and remarketing campaigns designed to generate measurable business results."
      },
      {
        "q": "How do PPC (Pay-Per-Click) advertising services across the US work?",
        "a": "PPC (Pay-Per-Click) Advertising Services across the US allow businesses to display targeted ads and pay when users interact with them. Campaign success depends on keyword research, audience targeting, conversion tracking, ad testing, and continuous optimization to improve advertising performance."
      },
      {
        "q": "Do you provide e-commerce PPC services?",
        "a": "Yes. Our E-commerce PPC Services help US online stores increase product visibility, attract high-intent shoppers, optimize shopping campaigns, and improve sales performance through data-driven advertising strategies."
      },
      {
        "q": "Can you help with local PPC advertising services across the US?",
        "a": "Yes. Our Local PPC Advertising Services helps businesses reach nearby customers through location-based targeting, local search campaigns, and optimized advertisements that drive calls, visits, and customer inquiries."
      },
      {
        "q": "Which advertising platforms do you manage?",
        "a": "Ajumi AI manages advertising campaigns across Google Ads, Meta Ads, Facebook & Instagram Ads, LinkedIn Ads, YouTube Ads, Microsoft (Bing) Ads, and display advertising networks based on your audience, industry, and business objectives."
      },
      {
        "q": "How do you measure paid advertising campaign success?",
        "a": "We measure paid advertising performance through key metrics including conversions, cost per lead, customer acquisition cost, click-through rate, conversion rate, and return on ad spend (ROAS). These insights help identify opportunities to improve campaign results."
      },
      {
        "q": "How long does it take to see results from paid advertising?",
        "a": "Campaign timelines vary based on industry competition, advertising budget, target audience, and business goals. Many campaigns begin collecting performance data quickly, while continuous optimization improves efficiency and results over time."
      }
    ],
    "strategicApproach": [
      {
        "title": "Data-Driven Advertising Strategies",
        "desc": "Build smarter campaigns with audience research, market insights, and performance analysis. Our data-focused approach helps US businesses improve targeting, increase ad relevance, and make decisions based on measurable campaign results."
      },
      {
        "title": "Advanced Campaign Optimization",
        "desc": "Improve campaign performance through continuous testing, monitoring, and refinement. We optimize keywords, audiences, creatives, bidding strategies, and campaign structures to reduce wasted spend and improve return on advertising investment."
      },
      {
        "title": "Multi-Platform Advertising Expertise",
        "desc": "Reach customers across the platforms they use most. Our paid advertising specialists manage Google Ads, Meta Ads, LinkedIn Ads, YouTube Ads, Microsoft Ads, and display campaigns to create a complete customer acquisition strategy."
      },
      {
        "title": "Transparent Performance Tracking",
        "desc": "Understand exactly how your campaigns are performing with detailed analytics, conversion tracking, and reporting. We provide clear insights into clicks, leads, conversions, and ROI to help your business achieve sustainable advertising growth."
      }
    ],
    "process": [
      {
        "n": "01",
        "t": "Strategy & Audience Research",
        "d": "We analyze your US market, competitors, customer behavior, and search intent to create advertising strategies that connect your brand with the right audience at the right stage of the buying journey."
      },
      {
        "n": "02",
        "t": "Campaign Setup & Optimization",
        "d": "We build structured advertising campaigns with targeted keywords, audience segmentation, compelling ad creatives, conversion tracking, and landing page alignment to improve campaign performance."
      },
      {
        "n": "03",
        "t": "Tracking & Performance Management",
        "d": "We monitor campaign performance using analytics platforms, CRM integrations, and conversion tracking tools to measure leads, conversions, cost efficiency, and return on ad spend."
      },
      {
        "n": "04",
        "t": "Optimize & Scale Results",
        "d": "We continuously test, refine, and improve campaigns by adjusting targeting, messaging, and budgets to increase efficiency and help US businesses achieve sustainable growth."
      }
    ],
    "industries": [
      "Healthcare & Medical Practices",
      "Law Firms",
      "Financial Services",
      "Real Estate Agencies",
      "Insurance Companies",
      "Retail Businesses",
      "Home Service Companies",
      "HVAC & Plumbing",
      "Construction Companies",
      "Automotive Businesses",
      "Hospitality",
      "Education",
      "SaaS Companies",
      "Professional Services",
      "E-commerce Businesses"
    ],
    "locations": [
      "Northeast",
      "Southeast",
      "Midwest",
      "Southwest",
      "West Coast",
      "Nationwide (Remote)",
      "Buffalo",
      "Rochester",
      "Syracuse",
      "Albany",
      "Yonkers",
      "White Plains",
      "Long Island"
    ],
    "image": "/images/blog_paid.png",
    "tone": "linear-gradient(135deg,#0a1628,#1a2a4a)"
  },
 "new-york-crm-services": {
    "title": "CRM Services That Drive Growth",
    "eyebrow": "08 CRM Services",
    "intro": "Disconnected systems, scattered customer data, and time-consuming manual processes can limit growth in America's competitive business environment. Ajumi AI provides CRM Services US businesses rely on to centralize customer information, automate workflows, and improve sales operations with scalable CRM solutions.",
    "overviewHeading": "CRM Solutions Designed Around Your Business Processes",
    "overviewText": "The right CRM system gives US businesses a centralized platform to manage leads, customers, sales activities, and customer interactions. With competitive markets in every region of the US, companies need connected CRM systems to improve productivity, customer insights, and revenue opportunities. Ajumi AI creates scalable CRM solutions tailored to your workflows and growth objectives. We analyze your existing processes, recommend the right CRM platform, implement automation solutions, and connect your business tools to improve visibility across sales, marketing, and customer support teams.",
    "what": [
      "Develop CRM strategies aligned with your business goals",
      "Deliver CRM Consulting Services for planning and system optimization",
      "Provide CRM Implementation Services with secure setup and optimized workflows",
      "Build CRM Automation Services to streamline repetitive processes",
      "Customize CRM features for sales, marketing, and customer support",
      "Deliver CRM Integration Services with business applications, APIs, and existing platforms",
      "Improve lead management, customer tracking, and reporting",
      "Increase user adoption with training and ongoing support",
      "Monitor CRM performance for continuous optimization",
      "Configure dashboards and sales performance reporting"
    ],
    "deliverables": [
      {
        "title": "CRM Integration Services",
        "desc": "Connect your CRM with ERP systems, marketing platforms, communication tools, payment solutions, and third-party applications used by modern US businesses. Our CRM Integration Services create a connected business environment, eliminate data silos, and improve operational efficiency across your organization."
      },
      {
        "title": "CRM Migration Services",
        "desc": "Upgrade your existing CRM system with secure and seamless CRM Migration Services. We transfer customer records, workflows, sales data, and historical information while ensuring accurate data mapping, minimal downtime, and a smooth transition to your new CRM platform."
      },
      {
        "title": "CRM Customization Services",
        "desc": "Every business has unique operational requirements. Our CRM Customization Services adapt CRM platforms to match your workflows by customizing dashboards, modules, fields, reports, permissions, and automation processes that improve productivity."
      },
      {
        "title": "CRM Development Services",
        "desc": "Build a CRM solution designed specifically for your business requirements, workflows, and customer management goals. Our CRM Development Services include custom CRM modules, automated workflows, reporting dashboards, and integrations that support better customer management and business growth."
      },
      {
        "title": "CRM Setup & Configuration Services",
        "desc": "Start with a CRM system built for success. Our CRM Setup & Configuration Services include platform setup, user permissions, sales pipeline configuration, automation rules, integrations, and reporting setup to help your team operate efficiently from day one."
      }
    ],
    "kpis": [
      {
        "value": "70%+",
        "label": "Less Manual Work Through Intelligent CRM Automation"
      },
      {
        "value": "2X",
        "label": "Faster Customer Response With Streamlined CRM Workflows"
      },
      {
        "value": "24/7",
        "label": "Reliable CRM Monitoring and Operational Support"
      },
      {
        "value": "100%",
        "label": "CRM Strategies Customized for Your Business Goals"
      }
    ],
    "caseStudy": {
      "title": "Smarter Customer Management Powered by Ajumi AI CRM Services",
      "metric": "45,000+ Hours Saved Annually",
      "desc": "Ajumi AI delivers professional CRM Services US companies use it to simplify operations, automate customer management, and improve business relationships. Through advanced CRM consulting, automation, implementation, and management solutions, we help US businesses create efficient sales processes, improve collaboration, and deliver better customer experiences."
    },
    "faqs": [
      {
        "q": "What are CRM services?",
        "a": "CRM services help US businesses organize customer information, automate sales and support activities, improve collaboration, and strengthen customer relationships through centralized CRM platforms."
      },
      {
        "q": "What are CRM integration services?",
        "a": "CRM integration services connect your CRM with tools such as email marketing platforms, ERP systems, accounting software, communication applications, and business tools to ensure seamless data flow."
      },
      {
        "q": "How long does CRM implementation take?",
        "a": "The timeline depends on your business size, CRM platform, required integrations, data migration needs, and customization requirements. Basic implementations may take a few weeks, while larger systems require detailed planning and configuration."
      },
      {
        "q": "Why are CRM customization services important?",
        "a": "Every business operates differently. CRM customization services allow companies to tailor dashboards, workflows, reports, pipelines, and automation features to match their specific processes and improve team productivity."
      },
      {
        "q": "Can you migrate data from my existing CRM?",
        "a": "Yes. Our CRM migration services securely transfer customer records, contacts, sales information, and historical data while maintaining accuracy and reducing business disruption."
      },
      {
        "q": "Which businesses benefit from CRM services?",
        "a": "CRM solutions benefit startups, small businesses, enterprises, healthcare organizations, law firms, real estate companies, financial services, e-commerce brands, and other US businesses managing customer relationships."
      },
      {
        "q": "Do you provide CRM setup and ongoing support?",
        "a": "Yes. Ajumi AI provides CRM setup & configuration services, user training, optimization, and ongoing CRM management services that US businesses need to maintain efficient CRM operations."
      },
      {
        "q": "Which CRM platforms do you support?",
        "a": "We support leading CRM platforms and develop customized CRM solutions based on your business requirements, workflows, and integration needs. Our team helps US businesses select, implement, customize, integrate, and manage CRM systems that support long-term growth."
      }
    ],
    "strategicApproach": [
      {
        "title": "Improved Customer Relationship Management",
        "desc": "Create stronger customer connections with centralized CRM systems that organize customer information, track interactions, and provide valuable insights. Our CRM solutions help US businesses deliver more personalized experiences while improving communication across teams."
      },
      {
        "title": "Automated Sales & Business Workflows",
        "desc": "Our CRM Automation Services help businesses automate follow-ups, lead management, notifications, reporting, and daily workflows so teams can focus on higher-value activities."
      },
      {
        "title": "Flexible CRM Solutions That Scale",
        "desc": "Whether you are a growing startup or an established enterprise, our CRM solutions adapt to your changing business needs. We provide scalable CRM platforms that support new users, expanding operations, additional integrations, and evolving customer management requirements."
      },
      {
        "title": "Secure & Reliable CRM Management",
        "desc": "Keep your customer data protected with secure CRM configurations, controlled access, reliable integrations, and ongoing system monitoring. Our CRM Management Services across the US ensure your CRM remains optimized, secure, and aligned with your long-term business objectives."
      }
    ],
    "process": [
      {
        "n": "01",
        "t": "Business & System Assessment",
        "d": "We analyze your business processes, customer journey, sales operations, and existing technology environment to identify CRM requirements, automation opportunities, and integration needs for your business."
      },
      {
        "n": "02",
        "t": "CRM Design & Implementation",
        "d": "Our team delivers complete CRM Implementation Services, including CRM configuration, custom development, integrations, workflow automation, and system setup based on your operational goals."
      },
      {
        "n": "03",
        "t": "Testing & User Enablement",
        "d": "Before launch, we test workflows, validate integrations, migrate required data, and provide team training to ensure your CRM system is reliable, user-friendly, and ready for daily business operations."
      },
      {
        "n": "04",
        "t": "Optimize & Scale",
        "d": "Our ongoing CRM Management Services solutions help businesses improve CRM performance through monitoring, optimization, customization updates, and continuous system enhancements as business needs evolve."
      }
    ],
    "industries": [
      "Healthcare & Medical Practices",
      "Law Firms",
      "Financial Services",
      "Real Estate Agencies",
      "Insurance Companies",
      "Retail Businesses",
      "Home Service Companies",
      "HVAC & Plumbing",
      "Construction Companies",
      "Automotive Businesses",
      "Hospitality",
      "Education",
      "SaaS Companies",
      "Professional Services",
      "E-commerce Businesses"
    ],
    "locations": [
      "Northeast",
      "Southeast",
      "Midwest",
      "Southwest",
      "West Coast",
      "Nationwide (Remote)",
      "Buffalo",
      "Rochester",
      "Syracuse",
      "Albany",
      "Yonkers",
      "White Plains",
      "Long Island"
    ],
    "image": "/images/blog_analytics.png",
    "tone": "linear-gradient(135deg,#0a1628,#1a2a4a)"
  },
  "new-york-ai-automation-services": {
    "title": "AI Automation Services for Businesses Across the US",
    "eyebrow": "04 AI AUTOMATION",
    "intro": "Running a business across the US means managing rising operating costs, increasing customer expectations, and time-consuming manual work. We provide AI Automation Services for Businesses across the US to streamline operations, automate repetitive processes, connect business systems, and improve efficiency so you can reduce costs, increase productivity, and scale with confidence.",
    "overviewHeading": "AI Automation Services Across the US for Smarter Business Operations",
    "overviewText": "Growing a business across the US requires faster, smarter operations. Ajumi AI provides AI Workflow Automation Services across the US that automate lead management, customer support, scheduling, document processing, reporting, and other business workflows. We integrate AI with platforms like Salesforce, HubSpot, Microsoft 365, Slack, Google Workspace, QuickBooks, and NetSuite to streamline operations, improve efficiency, reduce manual work, and help businesses scale with confidence.",
    "what": [
      "AI workflow automation for repetitive business processes",
      "Intelligent document processing and approval workflows",
      "CRM automation for Salesforce, HubSpot, and Microsoft Dynamics",
      "ERP workflow automation and business process optimization",
      "AI-powered customer service automation",
      "Lead qualification and sales automation",
      "Appointment scheduling and follow-up automation",
      "Secure API integrations between business applications",
      "HR and employee onboarding automation",
      "Finance, invoice, and reporting workflow automation",
      "Email and communication automation",
      "End-to-end AI business automation services for growing organizations"
    ],
    "deliverables": [
      {
        "title": "Intelligent Workflow Automation",
        "desc": "Replace repetitive manual tasks with intelligent workflows that automate approvals, document routing, notifications, and business processes. Our AI workflow automation services across the US improve productivity, reduce errors, and accelerate daily operations."
      },
      {
        "title": "CRM & Business System Integration",
        "desc": "Connect your CRM, ERP, and business tools to eliminate data silos and create a unified automation ecosystem."
      },
      {
        "title": "AI Customer Support Automation",
        "desc": "Deploy AI-powered business automation services for customer support, lead qualification, appointment scheduling, and personalized customer engagement."
      },
      {
        "title": "End-to-End Process Automation",
        "desc": "Automate complete business processes across departments with intelligent workflows that improve productivity, visibility, and operational control."
      }
    ],
    "kpis": [
      {
        "value": "40%+",
        "label": "Reduced Manual Workloads"
      },
      {
        "value": "3x",
        "label": "Faster Workflow Completion"
      },
      {
        "value": "24/7",
        "label": "AI-Powered Customer Support"
      },
      {
        "value": "99.9%",
        "label": "Reliable Automation Uptime"
      }
    ],
    "caseStudy": {
      "title": "Why US Businesses Choose AI Automation Services",
      "metric": "45,000+ Hours Saved Annually",
      "desc": "US businesses operate in a highly competitive market where labor costs, customer expectations, and operational efficiency directly impact profitability. Our AI Automation Services for Businesses across the US streamline workflows, reduce manual work, and optimize business operations for sustainable growth."
    },
    "faqs": [
      {
        "q": "What are AI Automation Services for Businesses?",
        "a": "AI Automation Services for Businesses use artificial intelligence to automate repetitive tasks, connect business systems, streamline workflows, and improve operational efficiency while reducing manual effort and operational costs."
      },
      {
        "q": "How can intelligent business automation services improve my operations?",
        "a": "Intelligent Business Automation Services automate approvals, customer support, document processing, lead qualification, reporting, and internal workflows, helping businesses improve efficiency, reduce costs, and deliver faster customer experiences."
      },
      {
        "q": "What types of businesses benefit from End-to-End AI business automation services?",
        "a": "End-to-end AI business automation services benefit startups, SMBs, enterprises, healthcare providers, financial institutions, law firms, manufacturers, logistics companies, retailers, and professional service businesses with repetitive workflows."
      },
      {
        "q": "Can AI automation integrate with my existing business software?",
        "a": "Yes. Our AI automation services for businesses integrate with CRMs, ERPs, Salesforce, HubSpot, Microsoft 365, Slack, Teams, help desk platforms, and custom business applications through secure APIs. This creates connected workflows while minimizing disruption to your existing operations."
      },
      {
        "q": "How long does AI automation implementation take?",
        "a": "Implementation timelines depend on the complexity of your workflows and integrations. Simple automations can be deployed in weeks, while enterprise-wide AI business automation solutions typically require a phased implementation to ensure reliability and scalability."
      }
    ],
    "strategicApproach": [
      {
        "title": "Intelligent Workflow Automation",
        "desc": "Replace repetitive manual tasks with intelligent workflows that automate approvals, document routing, notifications, and business processes. Our AI workflow automation services across the US improve productivity, reduce errors, and accelerate daily operations."
      },
      {
        "title": "Seamless Business System Integration",
        "desc": "Our AI-powered business automation services connect CRM, ERP, accounting, communication, and cloud platforms into one intelligent ecosystem, improving data accuracy, collaboration, and real-time business visibility."
      },
      {
        "title": "Scalable Business Automation Solutions",
        "desc": "As your business grows, your operations should scale effortlessly. Our Business AI automation solutions are designed to automate increasing workloads, support expanding teams, and optimize complex business processes without requiring additional manual resources."
      },
      {
        "title": "Secure End-to-End Process Automation",
        "desc": "Our End-to-End AI Business Automation Services use secure API integrations, encrypted data handling, and role-based access to automate critical workflows while protecting sensitive business information."
      }
    ],
    "process": [
      {
        "n": "01",
        "t": "Business Process Assessment",
        "d": "We evaluate your workflows, identify operational bottlenecks, and uncover automation opportunities that reduce manual work, improve efficiency, and support long-term business growth."
      },
      {
        "n": "02",
        "t": "Automation Strategy & Solution Design",
        "d": "Our specialists design custom business AI automation solutions tailored to your workflows, software stack, compliance requirements, and growth objectives."
      },
      {
        "n": "03",
        "t": "AI Development & System Integration",
        "d": "We implement AI automation, integrate CRM, ERP, communication, and business applications through secure APIs, and thoroughly test every workflow before deployment."
      },
      {
        "n": "04",
        "t": "Continuous Optimization & Scaling",
        "d": "After deployment, we monitor workflow performance, optimize automation processes, and introduce new efficiencies that help your business scale with confidence."
      }
    ],
    "industries": [
      "Healthcare & Medical Practices",
      "Law Firms",
      "Financial Services",
      "Real Estate Agencies",
      "Construction Companies",
      "Manufacturing",
      "Logistics & Transportation",
      "Retail & E-commerce",
      "Professional Services",
      "Education",
      "Hospitality",
      "Marketing Agencies",
      "SaaS Companies",
      "Home Service Businesses",
      "Non-Profit Organizations"
    ],
    "locations": [
      "Northeast",
      "Southeast",
      "Midwest",
      "Southwest",
      "West Coast",
      "Nationwide (Remote)",
      "Buffalo",
      "Rochester",
      "Syracuse",
      "Albany",
      "Yonkers",
      "White Plains",
      "Long Island"
    ],
    "image": "/images/blog_content.png",
    "tone": "linear-gradient(135deg,#0a1628,#1a2a4a)"
  },
  "new-york-ai-calling-services": {
    "title": "AI Calling Services for Businesses Across the US",
    "eyebrow": "05 AI CALLING",
    "intro": "Every missed call can cost your business valuable customers and revenue. Ajumi AI delivers AI Calling Services across the US to automate inbound and outbound calls, qualify leads, schedule appointments, and answer customer inquiries 24/7. Our AI voice agents integrate with your CRM and business systems to reduce costs, improve response times, and ensure every customer call is answered.",
    "overviewHeading": "AI Voice Calling Solutions for Smarter Customer Conversations",
    "overviewText": "US businesses handle thousands of customer interactions every day. Long hold times, missed calls, and repetitive phone tasks can lead to lost sales and poor customer experiences. Our AI Voice Calling Solutions across the US use intelligent AI voice agents to answer calls, qualify leads, schedule appointments, and seamlessly transfer customers to your team when needed. We build customized AI voice solutions that integrate with Salesforce, HubSpot, Microsoft Dynamics, VoIP systems, scheduling platforms, and other business applications to automate conversations, capture every lead, and deliver consistent customer experiences.",
    "what": [
      "Automate inbound and outbound business calls across the US",
      "Deploy intelligent AI Voice Agent Solutions for customer conversations",
      "Qualify leads before transferring them to sales representatives",
      "Schedule appointments through AI Phone Calling Automation",
      "Answer FAQs using natural AI Voice Assistant Solutions",
      "Automatically route calls to the correct department",
      "Integrate AI Call Automation Services with CRM, VoIP, and business software",
      "Support multilingual customer conversations for America's diverse customer base",
      "Generate call transcripts, analytics, and performance insights automatically"
    ],
    "deliverables": [
      {
        "title": "AI Phone Calling Automation",
        "desc": "Automate inbound and outbound phone calls to answer customer inquiries, qualify leads, schedule appointments, send reminders, and reduce repetitive phone tasks. Our AI Phone Calling Automation helps US businesses improve efficiency while ensuring every customer receives prompt assistance."
      },
      {
        "title": "AI Voice Assistant Solutions",
        "desc": "Deploy intelligent AI voice assistant solutions that understand natural conversations, answer customer questions, provide accurate information, and transfer complex requests to live representatives whenever necessary."
      },
      {
        "title": "AI Call Automation Services",
        "desc": "Build customized AI call automation services for lead follow-up, appointment reminders, customer support, payment notifications, order updates, and outbound campaigns. Every workflow is designed around your business processes to improve productivity and customer engagement."
      },
      {
        "title": "AI Voice Bots Services",
        "desc": "Implement scalable AI voice bot services that integrate with your CRM, VoIP phone systems, calendars, scheduling software, and business applications. Our AI voice bots automate conversations while keeping customer information synchronized across your systems."
      }
    ],
    "kpis": [
      {
        "value": "60%+",
        "label": "Reduced Manual Call Handling"
      },
      {
        "value": "3x",
        "label": "Faster Lead Response"
      },
      {
        "value": "24/7",
        "label": "AI Voice Call Availability"
      },
      {
        "value": "99.9%",
        "label": "Reliable AI Call Automation"
      }
    ],
    "caseStudy": {
      "title": "Smarter AI Voice Automation Across US Businesses",
      "metric": "45,000+ Hours Saved Annually",
      "desc": "We help US businesses automate customer calls, reduce missed opportunities, improve response times, and deliver better customer experiences. From healthcare and legal firms to real estate agencies, financial institutions, retail businesses, and service providers, our AI voice automation services streamline communication while integrating seamlessly with existing business systems."
    },
    "faqs": [
      {
        "q": "What are AI Calling Services?",
        "a": "AI calling services use intelligent voice technology to automate inbound and outbound phone conversations. They can answer customer questions, qualify leads, schedule appointments, route calls, and provide support while integrating with your existing business systems."
      },
      {
        "q": "How do AI conversational AI solutions improve customer service?",
        "a": "AI conversational AI solutions respond to customers with natural, human-like conversations, reducing wait times and ensuring every call is answered. They can handle routine inquiries, collect information, and transfer complex requests to your team when needed."
      },
      {
        "q": "Can AI voice automation services integrate with our CRM and phone system?",
        "a": "Yes. Our AI voice automation services integrate with leading CRM platforms, business applications, calendars, and phone systems. This keeps customer records updated automatically and helps your team manage every interaction more efficiently."
      },
      {
        "q": "Which businesses benefit from AI calling services?",
        "a": "AI calling services are ideal for healthcare providers, real estate agencies, law firms, financial services, e-commerce businesses, home service companies, startups, and enterprises that manage high volumes of customer calls."
      },
      {
        "q": "Can AI Calling Services transfer customers to a live agent?",
        "a": "Yes. AI Calling Services can recognize when a customer needs human assistance and instantly transfer the call to the appropriate team member. This creates a smooth customer experience while reducing unnecessary workload for your staff."
      }
    ],
    "strategicApproach": [
      {
        "title": "Intelligent AI Voice Call Automation",
        "desc": "Automate inbound and outbound phone conversations with intelligent AI voice agents that answer customer inquiries, qualify leads, schedule appointments, send reminders, and handle routine requests. Our AI phone calling automation reduces manual workloads while ensuring every customer call is answered promptly."
      },
      {
        "title": "Seamless CRM & Business System Integration",
        "desc": "Our AI call automation services integrate with Salesforce, HubSpot, Microsoft Dynamics, VoIP phone systems, calendars, scheduling platforms, and other business applications. Every customer interaction is automatically synchronized, giving your team complete visibility into calls, leads, and follow-up activities."
      },
      {
        "title": "Scalable AI Voice Agent Solutions",
        "desc": "As your business grows, so does your call volume. Our AI Voice Agent Solutions across the US scale effortlessly to handle customer inquiries, outbound campaigns, appointment scheduling, and support requests without expanding your call center."
      },
      {
        "title": "Secure AI Voice Automation Services",
        "desc": "Our AI Voice Automation Services use secure API integrations, encrypted data transmission, and enterprise-grade security to protect customer information while automating business communications. Every conversation, transcript, and customer interaction is managed securely to support compliance and reliable business operations."
      }
    ],
    "process": [
      {
        "n": "01",
        "t": "Call Process Assessment",
        "d": "We analyze your existing phone workflows, customer inquiries, and business operations to identify automation opportunities that improve efficiency and reduce manual call handling."
      },
      {
        "n": "02",
        "t": "AI Conversation Design",
        "d": "We design natural conversational experiences, call routing logic, and intelligent voice workflows tailored to your business and customer expectations."
      },
      {
        "n": "03",
        "t": "Deployment & Integration",
        "d": "Our team deploys AI voice agent solutions; integrates Salesforce, HubSpot, Microsoft Dynamics, VoIP platforms, scheduling software, and business applications; and then tests every workflow before launch."
      },
      {
        "n": "04",
        "t": "Continuous Optimization",
        "d": "We monitor AI call performance, improve conversation accuracy, optimize call flows, and enhance automation using real customer interactions to maximize business growth."
      }
    ],
    "industries": [
      "Healthcare & Medical Practices",
      "Law Firms",
      "Financial Services",
      "Real Estate Agencies",
      "Insurance Companies",
      "Retail Businesses",
      "Home Service Companies",
      "HVAC & Plumbing",
      "Construction Companies",
      "Automotive Businesses",
      "Hospitality",
      "Education",
      "SaaS Companies",
      "Professional Services",
      "E-commerce Businesses"
    ],
    "locations": [
      "Northeast",
      "Southeast",
      "Midwest",
      "Southwest",
      "West Coast",
      "Nationwide (Remote)",
      "Buffalo",
      "Rochester",
      "Syracuse",
      "Albany",
      "Yonkers",
      "White Plains",
      "Long Island"
    ],
    "image": "/images/blog_email.png",
    "tone": "linear-gradient(135deg,#0a1628,#1a2a4a)"
  },
  "new-york-ai-chatbot-services": {
    "title": "Custom AI Chatbot Services Across the US",
    "eyebrow": "06 AI CHATBOT",
    "intro": "AI Chatbot Services help businesses eliminate missed leads, reduce response times, and automate customer conversations 24/7. Ajumi AI builds custom AI chatbot solutions that qualify leads, answer customer questions, schedule appointments, and improve customer experiences while reducing manual workload.",
    "overviewHeading": "Custom AI Chatbot Development Services Across the US",
    "overviewText": "US businesses manage thousands of customer interactions every day across websites, social media, and digital channels. Our AI Chatbot Development Services are built around your workflows, customer journey, and business goals. We develop Custom AI Chatbot Development Solutions that automate customer support, qualify leads, schedule appointments, answer FAQs, and streamline business operations. At Ajumi AI, we build intelligent AI Customer Support Chatbot Services using conversational AI, NLP, and generative AI. Every chatbot integrates seamlessly with your website, CRM, APIs, booking systems, and existing business software to deliver fast, personalized customer experiences.",
    "what": [
      "Develop Custom AI Chatbot Development Solutions for US businesses",
      "Build intelligent AI Customer Service Chatbots for instant support",
      "Create AI Lead Generation Chatbots to capture and qualify leads",
      "Deliver AI Website Chatbot Services that integrate with existing websites",
      "Connect chatbots with CRMs, APIs, booking platforms, and business software",
      "Build AI Sales Chatbot Solutions to improve conversions",
      "Automate repetitive workflows with AI Chatbot Automation Services",
      "Develop AI Virtual Assistant Solutions for scheduling and customer support",
      "Create multilingual chatbot experiences for America's diverse audience",
      "Continuously optimize chatbot performance through analytics and AI learning"
    ],
    "deliverables": [
      {
        "title": "AI Website Chatbot Services",
        "desc": "Turn website visitors into customers with AI-powered chatbots that answer questions, recommend services, collect contact information, and guide visitors through the buying journey while providing instant assistance 24/7."
      },
      {
        "title": "AI Business Chatbot Solutions",
        "desc": "Automate daily business operations with AI chatbots that manage customer communication, support employees, streamline workflows, and integrate with your existing business systems."
      },
      {
        "title": "Conversational AI Chatbot Services",
        "desc": "Deliver natural, human-like customer conversations using AI that understands intent, answers complex questions, and provides personalized support across multiple digital channels."
      },
      {
        "title": "AI Virtual Assistant Development",
        "desc": "Build intelligent virtual assistants that schedule appointments, answer customer inquiries, automate repetitive tasks, qualify leads, and improve operational efficiency."
      }
    ],
    "kpis": [
      {
        "value": "95%+",
        "label": "Customer Support Tasks Automated"
      },
      {
        "value": "3x",
        "label": "Faster Customer Response Times"
      },
      {
        "value": "24/7",
        "label": "AI-Powered Customer Support Availability"
      },
      {
        "value": "100%",
        "label": "Custom Chatbot Solutions Built"
      }
    ],
    "caseStudy": {
      "title": "Helping Businesses Improve Customer Experience With AI Automation",
      "metric": "45,000+ Hours Saved Annually",
      "desc": "US customers expect instant answers when booking appointments, requesting estimates, or comparing services. Our AI chatbot services help businesses respond faster, reduce support costs, automate repetitive tasks, and improve customer engagement 24/7."
    },
    "faqs": [
      {
        "q": "What are AI chatbot services?",
        "a": "AI Chatbot Services helps businesses automate customer conversations using artificial intelligence, natural language processing (NLP), conversational AI, and workflow automation. They improve customer support, generate leads, schedule appointments, and provide instant responses across websites and digital platforms."
      },
      {
        "q": "How can AI lead generation chatbots help my business?",
        "a": "AI Lead Generation Chatbots engage website visitors, collect customer information, qualify prospects, and route high-quality leads to your sales team automatically, helping US businesses generate more opportunities and improve conversion rates."
      },
      {
        "q": "Can AI chatbot integration services connect with my existing software?",
        "a": "Yes. Our AI Chatbot Integration Services connect with Salesforce, HubSpot, websites, help desks, APIs, scheduling software, payment platforms, and other business tools to automate workflows and improve operational efficiency."
      },
      {
        "q": "What tasks can AI chatbot automation services perform?",
        "a": "AI Chatbot Automation Services can answer FAQs, qualify leads, schedule appointments, process inquiries, provide order updates, automate follow-ups, collect customer information, and reduce repetitive manual work."
      },
      {
        "q": "Are AI chatbots suitable for small businesses?",
        "a": "Absolutely. We build AI customer service chatbots for startups, small businesses, and enterprises across the US. Every chatbot is customized to match your business size, industry, and customer needs."
      },
      {
        "q": "Can AI chatbots provide human-like conversations?",
        "a": "Yes. Our Conversational AI Chatbot Services use generative AI, natural language processing, and machine learning to understand customer intent and deliver natural conversations."
      },
      {
        "q": "How long does it take to develop and launch an AI chatbot?",
        "a": "The timeline depends on your project scope, integrations, and required features. Basic chatbots can be launched in a few weeks, while advanced AI chatbot solutions with custom workflows and integrations typically require additional development time."
      }
    ],
    "strategicApproach": [
      {
        "title": "Intelligent Customer Conversations",
        "desc": "Deliver instant, human-like interactions with AI-powered chatbots that understand customer intent, answer questions, recommend services, and provide accurate responses 24/7. Our conversational AI helps US businesses improve engagement while reducing response times."
      },
      {
        "title": "Seamless Business System Integration",
        "desc": "Our AI chatbot integration services connect with websites, Salesforce, HubSpot, CRMs, scheduling platforms, APIs, help desks, and business software to automate workflows and synchronize customer data."
      },
      {
        "title": "Scalable AI Chatbot Solutions",
        "desc": "Whether you're a startup or an enterprise, our custom AI chatbot development solutions scale with your business. From handling increased customer inquiries to supporting multiple departments and locations, your chatbot grows as your business expands."
      },
      {
        "title": "Secure AI Chatbot Automation",
        "desc": "Protect customer data with secure AI chatbot solutions built using encrypted integrations, secure APIs, role-based access, and enterprise-grade security practices. We ensure every conversation and automated workflow supports reliable, compliant, and secure business operations."
      }
    ],
    "process": [
      {
        "n": "01",
        "t": "Discovery & Business Analysis",
        "d": "We evaluate your business, customer journey, workflows, and objectives to build the right AI chatbot strategy."
      },
      {
        "n": "02",
        "t": "Chatbot Design & Development",
        "d": "Our developers build customized AI chatbots with intelligent conversations, automated workflows, and business-specific functionality."
      },
      {
        "n": "03",
        "t": "Integration & Deployment",
        "d": "We connect your chatbot with websites, CRMs, APIs, payment platforms, scheduling tools, and business systems for seamless automation."
      },
      {
        "n": "04",
        "t": "Optimize & Improve Performance",
        "d": "We monitor chatbot conversations, analyze customer interactions, improve AI responses, and continuously optimize performance for better business outcomes."
      }
    ],
    "industries": [
      "Healthcare & Medical Practices",
      "Law Firms",
      "Financial Services",
      "Real Estate Agencies",
      "Insurance Companies",
      "Retail Businesses",
      "Home Service Companies",
      "HVAC & Plumbing",
      "Construction Companies",
      "Automotive Businesses",
      "Hospitality",
      "Education",
      "SaaS Companies",
      "Professional Services",
      "E-commerce Businesses"
    ],
    "locations": [
      "Northeast",
      "Southeast",
      "Midwest",
      "Southwest",
      "West Coast",
      "Nationwide (Remote)",
      "Buffalo",
      "Rochester",
      "Syracuse",
      "Albany",
      "Yonkers",
      "White Plains",
      "Long Island"
    ],
    "image": "/images/blog_email.png",
    "tone": "linear-gradient(135deg,#0a1628,#1a2a4a)"
  },
  "new-york-website-development-services": {
  "title": "Website Development Services",
    "eyebrow": "WEBSITE DEVELOPMENT",
    "intro": "US businesses need more than just an online presence to compete in today's digital marketplace. Slow websites, outdated designs, and poor user experiences can make it difficult to attract customers and convert visitors into opportunities. Ajumi AI helps US businesses create fast, responsive, and user-focused websites that strengthen brand credibility, improve customer experiences, and support business growth through custom website development, modern designs, and advanced digital solutions.",
    "overviewHeading": "Building Digital Experiences That Move Your Business Forward",
    "overviewText": "America's competitive business environment requires more than a basic website. Ajumi AI delivers customized website development solutions tailored to your industry, audience, and business goals. We build fast, responsive, and conversion-focused websites that improve online visibility, strengthen brand credibility, and turn visitors into customers. From startups and local businesses to established enterprises, our website development services help US businesses create powerful digital experiences and compete with confidence in today's online marketplace.",
    "what": [
      "Create custom websites tailored to your business goals and brand",
      "Develop responsive websites for desktop, tablet, and mobile",
      "Build lead generation and conversion-focused business websites",
      "Develop corporate and e-commerce websites with scalable functionality",
      "Build SEO-friendly WordPress websites and high-converting Shopify stores",
      "Develop fast, interactive React websites and web applications",
      "Optimize website speed, security, and user experience",
      "Integrate CRMs, APIs, payment gateways, and business tools",
      "Provide ongoing website maintenance, updates, and performance optimization"
    ],
    "deliverables": [
      {
        "title": "Custom Website Development Services",
        "desc": "Ajumi AI creates custom websites for US businesses tailored to your brand, goals, and customer needs. We build unique, scalable, and responsive websites that improve user experience and help your business stand out in today's competitive digital market."
      },
      {
        "title": "Business Website Development Services",
        "desc": "We develop business websites that showcase your services, build customer trust, and generate leads. Our solutions focus on simple navigation, responsive design, and growth-focused features that help US businesses strengthen their online presence."
      },
      {
        "title": "Corporate Website Development Services",
        "desc": "Our corporate website development services create professional digital platforms that represent your brand effectively. We focus on secure, scalable, and organized websites for growing businesses and enterprises across the US."
      },
      {
        "title": "E-commerce Website Development Services",
        "desc": "We build e-commerce websites designed to increase sales and improve customer shopping experiences. Our solutions include product management, secure payments, smooth checkout, and conversion-focused features to help US businesses grow online."
      },
      {
        "title": "WordPress Website Development Services",
        "desc": "Ajumi AI develops flexible WordPress websites with custom designs, SEO-friendly structures, and easy content management. We create websites that are fast, responsive, and simple to maintain for businesses looking to expand their digital presence across the US."
      },
      {
        "title": "Shopify Website Development Services",
        "desc": "We create Shopify stores that help businesses sell products online with ease. Our services include store setup, customization, integrations, and optimization for better customer experiences and improved online growth."
      },
      {
        "title": "React Website Development Services",
        "desc": "Our React website development services deliver fast, interactive, and scalable websites. We build modern web solutions with smooth performance, responsive interfaces, and advanced functionality for US businesses seeking powerful digital platforms."
      }
    ],
    "kpis": [
      {
        "value": "50%+",
        "label": "Improved User Engagement Through Optimized Website Experiences"
      },
      {
        "value": "3x",
        "label": "More Growth Opportunities Through Conversion-Focused Website Solutions"
      },
      {
        "value": "24/7",
        "label": "Website Performance Monitoring and Technical Support"
      },
      {
        "value": "100%",
        "label": "Customized Website Development Solutions Based on Business Requirements"
      }
    ],
    "caseStudy": {
      "title": "Building Future-Ready Websites With Ajumi AI Development Solutions",
      "metric": "45,000+ Hours Saved Annually",
      "desc": "Ajumi AI provides website development solutions. US businesses used to build a stronger online presence, improve customer experiences, and create new growth opportunities. Our approach combines strategic planning, modern web design, responsive development, user-focused experiences, and advanced technology to help US brands create high-performing websites that attract visitors, build credibility, and support long-term business growth."
    },
    "faqs": [
      {
        "q": "What are website development services across the US?",
        "a": "Website development services across the US include designing, developing, testing, and maintaining websites that help businesses build a strong online presence. These services include custom websites, business websites, e-commerce stores, WordPress websites, Shopify stores, and React-based solutions. Ajumi AI creates websites tailored to business goals, customer needs, and industry requirements."
      },
      {
        "q": "Why does my business need professional website development services?",
        "a": "A professionally developed website helps US businesses improve credibility, attract customers, and compete in a crowded digital market. A user-friendly website creates better customer experiences and helps convert visitors into valuable business opportunities. Ajumi AI builds websites focused on performance, growth, and measurable results."
      },
      {
        "q": "What is included in custom website development services?",
        "a": "Custom website development services include unique designs, responsive layouts, personalized features, integrations, security solutions, and performance optimization. Ajumi AI develops websites based on your brand identity, business objectives, and customer expectations. Our solutions are built to support long-term growth and scalability."
      },
      {
        "q": "What features are included in e-commerce website development services?",
        "a": "E-commerce website development services include product catalogs, secure payment options, shopping carts, customer accounts, inventory management, and optimized checkout experiences. Ajumi AI creates online stores designed to improve customer experience and increase sales opportunities. Our e-commerce solutions help US businesses grow online."
      },
      {
        "q": "Do you offer WordPress website development services across the US?",
        "a": "Yes, Ajumi AI provides WordPress website development services across the US, including custom designs, theme customization, plugin integration, and SEO-friendly structures. We create flexible WordPress websites that are easy to manage, secure, and optimized for performance. Our solutions help businesses maintain a strong online presence."
      },
      {
        "q": "How long does it take to develop a website?",
        "a": "Website development timelines depend on project complexity, design requirements, features, and integrations. Simple business websites may take less time, while e-commerce platforms and custom web applications require more planning. Ajumi AI follows a structured development process to deliver high-quality websites efficiently."
      }
    ],
    "strategicApproach": [
      {
        "title": "Custom Website Solutions Built Around Business Goals",
        "desc": "Create a website that matches your brand identity, industry requirements, and growth objectives. We develop customized website solutions focused on improving user experience, strengthening credibility, and helping US businesses achieve their digital goals."
      },
      {
        "title": "Responsive Designs That Improve User Experience",
        "desc": "Deliver seamless browsing experiences across desktop, tablet, and mobile devices with responsive website designs. Our development approach focuses on fast performance, easy navigation, and user-friendly layouts that keep visitors engaged."
      },
      {
        "title": "Conversion-Focused Website Development",
        "desc": "Turn website visitors into potential customers with websites designed around business growth. We create strategic layouts, clear user journeys, and optimized features that help businesses generate leads, increase engagement, and improve conversions."
      },
      {
        "title": "Scalable Digital Solutions for Long-Term Growth",
        "desc": "Build a strong digital foundation with secure, flexible, and scalable websites designed to grow with your business. From business websites and e-commerce platforms to custom web applications, our website development solutions help US brands compete effectively in today's digital marketplace."
      }
    ],
    "process": [
      {
        "n": "01",
        "t": "Business & Requirement Analysis",
        "d": "We understand your business goals, target audience, industry, and website requirements to create a clear development plan. Our research helps US businesses build website strategies aligned with their market needs, customer expectations, and growth objectives."
      },
      {
        "n": "02",
        "t": "Website Planning & Design Development",
        "d": "We plan your website structure, user journey, and visual design to create engaging digital experiences. Our focus is on responsive layouts, easy navigation, and brand consistency that helps US businesses connect better with their customers."
      },
      {
        "n": "03",
        "t": "Website Development & Feature Integration",
        "d": "Our developers build high-performing websites using modern technologies, secure features, and seamless integrations. We create scalable solutions that help US businesses improve online performance, generate opportunities, and support long-term growth."
      },
      {
        "n": "04",
        "t": "Testing, Launch & Performance Optimization",
        "d": "We test your website for speed, security, functionality, and device compatibility before launch. After deployment, we provide optimization and support to ensure smooth performance and a reliable digital experience for your customers."
      }
    ],
    "industries": [
      "Healthcare & Medical Practices",
      "Law Firms",
      "Financial Services",
      "Real Estate Agencies",
      "Insurance Companies",
      "Retail Businesses",
      "Home Service Companies",
      "HVAC & Plumbing",
      "Construction Companies",
      "Automotive Businesses",
      "Hospitality",
      "Education",
      "SaaS Companies",
      "Professional Services",
      "E-commerce Businesses"
    ],
    "locations": [
      "Northeast",
      "Southeast",
      "Midwest",
      "Southwest",
      "West Coast",
      "Nationwide (Remote)",
      "Buffalo",
      "Rochester",
      "Syracuse",
      "Albany",
      "Yonkers",
      "White Plains",
      "Long Island"
    ],
    "image": "/images/blog_analytics.png",
    "tone": "linear-gradient(135deg,#0a1628,#1a2a4a)"
  },
};

export async function generateStaticParams() {
  return Object.keys(details).map((slug) => ({ slug }));
}

import { getSeoByPath, getSeoById, buildMetadata, getJsonLdSchema } from "@/lib/seoStore";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const targetPath = `/services/${slug}`;
  const seo = getSeoByPath(targetPath) || getSeoById(`svc-${slug}`) || getSeoById("services");
  if (seo) return buildMetadata(seo) as Metadata;

  const detail = details[slug];
  if (!detail) return { title: "Service — Ajumi AI" };
  return {
    title: `${detail.title} — Ajumi AI`,
    description: detail.intro,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = details[slug];
  if (!detail) notFound();

  const targetPath = `/services/${slug}`;
  const seo = getSeoByPath(targetPath) || getSeoById(`svc-${slug}`);
  const jsonLd = seo ? getJsonLdSchema(seo) : null;

  const allSlugs = Object.keys(details);
  const others = allSlugs.filter((s) => s !== slug).slice(0, 3);

  return (
    <PageShell
      eyebrow={detail.eyebrow}
      title={
        <>
          {detail.title.split(" ")[0]}{" "}
          <span className="text-ember italic">
            {detail.title.split(" ").slice(1).join(" ")}
          </span>
        </>
      }
      intro={detail.intro}
    >
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ServiceContent detail={detail} others={others} allDetails={details} />
      <CTABanner />
    </PageShell>
  );
}
