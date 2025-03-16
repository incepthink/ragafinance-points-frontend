"use client";

import { ethers } from "ethers";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <div className="w-screen">
      <nav className="px-8 flex justify-between items-center w-full">
        <div className="w-28">
          <img
            src="/raga-logo.svg"
            alt="logo"
            className="object-cover w-full"
          />
        </div>

        <ConnectButton />
      </nav>
    </div>
  );
};

export default Navbar;
