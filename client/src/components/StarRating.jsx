export default function StarRating({ rating = 0, reviews }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;

  return (
    <div className="star-rating" aria-label={`Rated ${rating} out of 5`}>
      <span className="star-rating__stars">
        {Array.from({ length: 5 }).map((_, i) => {
          let symbol = "☆";
          if (i < full) symbol = "★";
          else if (i === full && half) symbol = "★";
          return (
            <span key={i} className={i < full || (i === full && half) ? "is-filled" : ""}>
              {symbol}
            </span>
          );
        })}
      </span>
      <span className="star-rating__value">
        {rating.toFixed(1)}
        {typeof reviews === "number" && <span className="star-rating__reviews">/5 ({reviews})</span>}
      </span>
    </div>
  );
}
