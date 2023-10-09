import React, { useContext } from "react";
import {
	IntroContainer,
	IntroText,
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
import { useManageAuctions } from "../../../hooks/useAuction";
import MainPageImage from "../../../assets/MainPageImage.png";

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

	const adminWallets = [
	  "0xb56dc5ebeec61e2c0667746f64fc916e262919c8",
	  "0xed2ef70e8b1ebf95bdfd7ba692454143b2a8263b",
	  "0x5ab45fb874701d910140e58ea62518566709c408",
	  "0xd42d52b709829926531c64a32f2713b4dc8ea6f6",
	];

	// const adminWallets = [
	// 	"0xb56dc5ebeec61e2c0667746f64fc916e262919c8",
	// 	"0x5ab45fb874701d910140e58ea62518566709c408",
	// 	"0xd42d52b709829926531c64a32f2713b4dc8ea6f6",
	// ];

	const { contract } = useManageAuctions({ auctionId: "" });

	async function getRemainingTime(auctionId: any) {
		try {
			await contract
				.getRemainingTime(auctionId)
				.then((res: any) => {
					if (res !== undefined) {
						console.log(`remaining time for auction ${auctionId} is ${res}`);
						return res;
					}
				})
				.catch((err: any) => {
					console.log(err);
				});
		} catch (error) {
			console.error("Error getting remaining time:", error);
		}
	}

	return (
		<MainPageContainer>
			<IntroContainer>
				<IntroTextContainer>
					<IntroText>
						DOSSIERS: <br></br>
						Immerse yourself into the mysteries surrounding the events at Hightop Hotel. Each of the Five
						files gleam insights from a larger investigation. Within each ERC6551 case file is a 1of1 from
						a collaborating artist as well as a section of prose exploring the world.
						<br></br>
						<br></br>
						Winners of each auction will receive the 6551 and all its contents as well as be mailed the
						physical dossier, filled with prints of all collab pieces, a hand typed copy of each prose,
						and a handmade Hightop Hotel keycard NFC tag pairing the physical to its NFT counterpart.
					</IntroText>
				</IntroTextContainer>
				<MyLink href="https://opensea.io/collection/dossiers" target="_blank">
					<OpenseaLogo src={MainPageImage} />
				</MyLink>
			</IntroContainer>
			<MainPageNFTsContainer>
				{adminWallets.includes(address?.trim()?.toLocaleLowerCase() ?? "") && (
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
										localStorage.setItem("nftData", JSON.stringify(nftData));
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

				{auctions && !adminWallets.includes(address?.trim()?.toLocaleLowerCase() ?? "") && (
					<>
						{auctions?.map((auction: any | null) => {
							// console.log(`auction`, auction);
							const auctionMetadata = JSON.parse(auction.metadata);
							// console.log(`auctionMetadata`, auctionMetadata);
							const handleNFTClick = async () => {
								getRemainingTime(auction?.auction_id).then((res: any) => {
									if (auction?.auction_id !== "") {
										console.log(`res`, res);
										return res;
									}
								});
								// console.log(`remaining`, remaining);
								localStorage.setItem(
									"nftData",
									JSON.stringify({
										auction_id: auction.auction_id,
										token_address: auction.contract_address,
										token_id: auction.token_id,
										metadata: auction.metadata,
										highest_bid: auction.highest_bid,
										remainingTime: 0,
									})
								);
							};

							console.log(`auction highest bid`, auction.highest_bid);
							return (
								<EachNFT
									key={auction.id}
									image={auctionMetadata.image}
									name={auctionMetadata.name}
									highestBid={auction.highest_bid}
									link={`/nft-details/${auction.contract_address}/${auction.token_id}`}
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
