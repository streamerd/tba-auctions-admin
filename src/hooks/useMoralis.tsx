import React, { useEffect, useState } from "react";
import Moralis from "moralis";
import { useAccount } from "wagmi";
import useFetch from "./useFetch";
import axios from "axios";

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
  // Implement your logic to convert url to imgUrlToRender
  // For example, you can replace "ipfs://" with "https://ipfs.io/ipfs/"

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
  const { isConnected, address: addressData } = useAccount();

  const myAddress = address ? address : addressData;

  const getNFTs = async () => {
    try {
      if (addressData) {
        const response: any = await Moralis.EvmApi.nft.getWalletNFTs({
          chain: "0x1", // 0x1 for mainnet and 0xaa36a7 for sepolia
          format: "decimal",
          mediaItems: false,
          address: myAddress,
        });
        // console.log(`response`, JSON.stringify(response.raw.result));
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
      // this is a hack to show no nft in the wallet for non-admins.
      return [];
    } else {
      let updatedNfts: any = [];
      if (nftsInWallet?.length > 0) {
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
      return updatedNfts;
    }
  };

  return returnData();
};
export default useMoralis;
