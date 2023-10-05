import React, { useContext, useEffect, useState } from "react";
import Moralis from "moralis";
import { useAccount } from "wagmi";
import useFetch from "./useFetch";
import axios from "axios";
import AdminStatusContext from "../contexts/AdminStatusContext";

const adminWallet = "0xb56dc5ebeec61e2c0667746f64fc916e262919c8"; //tolgay - sepolia
// const adminWallet = "0xed2ef70e8b1ebf95bdfd7ba692454143b2a8263b"; //tolgay - maimnet

// const adminWallet = "0x5ab45fb874701d910140e58ea62518566709c408"; // chibu
// const adminWallet = "0xd42d52b709829926531c64a32f2713b4dc8ea6f6"; // cat
const adminWallets = ["0xb56dc5ebeec61e2c0667746f64fc916e262919c8", "0xed2ef70e8b1ebf95bdfd7ba692454143b2a8263b", "0x5ab45fb874701d910140e58ea62518566709c408", "0xd42d52b709829926531c64a32f2713b4dc8ea6f6"];

function convertPinataToIPFS(url: string): string {
	// Check if the URL starts with the Pinata gateway URL
	const matchResult = url.match(/https:\/\/gateway\.pinata\.cloud\/ipfs\/([^/]+)(\/.*)/);

	if (matchResult) {
		// Extract the CID and file path from the URL
		const [, cid, filePath] = matchResult;

		// Create the IPFS.io URL by combining the CID and file path
		return `https://ipfs.io/ipfs/${cid}${filePath}`;
	} else {
		// Return the original URL if it doesn't match the Pinata gateway format
		return url;
	}
}

const resolveRenderUrl = (url: string) => {
	// Implement your logic to convert url to imgUrlToRender
	// For example, you can replace "ipfs://" with "https://ipfs.io/ipfs/"

	if (!url) return null;
	if (url.startsWith("ipfs://"))
		// https://ipfs.io/ipfs/QmNWmLm82E8XaRaQyCSWio58ndibte4XMm5NnQBKqui9E9/AccessPass_02.svg
		// ipfs://QmNWmLm82E8XaRaQyCSWio58ndibte4XMm5NnQBKqui9E9/AccessPass_02.svg
		return url.replace("ipfs://", "https://ipfs.io/ipfs/");
	if (url.includes("https://ipfs.io/ipfs")) return url;
	if (url.includes("gateway.pinata")) {
		const pinataUrl = convertPinataToIPFS(url);
		return pinataUrl;
	}
	return url;
};

const useMoralis = (address: any) => {
	const [nftsInWallet, setnftsInWallet] = useState<any>();
	const { isConnected, address: connectedAddress } = useAccount();

	const myAddress = address ? address : connectedAddress?.toLocaleLowerCase();
	// console.log(address);
	// const { isAdmin } = useContext(AdminStatusContext) as { isAdmin: boolean };
	// console.log("adminWallet", adminWallet);
	// console.log("connectedAddress", connectedAddress);
	// console.log("myAddress to get nfts", myAddress);

	// console.log("isAdmin", adminWallet.toLocaleLowerCase() === myAddress.toLocaleLowerCase());
	const getNFTs = async () => {
		try {
			if (connectedAddress?.trim().toLocaleLowerCase() === adminWallet?.trim().toLocaleLowerCase()) {
				// console.log("adminWallet", adminWallet);
				// console.log("connectedAddress", connectedAddress);
				// console.log("isAdmin", isAdmin);
				const response: any = await Moralis.EvmApi.nft.getWalletNFTs({
					// chain: "0x1", 
          chain: "0xaa36a7", 
					format: "decimal",
					mediaItems: false,
					address: myAddress,
					// address: "0x5ab45fb874701d910140e58ea62518566709c408"
				});
				setnftsInWallet(response.raw.result);
			}
		} catch (e) {
			console.error(e);
		}
	};
	useEffect(() => {
		getNFTs();
	}, [window.location.pathname, myAddress, address]);

	const returnData = () => {
		if (address === "no_nft") {
			return [];
		} else {
			let updatedNfts: any = [];
			if (nftsInWallet?.length > 0) {
				console.log(`nftsInWallet`, nftsInWallet);
				updatedNfts = nftsInWallet?.map((nft: any) => {
					const updatedNft = { ...nft };
					const metadata = JSON.parse(updatedNft?.metadata);
					const resolved = resolveRenderUrl(metadata?.image);
					if (resolved) {
						metadata.image = resolved;
						updatedNft.metadata = JSON.stringify(metadata);
						return updatedNft;
					}
				});
			}
			console.log(`updatedNfts`, updatedNfts);
			return updatedNfts;
		}
	};

	return returnData();
};
export default useMoralis;
