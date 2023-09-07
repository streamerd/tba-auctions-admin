import React from "react";
import { NFTDetailsContainer, MainNFTImage } from "./NFTDetailsStyled";
import mainNFT from "../../assets/mockAssets/mainNFT.jpg";
import NFTS from "./NFTDetailsComponents/NFTS";
import nft from "../../assets/mockAssets/nft.jpg";

interface NFTData {
	image: any;
	name: string;
}

const NFTDetails = () => {
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

	return (
		<NFTDetailsContainer>
			<MainNFTImage src={mainNFT} />
			<NFTS nftsData={nftsData} />
		</NFTDetailsContainer>
	);
};

export default NFTDetails;
