import type { Testimonial } from '@/types'
import { LINKEDIN_URL } from '@/constants/data'

/* Content for Randall Re II's employer portfolio (/randall-re).
   Every value in [BRACKETS] is a placeholder still to be supplied.
   Do not replace a placeholder with a guess. */

// Served from public/. Replace the PDF in place to update the resume without touching code.
export const RESUME_URL = '/assets/randall-resume/Randall-Re-II-Resume.pdf'

// Reuses the profile already linked site-wide.
export const PORTFOLIO_LINKEDIN_URL = LINKEDIN_URL

// Networking call scheduling link (Calendly).
export const NETWORKING_CALL_URL = 'https://calendly.com/ai-enhanced-coaching/networking'

// LinkedIn's standard recommendations page for the profile above. Confirm it opens correctly.
export const RECOMMENDATIONS_URL = `${PORTFOLIO_LINKEDIN_URL}details/recommendations/`

/* Images. null means "not supplied yet"; the page skips that slot.
   TODO: [RANDALL_DEFENSE_GOVCON_PHOTO], [RANDALL_OPERATIONS_SITE_PHOTO] and
   [RANDALL_MILITARY_PHOTO] have no slot on the page yet. */
export const portfolioImages = {
  // [RANDALL_HEADSHOT]: the existing site headshot. Swap if a different one is preferred.
  headshot: '/assets/randall-headshot/Randall Headshot.png',
  // [RANDALL_AI_OR_DASHBOARD_IMAGE]
  aiOrDashboard: null as string | null,
}

export const targetRoles = [
  'Site & Program Management',
  'AI Adoption / Operations Management',
  'BD / Account Management',
]

export const workPreferences = [
  'Florida or Texas preferred',
  'Remote / hybrid considered',
  'Open to travel',
]

export const proofSummary = [
  { value: '33+', description: 'Career recommendations' },
  { value: '20+', description: 'AI / Power BI executive dashboards' },
  { value: 'Defense & GovCon', description: 'Leadership' },
  { value: 'U.S. Navy', description: 'Veteran' },
]

export const capabilities = [
  'Defense & GovCon Leadership',
  'Site & Program Operations',
  'AI Adoption & Process Improvement',
  'Customer & Account Leadership',
  'Systems & Team Leadership',
  'Hiring-Side Perspective',
]

export interface ImpactItem {
  title: string
  text?: string
  result?: string
  supporting?: string
}

/* Approved AI adoption proof points, split into figure + context for display.
   Do not add numbers beyond these five. */
export const aiImpactMetrics = [
  { value: '20+', label: 'AI and Power BI executive dashboards built' },
  { value: '~80%', label: 'Approximate task-time reduction in selected workflows' },
  { value: 'Under 30 min', label: 'Recurring 5 to 6 hour task, reduced' },
  { value: 'Days to hours', label: 'Reporting processes, reduced' },
  { value: 'Under 2 hours', label: 'Some multi-day workflows, reduced' },
]

export const careerImpact: ImpactItem[] = [
  {
    title: 'Program & Contract Performance',
    text: 'Led operational and technical work in defense and government contracting environments with responsibility for execution, customer requirements, risk, mission outcomes, and contract performance.',
    // From Randall's resume (KBR, Acting Site Manager).
    result: '97% customer satisfaction (PAR ratings) and zero power outages as Acting Site Manager at KBR, supporting the contract rebid.',
  },
  {
    title: 'Operational Systems & Team Leadership',
    text: 'Built repeatable systems, workflows, SOPs, reporting structures, accountability mechanisms, and operating rhythms designed to keep teams performing without constant management intervention.',
    // From Randall's resume (Fluor, Operations Manager).
    result: 'Led 15 teams of 250 personnel on a $350M LOGCAP program with 1.2K assets across 12 Middle East bases.',
  },
  {
    title: 'Customer & Account Leadership',
    text: 'Experienced in supporting existing customers, solving operational problems, strengthening relationships, improving contract performance, and connecting customer needs to execution.',
    supporting:
      'Focused on customer retention, account support, contract performance, and relationship-driven growth.',
  },
]

export const leadershipPrinciples = [
  'Build systems that continue working when I am not in the room.',
  'Give people clarity, accountability, and the tools to perform.',
  'Use data and technology to improve decision-making.',
  'Stay focused on mission, customer outcomes, risk, and execution.',
]

export const recommendations: Testimonial[] = [
  {
    featured: true,
    quote:
      'He approached his role with a program-level mindset, focusing on execution, risk management, and overall mission outcomes rather than isolated tasks.',
    name: 'Shelton Young',
    title: "Facilities Manager & Operations Specialist. Randall's former supervisor and friend, worked together in Qatar.",
    initial: 'S',
    avatar: '/assets/randall-recommendations/shelton-young.jpg',
  },
  {
    quote: 'He brings a rare and valuable combination of strategic thinking and technical insight.',
    name: 'Jay Coleman',
    title: 'Site Manager, KBR',
    initial: 'J',
    avatar: '/assets/randall-recommendations/jay-coleman.jpg',
  },
  {
    quote:
      "One of Randall's key strengths lies in his ability to navigate the shift from a reactive mindset to proactive maintenance.",
    name: 'James Leenhouts, MBA',
    title: 'AVP Facilities, Alamance Community College',
    initial: 'J',
    avatar: '/assets/randall-recommendations/james-leenhouts.jpg',
  },
  {
    quote: "Randall's mentorship in navigating the GovCon and Defense IT industry was a great shift in perspective.",
    name: 'Albert Marc',
    title: 'Infrastructure Network & Systems Engineering, Navy Veteran',
    initial: 'A',
    avatar: '/assets/randall-recommendations/albert-marc.jpg',
  },
]

/* Founder figures and bullets come from "AIECC Resume Bullets.txt" (supplied by Randall's team).
   Client salary/offer outcomes from that file are intentionally left out: this page is
   not a coaching pitch. */
export const founderMetrics = [
  { value: '80+', description: 'Paid clients served' },
  { value: '8 to 2', description: 'Team size after AI-enabled workflow redesign' },
  { value: '75%', description: 'Reduction in staffing requirements' },
  { value: '10+', description: 'Operational and client-delivery workflows with AI adoption' },
]

export const founderHighlights = [
  'Led AI adoption across 10+ recurring operational and client-delivery workflows, integrating AI-assisted research, content development, quality assurance, lead management, client support, reporting, and administrative processes to reduce manual workload and increase team capacity.',
  'Designed and managed an end-to-end client operating model spanning 10 lifecycle stages, from lead generation and qualification through sales, onboarding, program delivery, outcome tracking, testimonials, and referrals, creating clearer ownership and standardized execution.',
  'Managed business development and account relationships across 80+ paid clients, overseeing the customer lifecycle from initial qualification and discovery through close, delivery, retention, referrals, and expansion opportunities.',
  'Established KPI tracking, SOPs, quality controls, automation, and after-action review processes across 4+ core operating functions, improving organizational visibility, accountability, consistency, and decision-making.',
]

export const founderCapabilities = [
  'AI-enabled workflows',
  'Operations and process design',
  'Customer delivery',
  'Team management',
  'Marketing and sales systems',
  'Hiring and career strategy',
  'Automation',
  'Business development',
]

export const valueAreas = [
  {
    title: 'Site & Program Management',
    items: [
      'Program execution',
      'Site leadership',
      'Operations',
      'Contract performance',
      'Risk management',
      'Customer requirements',
      'Team leadership',
    ],
  },
  {
    title: 'AI Adoption / Operations Management',
    items: [
      'AI adoption',
      'Workflow improvement',
      'Automation',
      'Dashboards',
      'Operational efficiency',
      'Process redesign',
      'Change implementation',
    ],
  },
  {
    title: 'BD / Account Management',
    items: [
      'Existing customer relationships',
      'Account support',
      'Customer problem solving',
      'Contract performance',
      'Retention',
      'Relationship-driven growth',
      'Cross-functional coordination',
    ],
  },
]
