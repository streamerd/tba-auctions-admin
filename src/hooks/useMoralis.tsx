import React, { useEffect, useState } from "react";
import Moralis from "moralis";
import { useAccount } from "wagmi";

const useMoralis = () => {
	const [nftsInWallet, setnftsInWallet] = useState<any>();
	const { isConnected, address: addressData } = useAccount();
	/* const addressData = "0x891fe36E277844138b8f6D88a8BCD4871f446575"; */
	console.log(addressData);

	Moralis.start({
		apiKey:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjdhYjgxZDlmLTZmM2ItNDI3Ni1iMDJkLWI5NDU4MTk5MzU1NCIsIm9yZ0lkIjoiMzU2Mjg5IiwidXNlcklkIjoiMzY2MTg0IiwidHlwZUlkIjoiMGY0NTc4NzQtM2I3Zi00MDk1LWI2MTUtNjM0Y2NjZjBkOWRlIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTQxMjA0NTAsImV4cCI6NDg0OTg4MDQ1MH0.QhQlENx2HCSQR4XgaBtOCNMZDRG-Bs2B_gQqe0KoJFA",
	});
	const getNFTs = async () => {
		try {
			if (addressData) {
				const response: any = await Moralis.EvmApi.nft.getWalletNFTs({
					chain: "0xaa36a7",
					format: "decimal",
					mediaItems: false,
					address: addressData,
				});
				setnftsInWallet(response.raw.result);
				console.log(response.raw.result);
			}
		} catch (e) {
			console.error(e);
		}
	};
	useEffect(() => {
		getNFTs();
	}, [window.location.pathname, addressData]);
	return { nftsInWallet };
};

export default useMoralis;