import React from "react";
import { EachNFTContainer, EachNFTImage, EachNFTText } from "../MainPageStyled";
import { Link } from "react-router-dom";

interface EachNFTProps {
	image: any;
	name?: string;
	link: string;
	highestBid?: string;
	handleNFTClick?: () => void;
}

const EachNFT: React.FC<EachNFTProps> = ({ image, name, link, handleNFTClick, highestBid }) => {
	return (
		<EachNFTContainer onClick={handleNFTClick}>
			<Link to={link} style={{ textDecoration: "none" }}>
				{image && <EachNFTImage src={image} />}
				<EachNFTText>{name} </EachNFTText>
				{/* <EachNFTText>{highestBid ?  `Current Bid: ${highestBid} ETH` : "No bids yet"}</EachNFTText> */}
			</Link>
		</EachNFTContainer>
	);
};

export default EachNFT;
