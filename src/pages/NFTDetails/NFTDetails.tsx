import React from "react";
import {
	NFTDetailsContainer,
	MainNFTImage,
	MainNFTAndButtonsContainer,
	ButtonsContainer,
	ActionButton,
	SmartContractWalletAddress,
	LinkContent,
	NFTSContainer,
	NftsOfMainNftContainer,
	NftsHeadText,
} from "./NFTDetailsStyled";
import mainNFT from "../../assets/mockAssets/mainNFT.jpg";
import NFTS from "./NFTDetailsComponents/NFTS";
import nft from "../../assets/mockAssets/nft.jpg";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { TokenboundClient } from "@tokenbound/sdk";

import { useCallback, useEffect, useState, useContext } from "react";
import { useEthers6Signer } from "../../hooks";
import { Link, json } from "react-router-dom";
import { ExternalLinkIcon } from "../../components/ExternalLinkIcon";
import useMoralis from "../../hooks/useMoralis";
import styled from "styled-components";
import usePost from "../../hooks/usePost";
import useFetch from "../../hooks/useFetch";
import AdminStatusContext from "../../contexts/AdminStatusContext";
import { useManageAuctions } from "../../hooks/useAuction";
interface NFTData {
	image?: any;
	name?: string;
}

// interface IMeta {
//   name?: string;
//   image?: string;
// }

const NFTDetails = () => {
	const parsedNftData = JSON.parse(localStorage.getItem("nftData")!);
	const [createdAccount, setcreatedAccount] = useState<string>();
	const { isConnected, address } = useAccount();
	//make sure tbAccounts is an array of strings
	const [tbAccounts, setTbAccounts] = useState<`0x${string}`[]>([]);
	const [tbNFTs, setTbNFTs] = useState<string[]>([]);

	const local = localStorage.getItem(`${parsedNftData.token_address}/${parsedNftData.token_id}`)!;

	const nftsInWallet = useMoralis(local === null ? "no_nft" : local);

	const signer: any = useEthers6Signer({ chainId: 11155111 });
	// or useSigner() from legacy wagmi versions: const { data: signer } = useSigner()

	const tokenboundClient = new TokenboundClient({ signer, chainId: 11155111 });
	// Created this: 0x991ECf27c7Bd254a383A9FDA12FB2205A6fB64D2
	useEffect(() => {
		async function testTokenboundClass() {
			const account = await tokenboundClient.getAccount({
				tokenContract: parsedNftData.token_address,
				tokenId: parsedNftData.token_id,
			});

			/* const preparedExecuteCall = await tokenboundClient.prepareExecuteCall({
				account: account,
				to: account,
				value: 0n,
				data: "",
			});

			const preparedAccount = await tokenboundClient.prepareCreateAccount({
				tokenContract: parsedNftData.token_address,
				tokenId: parsedNftData.token_id,
			}); */
		}

		testTokenboundClass();
	}, [tokenboundClient]);

	const { postReq } = usePost();
	const createAccount = useCallback(async () => {
		if (!tokenboundClient || !address) return;
		const createdAccount = await tokenboundClient.createAccount({
			tokenContract: parsedNftData.token_address,
			tokenId: parsedNftData.token_id,
		});
		tbAccounts.push(createdAccount);

		setcreatedAccount(createdAccount);
		const metadataPostData = {
			contract_address: parsedNftData.token_address,
			token_id: parsedNftData.token_id,
			description: JSON.parse(parsedNftData.metadata).name,
			image_url: JSON.parse(parsedNftData.metadata).image,
		};
		const newWalletPostData = {
			contract_address: parsedNftData.token_address,
			token_id: parsedNftData.token_id,
			wallet_address: createdAccount,
		};
		const metadataResponse = await postReq({ path: "/metadata/new", data: metadataPostData });
		const walletsCreateResponse = await postReq({
			path: "/wallets/new",
			data: newWalletPostData,
		});
	}, [tokenboundClient]);

	const executeCall = useCallback(async () => {
		if (!tokenboundClient || !address) return;
		await tokenboundClient.executeCall({
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
	};
	const { isAdmin } = useContext(AdminStatusContext) as { isAdmin: boolean };

	const nftsData: NFTData[] = [];
	const nftData = parsedNftData;
	const mainNFTImageSource: string = isAdmin
		? JSON.parse(parsedNftData.metadata).image
		: parsedNftData.image_url;

	const LastBidsContainer = styled.div`
		width: 100%;
		min-height: 300px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	`;

	const EachBid = styled.div`
		width: 100%;
		height: 60px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border: 1px solid #373737;
		padding: 10px 20px;
	`;

	const EachBidNameText = styled.p`
		font-size: 16px;
		font-weight: 500;
		color: #373737;
	`;

	const EachBidImage = styled.img`
		width: 50px;
		height: 50px;
		border-radius: 50%;
	`;

	const EachBidAvatarNameContainer = styled.div`
		display: flex;
		align-items: center;
		gap: 30px;
	`;

	interface EachBidProps {
		item: {
			name: string;
			bidPrice: string;
		};
	}

	const EachBidComponent: React.FC<EachBidProps> = ({ item }) => {
		return (
			<EachBid>
				<EachBidAvatarNameContainer>
					<EachBidImage src={`https://robohash.org/${"asd"}.png`} />
					<EachBidNameText>{item.name}</EachBidNameText>
				</EachBidAvatarNameContainer>
				<EachBidNameText>{item.bidPrice} ETH</EachBidNameText>
			</EachBid>
		);
	};

	const fakeData = [
		{
			name: "HARDY",
			bidPrice: "1.8",
		},
		{
			name: "HARDY",
			bidPrice: "1.8",
		},
		{
			name: "HARDY",
			bidPrice: "1.8",
		},
	];

	const { createAuction, endAuction, getHighestBid, placeBid, getAllAuctions } = useManageAuctions();

	return (
		<NFTDetailsContainer>
			<MainNFTAndButtonsContainer>
				<MainNFTImage src={mainNFTImageSource} />
				<ButtonsContainer>
					{/* <ActionButton onClick={() => executeCall()}>PREPARE ACCOUNT</ActionButton> */}
					{!localStorage.getItem(`${nftData.token_address}/${nftData.token_id}`)?.includes("0x") ? (
						<>
							{isAdmin ? (
								<>
									<ActionButton onClick={() => createAccount()}>create account</ActionButton>
									<ActionButton
										onClick={() =>
											createAuction(
												JSON.parse(localStorage.getItem("nftData")!).token_address,
												JSON.parse(localStorage.getItem("nftData")!).token_id
											)
										}
									>
										create auction
									</ActionButton>

									<ActionButton
										onClick={() =>
											endAuction(
												0
											)
										}
									>
										end auction
									</ActionButton>

									<ActionButton
										onClick={() =>
											getHighestBid(0)
										}
									>
										get highest bid
									</ActionButton>

									<ActionButton
										onClick={() =>
											placeBid(0, 10000000000000000)
										}
									>
										place bid
									</ActionButton>

									
								</>
							) : (
								<>
									<input style={{ height: "50px", width: "70%" }} placeholder="BID PRICE (MIN 1.8 ETH)" />{" "}
									<ActionButton onClick={() => createAccount()}>BID</ActionButton>
								</>
							)}
						</>
					) : (
						<SmartContractWalletAddress>
							<Link
								to={
									"https://sepolia.etherscan.io/address/" +
									localStorage.getItem(`${nftData.token_address}/${nftData.token_id}`)
								}
								target="_blank"
								style={{ textDecoration: "none" }}
							>
								<LinkContent>
									{localStorage.getItem(`${nftData.token_address}/${nftData.token_id}`) ||
										(createdAccount &&
											localStorage.getItem(`${nftData.token_address}/${nftData.token_id}`)) ||
										createdAccount}
									<ExternalLinkIcon />
								</LinkContent>
							</Link>
						</SmartContractWalletAddress>
					)}
				</ButtonsContainer>
				<LastBidsContainer>
					{fakeData.map((item, idx) => {
						return <EachBidComponent key={idx} item={item} />;
					})}
				</LastBidsContainer>
			</MainNFTAndButtonsContainer>

			<NftsOfMainNftContainer>
				<NftsHeadText>Collectibles [{nftsInWallet?.length}]</NftsHeadText>
				<NFTS nftsData={nftsInWallet} />
			</NftsOfMainNftContainer>
		</NFTDetailsContainer>
	);
};

export default NFTDetails;
