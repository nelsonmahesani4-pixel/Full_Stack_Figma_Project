import { Link } from "react-router-dom";

const DRESS_STYLES = [
  {
    name:"casual",
    size: "large",
    image:"/Images/casual.png"
  },
  {
    name: "Formal",
    size: "small",
    image: "/Images/formal1.png",
  },
  {
    name: "Party",
    size: "small",
    image: "/Images/party.png",
  },
  {
    // name: "Gym",
    size: "large",
    image:"/Images/gym.png"
    
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
  <img src={style.image} alt={style.name} />
  <span>{style.name}</span>
</Link>
          ))}
        </div>
      </div>
    </section>
  );
}