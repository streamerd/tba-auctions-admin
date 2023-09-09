import React, { useEffect, useState } from "react";
import { MainPageContainer, MainPageNFTsContainer } from "./MainPageStyled";
import EachNFT from "../MainPage/MainPageComponents/MainPageEachNFT";
import Moralis from "moralis";
import useMoralis from "../../../hooks/useMoralis";

const MainPage = () => {
	interface IMeta {
		name?: string;
		image?: string;
	}
	const { nftsInWallet } = useMoralis();
	console.log(nftsInWallet);
	return (
		<MainPageContainer>
			<MainPageNFTsContainer>
				{nftsInWallet?.map((nftData: { metadata: any; token_id: React.Key | null | undefined }) => {
					if (nftData.metadata) {
						const handleNFTClick = async () => {
							await localStorage.setItem("nftData", JSON.stringify(nftData));
							console.log("CLICK DATA", localStorage.getItem("nftData"));
						};
						const nftMetaData: IMeta = JSON.parse(nftData.metadata);
						return (
							<EachNFT
								key={nftData.token_id}
								image={nftMetaData.image}
								name={nftMetaData.name}
								link={"/nft-details"}
								handleNFTClick={handleNFTClick}
							/>
						);
					} else {
						return null;
					}
				})}
			</MainPageNFTsContainer>
		</MainPageContainer>
	);
};

export default MainPage;
