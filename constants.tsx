
import React from 'react';
import { 
  Flame, 
  Wind, 
  Droplets, 
  Wrench, 
  ShieldCheck, 
  Zap,
  Thermometer
} from 'lucide-react';
import { Service, Rebate, Review, Config } from './types';

export const COMPANY_CONFIG: Config = {
  companyName: "Ontario Heating and Cooling",
  tagline: "Reliable GTA Heating & Cooling Since 2005",
  phone: "+1 416-200-0905",
  email: "info@hvacohc.ca",
  address: "680 Rexdale Blvd, Etobicoke, ON M9W 0B5",
  primaryColor: "#007cba",
  serviceAreas: ["Toronto", "Etobicoke", "Mississauga", "Brampton", "Scarborough", "Oakville"]
};

export const SERVICES: Service[] = [
  {
    id: "furnace-repair",
    title: "Furnace Repair",
    description: "Expert diagnostics and repairs for all major heating systems. 24/7 emergency service available.",
    icon: "Flame",
    rebate: "Up to $5,000"
  },
  {
    id: "ac-install",
    title: "AC Installation",
    description: "High-efficiency cooling solutions tailored to your home's unique footprint.",
    icon: "Wind",
    rebate: "Up to $2,500"
  },
  {
    id: "heat-pumps",
    title: "Heat Pumps",
    description: "The future of home comfort. Eco-friendly heating and cooling in one intelligent system.",
    icon: "Thermometer",
    rebate: "Up to $10,500"
  },
  {
    id: "water-heaters",
    title: "Water Heaters",
    description: "Standard and tankless water heater installation and maintenance.",
    icon: "Droplets",
    rebate: "Up to $1,000"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "1",
    author: "James M.",
    rating: 5,
    text: "Excellent service! They helped us navigate the Enbridge rebates and saved us thousands on our new heat pump.",
    date: "January 2024"
  },
  {
    id: "2",
    author: "Sarah L.",
    rating: 5,
    text: "OHC came out at 2 AM for a furnace failure. Fast, professional, and very fair pricing. Highly recommend!",
    date: "December 2023"
  },
  {
    id: "3",
    author: "Robert T.",
    rating: 4,
    text: "Smooth installation of our central air. The team was clean and explained everything perfectly.",
    date: "June 2023"
  }
];

export const FAQS = [
  {
    question: "How much are the rebates?",
    keywords: ["rebate", "money back", "save", "grant", "enbridge", "her+"],
    answer: "Homeowners in Ontario can currently access up to $10,500 in total rebates through the Enbridge HER+ and Save on Energy programs, especially for Heat Pump installations."
  },
  {
    question: "Do you offer emergency services?",
    keywords: ["emergency", "repair now", "urgent", "24/7", "broken", "night"],
    answer: "Yes! We offer 24/7 emergency HVAC services across the GTA. If your furnace or AC fails at night, call us immediately at +1 416-200-0905."
  },
  {
    question: "What areas do you serve?",
    keywords: ["area", "location", "serve", "toronto", "mississauga", "brampton", "etobicoke", "where"],
    answer: "We serve the entire Greater Toronto Area, including Etobicoke, Mississauga, Brampton, Scarborough, North York, and Oakville."
  },
  {
    question: "How long is an installation?",
    keywords: ["install", "time", "how long", "duration", "wait"],
    answer: "Most furnace, AC, or Heat Pump installations are completed within a single day (usually 4-8 hours) by our certified team."
  }
];

export const SERVICE_ICONS: Record<string, React.ReactNode> = {
  Flame: <Flame className="w-8 h-8" />,
  Wind: <Wind className="w-8 h-8" />,
  Thermometer: <Thermometer className="w-8 h-8" />,
  Droplets: <Droplets className="w-8 h-8" />,
  Wrench: <Wrench className="w-8 h-8" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />
};
