import CategoryPage from "./CategoryPage";

const ShopNowButton = ({ buttonText }) => {
  return (
    <button
      className="border-2 border-white rounded-3xl text-3xl mt-10 px-10 py-4 text-white hover:bg-white hover:text-gray-800 transition-all duration-300 ease-in-out"
      onClick={() => CategoryPage}
    >
      {buttonText}
    </button>
  );
};

export default ShopNowButton;
