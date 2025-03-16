import axios from "axios";
import { BackendUrl } from "./constants";

export const fetchDeposits = async (address: string) => {
  const res = await axios.get(`${BackendUrl}/user/address/${address}`);

  return {
    deposits: res.data.userDeposits,
    totalValueDeposited: res.data.totalValueDeposited,
    points: res.data.userPoints,
    totalPointsEarned: res.data.totalPointsEarned,
  };
};
