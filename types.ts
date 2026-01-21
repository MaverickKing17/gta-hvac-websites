
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  rebate?: string;
}

export interface Rebate {
  id: string;
  name: string;
  amount: number;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Config {
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  primaryColor: string;
  serviceAreas: string[];
}
