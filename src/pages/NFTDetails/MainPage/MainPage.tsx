import React, { useContext, useEffect, useState } from "react";
import { MainPageContainer, MainPageNFTsContainer } from "./MainPageStyled";
import EachNFT from "../MainPage/MainPageComponents/MainPageEachNFT";
import Moralis from "moralis";
import useMoralis from "../../../hooks/useMoralis";
import AdminStatusContext from "../../../contexts/AdminStatusContext";
import useFetch from "../../../hooks/useFetch";

const MainPage = () => {
	interface IMeta {
		description: string | undefined;
		image_url: any;
		name?: string;
		image?: string;
	}
	const nftsInWallet = useMoralis(null);
	const wallets = useFetch({ path: "/wallets" });
	const metadatas: any = useFetch({ path: "/metadata" });
	const { isAdmin } = useContext(AdminStatusContext) as { isAdmin: boolean };
	return (
		<MainPageContainer>
			<MainPageNFTsContainer>
				{isAdmin && (
					<>
						{nftsInWallet?.map((nftData: { metadata: any; token_id: React.Key | null | undefined }) => {
							if (nftData.metadata) {
								const handleNFTClick = async () => {
									await localStorage.setItem("nftData", JSON.stringify(nftData));
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
					</>
				)}
				{metadatas && !isAdmin && (
					<>
						{metadatas?.map((metadata: any | null) => {
							const handleNFTClick = async () => {
								await localStorage.setItem("nftData", JSON.stringify(metadata));
							};
							return (
								<EachNFT
									key={metadata.token_id}
									image={metadata.image_url}
									name={metadata.description}
									link={"/nft-details"}
									handleNFTClick={handleNFTClick}
								/>
							);
						})}
					</>
				)}
			</MainPageNFTsContainer>
		</MainPageContainer>
	);
};

export default MainPage;
