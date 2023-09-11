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
      {nftsData?.map((nftData: any) => {
        if (nftData.metadata) {
          
          const nftMetaData: IMeta = JSON.parse(nftData.metadata);
          return (
            <EachNFT
              key={nftData.token_id}
              image={nftMetaData.image}
              name={nftMetaData.name}
            />
          );
        } else {
          return null;
        }
      })}
    </NFTSContainer>
  );
};

export default NFTS;
