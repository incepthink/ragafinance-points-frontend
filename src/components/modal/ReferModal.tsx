import React, { useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { BackendUrl, testAddress } from "@/utils/constants";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useQueryClient } from "@tanstack/react-query";

const ReferModal = ({ closeModal }: any) => {
  const queryClient = useQueryClient();
  const { address, isConnected } = useAccount();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isConnected || inputRef.current!.value === "") {
      alert("connect wallet and enter code");
      return;
    }
    const res = await axios.post(`${BackendUrl}/user/refer`, {
      referrerAddress: testAddress,
      refereeCode: inputRef.current!.value,
    });

    if (res.data.message === "Referral recorded successfully") {
      alert("Successfully recorded referral");
      closeModal();

      queryClient.invalidateQueries({ queryKey: ["homeData"] });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      action=""
      className="mt-6 flex flex-col items-center"
    >
      <div className="bg-[#FECB77] p-2 rounded-md w-full">
        <input
          ref={inputRef}
          placeholder="User Referral Code"
          type="text"
          className="bg-white w-full text-black outline-none p-2 rounded-md"
        />
      </div>
      {!isConnected ? (
        <div className="p-2 px-4 mt-4 bg-blue-500 rounded-xl cursor-pointer">
          <ConnectButton />
        </div>
      ) : (
        <Button
          type="submit"
          className="bg-[#FECB77] hover:bg-[#FECB77] cursor-pointer text-black/70 text-lg mt-4 px-4"
        >
          Submit
        </Button>
      )}
    </form>
  );
};

export default ReferModal;
