import React from "react";
import {
	NFTDetailsContainer,
	MainNFTImage,
	MainNFTAndButtonsContainer,
	ButtonsContainer,
	ActionButton,
} from "./NFTDetailsStyled";
import mainNFT from "../../assets/mockAssets/mainNFT.jpg";
import NFTS from "./NFTDetailsComponents/NFTS";
import nft from "../../assets/mockAssets/nft.jpg";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { TokenboundClient } from "@tokenbound/sdk";

import { useCallback, useEffect, useState, useContext } from "react";
import { useEthers6Signer } from "../../hooks";

interface NFTData {
	image: any;
	name: string;
}

const NFTDetails = () => {
	const { isConnected, address } = useAccount();
	//make sure tbAccounts is an array of strings
	const [tbAccounts, setTbAccounts] = useState<`0x${string}`[]>([]);
	const [tbNFTs, setTbNFTs] = useState<string[]>([]);

	const signer = useEthers6Signer({ chainId: 11155111 });
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
		}

		testTokenboundClass();
	}, [tokenboundClient]);

	const createAccount = useCallback(async () => {
		if (!tokenboundClient || !address) return;
		const createdAccount = await tokenboundClient.createAccount({
			tokenContract: JSON.parse(localStorage.getItem("nftData")!).token_address,
			tokenId: JSON.parse(localStorage.getItem("nftData")!).token_id,
		});
		tbAccounts.push(createdAccount);
		alert(`new account: ${createdAccount}`);
	}, [tokenboundClient]);

	const executeCall = useCallback(async () => {
		if (!tokenboundClient || !address) return;
		const executedCall = await tokenboundClient.executeCall({
			account: address,
			to: address,
			value: 0n,
			data: "0x",
		});
	}, [tokenboundClient]);

	// get th NFT that owns a Tokenbound account
	const getNFT = async () => {
		console.log("gonna get NFT that owns a Tokenbound account", tbAccounts[0] || "no account");
		if (!tokenboundClient || !address) return;
		const nft = await tokenboundClient.getNFT({
			// accountAddress: tbAccounts[0],
			accountAddress: "0xCD4A65Fa90f15bd2Bf68b0F578E211f3FB5Dba64",
		});
		const { tokenContract, tokenId, chainId } = nft;

		console.log(`NFT ${tokenContract}/${tokenId} owns this account`);
	};
	const nftsData: NFTData[] = [
		// Declare nftsData as an array of NFTData objects
		{
			image: nft,
			name: "NFT 1",
		},
		{
			image: nft,
			name: "NFT 2",
		},
		{
			image: mainNFT,
			name: "NFT 3",
		},
		{
			image: nft,
			name: "NFT 4",
		},
		{
			image: nft,
			name: "NFT 5",
		},
		{
			image: mainNFT,
			name: "NFT 6",
		},
		{
			image: nft,
			name: "NFT 1",
		},
		{
			image: nft,
			name: "NFT 2",
		},
		{
			image: mainNFT,
			name: "NFT 3",
		},
		{
			image: nft,
			name: "NFT 4",
		},
		{
			image: nft,
			name: "NFT 5",
		},
		{
			image: mainNFT,
			name: "NFT 6",
		},
		{
			image: nft,
			name: "NFT 1",
		},
		{
			image: nft,
			name: "NFT 2",
		},
		{
			image: mainNFT,
			name: "NFT 3",
		},
		{
			image: nft,
			name: "NFT 4",
		},
		{
			image: nft,
			name: "NFT 5",
		},
		{
			image: mainNFT,
			name: "NFT 6",
		},
		{
			image: nft,
			name: "NFT 1",
		},
		{
			image: nft,
			name: "NFT 2",
		},
		{
			image: mainNFT,
			name: "NFT 3",
		},
		{
			image: nft,
			name: "NFT 4",
		},
		{
			image: nft,
			name: "NFT 5",
		},
		{
			image: mainNFT,
			name: "NFT 6",
		},
	];
	const nftData = JSON.parse(localStorage.getItem("nftData")!);
	const mainNFTImageSource: string = JSON.parse(nftData.metadata).image;

	console.log(JSON.parse(localStorage.getItem("nftData")!));

	return (
		<NFTDetailsContainer>
			<MainNFTAndButtonsContainer>
				<MainNFTImage src={mainNFTImageSource} />
				<ButtonsContainer>
					<ActionButton onClick={() => executeCall()}>EXECUTE CALL</ActionButton>
					<ActionButton onClick={() => createAccount()}>CREATE ACCOUNT</ActionButton>
					<ActionButton onClick={() => getNFT()}>GET NFT</ActionButton>
				</ButtonsContainer>
			</MainNFTAndButtonsContainer>

			<NFTS nftsData={nftsData} />
		</NFTDetailsContainer>
	);
};

export default NFTDetails;
