export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Studio Nodo",
    founder: "Gaetano Meli",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Palermo",
      addressRegion: "Sicily",
      addressCountry: "IT"
    },
    telephone: "+393450494432",
    email: "Gaetano.meli95@gmail.com",
    areaServed: "Palermo, Sicily, Italy",
    serviceType: [
      "Social Media Management",
      "Content Strategy",
      "Content Creation",
      "Web Design",
      "Landing Pages",
      "Business Websites",
      "App Development",
      "Local Business Digital Growth"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
