import React from "react";
import { EachNFTContainer, EachNFTImage, EachNFTText } from "../NFTDetailsStyled";
import { Link } from "react-router-dom";
interface EachNFTProps {
	image: any;
	name?: string;
}

const EachNFT: React.FC<EachNFTProps> = ({ image, name}) => {
	return (
		<EachNFTContainer>
				{image && <EachNFTImage src={image} />}
				<EachNFTText>{name}</EachNFTText>
		</EachNFTContainer>
	);
};

export default EachNFT;