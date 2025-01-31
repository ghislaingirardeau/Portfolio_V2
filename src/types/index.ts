export interface VisitorChat {
  0: string
  1: string
}

export interface Description {
  0: string[]
  1: string[]
}

export interface Project {
  id: string
  date: string
  name: string
  summary: string
  mobileFirst: boolean
  description: Description
  tech: string
  imageURL: string
  link: string
  visitorChat: VisitorChat
}
