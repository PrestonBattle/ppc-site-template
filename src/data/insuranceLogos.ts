export const insuranceLogos = {
  aetna: { src: "/images/insurance/aetna.svg", alt: "Aetna" },
  careington: { src: "/images/insurance/careington.svg", alt: "Careington" },
  deltaDentalPremier: { src: "/images/insurance/delta-dental-premier.svg", alt: "Delta Dental Premier" },
  cigna: { src: "/images/insurance/cigna.svg", alt: "Cigna" },
  unitedHealthcare: { src: "/images/insurance/united-healthcare.svg", alt: "UnitedHealthcare" },
  bcbs: { src: "/images/insurance/bcbs.svg", alt: "Blue Cross Blue Shield" },
  principal: { src: "/images/insurance/principal.svg", alt: "Principal Financial Group" },
  sunLife: { src: "/images/insurance/sun-life.svg", alt: "Sun Life Financial" },
} as const;

export type InsuranceKey = keyof typeof insuranceLogos;