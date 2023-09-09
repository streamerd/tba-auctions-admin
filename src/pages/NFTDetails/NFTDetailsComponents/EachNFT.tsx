import React from "react";
import { EachNFTContainer, EachNFTImage, EachNFTText } from "../NFTDetailsStyled";

interface EachNFTProps {
	image: any;
	name: string;
	link?: string;
}
const EachNFT: React.FC<EachNFTProps> = ({ image, name }) => {
	return (
		<EachNFTContainer>
			<EachNFTImage src={image} />
			<EachNFTText>{name}</EachNFTText>
		</EachNFTContainer>
	);
};

export default EachNFT;
