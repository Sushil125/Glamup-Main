const ProductCard = ({ image, name, price }) => {
  return (
    <div className="col-span-1 rounded-3xl shadow-2xl cursor-pointer hover:shadow-white transition-all duration-300 ease-out hover:-translate-y-3 bg-white">
      <img
        src={`http://localhost:1025/${image}`}
        className="w-full h-72 rounded-3xl object-cover"
        alt="product"
      />

      <div className="flex flex-col justify-center items-center gap-2 py-5 font-semibold text-xl">
        <h2>{name}</h2>
        <h3>${price}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
