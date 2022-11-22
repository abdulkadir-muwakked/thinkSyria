import "./App.css";
import CardList from "./components/CardList/CardList";

const App = () => {
  const arr = [
    {
      img: "https://img-c.udemycdn.com/course/240x135/3227583_5e75_6.jpg",
      title: "Complete Web & Mobile Designer in 2023: UI/UX, Figma, +more",
      headline:"Become a Designer in 2023! Master Mobile and Web Design, User Interface + User Experience (UI/UX Design), HTML, and CSS",
      Rating: 4.6,
      reviews: 15225,
      price: 49.99,
      Original_price: 429.99
    },
    {
      img: "https://img-c.udemycdn.com/course/240x135/1643044_e281.jpg",
      title: "Graphic Design Masterclass - Learn GREAT Design",
      headline:
        "The Ultimate Graphic Design Course Which Covers Photoshop, Illustrator, InDesign,Design Theory, Branding and Logo Design",
      Rating: 4.7,
      reviews: 45430,
      price: 49.99,
      Original_price: 429.99
    },
    {
      img: "https://img-c.udemycdn.com/course/240x135/2776760_f176_10.jpg",
      title: "100 Days of Code: The Complete Python Pro Bootcamp for 2023",
      headline:
        "Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
      Rating: 4.7,
      reviews: 153222,
      price: 49.99,
      Original_price: 429.99
    },
    {
      img: "https://img-c.udemycdn.com/course/240x135/1778502_f4b9_12.jpg",
      title: "iOS & Swift - The Complete iOS App Development Bootcamp",
      headline:
        "From Beginner to iOS App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI!",
      Rating: 4.8,
      reviews: 80492,
      price: "₺49.99",
      Original_price: "₺429.99"
    },
    {
      img: "https://img-c.udemycdn.com/course/240x135/1921420_384a_14.jpg",
      title: "Ultimate AWS Certified Developer Associate 2022 - NEW!",
      headline:
        "Full Practice Exam with Explanations included! PASS the Amazon Web Services Certified Developer Certification DVA-C01.",
      Rating: 4.7,
      reviews: 69788,
      price: 49.99,
      Original_price: 429.99
    }
  ];
  return (
    <div>
      <CardList items={arr} background={"black"} size={5} />
    </div>
  );
};

export default App;
