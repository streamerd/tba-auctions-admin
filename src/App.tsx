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
	Moralis.start({
		apiKey:
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjE2MDlkMmEyLWNkODQtNDc0OS1iMWUyLTJjYzcxMmQwMWY1YSIsIm9yZ0lkIjoiMzU4Nzg5IiwidXNlcklkIjoiMzY4NzM2IiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiJiMDlkZWNiZi1kZmE2LTRlZTItYWFlOS0wNDg4Y2NhNWUzYzciLCJpYXQiOjE2OTU3NTU3OTksImV4cCI6NDg1MTUxNTc5OX0.U-tfjAsKmJpdt7U4rfkLSFTrwHXDLJXhGPm-wwEERQM"
	});

	const signer: any = useEthers6Signer({ chainId: 1 });
	// or useSigner() from legacy wagmi versions: const { data: signer } = useSigner()

	console.log("SIGNER", signer);
	const tokenboundClient = new TokenboundClient({ signer, chainId: 1 });
	// Created this: 0x991ECf27c7Bd254a383A9FDA12FB2205A6fB64D2
	// useEffect(() => {
	// 	async function testTokenboundClass() {
	// 		const account = await tokenboundClient.getAccount({
	// 			tokenContract: "0x55e786058b30687E2a3b0bFAbE56FFe2202F00D3",
	// 			tokenId: "3",
	// 		});

	// 		const preparedExecuteCall = await tokenboundClient.prepareExecuteCall({
	// 			account: account,
	// 			to: account,
	// 			value: 0n,
	// 			data: "",
	// 		});

	// 		const preparedAccount = await tokenboundClient.prepareCreateAccount({
	// 			tokenContract: "0x55e786058b30687E2a3b0bFAbE56FFe2202F00D3",
	// 			tokenId: "3",
	// 		});

	// 		// if (signer) {
	// 		//   signer?.sendTransaction(preparedAccount)
	// 		//   signer?.sendTransaction(preparedExecuteCall)
	// 		// }
	// 	}

	// 	testTokenboundClass();
	// }, [tokenboundClient]);

	// const adminWallet = "0xB56DC5EBEEc61e2c0667746F64FC916e262919c8"; //tolgay - sepolia
		// const adminWallet = "0xEd2eF70e8B1EBf95bDfD7ba692454143b2A8263B"; //tolgay - maimnet

	const adminWallet = "0x5ab45fb874701d910140e58ea62518566709c408"; // chibu
	// const adminWallet = "0xd42D52b709829926531c64a32f2713B4Dc8eA6F6" // cat
	const navigate = useNavigate();
	useEffect(() => {
		if (address === adminWallet) {
			navigate("/");
		} else {
			navigate("/");
		}
	}, [address]);
	return (
		<AdminStatusContext.Provider
			value={{
				isAdmin: address === adminWallet,
			}}
		>
			<Routes>
				<Route
					path="/nft-details"
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
