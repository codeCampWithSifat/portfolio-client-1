import { Helmet } from "react-helmet-async";
import { FaUtensils } from "react-icons/fa6";
import SectionTitle from "../../../Components/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    const formData = new FormData();
    // image upload to imgbb and then get an url from imgbb
    const imageFile = { image: data.image[0] };
    formData.append("file", imageFile);
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      // now send the menu items image to the server with image url
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data?.data?.display_url,
      };

      // now send data into the server
      const menuRes = await axiosSecure.post(`/menu`, menuItem);
      //   console.log("with imag url", menuRes.data);
      if (menuRes.data.insertedId) {
        // show success popup alert
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Admin ${user.displayName} Add A Item Successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div>
      <div>
        <Helmet>
          <title>ADD || ITEM</title>
        </Helmet>
        <SectionTitle
          subHeading={"What's New"}
          heading={"Add An Item"}
        ></SectionTitle>
      </div>
      <div className="max-w-screen-md mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">
                Recipe Name<span className="text-red-800">***</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Recipe Name"
              {...register("name", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">
                  Category<span className="text-red-800">***</span>
                </span>
              </label>
              <select
                defaultValue="default"
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            {/* price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">
                  Price<span className="text-red-800">***</span>{" "}
                </span>
              </label>
              <input
                type="number"
                placeholder="Price"
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* recipe details */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Recipe Details<span className="text-red-800">***</span>
              </span>
            </label>
            <textarea
              {...register("recipe")}
              className="textarea textarea-bordered h-24"
              placeholder="Description"
            ></textarea>
          </div>

          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button
            type="submit"
            className="btn bg-indigo-600 hover:bg-indigo-600 hover:text-red-600 text-white"
          >
            Add Item <FaUtensils className="ml-4"></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
