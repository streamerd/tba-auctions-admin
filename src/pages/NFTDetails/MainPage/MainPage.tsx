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
import { useAccount } from "wagmi";

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
  const { isConnected, address } = useAccount();

  	// const adminWallet = "0xB56DC5EBEEc61e2c0667746F64FC916e262919c8"; //tolgay - sepolia
		const adminWallet = "0xEd2eF70e8B1EBf95bDfD7ba692454143b2A8263B"; //tolgay - maimnet

	// const adminWallet = "0x5ab45fb874701d910140e58ea62518566709c408"; // chibu
	// const adminWallet = "0xd42D52b709829926531c64a32f2713B4Dc8eA6F6" // cat
console.log("address", address)
console.log("address === adminWallet", address === adminWallet)
  // console.log("nfstInWallet", nftsInWallet);
  // console.log(auctions);
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
        {address === adminWallet && (
          <>
            {nftsInWallet?.map(
              (
                nftData: {
                  metadata: any;
                  token_address: string;
                  token_id: React.Key | null | undefined;
                },
                index: number
              ) => {
                if (nftData?.metadata) {
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
                      link={`/nft-details/${nftData.token_address}/${nftData.token_id}`}
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
        {auctions && !(address === adminWallet ) && (
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
