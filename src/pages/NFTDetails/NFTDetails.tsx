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
  NftsHeadText,
  LastBidsContainer,
  EachBid,
  EachBidNameText,
  EachBidImage,
  EachBidAvatarNameContainer,
  NFTSDescription,
} from "./NFTDetailsStyled";
import mainNFT from "../../assets/mockAssets/mainNFT.jpg";
import NFTS from "./NFTDetailsComponents/NFTS";
import nft from "../../assets/mockAssets/nft.jpg";
import { ConnectKitButton } from "connectkit";
import { useAccount, useBalance } from "wagmi";
import { ethers } from "ethers";
import { TokenboundClient } from "@tokenbound/sdk";

import { useCallback, useEffect, useState, useContext } from "react";
import { useEthers6Signer } from "../../hooks";
import { Link, json } from "react-router-dom";
import { ExternalLinkIcon } from "../../components/ExternalLinkIcon";
import useMoralis from "../../hooks/useMoralis";
import styled from "styled-components";
import usePost from "../../hooks/usePost";
import useFetch from "../../hooks/useFetch";
import AdminStatusContext from "../../contexts/AdminStatusContext";
import { useManageAuctions } from "../../hooks/useAuction";
import AuctionReservedPrice from "../../LayoutComponents/AuctionReservedPrice";
interface NFTData {
  image?: any;
  name?: string;
}

// interface IMeta {
//   name?: string;
//   image?: string;
// }

const NFTDetails = () => {
  const parsedNftData = JSON.parse(localStorage.getItem("nftData")!);
  const [createdAccount, setcreatedAccount] = useState<string>();
  const { isConnected, address } = useAccount();

  const {
    data: balance,
    isError,
    isLoading,
  }: any = useBalance({
    address: address,
    chainId: 11155111,
    watch: false,
  });

  //   console.log(`balance:  ${balance?.formatted.slice(0, 4)} ${balance?.symbol}`);
  //   console.log(+balance?.formatted > 0.003);

  //make sure tbAccounts is an array of strings
  const [tbAccounts, setTbAccounts] = useState<`0x${string}`[]>([]);
  const [tbNFTs, setTbNFTs] = useState<string[]>([]);
  const [isInAuction, setisInAuction] = useState(false);
  const [hasWallet, sethasWallet] = useState("");
  /* const auctionData = useFetch({
		path: `/auctions/exists/${parsedNftData.token_address}/${parsedNftData.token_id}`,
	}); */
  const auctionData: any = useFetch({
    path: "/auctions",
  });

  const wallets: any = useFetch({ path: "/wallets" });
  useEffect(() => {
    {
      wallets &&
        wallets?.forEach((wallet: any) => {
          if (
            wallet.token_id === parsedNftData.token_id &&
            wallet.contract_address === parsedNftData.token_address
          ) {
            sethasWallet(wallet.wallet_address);
          }
        });
    }
  }, [wallets]);
  useEffect(() => {
    {
      console.log(auctionData);
      auctionData &&
        auctionData?.forEach((auction: any) => {
          if (
            auction.token_id === parsedNftData.token_id &&
            auction.contract_address === parsedNftData.token_address
          ) {
            setisInAuction(true);
          }
        });
    }
  }, [auctionData]);
  console.log(parsedNftData);
  const local = localStorage.getItem(
    `${parsedNftData.token_address}/${parsedNftData.token_id}`
  )!;

  const nftsInWallet = useMoralis(local === null ? "no_nft" : local);

  const signer: any = useEthers6Signer({ chainId: 11155111 });
  // or useSigner() from legacy wagmi versions: const { data: signer } = useSigner()

  const tokenboundClient = new TokenboundClient({ signer, chainId: 11155111 });
  // Created this: 0x991ECf27c7Bd254a383A9FDA12FB2205A6fB64D2
  useEffect(() => {
    async function testTokenboundClass() {
      const account = await tokenboundClient.getAccount({
        tokenContract: parsedNftData.token_address,
        tokenId: parsedNftData.token_id,
      });
    }

    testTokenboundClass();
  }, [tokenboundClient]);

  const { postReq } = usePost();
  const createAccount = useCallback(async () => {
    if (!tokenboundClient || !address) return;
    const createdAccount = await tokenboundClient.createAccount({
      tokenContract: parsedNftData.token_address,
      tokenId: parsedNftData.token_id,
    });
    tbAccounts.push(createdAccount);

    setcreatedAccount(createdAccount);
    const metadataPostData = {
      contract_address: parsedNftData.token_address,
      token_id: parsedNftData.token_id,
      description: JSON.parse(parsedNftData.metadata).name,
      image_url: JSON.parse(parsedNftData.metadata).image,
    };
    const newWalletPostData = {
      contract_address: parsedNftData.token_address,
      token_id: parsedNftData.token_id,
      wallet_address: createdAccount,
    };
    const metadataResponse = await postReq({
      path: "/metadata/new",
      data: metadataPostData,
    });
    const walletsCreateResponse = await postReq({
      path: "/wallets/new",
      data: newWalletPostData,
    });
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
  };
  const { isAdmin } = useContext(AdminStatusContext) as { isAdmin: boolean };

  const nftsData: NFTData[] = [];
  const nftData = parsedNftData;
  const mainNFTImageSource: string = JSON.parse(parsedNftData.metadata).image;

  interface EachBidProps {
    item: {
      bidder: string;
      bid_amount: string | number;
    };
  }
  const EachBidComponent: React.FC<EachBidProps> = ({ item }) => {
    console.log(item);
    return (
      <EachBid>
        <EachBidAvatarNameContainer>
          <EachBidImage src={`https://robohash.org/${item.bidder}.png`} />
          <EachBidNameText>
            {item.bidder.slice(0, 4) + "..." + item.bidder.slice(-4)}
          </EachBidNameText>
        </EachBidAvatarNameContainer>
        <EachBidNameText>{item.bid_amount} ETH</EachBidNameText>
      </EachBid>
    );
  };

  // return true or false
  // when placeBid is called, if bid amount is less than highest bid * 11/10, return false
  // if bid amount is greater than highest bid * 11/10, return true
  // if bid is less than reserve price, return false
  // if bid is greater than reserve price, return true
  // make all checks in the function
  //   const checkValidBid = (): boolean  => {
  //     return
  //     lastBids && lastBids.length > 0
  //       ? parseFloat(bidValue) >
  //         (parseFloat(lastBids?.reverse()[0].bid_amount) * 11) / 10
  //       : parseFloat(bidValue) >
  //         parseFloat(auctionData?.[parsedNftData.auction_id]?.reserve_price)

  // 			// balance && balance.formatted
  // 			//   ? parseFloat(bidValue) > parseFloat(balance.formatted.slice(0, 4))

  //   };

  const lastBids: any = useFetch({ path: `/bids/${parsedNftData.auction_id}` });
  console.log(lastBids);

  const { endAuction, placeBid, remainingTime } = useManageAuctions({
    auction_id: parsedNftData.auction_id,
  });

  const [remainingTimeIntervalCount, setRemainingTimeIntervalCount] =
    useState<any>(10000000000);

  useEffect(() => {
    if (!remainingTime) return;

    const remainingTimeState: any = parseInt(remainingTime);

    if (remainingTimeIntervalCount > remainingTimeState)
      setRemainingTimeIntervalCount(remainingTimeState);

    const interval = setInterval(() => {
      setRemainingTimeIntervalCount(remainingTimeIntervalCount - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime, remainingTimeIntervalCount]);

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [bidValue, setbidValue] = useState("");

  return (
    <NFTDetailsContainer>
      <MainNFTAndButtonsContainer>
        <MainNFTImage src={mainNFTImageSource} />
        <ButtonsContainer>
          {!localStorage
            .getItem(`${nftData.token_address}/${nftData.token_id}`)
            ?.includes("0x") ? (
            <>
              {isAdmin ? (
                <>
                  <div>
                    {hasWallet !== "" && (
                      <SmartContractWalletAddress>
                        <Link
                          to={`https://sepolia.etherscan.io/address/${hasWallet}`}
                          target="_blank"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <LinkContent>
                            {hasWallet}
                            <ExternalLinkIcon />
                          </LinkContent>
                        </Link>
                      </SmartContractWalletAddress>
                    )}
                  </div>
                  <div>
                    {hasWallet === "" && (
                      <ActionButton onClick={() => createAccount()}>
                        create account
                      </ActionButton>
                    )}

                    {!isInAuction && (
                      <ActionButton onClick={() => handleOpen()}>
                        create auction
                      </ActionButton>
                    )}

                    {isInAuction && parsedNftData.ended === false && (
                      <>
                        <ActionButton
                          onClick={() => endAuction(parsedNftData.auction_id)}
                        >
                          end auction
                        </ActionButton>

                        {/* <ActionButton onClick={() => getHighestBid(0)}>get highest bid</ActionButton> */}
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    {hasWallet !== "" && (
                      <SmartContractWalletAddress>
                        <Link
                          to={`https://sepolia.etherscan.io/address/${hasWallet}`}
                          target="_blank"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <LinkContent>
                            {hasWallet}
                            <ExternalLinkIcon />
                          </LinkContent>
                        </Link>
                      </SmartContractWalletAddress>
                    )}
                  </div>
                  {/* {isInAuction && parsedNftData.ended === false && ( */}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      value={bidValue}
                      onChange={(e) => {
                        setbidValue(e.target.value);
                      }}
                      style={{
                        paddingLeft: "20px",
                        height: "50px",
                        width: "70%",
                      }} // address.slice(0, 4) + "..." + address.slice(-4);
                      placeholder={
                        lastBids && lastBids.length > 0
                          ? `Min Bid Amount ${(
                              (lastBids?.reverse()[0].bid_amount * 11) /
                              10
                            ).toFixed(2)} ETH`
                          : `Min Bid Amount ${
                              auctionData &&
                              auctionData[parsedNftData.auction_id]
                                .reserve_price
                            } ETH`
                      }
                    />

                    <ActionButton
                      disabled={
                        parseFloat(bidValue) <
                          auctionData?.[parsedNftData.auction_id]
                            ?.reserve_price ||
                        balance?.formatted <
                          auctionData?.[parsedNftData.auction_id]
                            ?.reserve_price ||
                        balance?.formatted <
                          auctionData?.[parsedNftData.auction_id]?.highest_bid *
                            1.1 ||
                        parseFloat(balance?.formatted) < parseFloat(bidValue) ||
                        parseFloat(bidValue) <
                          auctionData?.[parsedNftData.auction_id]?.highest_bid *
                            1.1
                      }
                      onClick={() =>
                        placeBid(parsedNftData.auction_id, bidValue)
                      }
                    >
                      bid{}
                      {/* {auctionData?.[parsedNftData.auction_id]?.reserve_price} */}
                    </ActionButton>
                  </div>
                  {/* )} */}
                </>
              )}
            </>
          ) : (
			
            <SmartContractWalletAddress>
              <Link
                to={
                  "https://sepolia.etherscan.io/address/" +
                  {createdAccount }
                }
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <LinkContent>
                 {createdAccount }
                  <ExternalLinkIcon />
                </LinkContent>
              </Link>
            </SmartContractWalletAddress>
          )}
        </ButtonsContainer>

        {balance?.formatted <
          auctionData?.[parsedNftData.auction_id]?.highest_bid &&
          balance?.formatted <
            auctionData?.[parsedNftData.auction_id]?.highest_bid * 1.1 && (
            <div style={{ marginTop: "30px", textAlign: "end" }}>
              Your balance is not sufficient to place a bid
            </div>
          )}

        {parseFloat(balance?.formatted) < parseFloat(bidValue) ||
          (parseFloat(bidValue) <
            auctionData?.[parsedNftData.auction_id]?.highest_bid * 1.1 && (
            <div style={{ marginTop: "30px", textAlign: "end" }}>
              Your bid must be at least{" "}
              {(
                auctionData?.[parsedNftData.auction_id]?.highest_bid * 1.1
              ).toFixed(2)}{" "}
              ETH
            </div>
          ))}


        {parseFloat(balance?.formatted) < parseFloat(bidValue) && (
          <div style={{ marginTop: "30px", textAlign: "end" }}>
            Your balance {parseFloat(balance?.formatted).toFixed(2)} cannot bid{" "}
            {parseFloat(bidValue)} ETH on this NFT.
          </div>
        )}

        <LastBidsContainer>
          {lastBids &&
            lastBids
              ?.slice()
              .reverse()
              .map((item: any, idx: number) => {
                return <EachBidComponent key={idx} item={item} />;
              })}
        </LastBidsContainer>
      </MainNFTAndButtonsContainer>

      <NftsOfMainNftContainer>
        <NFTSDescription>
          Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor
          sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
          ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
          ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
          
        </NFTSDescription>
        <NftsHeadText>Collectibles [{nftsInWallet?.length}]</NftsHeadText>
        {remainingTimeIntervalCount > 0 &&
          remainingTimeIntervalCount < 10000000000 && (
            <NftsHeadText>
              {`${Math.floor(
                parseInt(remainingTimeIntervalCount) / 3600
              )} hours, ${Math.floor(
                (parseInt(remainingTimeIntervalCount) % 3600) / 60
              )} minutes, ${
                (parseInt(remainingTimeIntervalCount) % 3600) % 60
              } seconds`}
            </NftsHeadText>
          )}
        <NFTS nftsData={nftsInWallet} />
      </NftsOfMainNftContainer>
      <AuctionReservedPrice
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </NFTDetailsContainer>
  );
};

export default NFTDetails;
