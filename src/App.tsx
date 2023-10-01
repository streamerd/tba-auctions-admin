import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { TokenboundClient } from "@tokenbound/sdk";

import { Account } from "./components";

import { useCallback, useEffect, useState } from "react";
import { useEthers6Signer } from "./hooks";
import { Navbar } from "./components/Navbar/Navbar";
import { MainContainer } from "./LayoutComponents/LayoutComponents";
import NFTDetails from "./pages/NFTDetails/NFTDetails";
import { Routes, Route } from "react-router-dom";
import Render from "./Render";
import MainPage from "./pages/NFTDetails/MainPage/MainPage";
import { useNavigate } from "react-router-dom";
import AuctionHouse from "./pages/AuctionHouse/AuctionHouse";
import AdminStatusContext from "./contexts/AdminStatusContext";
import Footer from "./components/Footer/Footer";
import Moralis from "moralis";
export function App() {
	const { isConnected, address } = useAccount();
	//make sure tbAccounts is an array of strings
	const [tbAccounts, setTbAccounts] = useState<`0x${string}`[]>([]);
	const [tbNFTs, setTbNFTs] = useState<string[]>([]);
	// Moralis.start({
	// 	apiKey:
	// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjE2MDlkMmEyLWNkODQtNDc0OS1iMWUyLTJjYzcxMmQwMWY1YSIsIm9yZ0lkIjoiMzU4Nzg5IiwidXNlcklkIjoiMzY4NzM2IiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiJiMDlkZWNiZi1kZmE2LTRlZTItYWFlOS0wNDg4Y2NhNWUzYzciLCJpYXQiOjE2OTU3NTU3OTksImV4cCI6NDg1MTUxNTc5OX0.U-tfjAsKmJpdt7U4rfkLSFTrwHXDLJXhGPm-wwEERQM"
	// });

	Moralis.start({
		apiKey:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjE2MDlkMmEyLWNkODQtNDc0OS1iMWUyLTJjYzcxMmQwMWY1YSIsIm9yZ0lkIjoiMzU4Nzg5IiwidXNlcklkIjoiMzY4NzM2IiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiJiMDlkZWNiZi1kZmE2LTRlZTItYWFlOS0wNDg4Y2NhNWUzYzciLCJpYXQiOjE2OTU3NTU3OTksImV4cCI6NDg1MTUxNTc5OX0.U-tfjAsKmJpdt7U4rfkLSFTrwHXDLJXhGPm-wwEERQM",
	});
	// console.log(process.env.REACT_APP_MORALIS_APIKEY);

	// const adminWallet = "0xB56DC5EBEEc61e2c0667746F64FC916e262919c8"; //tolgay - sepolia
	// const adminWallet = "0xed2ef70e8b1ebf95bdfd7ba692454143b2a8263b"; //tolgay - maimnet

	// const adminWallet = "0x5ab45fb874701d910140e58ea62518566709c408"; // chibu
	const adminWallet = "0xd42d52b709829926531c64a32f2713B4dc8ea6f6"; // cat
	// const adminWallets = ["0xb56dc5ebeec61e2c0667746f64fc916e262919c8", "0xed2ef70e8b1ebf95bdfd7ba692454143b2a8263b", "0x5ab45fb874701d910140e58ea62518566709c408", "0xd42d52b709829926531c64a32f2713B4dc8ea6f6"];

	const navigate = useNavigate();

	return (
		<AdminStatusContext.Provider
			value={{
				isAdmin: address?.toLocaleLowerCase() === adminWallet.toLocaleLowerCase(),
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
				{/* <Route
					path="/my-nfts"
					element={
						<Render>
							<AuctionHouse />
						</Render>
					}
				/> */}
			</Routes>
			<Footer />
		</AdminStatusContext.Provider>
	);
}
