interface Education {
  organization: string;
  href: string;
  degree: string;
  location: string;
  timestamp?: string;
}

interface Experience extends Education {
  degree: never;
  title: string;
  activities: string[];
}

interface Project {
  title: string;
  href?: string;
  description: string;
  goals: string[];
  theses: string[];
  timestamp: string[];
}

interface Language {
  language: string;
  level: string;
}

export interface Document {
  document: "cv";
  lang: "en" | "ru";
  name: string;
  contacts: {
    location: string;
    mobile: string;
    mail: string;
  };
  education: Education[];
  projects: Project[];
  experience: Experience[];
  languages: Language[];
}