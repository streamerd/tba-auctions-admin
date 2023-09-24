import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useEthers6Signer } from "./useEthers6Signer";
import AuctionHouse from "../assets/abis/AuctionHouse.json";
import EnglishAuction from "../assets/abis/EnglishAuction.json";
import GoodAuction from "../assets/abis/GoodAuction.json";
import usePost from "./usePost";
import BestAuction from "../assets/abis/BestAuction.json";
import BetterAuction from "../assets/abis/BetterAuction.json";
import BesttAuction from "../assets/abis/BesttAuction.json";
import GreatestAuction from "../assets/abis/GreatestAuction.json";
import GreatestAuction2 from "../assets/abis/GreatestAuction2.json";
import { useAccount } from "wagmi";
import useFetch from "./useFetch";
import usePatch from "./usePatch";

const useManageAuctions = ({ auction_id }: any) => {
	const signer = useEthers6Signer();

	//   const contractAddress = '0x70EbB29b1011198a725084639a5635305222d7c6';
	//   const contract = new ethers.Contract(contractAddress, AuctionHouse, signer);

	//   const contractAddress = '0xAc2641Cf579fd163CCCA896a1E87921b54191Aa7'
	// const contract = new ethers.Contract(contractAddress, EnglishAuction, signer);

	// const contractAddress = '0x5eE1C0044D3dCe620dCa89BE9C76814D152A9f36'
	// const contractAddress = '0xEBaeBd21576c80573d668Afed93AC82A51A4a352';
	// const contractAddress = '0x21193bC6a19e4010AE09771d2EFAB396BD748f44';
	// const contractAddress = '0xEa8B3052eD4dc21Ea0E1f88c970A1e815D3F7e14';
	// const contractAddress = '0x8Eb77dAb4EAD1ECF46cf01e4b0Fb00ca4eFF72BD';
	// const contractAddress = '0x913992335C86b8c4ba7114b65d50A32E8Cc4D503';
	// const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
	/* const contractAddress = "0xE60d4c5891F3eba32C1F48d8Cd176Cc776D7C2A9"; */
	// const contractAddress = "0x32bFaBE29f94A362ff16Ad2F29AfcCD9346edcdA";
	// const contractAddress = "0xfe0C31F42B68FeBa664464fbF649F41509315032";
	// const contractAddress = "0x8191873Fd780437f4E4E5BE48F4E35d91C0711e4";
	// const contractAddress = "0xb057336a044894E39aF4F7B86Be08Bf5f1c92419";
	// const contractAddress = "0x1433238162705afE8aFe76E97D9Ec2d4AB9c5e9b";
	const contractAddress = "0x29E3d4A4740dbC5C98c31957710365B7D4BD6941";

	const contract = new ethers.Contract(contractAddress, GreatestAuction2, signer);

	const [auctionId, setAuctionId] = useState(null);
	/* const reservePrice = 1000000000000000000; */ // 1 ETH
	/* const duration = 60 * 60 * 24 * 3; */ // 3 days

	type Auction = {
		auctionId: number;
		nftContract: string; // Assuming Ethereum addresses are represented as strings
		tokenId: number;
		reservePrice: number;
		endTime: number; // Unix timestamp representing time
		highestBidder: string; // Assuming Ethereum addresses are represented as strings
		highestBid: number;
		ended: boolean;
	};
	const [remainingTime, setremainingTime] = useState();
	useEffect(() => {
		(async () => {
			console.log(auction_id);
			if (auction_id !== "") {
				const remainingTime1 = await contract
					.getRemainingTime(auction_id)
					.then((res) => {
						setremainingTime(res);
						console.log(res);
					})
					.catch((err: any) => {
						console.log(err);
					});
				console.log(remainingTime1);
			}
		})();
	}, [auction_id]);

	const { postReq } = usePost();
	const { patchReq } = usePatch();
	const [auctionsLength, setauctionsLength] = useState(0);
	async function createAuction(
		nftContractAddress: string | ethers.Overrides,
		tokenId: string | ethers.Overrides,
		reservePrice: string
	) {
		return new Promise(async (resolve, reject) => {
			const parsedReservePrice: ethers.BigNumberish = ethers.parseEther(reservePrice);
			console.log(typeof parsedReservePrice);
			console.log(`Creating auction for ${nftContractAddress} ${tokenId} ${reservePrice}...`);
			try {
				const gasLimit = await signer?.provider.getFeeData();
				console.log("maxPriorityFeePerGas", gasLimit?.maxPriorityFeePerGas);
				// const tx = await contract.createAuction(nftContractAddress, tokenId, reservePrice, { gasLimit: 480000n });
				const tx = await contract.createAuction(nftContractAddress, tokenId, parsedReservePrice, {
					gasLimit: 1000000n,
				});

				await tx
					.wait()
					.then(async (txRes: any) => {
						postReq({
							path: "/auctions/new",
							data: {
								contract_address: nftContractAddress,
								token_id: tokenId,
								reserve_price: reservePrice,
								end_time: 0,
								highest_bidder: "",
								highest_bid: 0,
								ended: false,
								metadata: JSON.parse(localStorage.getItem("nftData")!).metadata,
							},
						});
					})
					.catch((err: any) => {
						console.log(err);
					}); // Wait for the transaction to be mined
				resolve("SUCCESS");

				console.log("Auction created successfully!");
			} catch (error) {
				console.error("Error creating auction:", error);
				reject("ERROR");
			}
		});
	}

	const { address }: any = useAccount();
	async function placeBid(auctionId: number, bidAmount: string) {
		// const bidAmountPrice2: ethers.BigNumberish = ethers.parseEther(bidAmount);
		const bidAmountPrice = ethers.parseUnits(bidAmount, "ether");
		console.log(` auctionId: ${auctionId} bidAmountPrice: ${bidAmountPrice}`);
		// const bidAmountPrice = ethers.parseUnits(bidAmount.toString(), "ether");
		console.log(`bidAmountPrice: ${bidAmountPrice}`);
		try {
			console.log(`Placing bid for auction ${auctionId}..${bidAmount}`);

			const tx = await contract.placeBid(auctionId, { value: bidAmountPrice, gasLimit: 1000000n });
			console.log(getRemainingTime);
			await tx.wait().then(async (txRes: any) => {
				console.log(txRes);
				await postReq({
					path: "/bids/new",
					data: { auction_id: auctionId, bid_amount: parseFloat(bidAmount), bidder: address },
				});

				await patchReq({
					path: `/updates/highest-bid/${auctionId}`,
					data: { auction_id: auctionId, highest_bid: parseFloat(bidAmount), highest_bidder: address },
				});
			}); // Wait for the transaction to be mined
			console.log(`Bid placed successfully!`);
		} catch (error) {
			console.error("Error placing bid:", error);
		}
	}

	async function endAuction(auctionId: number) {
		try {
			console.log("Ending auction...");
			const tx = await contract.endAuction(auctionId);
			await tx.wait(); // Wait for the transaction to be mined
			console.log(`Auction ${auctionId} ended successfully!`);
		} catch (error) {
			console.error("Error ending auction:", error);
		}
	}

	async function getAllAuctions(): Promise<Auction[]> {
		try {
			console.log("Getting auctions...");
			return (await contract.getAllAuctions()) || [];
		} catch (error) {
			console.error("Error getting auctions:", error);
			return [];
		}
	}

	async function getAuction(auctionId: number): Promise<Auction> {
		try {
			console.log(`Getting auction ${auctionId}...`);
			// uses auctions map in the contract to get a specific auction
			const auctionData = (await contract.auctions(auctionId)) || null;
			if (auctionData) {
				return auctionData as Auction;
			} else {
				throw new Error(`Auction ${auctionId} not found`);
			}
		} catch (error) {
			console.error("Error getting auction:", error);
			return {} as Auction;
		}
	}

	// get remaining time in seconds
	async function getRemainingTime(auctionId: number) {
		try {
			console.log(`Getting remaining time for auction ${auctionId}...`);
			const remainingTime = contract.getRemainingTime(auctionId);
			if (remainingTime) {
				return remainingTime;
			}
		} catch (error) {
			console.error("Error getting remaining time:", error);
		}
	}

	async function getHighestBid(auctionId: number) {
		try {
			console.log(`Getting highest bid for auction ${auctionId}...`);
			// fist get the auction and get its highestBid field value
			// use getAuction function above.
			const auction = (await getAuction(auctionId)) || null;
			if (!auction) {
				throw new Error(`Auction ${auctionId} not found`);
			}
			console.log(
				`Highest bid for auction ${auctionId} is ${auction.highestBid} by ${auction.highestBidder}`
			);
			return {
				bidder: auction.highestBidder,
				highestBid: auction.highestBid,
			};
		} catch (error) {
			console.error("Error getting highest bid:", error);
		}
	}

	// useEffect(() => {

	// }, []);

	return {
		createAuction,
		endAuction,
		placeBid,
		getAuction,
		getAllAuctions,
		getHighestBid,
		getRemainingTime,
		remainingTime,
	};
};

export { useManageAuctions };
