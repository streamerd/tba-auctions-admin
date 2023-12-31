import React from "react";
import { EachNFTContainer, EachNFTImage, EachNFTText } from "../MainPageStyled";
import { Link } from "react-router-dom";

interface EachNFTProps {
  image: any;
  name?: string;
  link: string;
  highestBid?: string;
  reservePrice?: string;
  owner?: string;
  handleNFTClick?: () => void;
}

const EachNFT: React.FC<EachNFTProps> = ({
  image,
  name,
  link,
  handleNFTClick,
  highestBid,
  reservePrice,
  owner,
}) => {
  return (
    <EachNFTContainer onClick={handleNFTClick}>
      <Link to={link} style={{ textDecoration: "none" }}>
        {image && <EachNFTImage src={image} />}
        <EachNFTText>{name} </EachNFTText>
        {/* <EachNFTText>{highestBid ?  `Place ${Number(highestBid) * 1.1} ETH min bid` : `Place ${reservePrice} ETH min bid`}</EachNFTText> */}
        <EachNFTText>Sold to {owner} </EachNFTText>
      </Link>
    </EachNFTContainer>
  );
};

export default EachNFT;
