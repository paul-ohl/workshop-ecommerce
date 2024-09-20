import { useQuery } from "react-query";

const useGetAllConfigs = () => {
  return useQuery(
    "configsData",
    async () =>
      await fetch("http://localhost:3000/config").then((res) => res.json())
  );
};

export default useGetAllConfigs;
