import { formatAddress } from "@/app/page";
import { Button } from "../ui/button";
import axios from "axios";
import { BackendUrl, clientAxios } from "@/utils/constants";
import { useQueryClient } from "@tanstack/react-query";

const StopReferModal = ({ closeModal, userAddress, referralAddress }: any) => {
  const queryClient = useQueryClient();

  const handleClick = async () => {
    const res = await clientAxios.delete(`${BackendUrl}/user/refer`, {
      data: { address: userAddress },
    });
    console.log(res);

    if (res.status === 200) {
      alert("Referral removed.");
      closeModal();

      // Refetch user data
      queryClient.invalidateQueries({ queryKey: ["homeData"] });
    }
  };

  return (
    <div className="flex flex-col items-center mt-4 mb-4 gap-4">
      <div className="flex gap-4">
        <span className=" whitespace-nowrap">Stop Referring:</span>
        <span className="font-semibold">{formatAddress(referralAddress)}</span>
      </div>
      <Button
        onClick={handleClick}
        className="text-md py-5 rounded-xl px-5 bg-white text-black hover:bg-white cursor-pointer hover:scale-105"
      >
        Stop
      </Button>
    </div>
  );
};

export default StopReferModal;
