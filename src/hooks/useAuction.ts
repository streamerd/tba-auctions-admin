import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useEthers6Signer } from "./useEthers6Signer";

import usePost from "./usePost";

// import DossiersAuction from "../assets/abis/finalize/3/DossiersAuction.json"; // was in production
// import DossiersAuction from "../assets/abis/finalize/4/DossiersAuction.json"; // is in production
// import DossiersAuction from "../assets/abis/finalize/5/DossiersAuction.json"; // is in production
// import DossiersAuctionEscrow from "../assets/abis/finalize/6/DossiersAuctionEscrow.json"; // is in production
import DossiersAuction from "../assets/abis/finalize/7/DossiersAuction.json"; // is in production


import { useAccount } from "wagmi";
import useFetch from "./useFetch";
import usePatch from "./usePatch";

const useManageAuctions = ({ auction_id }: any) => {
	const signer = useEthers6Signer();
	console.log("auction_id", auction_id);
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
	// const contractAddress = "0x29E3d4A4740dbC5C98c31957710365B7D4BD6941";
	// const contractAddress = "0xC442fAeE3acf4a60556246a61271C212a455f103";
	// const contractAddress = "0x5C44F3EB207c6917570a4c6c9B87a528163B16e7";
	// const contractAddress = "0x5C44F3EB207c6917570a4c6c9B87a528163B16e7"
	// const contractAddress = "0x18b157B75155286Ee3ef52695DA24e06C8ea82b6";
	// const contractAddress = "0x3fd717F3A83C90Ea58226C6573B5426a80fED2a0";
	// const contractAddress = "0xea1807Cb29841302D83a7f092d3dcE5F215F8286";
	// const contractAddress = "0x39a96fAFa010CD01Ce8AFEE9926640d3EDE13Bc9";
	// const contractAddress = "0x22d9950e8D12eD9E842D4ece279F3A232AaF37d6";
	// const contractAddress = "0x55e15adbE793931Cf60DAA389f84581910DC408A";
	// const contractAddress = "0x70abC76977e881DAa6A4880AbC91A77bB99d0BD3"; // tested except for endAuction
	// const contractAddress = "0x44Ac82abb5FD08263DCa0BF4324761DF680e263a"; // tested  for endAuction
	// const contractAddress = "0xC513329F47D1B6efbf8F50a6e8a3e7F467d82040"; //tested for multi bid
	// const contractAddress= "0x82Bd61FAB0659b30Efe4617873d0245EB87013D0"; // tested one bid pass one bid fail after endtime
	// const contractAddress = "0xE098De0BF344a3246D45d75fe457cf4132159f27"; //3/10/2023
	// const contractAddress = "0x39033C771e3f0E9659e35a3110a1C882922E41ec"; // 10 minutes
	 const contractAddress = "0xF70A7D3DFE564398065a1311704Ef5E5c7B6797d"

	const [remainingTime, setremainingTime] = useState<number>();

	useEffect(() => {
		getRemainingTime(auction_id);
		(async () => {
			if (typeof auction_id === "number") {
				console.log(`auction_id: ${auction_id}`);
				const getRem = async (aid: number) => {
					await getRemainingTime(aid);
				};
				await getRem(auction_id);
			}
		})();
	}, [auction_id]);

	const contract = new ethers.Contract(contractAddress, DossiersAuction, signer);

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

	// useEffect(() => {
	// 	console.log(`auction_id: ${auction_id}`);
	// 	if (typeof auction_id === "number") {
	// 		const getRem = (async () => { await getRemainingTime(auction_id); })
	// 		const rem = getRem().then((res: any) => {
	// 			if (res !== undefined) {
	// 				console.log(`res: ${res}`);
	// 				setremainingTime(res);
	// 			}
	// 			console.log(`res: ${res}`);
	// 		}
	// 		);
	// 		console.log(`rem: ${rem}`);
	// 	}
	// 	// const rem = getRem();
	// }
	// 	, []);

	const { postReq } = usePost();
	const { patchReq } = usePatch();
	// const [auctionsLength, setauctionsLength] = useState(0);
	async function createAuction(
		nftContractAddress: string | ethers.Overrides,
		tokenId: string | ethers.Overrides,
		reservePrice: string
	) {
		if (
			nftContractAddress === null ||
			nftContractAddress === "" ||
			tokenId === null ||
			tokenId === "" ||
			reservePrice === null ||
			reservePrice === ""
		) {
			console.log("no nftContractAddress or tokenId or reservePrice received");
			return;
		}

		return new Promise(async (resolve, reject) => {
			const parsedReservePrice: ethers.BigNumberish = ethers.parseEther(reservePrice);
			console.log(typeof parsedReservePrice);
			console.log(`Creating auction for ${nftContractAddress} ${tokenId} ${reservePrice}...`);
			try {
				const gasLimit = await signer?.provider.getFeeData();
				console.log("maxPriorityFeePerGas", gasLimit?.maxPriorityFeePerGas);
				const tx = await contract.createAuction(nftContractAddress, tokenId, parsedReservePrice, {
					gasLimit: 10000000n,
				});

				await tx
					.wait()
					.then(async (txRes: any) => {
						console.log(txRes);
						console.log("auction creation is finished. now getting auctionCounter value..");
						// get number of auctions with auctionCounter value in the contract
						await contract.auctionCounter().then(async (auctionCount: any) => {
							console.log(`auctionCount as-is : ${auctionCount} ${typeof auctionCount}`);
							console.log;
							
							const diff = auctionCount - BigInt(1);

							postReq({
								path: "/auctions/new",
								data: {
									auction_id: diff.toString(),
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
		if (auctionId === null || bidAmount === null || bidAmount === "") {
			console.log("no auctionId or bidAmount received");
			return;
		}
		// const bidAmountPrice2: ethers.BigNumberish = ethers.parseEther(bidAmount);
		const bidAmountPrice = ethers.parseUnits(bidAmount, "ether");
		console.log(` auctionId: ${auctionId} bidAmountPrice: ${bidAmountPrice}`);
		// const bidAmountPrice = ethers.parseUnits(bidAmount.toString(), "ether");
		console.log(`bidAmountPrice: ${bidAmountPrice}`);
		try {
			console.log(`Placing bid for auction ${auctionId}..${bidAmount}`);
			const tx = await contract.placeBid(auctionId, { value: bidAmountPrice, gasLimit: 10000000n });
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
			if (auctionId === null) {
				console.log("auctionId is null");
				return;
			}
			console.log(`about to end ${auctionId}...`);
			const tx = await contract.endAuction(auctionId);
			await tx.wait(); // Wait for the transaction to be mined
			console.log(`Auction ${auctionId} ended successfully!`);
		} catch (error) {
			console.error("Error ending auction:", error);
		}
	}

	// withdrawEth
	async function withdrawEth(auctionId: number) {
		try {
			console.log("Withdrawing Eth...");
			if (auctionId === null) {
				console.log("auctionId is null");
				return;
			}
			const tx = await contract.withdrawEth(auctionId);
			const status = await tx.wait(); // Wait for the transaction to be mined
			console.log(`Eth withdrawn successfully!`);
			return status;
		} catch (error) {
			console.error("Error withdrawing Eth:", error);
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
	async function getRemainingTime(id: any) {
		console.log(id);
		try {
			await contract
				.getRemainingTime(id)
				.then((res: any) => {
					if (res !== undefined) {
						console.log(res);
						const x = Number(res);
						console.log(x);
						setremainingTime(x);
						// setremainingTime(res);
						console.log("remaining time set", remainingTime);
						// return x;
					}
					// return res
				})
				.catch((err: any) => {
					// setremainingTime(undefined);
					console.log(err);
					return;
				});
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
		withdrawEth,
		remainingTime,
		contract,
	};
};

export { useManageAuctions };
