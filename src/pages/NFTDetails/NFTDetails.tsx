import React from "react";
import {
  NFTDetailsContainer,
  MainNFTImage,
  MainNFTAndButtonsContainer,
  ButtonsContainer,
  ActionButton,
  SmartContractWalletAddress,
  LinkContent,
  NFTSContainer,
  NftsOfMainNftContainer,
  NftsHeadText
} from "./NFTDetailsStyled";
import mainNFT from "../../assets/mockAssets/mainNFT.jpg";
import NFTS from "./NFTDetailsComponents/NFTS";
import nft from "../../assets/mockAssets/nft.jpg";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { TokenboundClient } from "@tokenbound/sdk";

import { useCallback, useEffect, useState, useContext } from "react";
import { useEthers6Signer } from "../../hooks";
import { Link } from "react-router-dom";
import { ExternalLinkIcon } from "../../components/ExternalLinkIcon";
import useMoralis from "../../hooks/useMoralis";
import styled from "styled-components";
interface NFTData {
  image?: any;
  name?: string;
}


// interface IMeta {
//   name?: string;
//   image?: string;
// }

const NFTDetails = () => {
  const [createdAccount, setcreatedAccount] = useState<string>();
  const { isConnected, address } = useAccount();
  //make sure tbAccounts is an array of strings
  const [tbAccounts, setTbAccounts] = useState<`0x${string}`[]>([]);
  const [tbNFTs, setTbNFTs] = useState<string[]>([]);

  const local = localStorage.getItem(
    `${JSON.parse(localStorage.getItem("nftData")!).token_address}/${
      JSON.parse(localStorage.getItem("nftData")!).token_id
    }`
  )!;

  const nftsInWallet = useMoralis(
  local === null ? "no_nft": local);

  console.log("NFTS IN WALLET", nftsInWallet);

  const signer = useEthers6Signer({ chainId: 11155111 });
  // or useSigner() from legacy wagmi versions: const { data: signer } = useSigner()

  console.log("SIGNER", signer);
  const tokenboundClient = new TokenboundClient({ signer, chainId: 11155111 });
  // Created this: 0x991ECf27c7Bd254a383A9FDA12FB2205A6fB64D2
  useEffect(() => {
    async function testTokenboundClass() {
      const account = await tokenboundClient.getAccount({
        tokenContract: JSON.parse(localStorage.getItem("nftData")!)
          .token_address,
        tokenId: JSON.parse(localStorage.getItem("nftData")!).token_id,
      });

      /* const preparedExecuteCall = await tokenboundClient.prepareExecuteCall({
				account: account,
				to: account,
				value: 0n,
				data: "",
			});

			const preparedAccount = await tokenboundClient.prepareCreateAccount({
				tokenContract: JSON.parse(localStorage.getItem("nftData")!).token_address,
				tokenId: JSON.parse(localStorage.getItem("nftData")!).token_id,
			}); */
    }

    testTokenboundClass();
  }, [tokenboundClient]);

  const createAccount = useCallback(async () => {
    if (!tokenboundClient || !address) return;
    const createdAccount = await tokenboundClient.createAccount({
      tokenContract: JSON.parse(localStorage.getItem("nftData")!).token_address,
      tokenId: JSON.parse(localStorage.getItem("nftData")!).token_id,
    });
    tbAccounts.push(createdAccount);

    setcreatedAccount(createdAccount);
    localStorage.setItem(
      `${JSON.parse(localStorage.getItem("nftData")!).token_address}/${
        JSON.parse(localStorage.getItem("nftData")!).token_id
      }`,
      createdAccount
    );
  }, [tokenboundClient]);

  const executeCall = useCallback(async () => {
    if (!tokenboundClient || !address) return;
    await tokenboundClient.executeCall({
      account: address,
      to: address,
      value: 0n,
      data: "0x",
    });
  }, [tokenboundClient]);

  // get th NFT that owns a Tokenbound account
  const getNFT = async () => {
    console.log(
      "gonna get NFT that owns a Tokenbound account",
      tbAccounts[0] || "no account"
    );
    if (!tokenboundClient || !address) return;
    const nft = await tokenboundClient.getNFT({
      // accountAddress: tbAccounts[0],
      accountAddress: "0xCD4A65Fa90f15bd2Bf68b0F578E211f3FB5Dba64",
    });
    const { tokenContract, tokenId, chainId } = nft;

    console.log(`NFT ${tokenContract}/${tokenId} owns this account`);
  };
  const nftsData: NFTData[] = [];
  const nftData = JSON.parse(localStorage.getItem("nftData")!);
  const mainNFTImageSource: string = JSON.parse(nftData.metadata).image;

  console.log(
    localStorage.getItem(`${nftData.token_address}/${nftData.token_id}`)
  );
    
  return (
    <NFTDetailsContainer>
      <MainNFTAndButtonsContainer>
        <MainNFTImage src={mainNFTImageSource} />
        <ButtonsContainer>
          {/* <ActionButton onClick={() => executeCall()}>PREPARE ACCOUNT</ActionButton> */}
          {!localStorage
            .getItem(`${nftData.token_address}/${nftData.token_id}`)
            ?.includes("0x") ? (
            <ActionButton onClick={() => createAccount()}>
              create account
            </ActionButton>
          ) : (
            <SmartContractWalletAddress>
              <Link
                to={
                  "https://sepolia.etherscan.io/address/" +
                  localStorage.getItem(
                    `${nftData.token_address}/${nftData.token_id}`
                  )
                }
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <LinkContent>
                  {localStorage.getItem(
                    `${nftData.token_address}/${nftData.token_id}`
                  ) ||
                    (createdAccount &&
                      localStorage.getItem(
                        `${nftData.token_address}/${nftData.token_id}`
                      )) ||
                    createdAccount}
                  <ExternalLinkIcon />
                </LinkContent>
              </Link>
            </SmartContractWalletAddress>
          )}
        </ButtonsContainer>
      </MainNFTAndButtonsContainer>

      <NftsOfMainNftContainer>
        <NftsHeadText>Collectibles</NftsHeadText>
      <NFTS nftsData={nftsInWallet} />
      </NftsOfMainNftContainer>
    </NFTDetailsContainer>
  );
};

export default NFTDetails;
