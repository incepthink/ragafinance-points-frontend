"use client";

import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import useModal from "@/hooks/useModal";
import ReferModal from "./modal/ReferModal";
import useHomeData from "@/hooks/useHomeData";
import { useAccount, useSignMessage } from "wagmi";
import { testAddress } from "@/utils/constants";
import { formatAddress } from "@/app/page";
import StopReferModal from "./modal/StopReferModal";
import { useRequestSignPrompt } from "@/hooks/useRequestSIgnPrompt";
import { useLoginUser } from "@/hooks/useLoginUser";
import { useUserContext } from "@/context/UserContext";
import { ethAddress } from "viem";

const Navbar = () => {
  const [ReferModalCon, openReferModal, closeReferModal] = useModal();
  const [StopReferModalCon, openStopReferModal, closeStopReferModal] =
    useModal();

  const { setUserData } = useUserContext();

  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const { mutateAsync: requestPrompt } = useRequestSignPrompt();
  const { mutateAsync: loginUser } = useLoginUser();

  useEffect(() => {
    const login = async () => {
      if (!isConnected || !address) return;

      try {
        console.log("hi");

        // const result = await requestPrompt(address);
        const result = await requestPrompt(testAddress);
        console.log(result);

        if ("user" in result) {
          setUserData(result);
          console.log("Already veirfied and loaded");
          return;
        }

        const { message, token } = result;

        if (status === "already_verified") {
          console.log("Already logged in");
          return;
        }

        const signature = await signMessageAsync({ message });

        console.log("address", ethAddress, "sig", signature, "token", token);

        // const res = await loginUser({ ethAddress: address, signature, token });
        const res = await loginUser({
          ethAddress: testAddress,
          signature,
          token,
        });

        setUserData(res);
      } catch (error) {
        console.error("❌ Login failed:", error);
      }
    };
    login();
  }, [isConnected, address]);

  const { data, isLoading } = useHomeData();

  return (
    <>
      <div className="w-screen">
        <nav className="px-8 flex justify-between items-center w-full">
          <div className="w-28">
            <img
              src="/raga-logo.svg"
              alt="logo"
              className="object-cover w-full"
            />
          </div>

          <div className="flex gap-4 items-center ">
            {Array.isArray(data?.userReference) &&
            data.userReference.length === 0 ? (
              <Button
                onClick={() => openReferModal()}
                className="text-md py-5 rounded-xl px-5 bg-[#F27151] hover:bg-[#F27151] cursor-pointer hover:scale-105"
              >
                Refer User
              </Button>
            ) : (
              <div
                onClick={() => openStopReferModal()}
                className="bg-[#F27151] text-white py-3 px-4 rounded-xl cursor-pointer"
              >
                <p>
                  Referring:{" "}
                  <span className="font-semibold ml-2">
                    {formatAddress(
                      Array.isArray(data?.userReference)
                        ? ""
                        : data?.userReference.eth_address || ""
                    )}
                  </span>
                </p>
              </div>
            )}
            <ConnectButton />
          </div>
        </nav>
      </div>
      <ReferModalCon title={"Refer User"}>
        <ReferModal closeModal={closeReferModal} />
      </ReferModalCon>
      <StopReferModalCon title={"Remove Referrence"}>
        <StopReferModal
          closeModal={closeStopReferModal}
          referralAddress={
            Array.isArray(data?.userReference)
              ? ""
              : data?.userReference.eth_address || ""
          }
          userAddress={testAddress}
        />
      </StopReferModalCon>
    </>
  );
};

export default Navbar;
