import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingButton from "../../../Components/LoadingButton";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      //   console.log(res);
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingButton />;
  }
  return (
    <div>
      <div className="text-center text-indigo-600 mt-20 text-xl">
        <h2>Total Items : {payments.length}</h2>
      </div>
      <div className="overflow-x-auto max-w-screen-lg mx-auto mt-16">
        <table className="table">
          {/* head */}
          <thead className="bg-indigo-600 text-xl text-white">
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Category</th>
              <th>Price</th>
              <th>Payment Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.email}</td>
                <td></td>
                <td> $ {payment.price}</td>
                <td>{payment.date}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
