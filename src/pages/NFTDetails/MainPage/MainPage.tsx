import React, { useContext, useEffect, useState } from "react";
import {
  IntroContainer,
  IntroTextContainer,
  MainPageContainer,
  MainPageNFTsContainer,
} from "./MainPageStyled";
import EachNFT from "../MainPage/MainPageComponents/MainPageEachNFT";
import Moralis from "moralis";
import useMoralis from "../../../hooks/useMoralis";
import AdminStatusContext from "../../../contexts/AdminStatusContext";
import useFetch from "../../../hooks/useFetch";
import opensea from "../../../assets/opensea-logo.png";
import { OpenseaLogo } from "../NFTDetailsStyled";
import { MyLink } from "../../../components/Footer/Footer";

const MainPage = () => {
  interface IMeta {
    description: string | undefined;
    image_url: any;
    name?: string;
    image?: string;
  }
  const nftsInWallet = useMoralis(null);
  const wallets = useFetch({ path: "/wallets" });
  const metadatas: any = useFetch({ path: "/metadata" });
  const { isAdmin } = useContext(AdminStatusContext) as { isAdmin: boolean };
  const auctions: any = useFetch({ path: "/auctions" });
  console.log(auctions);
  return (
    <MainPageContainer>
      <IntroContainer>
        <IntroTextContainer>
          Dossiers: 
		  <br></br>
		  Immerse yourself into the mysteries surrounding the events
          at Hightop Hotel. Each of the Five files gleam insights from a larger
          investigation. Within each ERC6551 case file is a 1of1 from a
          collaborating artist as well as a section of prose exploring the
          world. 
		  <br></br><br></br>

		  Winners of each auction will receive the 6551 and all its
          contents as well as be mailed the physical dossier, filled with prints
          of all collab pieces, a hand typed copy of each prose, and a handmade
          Hightop Hotel keycard NFC tag pairing the physical to its NFT
          counterpart.
        </IntroTextContainer>
		<MyLink href="https://opensea.io/collection/dossiers" target="_blank">
		<OpenseaLogo src={opensea} />
          </MyLink>
        
      </IntroContainer>
      <MainPageNFTsContainer>
        {isAdmin && (
          <>
            {nftsInWallet?.map(
              (
                nftData: {
                  metadata: any;
                  token_id: React.Key | null | undefined;
                },
                index: number
              ) => {
                if (nftData.metadata) {
                  const handleNFTClick = async () => {
                    await localStorage.setItem(
                      "nftData",
                      JSON.stringify(nftData)
                    );
                  };
                  const nftMetaData: IMeta = JSON.parse(nftData.metadata);
                  return (
                    <EachNFT
                      key={index}
                      image={nftMetaData.image}
                      name={nftMetaData.name}
                      link={"/nft-details"}
                      // highestBid={nftData.highest_bid}
                      handleNFTClick={handleNFTClick}
                    />
                  );
                } else {
                  return null;
                }
              }
            )}
          </>
        )}
        {auctions && !isAdmin && (
          <>
            {auctions?.map((auction: any | null) => {
              console.log(`auction`, auction);
              const auctionMetadata = JSON.parse(auction.metadata);
              console.log(`auctionMetadata`, auctionMetadata);
              const handleNFTClick = async () => {
                await localStorage.setItem(
                  "nftData",
                  JSON.stringify({
                    auction_id: auction.auction_id,
                    token_address: auction.contract_address,
                    token_id: auction.token_id,
                    metadata: auction.metadata,
                    highest_bid: auction.highest_bid,
                  })
                );
              };

              console.log(`auction highest bid`, auction.highest_bid);
              return (
                <EachNFT
                  key={auctionMetadata.token_id}
                  image={auctionMetadata.image}
                  name={auctionMetadata.name}
                  highestBid={auction.highest_bid}
                  link={"/nft-details"}
                  handleNFTClick={handleNFTClick}
                />
              );
            })}
          </>
        )}
      </MainPageNFTsContainer>
    </MainPageContainer>
  );
};

export default MainPage;
