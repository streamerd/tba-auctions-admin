import React from "react";
import { NFTSContainer } from "../NFTDetailsStyled";
import EachNFT from "./EachNFT";
interface NFTData {
	image?: string;
	name?: string;
}

interface NFTSProps {
	nftsData?: NFTData[];
}

type NFTSFC = React.FC<NFTSProps>;

const NFTS: NFTSFC = ({ nftsData }) => {
	return (
		<NFTSContainer>
			{nftsData?.map((nftData: any, index: any) => {
				const NFTMetadata = nftData?.metadata && JSON.parse(nftData?.metadata);
				return nftData && <EachNFT key={index} image={NFTMetadata.image} name={NFTMetadata.name} />;
			})}
		</NFTSContainer>
	);
};

export default NFTS;
