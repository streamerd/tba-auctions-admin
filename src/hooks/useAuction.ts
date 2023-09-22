import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useEthers6Signer } from './useEthers6Signer';
import AuctionHouse from "../assets/abis/AuctionHouse.json"
import EnglishAuction from "../assets/abis/EnglishAuction.json"
import GoodAuction from "../assets/abis/GoodAuction.json"

export function useManageAuctions() {
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
    const contractAddress = '0xE60d4c5891F3eba32C1F48d8Cd176Cc776D7C2A9'
    const contract = new ethers.Contract(contractAddress, GoodAuction, signer);


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

    type HighestBid = {
        highestBid: number;
        bidder: string;
    }

    async function createAuction(nftContractAddress: string, tokenId: string) {
        const reservePrice: ethers.BigNumber = ethers.parseEther('1');

        try {
            console.log(`Creating auction for ${nftContractAddress} - ${tokenId}...`);
            const gasLimit = await signer?.provider.getFeeData();
            console.log('maxPriorityFeePerGas', gasLimit?.maxPriorityFeePerGas);
            // const tx = await contract.createAuction(nftContractAddress, tokenId, reservePrice, { gasLimit: 480000n });
            const tx = await contract.createAuction(nftContractAddress, tokenId, reservePrice, { gasLimit: 1000000n });

            await tx.wait(); // Wait for the transaction to be mined

            // console.log('Retrieving auction ID');
            // const auctionId = await contract.getAuctionId(nftContractAddress, tokenId);
            // setAuctionId(auctionId.toNumber());

            console.log('Auction created successfully!');
        } catch (error) {
            console.error('Error creating auction:', error);
        }
    }

    async function placeBid(auctionId: number, bidAmount: BigInt) {
        try {
            console.log('Placing bid...');
            const tx = await contract.placeBid(auctionId, { value: bidAmount, gasLimit: 480000n });
            await tx.wait(); // Wait for the transaction to be mined
            console.log(`Bid placed successfully!`);
        } catch (error) {
            console.error('Error placing bid:', error);
        }
    }

    async function endAuction(auctionId: number) {
        try {
            console.log('Ending auction...');
            const tx = await contract.endAuction(auctionId);
            await tx.wait(); // Wait for the transaction to be mined
            console.log(`Auction ${auctionId} ended successfully!`);
        } catch (error) {
            console.error('Error ending auction:', error);
        }
    }

    async function getAllAuctions(): Promise<Auction[]> {
        try {
            console.log('Getting auctions...');
            return await contract.getAllAuctions() || []
        } catch (error) {
            console.error('Error getting auctions:', error);
            return [];
        }
    }

    async function getAuction(auctionId: number): Promise<Auction> {
        try {
            console.log(`Getting auction ${auctionId}...`);
            // uses auctions map in the contract to get a specific auction
            const auctionData = await contract.auctions(auctionId) || null;
            if (auctionData) {
                return auctionData as Auction;
            } else {
                throw new Error(`Auction ${auctionId} not found`);
            }
        } catch (error) {
            console.error('Error getting auction:', error);
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
            console.error('Error getting remaining time:', error);
        }
    }

    async function getHighestBid(auctionId: number): HighestBid {
        try {
            console.log(`Getting highest bid for auction ${auctionId}...`);
            // fist get the auction and get its highestBid field value
            // use getAuction function above.
            const auction = await getAuction(auctionId) || null;
            if (!auction) {
                throw new Error(`Auction ${auctionId} not found`);
            }
            console.log(`Highest bid for auction ${auctionId} is ${auction.highestBid} by ${auction.highestBidder}`)
            return {
                bidder: auction.highestBidder,
                highestBid: auction.highestBid,
            };
        } catch (error) {
            console.error('Error getting highest bid:', error);
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
        getRemainingTime
    }
}