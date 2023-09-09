import React from "react";
import { MainPageContainer, MainPageNFTsContainer } from "./MainPageStyled";
import EachNFT from "../NFTDetailsComponents/EachNFT";
import nft from "../../../assets/mockAssets/nft.jpg";

interface NFTData {
	image: any;
	name: string;
}
const MainPage = () => {
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
			image: nft,
			name: "NFT 1",
		},
		{
			image: nft,
			name: "NFT 2",
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
			image: nft,
			name: "NFT 1",
		},
		{
			image: nft,
			name: "NFT 2",
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
			image: nft,
			name: "NFT 1",
		},
		{
			image: nft,
			name: "NFT 2",
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
			image: nft,
			name: "NFT 1",
		},
		{
			image: nft,
			name: "NFT 2",
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
			image: nft,
			name: "NFT 1",
		},
		{
			image: nft,
			name: "NFT 2",
		},
	];
	return (
		<MainPageContainer>
			<MainPageNFTsContainer>
				{nftsData.map((nftData) => (
					<EachNFT image={nftData.image} name={nftData.name} />
				))}
			</MainPageNFTsContainer>
		</MainPageContainer>
	);
};

export default MainPage;
