// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.3/contracts/security/ReentrancyGuard.sol";

contract GreatestTest is Ownable, ReentrancyGuard {
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
    // Define a struct to represent a bid
    struct Bid {
        address bidder;
        uint256 amount;
    }

    mapping(uint256 => Auction) public auctions;
    // Mapping to store successful bids for each tokenId
    mapping(uint256 => Bid[]) public successfulBids;

    mapping(address => mapping(uint256 => bool)) public isNFTAuctioned;
    uint256 public auctionCounter;

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

    constructor() {}

    // Function to create an auction for a single NFT
    function createAuction(
        address _nftContract,
        uint256 _tokenId,
        uint256 _reservePrice
    ) external onlyOwner {
        require(_nftContract != address(0), "Invalid NFT contract address");
        require(_reservePrice > 0, "Reserve price must be greater than 0");

        // Check if the NFT is already being auctioned
        require(
            !isNFTAuctioned[_nftContract][_tokenId],
            "NFT is already being auctioned"
        );

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

        // Add the NFT to the list of auctioned NFTs
        isNFTAuctioned[_nftContract][_tokenId] = true;
        auctionCounter++;
    }

    // Function to place a bid in an auction
    function placeBid(uint256 _auctionId) external payable nonReentrant {
        require(_auctionId < auctionCounter, "Invalid auction ID");

        Auction storage auction = auctions[_auctionId];

        // If not the first bidder (meaning highest bidder is address(0)),
        //check the auction has already ended or not
        if (auction.highestBidder != address(0)) {
            require(block.timestamp < auction.endTime, "Auction has ended");
        }
        // If there is at least one bid, check if the bid amount is at least the minimum bid
        if (auction.highestBidder == address(0)) {
            require(
                msg.value >= auction.reservePrice &&
                    msg.sender.balance > auction.reservePrice,
                "Not enough balance to bid"
            );
        } else {
            require(
                msg.value >=
                    auction.highestBid + (auction.highestBid * 1) / 10 &&
                    msg.sender.balance >=
                    auction.highestBid + (auction.highestBid * 1) / 10,
                "Bid amount should be 10% more than the last bid"
            );
        }

        // If it's the first bid that beats the reserve price and got enough balance, set endTime and emit the CountdownStarted event
        if (auction.endTime == 0) {
            // auction.endTime = block.timestamp + 2 minutes; // !!! testing
            auction.endTime = block.timestamp + 1 days; // Set the end time to 24 hours from now
            emit CountdownStarted(_auctionId);
        }

        // Deposit the bid amount into the contract
        (bool depositSuccess, ) = payable(address(this)).call{value: msg.value}(
            ""
        );
        require(depositSuccess, "Bid deposit failed");

        // Refund the previous highest bidder
        if (auction.highestBidder != address(0)) {
            address payable previousHighestBidder = payable(
                auction.highestBidder
            );
            previousHighestBidder.transfer(auction.highestBid);
        }
        // Add the successful bid to the mapping
        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;

        // Emit the NewBid event
        addSuccessfulBid(_auctionId, msg.sender, msg.value);
        emit NewBid(_auctionId, msg.sender, msg.value);
    }

    // Function to end an auction
    function endAuction(uint256 _auctionId)
        public
        payable
        onlyOwner
        nonReentrant
    {
        require(_auctionId < auctionCounter, "Invalid auction ID");
        Auction storage auction = auctions[_auctionId];

        require(
            block.timestamp > auction.endTime,
            "There is more time left for auction to finish."
        );
        if (auction.highestBidder != address(0)) {
            payable(owner()).transfer(auction.highestBid);
            emit AuctionEndedWithSale(
                _auctionId,
                auction.highestBidder,
                auction.highestBid
            );
        } else {
            emit AuctionEndedWithoutSale(_auctionId);
        }
    }

    function withdrawEth(uint256 auctionId) public payable nonReentrant {
        Auction storage auction = auctions[auctionId];

        require(auction.highestBidder != address(0), "No bid yet");

        uint256 amount;

        if (msg.sender == auction.highestBidder) {
            require(block.timestamp < auction.endTime, "Auction ended.");
            amount = auctions[auctionId].highestBid;
            auctions[auctionId].highestBid = 0;
            payable(msg.sender).transfer(amount);
        } else if (msg.sender == owner() && block.timestamp > auction.endTime) {
            amount = address(this).balance;
            require(amount > 0, "No balance to withdraw");
            payable(msg.sender).transfer(amount);
        } else {
            revert("Unauthorized withdrawal");
        }

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
    function getRemainingTime(uint256 _auctionId)
        public
        view
        returns (uint256)
    {
        require(_auctionId < auctionCounter, "Invalid auction ID");
        Auction storage auction = auctions[_auctionId];
        require(auction.endTime != 0, "No bid yet");

        if (auction.endTime < block.timestamp) {
            return 0;
        }

        return auction.endTime - block.timestamp;
    }

    // Function to get all auctions
    function getAllAuctions() external view returns (Auction[] memory) {
        Auction[] memory allAuctions = new Auction[](auctionCounter);

        for (uint256 i = 0; i < auctionCounter; i++) {
            allAuctions[i] = auctions[i];
        }

        return allAuctions;
    }

    // Function to add a successful bid to the mapping
    function addSuccessfulBid(
        uint256 _tokenId,
        address _bidder,
        uint256 _amount
    ) internal {
        successfulBids[_tokenId].push(Bid({bidder: _bidder, amount: _amount}));
    }

    // Function to retrieve successful bids for a tokenId
    function getSuccessfulBids(uint256 _tokenId)
        external
        view
        returns (Bid[] memory)
    {
        return successfulBids[_tokenId];
    }

    receive() external payable {}
}
