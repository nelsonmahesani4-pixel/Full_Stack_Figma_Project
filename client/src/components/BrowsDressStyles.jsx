import { Link } from "react-router-dom";

const DRESS_STYLES = [
  {
    name: "Casual",
    size: "large",
  },
  {
    name: "Formal",
    size: "small",
  },
  {
    name: "Party",
    size: "small",
  },
  {
    name: "Gym",
    size: "large",
  },
];

export default function BrowseStyles() {
  return (
    <section className="section dress-style">
      <div className="dress-style__panel">
        <h2 className="section__title">BROWSE BY DRESS STYLE</h2>

        <div className="dress-style__grid">
          {DRESS_STYLES.map((style) => (
            <Link
              key={style.name}
              to={`/category?dressStyle=${style.name}`}
              className={`dress-style__card dress-style__card--${style.size}`}
            >
              {style.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}