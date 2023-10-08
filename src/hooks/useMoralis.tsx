import React, { useEffect, useState } from "react";
import Moralis from "moralis";
import { useAccount } from "wagmi";
const adminWallets = [
	"0xb56dc5ebeec61e2c0667746f64fc916e262919c8",
	"0xed2ef70e8b1ebf95bdfd7ba692454143b2a8263b",
	"0x5ab45fb874701d910140e58ea62518566709c408",
	"0xd42d52b709829926531c64a32f2713b4dc8ea6f6",
];

// const adminWallets = [
//   "0xb56dc5ebeec61e2c0667746f64fc916e262919c8",
//   "0xed2ef70e8b1ebf95bdfd7ba692454143b2a8263b",
//   "0xd42d52b709829926531c64a32f2713b4dc8ea6f6",
// ];

function convertPinataToIPFS(url: string): string {
  // Check if the URL starts with the Pinata gateway URL
  const matchResult = url.match(
    /https:\/\/gateway\.pinata\.cloud\/ipfs\/([^/]+)(\/.*)/
  );

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
  if (!url) return null;
  if (url.startsWith("ipfs://"))
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

  const getNFTs = async () => {
    try {
      const response: any = await Moralis.EvmApi.nft.getWalletNFTs({
        chain: "0x1",
        // chain: "0xaa36a7",
        format: "decimal",
        mediaItems: false,
        address: myAddress,
      });
      setnftsInWallet(response.raw.result);
      console.log(`response.raw.result`, response.raw.result);
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
      // console.log(`updatedNfts`, updatedNfts);
      return updatedNfts;
    }
  };

  return returnData();
};
export default useMoralis;
