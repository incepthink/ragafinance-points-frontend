"use client";

import Navbar from "@/components/Navbar";
import { getZealyData, openNewTab } from "@/utils/dataFetch";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import useHomeData from "@/hooks/useHomeData";
import { testAddress } from "@/utils/constants";

interface ZealyUser {
  error: boolean;
  user: {
    name: string;
    xp: number;
    level: number;
    role: string;
    rank: number;
    email: string | null;
    verifiedBlockchainAddresses: Record<string, string>;
  } | null;
}

export const formatAddress = (address: string) => {
  return address.slice(0, 6).concat("...", address.slice(-4));
};

export default function Home() {
  const { address, isConnected } = useAccount();
  const [zealyData, setZealyData] = useState<ZealyUser>({
    error: true,
    user: null,
  });

  const { data, isLoading } = useHomeData();

  const getZealy = async () => {
    if (address === undefined) return;
    const zealyData = await getZealyData(address);
    setZealyData(zealyData);
  };

  useEffect(() => {
    getZealy();
  }, [address]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className=" relative flex-grow">
        <div className="rounded-md overflow-hidden absolute top-2 bottom-2 right-2 left-2 -z-50">
          <img
            src="/background.jpg"
            alt="background"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="p-8">
          <p>User Address: {testAddress}</p>

          <div className="grid grid-cols-3 gap-8 mt-4">
            <div className="bg-[#FECB77] p-4 rounded-sm">
              <p className="text-2xl font-semibold mb-4">Recent Deposits</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token Address</TableHead>
                    <TableHead className="text-right">Amount (USD)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.userDeposits.map((deposit: any) => {
                    return (
                      <TableRow>
                        <TableCell className="font-medium">
                          {formatAddress(deposit.token_address)}
                        </TableCell>{" "}
                        <TableCell className="font-medium text-right">
                          {deposit.asset_deposited_value_usd}
                        </TableCell>{" "}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="bg-[#FECB77] p-4 rounded-sm flex flex-col">
              <p className="text-2xl font-semibold mb-4">
                Total Amount Deposited
              </p>
              <div className="mt-2">
                <p className="text-3xl opacity-80">
                  {data?.totalValueDeposited} ETH
                </p>
              </div>
              <p className="text-2xl font-semibold mb-4 mt-8">
                Total Points Earned
              </p>
              <div className="mt-2">
                <p className="text-3xl opacity-80">
                  {data?.totalPointsEarned.toFixed(2)} points
                </p>
              </div>
            </div>

            <div className="bg-[#FECB77] p-4 rounded-sm flex flex-col">
              <p className="text-2xl font-semibold mb-4">Points Earned</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token Address</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.userPoints.map((point: any) => {
                    return (
                      <TableRow>
                        <TableCell className="font-medium">
                          {point.token_address === "reference points"
                            ? point.token_address
                            : formatAddress(point.token_address)}
                        </TableCell>{" "}
                        <TableCell className="font-medium text-right">
                          {point.points}
                        </TableCell>{" "}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="bg-[#FECB77] p-4 rounded-sm">
              <p className="text-2xl font-semibold mb-4">Zealy</p>
              {zealyData.error ? (
                <div>
                  <p>
                    Not a member?{" "}
                    <a
                      href="#"
                      onClick={() =>
                        openNewTab("https://zealy.io/cw/ragafinancenexus")
                      }
                      className="underline text-blue-600"
                    >
                      Join
                    </a>{" "}
                    and connect ethereum wallet
                  </p>
                </div>
              ) : (
                <div>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>{zealyData.user?.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>XP</TableCell>
                        <TableCell>{zealyData.user?.xp}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>{zealyData.user?.rank}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Level</TableCell>
                        <TableCell>{zealyData.user?.level}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
