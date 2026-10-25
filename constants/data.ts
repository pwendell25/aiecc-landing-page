import type {
  ProcessStep,
  Company,
  Stat,
  CaseResult,
  WallTestimonial,
  HeroOutcome,
  Problem,
  Video,
  Faq,
} from '@/types'

export const LINKEDIN_URL = 'https://www.linkedin.com/in/randall-re-ii/'
export const SUPPORT_EMAIL = 'support@ai-careercoaching.com'

export const stats: Stat[] = [
  { value: 'Top 1%', description: 'LinkedIn Top Voice in Career Coaching, 2024 & 2025' },
  { value: '95%', description: 'client success rate across the program' },
  { value: '90 days', description: 'or less to results, guaranteed, or your money back' },
  { value: '80+', description: 'verified recommendations & client testimonials' },
]

/** Short proof points shown under the hero headline. */
export const heroProof: string[] = [
  'U.S. military veteran',
  'LinkedIn Top Voice, top 1%',
  '8,000+ followers',
  '95% success rate',
]

/** Short client results that float around the hero headline. */
export const heroOutcomes: HeroOutcome[] = [
  { result: '$110K offer to $180K', name: 'Deon C.', title: 'SatCom Manager' },
  { result: 'Two offers in six weeks', name: 'Kevin L.', title: 'IT Security Analyst' },
  { result: 'Shortlisted from 2,000+ applicants', name: 'Prior client', title: 'Defense industry' },
  { result: 'Recruiter came to her on LinkedIn', name: 'Verna B.', title: 'Project Manager' },
  { result: 'Launched her own GovCon consultancy', name: 'Connie C.', title: 'CEO, C Clay Consulting' },
  { result: '150% more profile views', name: 'Prior client', title: 'Program professional' },
]

/* ── The hook ─────────────────────────────────────────── */

export const problems: Problem[] = [
  {
    title: 'Your resume disappears into a black hole',
    text: "You apply, you wait, you hear nothing. You're one of 2,000+ applicants, and nothing on the page tells a hiring manager why it should be you.",
  },
  {
    title: "Nobody's reaching out to you",
    text: "Recruiters fill leadership roles with people they already know about. If your profile doesn't signal your level, you're not on their list.",
  },
  {
    title: 'Stalled at the same level',
    text: 'You have the program wins, the P&L, the cleared teams. The ladder above you still stopped moving years ago.',
  },
  {
    title: 'Advice built for the wrong market',
    text: "Generic career services don't understand clearances, recompetes, or how defense and GovCon leadership roles actually get filled.",
  },
]

/* ── The rehook ───────────────────────────────────────── */

export const rehookCase: CaseResult = {
  name: 'Deon C.',
  title: 'Satellite Communications Manager',
  avatar: '/assets/testimonials/deon-c-satcom.jpg',
  problem: "Didn't know his market value. He was ready to take the first offer on the table.",
  action: 'Told him to walk away from the $110K offer, then coached the negotiation from his real market value.',
  result: '$110K to $180K, with 100% of his job criteria met: location, title, and company.',
}

/* ── Who I work with ──────────────────────────────────── */

export const fitFor: string[] = [
  "You know what you're doing isn't working, and you're done guessing.",
  "You treat your career like buying a house: one of the biggest investments you'll ever make.",
  "You're a manager-to-director level leader, or you're on your way there.",
  "You'll do the work. The program is self-paced, and the faster you move, the faster you see results.",
]

export const fitNotFor: string[] = [
  "You're collecting free resources. Tell me which one you want and I'll Google it for you. You probably already have it.",
  "You're waiting until January. Or next year. Or the year after that.",
  'You want someone else to run your job search for you.',
]

/* ── About ────────────────────────────────────────────── */

export const aboutBullets: string[] = [
  'U.S. military veteran',
  '20+ years of defense and GovCon leadership',
  'Hiring manager. He knows what gets a resume shortlisted, and what gets it skipped',
  "Ran 13 roles' worth of work with AI and automation, saving his company up to $1.2M a year in salary",
  'LinkedIn Top Voice in Career Coaching, 2024 and 2025, a top 1% recognition',
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

/* ── The program ──────────────────────────────────────── */

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Onboarding',
    description:
      "Set the plan, targets, and pace with your coach, starting with an AI market briefing: what's shaping hiring right now and exactly what to focus on.",
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
      'Your resume, LinkedIn, and cover letter rebuilt with AI around the roles you want, so you beat the ATS and AI screeners instead of getting filtered out by them.',
  },
  {
    number: '04',
    title: 'Networking',
    description:
      'Get in front of decision-makers before roles are posted. Content, outreach, and referrals that open the hidden job market and let you bypass hundreds of applicants.',
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
      'Master negotiation strategies that can put up to an extra $70K in your salary, plus hybrid/remote flexibility, perks, and more.',
  },
]

/* ── Featured speaker ─────────────────────────────────── */

/** 7 Eagle Academy sessions. A fourth recording is on hold pending Randall's review. */
export const videos: Video[] = [
  { id: 'tEpW11YcWZU', title: '7 Eagle Academy with Randall Re, part 1' },
  { id: '_wbU9w-YrKA', title: '7 Eagle Academy with Randall Re, part 2' },
  { id: 'LdZB5yJpFyw', title: '7 Eagle Academy with Randall Re, part 3' },
]

/* ── Results ──────────────────────────────────────────── */

export const caseResults: CaseResult[] = [
  {
    name: 'Prior client',
    title: 'Defense industry professional',
    problem: 'Resume going down the black hole: one of 2,000+ applicants for a role open two months.',
    action: "Rewrote it around the outcomes this hiring manager screens for, not a list of duties. That's the part AI can't guess for you.",
    result: 'Pulled out of the pile: interviews with the recruiter, COO, and CFO.',
  },
  {
    name: 'Kevin L.',
    title: 'IT Security Operations Analyst',
    problem: 'Six months of applying after the Army. Failing 90% of screenings, zero offers.',
    action: "Stopped the mass applying. Rebuilt his search around fewer, targeted roles and a resume written in a civilian recruiter's language.",
    result: 'Passing almost every screen. Two offers in six weeks.',
  },
  {
    name: 'Verna B.',
    avatar: '/assets/testimonials/verna-b.jpg',
    title: 'Project Manager',
    problem: 'A resume that read like a job description: duties, no results.',
    action: 'Rebuilt it around her accomplishments and the numbers behind them, then aligned her LinkedIn to match.',
    result: 'A recruiter came to her on LinkedIn, for a job she never applied to.',
  },
  {
    name: 'Prior client',
    title: 'Program professional',
    problem: 'Invisible on LinkedIn. Nobody reaching out, nobody seeing the work.',
    action: 'Built a content plan aimed at the people who hire for the role, with AI doing the heavy lifting on drafts.',
    result: 'One post: 150% more profile views, messages, and impressions.',
  },
  {
    name: 'Hannah P.',
    avatar: '/assets/testimonials/hannah-p.webp',
    title: 'Engineering Project Manager, U.S. Army',
    problem: "Military experience civilian recruiters couldn't read. A bland profile nobody stopped on.",
    action: 'Translated her Army record into civilian outcomes, then rebuilt her resume and LinkedIn around them.',
    result: 'More profile views and a fast-growing network.',
  },
  {
    name: 'Connie C.',
    avatar: '/assets/testimonials/connie-c.webp',
    title: 'CEO, C Clay Consulting',
    problem: 'Leaving the Pentagon, unsure what her experience was worth outside government.',
    action: 'Pinned down what she brings and what it is worth, then mapped the business model for her own GovCon consultancy.',
    result: 'Launched her own GovCon consulting firm.',
  },
]

/* ── FAQ ──────────────────────────────────────────────── */

export const faqs: Faq[] = [
  {
    question: 'What does one-to-one coaching cover?',
    answer:
      "Everything in the six steps: your positioning, an AI-rebuilt resume and LinkedIn, networking into the hidden job market, interview prep, and salary negotiation. It's done with you, around the roles you want, not pulled from a template.",
  },
  {
    question: 'How do I start?',
    answer:
      "Message me on LinkedIn and tell me where you're stuck: your current role, where you want to go, and what isn't working. If it looks like a fit, I'll send you a link to book a discovery call.",
  },
  {
    question: "Is this right for me if I'm still employed?",
    answer:
      "Yes. Many clients start while they're still employed. The best time to reposition is while you still have leverage, not after you've lost it.",
  },
  {
    question: 'Do I need to be transitioning from active duty?',
    answer:
      'No. Plenty of clients are veterans, but the program is built for leaders, whether you left the military last year, twenty years ago, or never served.',
  },
  {
    question: 'Is this only for defense and GovCon?',
    answer:
      "Defense and GovCon leaders, manager to director, are my specialty. That's where my background is. Clients from other industries come through referrals all the time, and the method carries over if you're serious about your next move.",
  },
  {
    question: "What if I'm not ready yet?",
    answer:
      "That's fine. Is \"later\" next year, two years from now, or three? It's easy to keep moving the date, and your competitors haven't agreed to wait with you. In the meantime, follow along on LinkedIn and put the ideas to work.",
  },
]

/* ── Testimonial wall ─────────────────────────────────── */

/**
 * Every testimonial from testimonial.to/ai-enhanced-career-coaching/all, copied as text.
 * Names are shortened to first name + last initial. Private messages stay anonymous.
 * Long entries are trimmed at sentence boundaries; nothing is reworded.
 */
export const testimonialWall: WallTestimonial[] = [
  {
    name: 'Victor H.',
    avatar: '/assets/testimonials/victor-h.webp',
    quote:
      'Randall is one of those people who can quickly understand both the career decision in front of you and the larger business picture behind it. His guidance helped me think more strategically about my job search, how I communicate my value, and the types of opportunities that make sense for my experience and long-term goals. Randall understands the GovCon and defense environment because he has worked in it and led within it.',
  },
  {
    name: 'Emily S.',
    avatar: '/assets/testimonials/emily-s.webp',
    title: 'Manager, Change Management and Training',
    quote:
      'Working with Randall completely changed how I view the modern job market as a manager-to-director level leader. I originally thought I just needed to update my resume and LinkedIn profile, but I quickly realized there were a lot of things working against me that I didn’t even know to look for, especially with AI, networking, personal branding, recruiter behavior, the hidden job market, etc.',
  },
  {
    name: 'Prior client',
    title: 'Defense industry professional',
    quote:
      'The recruiter mentioned that they have been looking for someone for 2 months and had over 2000 applicants for this position. So the work that you and team did definitely helped to make me stand out. I had three interviews (recruiter, COO, CFO) and those went very well.',
  },
  {
    name: 'Kevin L.',
    title: 'IT Security Operations Analyst',
    quote:
      'For the first 6 months after separating from the Army, I made effectively no progress towards finding a job on the civilian side. Then I connected with Randall. After restarting my search, I went from failing screening >90% of the time to passing screening almost every time, and I received two good job offers within 1.5 months.',
  },
  {
    name: 'Connie C.',
    avatar: '/assets/testimonials/connie-c.webp',
    title: 'CEO, C Clay Consulting',
    quote:
      'Working with Randall while I was at the Pentagon completely changed how I approached my career and business. In a market where everyone is relying on AI and still struggling to stand out, he helped me position myself in a way that actually attracted opportunities instead of chasing them. Beyond the job market, he also helped me think through my transition into launching my own consulting business in the GovCon space.',
  },
  {
    name: 'John B.',
    avatar: '/assets/testimonials/john-b.webp',
    quote:
      'What sets Randall apart is his insider understanding of the defense industry. He knows what decision-makers are really looking for and translates that into clear, actionable steps to help you stand out. If you’re serious about advancing into leadership roles and want to compete at the level of the top 10%, he’s the person you want in your corner.',
  },
  {
    name: 'Deon C.',
    title: 'Satellite Communications Manager',
    avatar: '/assets/testimonials/deon-c-satcom.jpg',
    quote:
      'The interview and responses I received increased 4 times after I completed all changes. With our collaboration, I successfully had 3 contractor job offers. I used the same resume to accept a government job for a higher salary than my contractor job. Overall, I would have paid more for the services provided.',
  },
  {
    name: 'KellyAnn H.',
    avatar: '/assets/testimonials/kellyann-h.webp',
    title: 'Consulting Security Professional, U.S. Veteran',
    quote:
      'From our very first interaction, Randall demonstrated a profound understanding of the challenges I faced and provided insightful advice that helped me navigate through them. One of the most impactful techniques Randall introduced me to was the STAR method. This structured approach to answering behavioral interview questions not only enhanced my interview skills but also boosted my confidence.',
  },
  {
    name: 'Prior client',
    title: 'Program professional',
    quote:
      'You really weren’t kidding about LinkedIn. 1 post and 150% increase in profile views, messages, comments, and post impressions. I actually sat down last night and made up an entire series with the help of AI to condense it for me.',
  },
  {
    name: 'Brandon',
    avatar: '/assets/testimonials/brandon.jpg',
    title: 'Director of Analytics',
    quote:
      'Prior to working with Randall I was struggling to create a resume and LinkedIn profile that I felt would get me past the first review. More importantly, Randall forced me to realize something more important about my career search, that I had been doing it in a highly inefficient way by shortchanging the networking aspect.',
  },
  {
    name: 'Latoya B.',
    avatar: '/assets/testimonials/latoya-b.webp',
    title: 'Operations & Project Manager',
    quote:
      'Randall not only rebuilt my resume to make it stand out in today’s competitive market, but also taught me how to strategically use LinkedIn to attract job opportunities and connect with recruiters. If you’re serious about leveling up your career, I can’t recommend Randall enough!',
  },
  {
    name: 'Hannah P.',
    avatar: '/assets/testimonials/hannah-p.webp',
    title: 'Engineering Project Manager, U.S. Army',
    quote:
      'Before his help, my profile was bland and I had trouble communicating my military experience in civilian language. He helped me brainstorm my accomplishments and with the help of AI, was able to expertly portray the things I have done. I would recommend Randall’s services to anyone I know looking for a job, especially those in my circle transitioning out of the military.',
  },
  {
    name: 'Verna B.',
    avatar: '/assets/testimonials/verna-b.jpg',
    title: 'Project Manager',
    quote:
      'Comparing my original resume to the final product is a stark contrast. My original resume more closely resembles duties of a job description, however the final product illustrates my accomplishments and value add while performing said job duties. The final resume was provided to me with hours to spare for a job that I did not apply for but the recruiter reached out to me on LinkedIn.',
  },
  {
    name: 'Laylanny J.',
    avatar: '/assets/testimonials/laylanny-j.jpg',
    title: 'Security & Business Analyst',
    quote:
      'What I liked most about working with Randall was his personalized approach. He didn’t just give generic advice; he took the time to understand my goals and background, and crafted both my resume and LinkedIn profile in a way that truly represented me.',
  },
  {
    name: 'Stuart S.',
    avatar: '/assets/testimonials/stuart-s.webp',
    title: 'Senior Contracts & Subcontracts Specialist',
    quote:
      'They took my outdated résumé and transformed it into a polished, modern document that truly reflects my skills and experience. Thanks to their help, I’ve already seen a noticeable increase in interview requests.',
  },
  {
    name: 'Prior mentee',
    title: 'U.S. Army Reserves, active Secret clearance',
    quote:
      'This has been immensely helpful to me. I never thought of updating my resume weekly / bi-weekly but it makes perfect sense in order to keep up with your accomplishments. I attended a job fair and I’m confident that with the help you’ve given me I’m going to land a position SOON!',
  },
  {
    name: 'Carlos G.',
    avatar: '/assets/testimonials/carlos-g.jpg',
    title: 'Director of Operations',
    quote:
      'He was incredibly attentive and paid close attention to detail, helping me enhance the professionalism of both my resume and LinkedIn profile. His consistent follow-ups and thoughtful guidance ensured my profile stood out, grabbing the attention of other professionals.',
  },
  {
    name: 'Prior client',
    quote:
      'He sent it out to a few people and this is one of the responses he received: “Had I seen this 3 months ago I would have hired him.” This made me feel great. Knowing that my past work experience and my abilities were being recognized.',
  },
  {
    name: 'Carmela M.',
    avatar: '/assets/testimonials/carmela-m.jpg',
    title: 'Program Manager',
    quote:
      'One of my primary hurdles was effectively showcasing all my strengths and skills on my resume. Thanks to Randall’s service, my professional branding and marketability significantly improved, resulting in increased interview opportunities. In fact, I was introduced to Randall through a satisfied client.',
  },
  {
    name: 'Louis J.',
    avatar: '/assets/testimonials/louis-j.webp',
    title: 'Talent Acquisition Manager',
    quote:
      'I had 6 different jobs in 10 years that was challenging to include in order to have meaningful impacts and keep it under 2 pages. The best thing about the service was that Randall worked with me with any content I sent him. If he thought it may not be helpful, he would tell me so based on experiences he has had or has seen.',
  },
  {
    name: 'Shelton Y.',
    avatar: '/assets/testimonials/shelton-y.webp',
    title: 'Facilities Operations Specialist',
    quote:
      'I knew my potential but I could not put it on paper. With Mr. Re’s guidance I finally am able to exhibit my assets. I have already reached out to family and friends recommending the awesome service that I was given.',
  },
  {
    name: 'Simone D.',
    avatar: '/assets/testimonials/simone-d.jpg',
    title: 'Senior Producer & Program Manager',
    quote:
      'Initially, I struggled to effectively showcase my skills and experiences in a concise and impactful manner. Through his service, I was able to significantly improve my professional branding and marketability, leading to increased interview opportunities.',
  },
  {
    name: 'Brandon R.',
    avatar: '/assets/testimonials/brandon-r.webp',
    title: 'Cybersecurity and IT Professional',
    quote:
      'He provided valuable insights into the latest cybersecurity trends and keywords recruiters and hiring managers look for, ensuring that my resume would stand out in a competitive job market. I am seeing a continuous increase in attention and opportunities.',
  },
  {
    name: 'James K.',
    avatar: '/assets/testimonials/james-k.jpg',
    title: 'Senior Talent Acquisition Advisor, U.S. Army',
    quote:
      'Their constructive feedback, resume building services, LinkedIn profile modifications, job interview tips, and insights into the use of AI in the workplace were instrumental in maximizing my opportunities for future success. I am confident that I would not be where I am today without the help of Randall and his team.',
  },
  {
    name: 'Joaquin L.',
    avatar: '/assets/testimonials/joaquin-l.webp',
    title: 'IT Security Project Manager',
    quote:
      'Good interaction and feedback on resume and any questions I had through the process of transitioning to civilian life. Most definitely would recommend his services to other transitioning service members and friends and family.',
  },
  {
    name: 'Saif M.',
    avatar: '/assets/testimonials/saif-m.webp',
    title: 'IT Support Engineer & Service Delivery Specialist',
    quote:
      'Randall’s team was able to help me out finding red flags on my resume and LinkedIn profile. I was also able to grow my connections on LinkedIn.',
  },
  {
    name: 'Brian F.',
    avatar: '/assets/testimonials/brian-f.webp',
    title: 'Instructor & Operations Management Professional',
    quote:
      'Randall connected with me personally and his meticulous approach transformed my resume into a powerful tool. I most appreciate him walking me through and teaching me how along the way.',
  },
  {
    name: 'John R.',
    avatar: '/assets/testimonials/john-r.webp',
    title: 'Human Resources Management Professional',
    quote:
      'What was the best about this service is that he made it personal. It was not like he was just doing a job for me but was doing it to help a fellow veteran out in need of help.',
  },
  {
    name: 'Cody S.',
    avatar: '/assets/testimonials/cody-s.webp',
    title: 'Cybersecurity & IT Professional',
    quote:
      'The team transformed my ordinary resume into a compelling story of my professional journey. Since updating my resume with the recommendations, I have noticed an uptick in interview requests, a better understanding of where I am in my career, and how to make myself stand out.',
  },
  {
    name: 'Michael H.',
    avatar: '/assets/testimonials/michael-h.jpg',
    title: 'Continuous Improvement Specialist',
    quote:
      'My resume wasn’t getting much attention. Since it was revamped by Randall, it has received more views. I have had opportunities from companies that I didn’t think would ever be possible.',
  },
  {
    name: 'Deon C.',
    title: 'Cybersecurity Analyst',
    avatar: '/assets/testimonials/deon-c-cyber.webp',
    quote:
      'No person nor organization that I spoke with during my career search was as responsive, direct, and produced tangible results as Randall was. I went from an unwelcoming and unproductive LinkedIn profile to having companies reach out to me via messenger.',
  },
  {
    name: 'Karon D.',
    avatar: '/assets/testimonials/karon-d.webp',
    title: 'Senior Management Professional',
    quote:
      'Randall spent a good amount of time asking the right questions to capture my career and showcase my work history. I can honestly say that my resume was resurrected. The best thing about his service is that he knows what he’s doing. Trust the process.',
  },
]
