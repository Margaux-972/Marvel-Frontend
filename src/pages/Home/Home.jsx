import "./Home.css";
import banner from "../../assets/images/marvel_banner.jpg";

const Home = () => {
  return (
    <main className="homepage">
      {/* <h1>Marvel Homepage</h1> */}
      <div className="hero">
        <img src={banner} alt="bannière marvel" />
      </div>
    </main>
  );
};

export default Home;
