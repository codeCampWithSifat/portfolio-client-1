import SectionTitle from "../../../Components/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="featured_item bg-fixed my-20 text-white">
      <div className="pt-4">
        <SectionTitle
          subHeading={"Check It Out"}
          heading={"Featured Item"}
        ></SectionTitle>
      </div>
      <div className="hero mx-20 mt-20">
        <div className="hero-content flex-col lg:flex-row">
          <img src={featuredImg} className="w-2/5 rounded-lg shadow-2xl" />
          <div className="">
            <h1 className="text-xl font-bold">The New Year : {year}</h1>
            <p className="uppercase">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-outline border-0 border-b-4 mt-10">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
