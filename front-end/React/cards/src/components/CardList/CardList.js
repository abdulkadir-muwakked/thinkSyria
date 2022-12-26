import Card from "../Card/Card";
import "./CardList.css";

const CardList = ({ items, background }) => {
  return (
    <div className="card-list">
      {items.map((item) => {
        return (
          <Card
            img={item.img}
            cardTitle={item.title}
            des={item.headline}
            rate={item.Rating}
            review={item.reviews}
            price={item.price}
            oldPrice={item.Original_price}
          />
        );
      })}
    </div>
  );
};

export default CardList;
