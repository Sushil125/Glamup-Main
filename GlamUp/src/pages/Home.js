import FeaturedProducts from "../components/FeaturedProducts";
import HeroSection from "../components/HeroSection";
import HighlightImages from "../components/HighlightImages";
import MyFooter from "../components/MyFooter";
import Navbar from "../components/Navbar";
import NewProducts from "../components/NewProducts";
import OurFeatures from "../components/OurFeatures";
import { Chat } from "../components/chat/Chat";

const Home = () => {
  return (
    <div id="homePage">
      <div className="w-full h-screen p-10">
        {/* Navbar */}
        <Navbar />
        <HeroSection />
        <NewProducts />
        <HighlightImages />
        <FeaturedProducts />
        <OurFeatures />
        <Chat/>
        <MyFooter />
      </div>
    </div>
  );
};

export default Home;
