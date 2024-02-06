// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

// const useMenu = () => {
//   const [menu, setMenu] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`https://protfolio-server-1.vercel.app/menu`)
//       .then((res) => res.json())
//       .then((data) => {
//         setMenu(data);
//         setLoading(false);
//       });
//   }, []);

//   return [menu, loading];
// };

// export default useMenu;

const useMenu = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: menu = [],
    refetch,
    isLoading: menuLoading,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/menu`);
      return res.data;
    },
  });
  return [menu, refetch, menuLoading];
};

export default useMenu;
