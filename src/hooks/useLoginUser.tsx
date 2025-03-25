import { BackendUrl, clientAxios } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";

export const useLoginUser = () => {
  return useMutation({
    mutationFn: async ({
      ethAddress,
      signature,
      token,
    }: {
      ethAddress: string;
      signature: string;
      token: string;
    }) => {
      const res = await clientAxios.post(`${BackendUrl}/user/login`, {
        ethAddress,
        signature,
        token,
      });
      return res.data;
    },
  });
};
