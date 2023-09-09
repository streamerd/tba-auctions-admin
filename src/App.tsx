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
export function App() {
	const { isConnected, address } = useAccount();
	//make sure tbAccounts is an array of strings
	const [tbAccounts, setTbAccounts] = useState<`0x${string}`[]>([]);
	const [tbNFTs, setTbNFTs] = useState<string[]>([]);

	const signer: any = useEthers6Signer({ chainId: 11155111 });
	// or useSigner() from legacy wagmi versions: const { data: signer } = useSigner()

	console.log("SIGNER", signer);
	const tokenboundClient = new TokenboundClient({ signer, chainId: 11155111 });
	// Created this: 0x991ECf27c7Bd254a383A9FDA12FB2205A6fB64D2
	useEffect(() => {
		async function testTokenboundClass() {
			const account = await tokenboundClient.getAccount({
				tokenContract: "0x55e786058b30687E2a3b0bFAbE56FFe2202F00D3",
				tokenId: "3",
			});

			const preparedExecuteCall = await tokenboundClient.prepareExecuteCall({
				account: account,
				to: account,
				value: 0n,
				data: "",
			});

			const preparedAccount = await tokenboundClient.prepareCreateAccount({
				tokenContract: "0x55e786058b30687E2a3b0bFAbE56FFe2202F00D3",
				tokenId: "3",
			});

			console.log("getAccount", account);
			console.log("prepareExecuteCall", preparedExecuteCall);
			console.log("preparedAccount", preparedAccount);

			// if (signer) {
			//   signer?.sendTransaction(preparedAccount)
			//   signer?.sendTransaction(preparedExecuteCall)
			// }
		}

		testTokenboundClass();
	}, [tokenboundClient]);

	const adminWallet = "0xB56DC5EBEEc61e2c0667746F64FC916e262919c8";
	const navigate = useNavigate();
	useEffect(() => {
		if (address === adminWallet) {
			navigate("/my-nfts");
		} else {
			navigate("/");
		}
	}, [address]);
	return (
		<Routes>
			{address === adminWallet && (
				<>
					<Route
						path="/nft-details"
						element={
							<Render>
								<NFTDetails />
							</Render>
						}
					/>
					<Route
						path="/my-nfts"
						element={
							<Render>
								<MainPage />
							</Render>
						}
					/>
				</>
			)}
			<Route path="/" element={<Render><AuctionHouse/></Render>} />
		</Routes>
	);
}
