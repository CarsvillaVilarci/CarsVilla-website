import { site } from "./site";
import type { Car } from "./cars";

/** Organization + AutoDealer schema for the whole site. */
export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: "IN",
    sameAs: Object.values(site.social),
  };
}

/** Website schema with search action for sitelinks searchbox. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/buy?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** Vehicle + Product/Offer schema for a single car listing. */
export function carJsonLd(car: Car) {
  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${car.make} ${car.model} ${car.variant}`,
    brand: { "@type": "Brand", name: car.make },
    model: car.model,
    vehicleModelDate: String(car.year),
    mileageFromOdometer: { "@type": "QuantitativeValue", value: car.km, unitCode: "KMT" },
    fuelType: car.fuel,
    vehicleTransmission: car.transmission,
    numberOfPreviousOwners: car.owners,
    color: car.color,
    bodyType: car.bodyType,
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/UsedCondition",
      seller: { "@type": "AutoDealer", name: site.name },
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.url}`,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
