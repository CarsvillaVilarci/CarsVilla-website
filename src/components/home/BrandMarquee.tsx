const brands = [
  "Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Kia", "Honda",
  "Toyota", "BMW", "Mercedes-Benz", "Volkswagen", "Skoda", "MG",
];

export function BrandMarquee() {
  const row = [...brands, ...brands];
  return (
    <section className="border-y border-line bg-ink-2/60 py-6">
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee-track flex items-center gap-14 whitespace-nowrap">
          {row.map((b, i) => (
            <span
              key={i}
              className="font-display text-lg font-semibold uppercase tracking-wide text-muted/70"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
