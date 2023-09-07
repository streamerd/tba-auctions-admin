import React from "react";
import { NFTSContainer } from "../NFTDetailsStyled";
import EachNFT from "./EachNFT";
interface NFTData {
	image: string;
	name: string;
}

interface NFTSProps {
	nftsData: NFTData[];
}

type NFTSFC = React.FC<NFTSProps>;

const NFTS: NFTSFC = ({ nftsData }) => {
	return (
		<NFTSContainer>
			{nftsData.map((nftData: NFTData, index: any) => {
				const { image, name } = nftData;
				return <EachNFT key={index} image={image} name={name} />;
			})}
		</NFTSContainer>
	);
};

export default NFTS;
