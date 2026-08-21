const brands = [
  { name: "VERSACE", className: "versace" },
  { name: "ZARA", className: "zara" },
  { name: "GUCCI", className: "gucci" },
  { name: "PRADA", className: "prada" },
  { name: "Calvin Klein", className: "calvin" },
];

const BrandSet = () => (
  <div className="brand-set">
    {brands.map((brand) => (
      <div
        key={brand.name}
        className={`brand-item ${brand.className}`}
      >
        {brand.name}
      </div>
    ))}
  </div>
);

const BrandMarquee = () => {
  return (
    <section className="brand-marquee">
      <div className="brand-track">
        <BrandSet />
        <BrandSet />
      </div>
    </section>
  );
};

export default BrandMarquee;