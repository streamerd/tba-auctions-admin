import React from "react";
import {
  EachNFTContainer,
  EachNFTImage,
  EachNFTText,
} from "../NFTDetailsStyled";
import { Link } from "react-router-dom";
interface EachNFTProps {
  image: any;
  name?: string;
  tokenAddress?: string;
  tokenId?: string;
}

const EachNFT: React.FC<EachNFTProps> = ({
  image,
  name,
  tokenAddress,
  tokenId,
}) => {
  const openseaLink = `https://opensea.io/assets/${tokenAddress}/${tokenId}`;
  return (
    <EachNFTContainer>
      {/* {image && <EachNFTImage src={image} />} */}
      {image && (
        <Link to={openseaLink}>
          <EachNFTImage src={image} />
        </Link>
      )}
      <EachNFTText>{name}</EachNFTText>
    </EachNFTContainer>
  );
};

export default EachNFT;
