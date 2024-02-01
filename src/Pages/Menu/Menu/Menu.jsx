import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../Components/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";

const Menu = () => {
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
  return (
    <div>
      <Helmet>
        <title>Menu</title>
      </Helmet>
      <Cover img={menuImg} title={"Our Menu"} />
      <SectionTitle subHeading={"Don't Miss"} heading={"Today's Offer"} />
      {/* Offered Menu Items */}
      <MenuCategory items={offered} />
      {/* dessert menu items */}
      <MenuCategory items={desserts} title={"dessert"} img={dessertImg} />
      {/* pizza menu items */}
      <MenuCategory items={pizza} title={"pizza"} img={pizzaImg} />
      {/* salad menu items */}
      <MenuCategory items={salad} title={"salad"} img={saladImg} />
      {/* Soup menu items */}
      <MenuCategory items={soup} title={"soup"} img={soupImg} />
    </div>
  );
};

export default Menu;
