import type { MetadataRoute } from "next";
import { getInvestments, getProperties } from "@/lib/content";

const baseUrl = "https://ace.pt";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/stays", "/invest", "/ai", "/experiences", "/about", "/contact", "/legal/privacy"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date()
    })
  );

  const propertyRoutes = getProperties().map((property) => ({
    url: `${baseUrl}/stays/${property.slug}`,
    lastModified: new Date()
  }));

  const investRoutes = getInvestments().map((opportunity) => ({
    url: `${baseUrl}/invest/${opportunity.slug}`,
    lastModified: new Date()
  }));

  return [...staticRoutes, ...propertyRoutes, ...investRoutes];
}
