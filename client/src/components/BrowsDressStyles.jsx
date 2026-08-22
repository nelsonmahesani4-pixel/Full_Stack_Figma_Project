import { Link } from "react-router-dom";

const DRESS_STYLES = [
  {
    name: "Casual",
    slug: "casual",
    image: "/Images/casual.png",
  },
  {
    name: "Formal",
    slug: "formal",
    image: "/Images/formal1.png",
  },
  {
    name: "Party",
    slug: "party",
    image: "/Images/party.png",
  },
  {
    name: "Gym",
    slug: "gym",
    image: "/Images/gym.png",
  },
];

export default function BrowseStyles() {
  return (
    <section className="dress-style">
      <div className="dress-style__panel">

        <h2 className="dress-style__title">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="dress-style__grid">

          {DRESS_STYLES.map((style) => (
            <Link
              key={style.slug}
              to={`/category?dressStyle=${style.slug}`}
              className={`dress-style__card dress-style__card--${style.slug}`}
            >
              <img
                src={style.image}
                alt={style.name}
              />

              <span>{style.name}</span>
            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}