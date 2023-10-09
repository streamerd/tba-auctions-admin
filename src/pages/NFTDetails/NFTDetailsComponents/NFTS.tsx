import React from "react";
import { NFTSContainer } from "../NFTDetailsStyled";
import EachNFT from "./EachNFT";
interface NFTData {
  image?: string;
  name?: string;
  token_address?: string;
  token_id?: string;
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
        const tokenAddress = nftData?.token_address;
        const tokenId = nftData?.token_id;
        return (
          nftData && (
            <EachNFT
              key={index}
              image={NFTMetadata.image}
              name={NFTMetadata.name}
              tokenAddress={tokenAddress}
              tokenId={tokenId}
            />
          )
        );
      })}
    </NFTSContainer>
  );
};

export default NFTS;
