export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface Company {
  name: string
  logo?: string
}

export interface PackageItem {
  text: string
  highlight?: string
}

export interface Stat {
  value: string
  description: string
}
