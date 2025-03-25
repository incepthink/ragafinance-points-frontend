import { BackendUrl, clientAxios } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";

type SignPromptResponse =
  | {
      status?: "needs_verification";
      message: string;
      token: string;
    }
  | {
      status?: "already_verified";
      user: any;
      totalPointsEarned: number;
      totalValueDeposited: number;
      userDeposits: any[];
      userPoints: any[];
      userReference:
        | any[]
        | { eth_address: string; createdAt: string; updatedAt: string };
    };

export const useRequestSignPrompt = () => {
  return useMutation<SignPromptResponse, Error, string>({
    mutationFn: async (ethAddress: string) => {
      const res = await clientAxios.post(`${BackendUrl}/user/request-token`, {
        ethAddress,
      });
      return res.data;
    },
  });
};
