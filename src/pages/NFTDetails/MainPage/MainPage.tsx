import React, { useEffect, useState } from "react";
import { MainPageContainer, MainPageNFTsContainer } from "./MainPageStyled";
import EachNFT from "../MainPage/MainPageComponents/MainPageEachNFT";
import nft from "../../../assets/mockAssets/nft.jpg";
import Moralis from "moralis";
import json from "parse-json";

interface NFTData {
	image?: any;
	name?: string;
	metadata?: string;
}

const MainPage = () => {
	const [nftsInWallet, setnftsInWallet] = useState<[metadata: any]>();
	useEffect(() => {
		(async () => {
			try {
				await Moralis.start({
					apiKey:
						"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjdhYjgxZDlmLTZmM2ItNDI3Ni1iMDJkLWI5NDU4MTk5MzU1NCIsIm9yZ0lkIjoiMzU2Mjg5IiwidXNlcklkIjoiMzY2MTg0IiwidHlwZUlkIjoiMGY0NTc4NzQtM2I3Zi00MDk1LWI2MTUtNjM0Y2NjZjBkOWRlIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTQxMjA0NTAsImV4cCI6NDg0OTg4MDQ1MH0.QhQlENx2HCSQR4XgaBtOCNMZDRG-Bs2B_gQqe0KoJFA",
				});

				const response: any = await Moralis.EvmApi.nft.getWalletNFTs({
					chain: "0xaa36a7",
					format: "decimal",
					mediaItems: false,
					address: "0xaD960855bAa13f88242C201F1dc62d178e6Df75B",
				});

				setnftsInWallet(response.raw.result);
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);

	interface NFTData {
		image?: any;
		metadata?: string;
	}

	interface IMeta {
		name?: string;
		image?: string;
	}
	return (
		<MainPageContainer>
			<MainPageNFTsContainer>
				{nftsInWallet?.map((nftData) => {
					const nftMetaData: IMeta = JSON.parse(nftData.metadata);
					console.log(nftMetaData.name);
					return <EachNFT image={nftMetaData.image} name={nftMetaData.name} link={"/nft-details"} />;
				})}
			</MainPageNFTsContainer>
		</MainPageContainer>
	);
};

export default MainPage;
