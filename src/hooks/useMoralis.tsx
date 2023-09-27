import React, { useEffect, useState } from "react";
import Moralis from "moralis";
import { useAccount } from "wagmi";
import useFetch from "./useFetch";
// import axios from "axios";

// function extractIPFSTail(ipfsLink:string) {
// 	const parts = ipfsLink.split('//');
// 	if (parts.length === 2) {
// 	  return parts[1];
// 	} else {
// 	  return null; // Invalid IPFS link format
// 	}
//   }

// export async function resolveIPFSLink(ipfsLink: string) {
//   // Specify the IPFS gateway URL you want to use
//   const ipfsGatewayUrl = 'https://ipfs.io/ipfs/';

//   try {
//     // Send an HTTP GET request to the IPFS gateway
//     const response = await axios.get(`${ipfsGatewayUrl}${ipfsLink}`);

//     // Check if the request was successful (status code 200)
//     if (response.status === 200) {
//       // The resolved URL can be obtained from the response's request URL
//       const resolvedUrl = response.request.res.responseUrl;
//       return resolvedUrl;
//     } else {
//       // Handle other status codes if needed
//       throw new Error(`Failed to resolve IPFS link. Status code: ${response.status}`);
//     }
//   } catch (error: any) {
//     console.error('Error:', error?.message);
//     // Handle errors here
//     return null;
//   }
// }

const useMoralis = (address: any) => {
	const [nftsInWallet, setnftsInWallet] = useState<any>();
	const { isConnected, address: addressData } = useAccount();
	/* const addressData = "0x891fe36E277844138b8f6D88a8BCD4871f446575"; */

	const myAddress = address ? address : addressData;
// console.log(myAddress)
	
// const resolveIPFS = async (ipfsLink: string) => {

// await resolveIPFS(ipfsLink)
//   .then((resolvedUrl) => {
//     if (resolvedUrl) {
//       console.log('Resolved URL:', resolvedUrl);
//     } else {
//       console.log('Failed to resolve IPFS link.');
//     }
//   })
//   .catch((error) => {
//     console.error('Error:', error.message);
//   });
// }
	const getNFTs = async () => {
		try {
			if (addressData) {
				// console.log(`getting nfts in wallet for ${myAddress}`)
				const response: any = await Moralis.EvmApi.nft.getWalletNFTs({
					chain: "0x1", // 0x1 for mainnet and 0xaa36a7 for sepolia
					format: "decimal",
					mediaItems: false,
					address: myAddress,
				})
				console.log(`response`, JSON.stringify(response.raw.result));
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
