import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingButton from "../../../Components/LoadingButton";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [menu, refetch, menuLoading] = useMenu();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  if (menuLoading) {
    return <LoadingButton />;
  }
  const handleDeleteItem = (item) => {
    // console.log(item);
    Swal.fire({
      title: "Are you sure?",
      text: `You Want To Delete ${item.name} Item`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: `${item.name} Deleted Successfully`,
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div>
      <SectionTitle
        heading={"Manage All Items"}
        subHeading={"Hurry Up !"}
      ></SectionTitle>
      <div className="text-center font-bold">
        <h2 className="text-indigo-600 text-xl mx-8">{user.displayName}</h2>
      </div>
      <div>
        <div className="overflow-x-auto max-w-screen-lg mx-auto mt-10">
          <div className="flex">
            <h2 className="text-indigo-600 text-xl my-8">
              Total Items : {menu.length}
            </h2>
          </div>
          <table className="table">
            {/* head */}
            <thead className="bg-indigo-600 text-white text-xl">
              <tr>
                <th>#</th>
                <th>Item Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {menu.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <img src={item.image} className="w-20" alt="" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <Link to={`/dashboard/updateItem/${item._id}`}>
                      <button className="btn btn-primary btn-sm">Edit</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="btn btn-error text-white btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
