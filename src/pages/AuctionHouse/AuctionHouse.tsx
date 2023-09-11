import React, { useEffect, useState } from "react";
import { MainPageContainer, MainPageNFTsContainer } from "../../pages/NFTDetails/MainPage/MainPageStyled";
// import EachNFT from "../MainPage/MainPageComponents/MainPageEachNFT";
import Moralis from "moralis";
import useMoralis from "../../hooks/useMoralis";
import EachNFT from "../NFTDetails/NFTDetailsComponents/EachNFT";
import AuctionHouseImg from "../../assets/auction-house.png";

const AuctionHouse = () => {
	interface IMeta {
		name?: string;
		image?: string;
	}
	// const  nftsInWallet  = useMoralis("0x10C70d04200379c89254579995eF23F1c3093334")
	// console.log(nftsInWallet);
	return (
		<div className="full-image-div">
		<img
		  src={AuctionHouseImg} // Replace with the URL of your full image
		  alt="Full Image"
		  style={{ width: "100%", height: "100%", objectFit: "contain"}}
		//   className="full-image"
		/>
	  </div>
		// <MainPageContainer>
		// 	hello
		// </MainPageContainer>
	);
};

export default AuctionHouse;
