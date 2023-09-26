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
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijg3YmM4YTYyLTM2MGYtNDIwOS04MjI2LThmOGYwZTk0N2QxOSIsIm9yZ0lkIjoiMzU4Nzg5IiwidXNlcklkIjoiMzY4NzM2IiwidHlwZUlkIjoiYjA5ZGVjYmYtZGZhNi00ZWUyLWFhZTktMDQ4OGNjYTVlM2M3IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTU3Mjc3NTksImV4cCI6NDg1MTQ4Nzc1OX0.OrpN3YqHhVlZW2OEm-LajO4Z_E9hFL5Vv-qmCTskxfw"
			// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjdhYjgxZDlmLTZmM2ItNDI3Ni1iMDJkLWI5NDU4MTk5MzU1NCIsIm9yZ0lkIjoiMzU2Mjg5IiwidXNlcklkIjoiMzY2MTg0IiwidHlwZUlkIjoiMGY0NTc4NzQtM2I3Zi00MDk1LWI2MTUtNjM0Y2NjZjBkOWRlIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTQxMjA0NTAsImV4cCI6NDg0OTg4MDQ1MH0.QhQlENx2HCSQR4XgaBtOCNMZDRG-Bs2B_gQqe0KoJFA",
	});
	const getNFTs = async () => {
		try {
			if (addressData) {
				const response: any = await Moralis.EvmApi.nft.getWalletNFTs({
					chain: "0xaa36a7", // 0x1 for mainnet and 0xaa36a7 for sepolia
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
