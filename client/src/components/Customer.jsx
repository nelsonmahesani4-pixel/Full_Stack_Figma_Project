import StarRating from "./StarRating";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "I'm blown away by the quality and style of the clothes I received. Every piece exceeded my expectations!",
  },
  {
    name: "Alex K.",
    rating: 5,
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered this store.",
  },
  {
    name: "James L.",
    rating: 5,
    text: "The selection of clothes is impressive, and the quality is exceptional. I've become a loyal customer.",
  },
];

export default function Customer() {
  return (
    <section className="section">
      <h2 className="section__title">OUR HAPPY CUSTOMERS</h2>

      <div className="testimonials">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="testimonial-card">
            <StarRating rating={t.rating} />

            <p className="testimonial-card__name">
              {t.name}
            </p>

            <p className="testimonial-card__text">
              &ldquo;{t.text}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}