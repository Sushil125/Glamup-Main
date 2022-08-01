import Navbar from "./Navbar";
import MyFooter from "./MyFooter";
import Lottie from "lottie-react";
import ShampooAnimation from "../lotties/85604-shampoo.json";

const AboutUs = () => {
  return (
    <div className="w-full h-screen p-10">
      <Navbar />
      <div className="col-span-2 flex flex-col justify-center items-center p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16 h-auto w-full">
          <div className="col-span-1">
            <h1 className="text-2xl font-semibold">
              About <strong>Us</strong>
            </h1>
            <p className="mt-4 text-gray-800 text-justify">
              Since our launch, we have not only redefined the art of
              e-retailing beauty and personal care in India, but also have been
              instrumental in fostering the growth of a previously relatively
              nascent ecosystem. From bringing you domestic brands,
              international brands, luxury and prestige brands, premium brands,
              niche and cult brands and expert advice and videos, coupled with
              our understanding of the needs and preferences of the consumers,to
              more than 72 Luxe and On-Trend and Kiosk Stores, an ever growing
              online community for beauty buffs, and a Beauty Helpline, we go
              out of our way to give you only the very best. With 2400+, 100%
              authentic brands Nykaa offers a well curated comprehensive
              selection of makeup, skincare, haircare, bath and body, fragrance,
              grooming appliances, personal care, and health and wellness
              categories.
            </p>
          </div>

          {/* Lottie Animation Here */}
          <div className="col-span-1 h-auto flex justify-center items-center">
            <Lottie animationData={ShampooAnimation} loop autoPlay />
          </div>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};

export default AboutUs;
