import type { ProcessStep, Company, PackageItem, Stat } from '@/types'

export const stats: Stat[] = [
  { value: 'Top 1%', description: 'LinkedIn Top Voice in Career Coaching, 2024 & 2025' },
  { value: '100%', description: 'client success rate across the program' },
  { value: '90 days', description: 'or less to results, guaranteed, or your money back' },
  { value: '80+', description: 'verified recommendations & client testimonials' },
]

export const companies: Company[] = [
  { name: 'Lockheed Martin', logo: '/assets/logos/Lockheed-Martin-Logo.jpg' },
  { name: 'Boeing', logo: '/assets/logos/Logo-Boeing.png' },
  { name: 'Raytheon', logo: '/assets/logos/raytheon.png' },
  { name: 'Northrop Grumman', logo: '/assets/logos/Northrop Grumman.png' },
  { name: 'General Dynamics', logo: '/assets/logos/General Dynamics.png' },
  { name: 'Leidos', logo: '/assets/logos/Leidos.png' },
  { name: 'Amentum', logo: '/assets/logos/Amentum.png' },
  { name: 'Booz Allen Hamilton', logo: '/assets/logos/Booz Allen.png' },
  { name: 'KBR', logo: '/assets/logos/KBR.png' },
  { name: 'SAIC', logo: '/assets/logos/SAIC.png' },
  { name: 'Fluor', logo: '/assets/logos/Fluor.png' },
  { name: 'V2X', logo: '/assets/logos/V2X.jpg' },
  { name: 'Airbus', logo: '/assets/logos/airbus_logo.jpg' },
]

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Onboarding',
    description:
      'A weekly one-on-one progress check with your personal AI-enhanced career coach. We set the plan, the targets, and the pace from day one.',
  },
  {
    number: '02',
    title: 'Clarity Call & Marketing Material',
    description:
      'We build a customized career strategy targeting your next role and where you want to be in the future, then create the marketing material to get you there.',
  },
  {
    number: '03',
    title: 'Optimizing with AI',
    description:
      "Optimize your resume and LinkedIn using AI so you're the top candidate in your field, built to beat the ATS and screening tools working against you.",
  },
  {
    number: '04',
    title: 'Networking',
    description:
      'Build genuine relationships with decision-makers and industry insiders who can refer you, open doors to interviews, and access the hidden job market.',
  },
  {
    number: '05',
    title: 'Interview Preparation',
    description:
      'Learn directly from actively hired professionals in the defense industry how to consistently convert interviews into offers.',
  },
  {
    number: '06',
    title: 'Salary Negotiation',
    description:
      'Master negotiation strategies that can put up to an extra $70k in your salary, plus hybrid/remote flexibility, perks, and more.',
  },
]

export const packageItems: PackageItem[] = [
  { text: "Get educated on the AI shaping today's market and exactly what to focus on." },
  { text: 'AI-enhanced marketing material: Resume, LinkedIn, and Cover Letter.' },
  { text: 'Learn how to market yourself so the hidden job market comes to you.', highlight: 'hidden job market' },
  { text: '1-on-1 coaching to properly tailor your resume to beat the ATS and AI.' },
  {
    text: 'Use AI, content, and networking to create inbound opportunities and bypass hundreds to thousands of applicants.',
  },
  {
    text: "Leverage strategies tailored to you, positioning yourself for roles before they're publicly posted.",
  },
]

export const coachSkills = ['Resume & LinkedIn', 'AI / ATS Strategy', 'Interview Prep', 'Salary Negotiation']

export const LINKEDIN_URL = 'https://www.linkedin.com/in/randall-re-ii/'
export const SUPPORT_EMAIL = 'support@ai-careercoaching.com'
