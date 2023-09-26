import React, { useEffect, useState } from "react";
import Moralis from "moralis";
import { useAccount } from "wagmi";
import useFetch from "./useFetch";

const useMoralis = (address: any) => {
	const [nftsInWallet, setnftsInWallet] = useState<any>();
	const { isConnected, address: addressData } = useAccount();
	/* const addressData = "0x891fe36E277844138b8f6D88a8BCD4871f446575"; */

	const myAddress = address ? address : addressData;

	Moralis.start({
		apiKey:
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjE2MDlkMmEyLWNkODQtNDc0OS1iMWUyLTJjYzcxMmQwMWY1YSIsIm9yZ0lkIjoiMzU4Nzg5IiwidXNlcklkIjoiMzY4NzM2IiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiJiMDlkZWNiZi1kZmE2LTRlZTItYWFlOS0wNDg4Y2NhNWUzYzciLCJpYXQiOjE2OTU3NTU3OTksImV4cCI6NDg1MTUxNTc5OX0.U-tfjAsKmJpdt7U4rfkLSFTrwHXDLJXhGPm-wwEERQM"
	});
	const getNFTs = async () => {
		try {
			if (addressData) {
				const response: any = await Moralis.EvmApi.nft.getWalletNFTs({
					chain: "0x1", // 0x1 for mainnet and 0xaa36a7 for sepolia
					format: "decimal",
					mediaItems: false,
					address: myAddress,
				});
				setnftsInWallet(response.raw.result);
			}
		} catch (e) {
			console.error(e);
		}
	};
	/* const nftsInAuction = useFetch(""); */
	useEffect(() => {
		getNFTs();
	}, [window.location.pathname, myAddress]);
	const returnData = () => {
		if (address === "no_nft") {
			return [];
		} else {
			return nftsInWallet;
		}
	};
	return returnData();
};

export default useMoralis;
