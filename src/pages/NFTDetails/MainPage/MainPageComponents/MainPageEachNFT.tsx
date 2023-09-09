import React from "react";
import { EachNFTContainer, EachNFTImage, EachNFTText } from "../MainPageStyled";

interface EachNFTProps {
	image: any;
	name: string;
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
