import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // same code above with interceptors
  //   const axiosSecure = useAxiosSecure();
  //   const token = localStorage.getItem("access-token");
  //   const { data: users = [], refetch } = useQuery({
  //     queryKey: ["users"],
  //     queryFn: async () => {
  //       const res = await axiosSecure.get("/users", {
  //         headers: {
  //           authorization: `Bearer ${token}`,
  //         },
  //       });
  //       return res.data;
  //     },
  //   });

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You Want To Delete ${user.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `Your Admin ${user.name} has been deleted.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Now ${user.name} is Admin`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto max-w-screen-lg mx-auto">
        <div className="text-center mt-10">
          <h2 className="text-indigo-800 text-lg"> AllUsers {users.length}</h2>
        </div>
        <table className="table mt-16 ">
          {/* head */}
          <thead className="bg-indigo-600 text-white text-lg rounded-xl">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>
                  {user.role === "admin" ? (
                    <button className="btn btn-ghost btn-sm ">Admin</button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-indigo-600 text-white btn-sm hover:bg-indigo-600 hover:text-black"
                    >
                      Make Admin
                    </button>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-error btn-sm text-white"
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
  );
};

export default AllUsers;
