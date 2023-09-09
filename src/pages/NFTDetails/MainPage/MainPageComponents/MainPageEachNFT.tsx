import React from "react";
import { EachNFTContainer, EachNFTImage, EachNFTText } from "../MainPageStyled";
import { Link } from "react-router-dom";

interface EachNFTProps {
	image: any;
	name?: string;
	link: string;
	handleNFTClick?: () => void;
}

const EachNFT: React.FC<EachNFTProps> = ({ image, name, link, handleNFTClick }) => {
	return (
		<EachNFTContainer onClick={handleNFTClick}>
			<Link to={link} style={{ textDecoration: "none" }}>
				<EachNFTImage src={image} />
				<EachNFTText>{name}</EachNFTText>
			</Link>
		</EachNFTContainer>
	);
};

export default EachNFT;