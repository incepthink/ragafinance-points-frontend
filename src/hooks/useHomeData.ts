import { useUserContext } from "@/context/UserContext";
// import { fetchDeposits } from "@/utils/dataFetch";
// import { useQuery } from "@tanstack/react-query";

const useHomeData = () => {
  // const shouldFetch = Boolean(address !== "");

  // const { data, isLoading } = useQuery({
  //   queryKey: ["homeData", address],
  //   queryFn: async () => {
  //     const res = await fetchDeposits(address);

  //     return res;
  //   },
  // });

  const { data } = useUserContext();

  return { data, isLoading: !data };
};

export default useHomeData;
