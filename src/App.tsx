import { useAccount } from "wagmi";

import { useState } from "react";

import NFTDetails from "./pages/NFTDetails/NFTDetails";
import { Routes, Route } from "react-router-dom";
import Render from "./Render";
import MainPage from "./pages/NFTDetails/MainPage/MainPage";
import { useNavigate } from "react-router-dom";
import AdminStatusContext from "./contexts/AdminStatusContext";
import Footer from "./components/Footer/Footer";
import Moralis from "moralis";
export function App() {
const { address } = useAccount();

console.log("moralis apikey", import.meta.env.VITE_MORALIS_APIKEY)
  Moralis.start({
    apiKey: import.meta.env.VITE_MORALIS_APIKEY,
  });

  const adminWallets = [
    "0xb56dc5ebeec61e2c0667746f64fc916e262919c8",
    "0xed2ef70e8b1ebf95bdfd7ba692454143b2a8263b",
    "0x5ab45fb874701d910140e58ea62518566709c408",
    "0xd42d52b709829926531c64a32f2713B4dc8ea6f6",
  ];

  // const adminWallets = [
  //   "0xb56dc5ebeec61e2c0667746f64fc916e262919c8",
  //   "0x5ab45fb874701d910140e58ea62518566709c408",
  //   "0xd42d52b709829926531c64a32f2713B4dc8ea6f6",
  // ];

  const navigate = useNavigate();

  return (
    <AdminStatusContext.Provider
      value={{
        isAdmin: adminWallets.includes(address?.toLocaleLowerCase() as string),
      }}
    >
      <Routes>
        <Route
          path="/nft-details/*"
          element={
            <Render>
              <NFTDetails />
            </Render>
          }
        />
        <Route
          path="/"
          element={
            <Render>
              <MainPage />
            </Render>
          }
        />
      </Routes>
      <Footer />
    </AdminStatusContext.Provider>
  );
}
