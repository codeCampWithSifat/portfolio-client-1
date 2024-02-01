const FoodCard = ({ item }) => {
  const { name, image, price, recipe } = item;
  return (
    <div className="card  bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} alt="Shoes" className="rounded-xl" />
      </figure>
      <p className="bg-slate-900 text-white absolute right-0 mr-12 px-2 mt-16">
        ${price}
      </p>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
          <button className="btn btn-outline border-0 border-b-4 mt-2">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
