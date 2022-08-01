import { FaTruck, FaLock } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";

const OurFeatures = () => {
  const features = [
    { id: 1, icon: <FaTruck size={45} />, text: "Free Shipping and Returns" },
    { id: 2, icon: <FaLock size={45} />, text: "Secured Payment" },
    { id: 3, icon: <HiCheckCircle size={45} />, text: "Customer Service" },
  ];
  return (
    <div className="w-full h-auto bg-[#1D1D1D] text-white grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3 py-10">
      {features.map((feature) => (
        <div
          key={feature.id}
          className="col-span-1 flex flex-col gap-2 justify-center items-center"
        >
          {feature.icon}
          <h2 className="text-white text-center">{feature.text}</h2>
        </div>
      ))}
    </div>
  );
};

export default OurFeatures;
