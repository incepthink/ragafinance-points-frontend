"use client";

import Navbar from "@/components/Navbar";
import { fetchDeposits } from "@/utils/dataFetch";
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

const formatAddress = (address: string) => {
  return address.slice(0, 6).concat("...", address.slice(-4));
};

export default function Home() {
  const [deposits, setDeposits] = useState({
    deposits: [],
    points: [],
    totalValueDeposited: 0,
    totalPointsEarned: 0,
  });

  const getData = async () => {
    const deposits = await fetchDeposits(
      "0x2FF0c59B5768E53bCE1077569cDe9811940e3eBD"
    );
    setDeposits(deposits);
  };

  useEffect(() => {
    getData();
  }, []);

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

        <div className="grid grid-cols-3 p-8 gap-8">
          <div className="bg-[#FECB77] p-4 rounded-sm">
            <p className="text-2xl font-semibold mb-4">Recent Deposits</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token Address</TableHead>
                  <TableHead className="text-right">Amount (ETH)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deposits.deposits.map((deposit: any) => {
                  return (
                    <TableRow>
                      <TableCell className="font-medium">
                        {formatAddress(deposit.token_address)}
                      </TableCell>{" "}
                      <TableCell className="font-medium text-right">
                        {deposit.asset_deposited_value_eth}
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
                {deposits.totalValueDeposited} ETH
              </p>
            </div>
            <p className="text-2xl font-semibold mb-4 mt-8">
              Total Points Earned
            </p>
            <div className="mt-2">
              <p className="text-3xl opacity-80">
                {deposits.totalPointsEarned.toFixed(2)} points
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
                {deposits.points.map((point: any) => {
                  return (
                    <TableRow>
                      <TableCell className="font-medium">
                        {formatAddress(point.token_address)}
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
        </div>
      </div>
    </div>
  );
}
