import SectionTitle from "../../../Components/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");

  return (
    <section>
      <div className="mt-20">
        <SectionTitle
          heading={"From Our Menu"}
          subHeading={"Popular Menu"}
        ></SectionTitle>
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6 mt-14">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>

      <div className="text-center mt-10">
        <button className="btn btn-outline border-0 border-b-4 mt-10 w-1/4">
          View Full Menu
        </button>
      </div>
    </section>
  );
};

export default PopularMenu;
