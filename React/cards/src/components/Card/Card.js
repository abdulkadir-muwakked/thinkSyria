import "./Card.css";
import Rating from '@mui/material/Rating';

const Card = ({ img, cardTitle, des, rate, review, price, oldPrice }) => {
  return (
    <div className="card">
      <img src={img} />
      <h3 className="title">{cardTitle}</h3>
      <p className="des">{des}</p>
      <div className="rating">
        <p className="">{rate}</p>
        <Rating
        sizes={5}
        precision={0.5}
        value={rate}
        readOnly
        />
      </div>

      <span className="rate">Rating: {rate} out of 5</span>
      <strong className="price">
        {price} <s>{oldPrice}</s>
      </strong>
      <div className="tag">
        <h2>BestSeller</h2>
      </div>
    </div>
  );
};

export default Card;
