export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface Company {
  name: string
  logo?: string
}

export interface Stat {
  value: string
  description: string
}

export interface Testimonial {
  quote: string
  name: string
  title: string
  initial: string
  avatar?: string
  outcome?: string
  highlight?: string
  featured?: boolean
}

/** A client result told in three short beats: problem → what we did → result. */
export interface CaseResult {
  name: string
  title: string
  avatar?: string
  problem: string
  action: string
  result: string
}

/** One entry on the full testimonial wall, copied from testimonial.to. */
export interface WallTestimonial {
  name: string
  title?: string
  avatar?: string
  quote: string
}

export interface HeroOutcome {
  result: string
  name: string
  title: string
}

export interface Problem {
  title: string
  text: string
}

export interface Video {
  id: string
  title: string
}

export interface Faq {
  question: string
  answer: string
}
