import propertiesData from "@/content/properties.json";
import investmentsData from "@/content/investments.json";
import experiencesData from "@/content/experiences.json";
import type { Experience, InvestOpportunity, Property } from "@/types";

const properties: Property[] = propertiesData;
const investments: InvestOpportunity[] = investmentsData;
const experiences: Experience[] = experiencesData;

export const getProperties = (): Property[] => properties;

export const getFeaturedProperties = (): Property[] =>
  properties.filter((property) => property.featured);

export const getPropertyBySlug = (slug: string): Property | undefined =>
  properties.find((property) => property.slug === slug);

export const getInvestments = (): InvestOpportunity[] => investments;

export const getInvestmentBySlug = (slug: string): InvestOpportunity | undefined =>
  investments.find((opportunity) => opportunity.slug === slug);

export const getExperiences = (): Experience[] => experiences;

export const filterPropertiesByRegion = (region?: string): Property[] => {
  if (!region) return properties;
  return properties.filter((property) => property.region.toLowerCase() === region.toLowerCase());
};
