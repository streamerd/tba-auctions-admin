import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useEthers6Signer } from './useEthers6Signer';
import AuctionHouse from "../assets/abis/AuctionHouse.json"


// Create an instance of the contract

export function useManageAuctions() {
  const signer = useEthers6Signer();
  const contractAddress = '0x70EbB29b1011198a725084639a5635305222d7c6';
  const contract = new ethers.Contract(contractAddress, AuctionHouse, signer);
    const [auctionId, setAuctionId] = useState(null);
    /* const reservePrice = 1000000000000000000; */ // 1 ETH
    /* const duration = 60 * 60 * 24 * 3; */ // 3 days
    const reservePrice = 1000000000000000; 
    const duration = 600

    async function createAuction(nftContractAddress: string, tokenId: string) {
        try {
            console.log('Creating auction...');
            const tx = await contract.createAuction(nftContractAddress, tokenId, reservePrice, duration);
            await tx.wait(); // Wait for the transaction to be mined

            console.log('Retrieving auction ID');
            const auctionId = await contract.getAuctionId(nftContractAddress, tokenId);
            setAuctionId(auctionId.toNumber());

            console.log('Auction created successfully!');
        } catch (error) {
            console.error('Error creating auction:', error);
        }
    }

    async function endAuction(auctionId: number) {
        try {
            console.log('Ending auction...');
            const tx = await contract.endAuction(auctionId);
            await tx.wait(); // Wait for the transaction to be mined
            console.log( `Auction ${auctionId} ended successfully!` );
        } catch (error) {
            console.error('Error ending auction:', error);
        }
    }

    // useEffect(() => {

    // }, []);

    return {
        createAuction,
        endAuction,
    };
}