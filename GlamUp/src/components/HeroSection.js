import HeroImage from "../assets/images/hero-image.jpg";
import ShopNowButton from "./ShopNowButton";

const HeroSection = () => {
  return (
    <div className="w-full h-auto md:h-[600px] bg-[#1D1D1D] grid grid-cols-1 md:grid-cols-2 mt-10">
      {/* Image */}
      <div className="col-span-1 h-full">
        <img
          src={HeroImage}
          className="w-full h-[600px] object-cover rounded-tr-[45px] rounded-br-[45px] shadow-2xl"
          alt="hero"
        />
      </div>

      {/* Cotext */}
      <div className="col-span-1 h-full py-16 md:py-0 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold text-white leading-normal">
          New <strong className="text-blue-600">Glam Up.</strong>
          <br />
          Collection
        </h1>
        <ShopNowButton buttonText="Shop Now" />
      </div>
    </div>
  );
};

export default HeroSection;
