export type BookingLinks = {
  airbnb?: string;
  booking?: string;
  vrbo?: string;
  direct?: string;
};

export type Property = {
  id: string;
  slug: string;
  name: string;
  region: "Porto" | "Douro" | "Algarve" | "Norte";
  city: string;
  country: string;
  type: string;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  highlights: string[];
  amenities: string[];
  images: string[];
  descriptionShort: string;
  descriptionLong: string;
  bookingLinks?: BookingLinks;
  addOnsAvailable?: string[];
  featured?: boolean;
};

export type InvestMetrics = {
  revenueHistory?: string;
  conservativeProjection?: string;
  costRange?: string;
};

export type InvestOpportunity = {
  id: string;
  slug: string;
  name: string;
  location: string;
  assetType: string;
  status: "available" | "coming_soon";
  investmentThesis: string;
  useCases: string[];
  metrics?: InvestMetrics;
  images: string[];
  managedByAceAvailable: boolean;
};

export type Experience = {
  id: string;
  region: "Porto" | "Douro" | "Algarve" | "Norte";
  title: string;
  description: string;
  idealFor: string;
  duration?: string;
  priceRange?: string;
  partnerName?: string;
  bookingCTA: string;
};
