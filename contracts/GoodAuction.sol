// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GoodAuction is Ownable {
    struct Auction {
        uint256 auctionId; // should be the index of the auction in the auctions array, will use auctionCounter for this
        address nftContract;
        uint256 tokenId;
        uint256 reservePrice;
        uint256 endTime; // End time for the auction
        address highestBidder;
        uint256 highestBid;
        bool ended;
    }

    mapping(uint256 => Auction) public auctions;
    uint256 public auctionCounter;
    

    modifier onlyBeforeEnd(uint256 auctionId) {
        require(!auctions[auctionId].ended, "Auction has already ended");
        _;
    }

    event NewAuction(
        uint256 indexed auctionId,
        address indexed nftContract,
        uint256 tokenId,
        uint256 reservePrice,
        uint256 endTime
    );
    event AuctionEndedWithSale(
        uint256 indexed auctionId,
        address indexed winner,
        uint256 amount
    );

    event AuctionEndedWithoutSale(uint256 indexed auctionId);

    event CountdownStarted(uint256 indexed auctionId);
    
    event NewBid(uint256 auctionId, address indexed bidder, uint256 amount);

    constructor() {

    }

    // Function to create an auction for a single NFT
    function createAuction(
        address _nftContract,
        uint256 _tokenId,
        uint256 _reservePrice
    ) external onlyOwner {
        require(_nftContract != address(0), "Invalid NFT contract address");
        require(_reservePrice > 0, "Reserve price must be greater than 0");

        auctions[auctionCounter] = Auction({
            auctionId: auctionCounter,
            nftContract: _nftContract,
            tokenId: _tokenId,
            reservePrice: _reservePrice,
            endTime: 0,
            highestBidder: address(0),
            highestBid: 0,
            ended: false
        });

        emit NewAuction(
            auctionCounter,
            _nftContract,
            _tokenId,
            _reservePrice,
            0
        );

        auctionCounter++;
    }

    // Function to place a bid in an auction
    function placeBid(uint256 _auctionId) external payable {
        require(_auctionId < auctionCounter, "Invalid auction ID");

        Auction storage auction = auctions[_auctionId];

        // Check if the auction has already ended
        require(!auction.ended, "Auction has ended");

        // If it's the first bid that beats the reserve price, set endTime
        if (msg.value >= auction.reservePrice && auction.endTime == 0) {
            auction.endTime = block.timestamp + 1 days; // Set the end time to 24 hours from now
            emit CountdownStarted(_auctionId);
        }


        // Check if the bid amount is at least the minimum bid
        if (auction.highestBidder != address(0)) {
            require(
                msg.value >= auction.highestBid + auction.highestBid * 0.1,
                "Bid amount should be 10% more than the last bid"
            );
        }

        // Deposit the new bid into contract and refund the previous highest bidder
        if (auction.highestBid < msg.value) {
            // Deposit the bid amount into the contract
            (bool depositSuccess, ) = address(msg.sender).call{
                value: msg.value
            }("");
            require(depositSuccess, "Bid deposit failed");

            // Refund the previous highest bidder
            address payable previousHighestBidder = payable(
                auction.highestBidder
            );
            previousHighestBidder.transfer(auction.highestBid);
    
        }

        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;

        // Emit the NewBid event
        emit NewBid(_auctionId, msg.sender, msg.value);
    }

    // Function to end an auction
    function endAuction(uint256 _auctionId) public onlyOwner {
        require(_auctionId < auctionCounter, "Invalid auction ID");
        Auction storage auction = auctions[_auctionId];

        // Check if the auction has already ended
        require(!auction.ended, "Auction has already ended");

        // if not ended, if it is past the endTime, end the auction
        if (auction.endTime > 0 && block.timestamp < auction.endTime) {
            revert("Auction has not ended yet");
        }

        auction.ended = true;

        // If the endTime is set (reserve price is met)
        if (auction.endTime > 0) {
            // If there's a highest bidder, transfer the NFT and winning amount to them
            if (auction.highestBidder != address(0)) {
                // IERC721(auction.nftContract).transferFrom(
                //     owner(),
                //     auction.highestBidder,
                //     auction.tokenId
                // );

                payable(owner()).transfer(auction.highestBid);

                emit AuctionEndedWithoutSale(_auctionId);
            } else {
                // If no bids were placed, return the NFT to the owner
                // IERC721(auction.nftContract).transferFrom(
                //     address(owner())),
                //     owner(),
                //     auction.tokenId
                // );
                emit AuctionEndedWithSale(_auctionId, address(0), 0);
            }
        } else {
            // if reserve price is not met, send highest bidder their money back
            if (auction.highestBidder != address(0)) {
                payable(auction.highestBidder).transfer(auction.highestBid);
            }
        }
    }

    function withdrawEth(uint256 auctionId) public onlyBeforeEnd(auctionId) {
        Auction storage auction = auctions[auctionId];

        require(auction.ended, "Auction is not over yet");

        uint256 amount = auctions[auctionId].highestBid;
        auctions[auctionId].highestBid = 0;
        payable(msg.sender).transfer(amount);
    }

    function endAndWithdrawAllAuctions() external onlyOwner {
        for (uint256 i = 0; i < auctionCounter; i++) {
            if (!auctions[i].ended) {
                endAuction(i);
            }
            withdrawEth(i);
        }
    }

    // Function to retrieve the remaining time in an auction
    function getRemainingTime(
        uint256 _auctionId
    ) external view returns (uint256) {
        require(_auctionId < auctionCounter, "Invalid auction ID");
        Auction storage auction = auctions[_auctionId];

        if (auction.ended) {
            return 0;
        } else {
            return auction.endTime - block.timestamp;
        }
    }

    // Function to get all auctions
    function getAllAuctions() external view returns (Auction[] memory) {
        Auction[] memory allAuctions = new Auction[](auctionCounter);

        for (uint256 i = 0; i < auctionCounter; i++) {
            allAuctions[i] = auctions[i];
        }

        return allAuctions;
    }

    receive() external payable {}
}
