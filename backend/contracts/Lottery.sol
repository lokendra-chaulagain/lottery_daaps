// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Lottery {
    address payable public owner;
    address payable[] public players;
    address[] public winners;
    uint256 public lotteryId;

    constructor() {
        owner = payable(msg.sender);
        lotteryId = 0;
    }

    //Get lottery Id
    function getLotteryId() public view returns (uint256) {
        return lotteryId;
    }

    //Get all previous winners
    function getWinners() public view returns (address[] memory) {
        return winners;
    }

    //Check the balance of this lottery
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    //Get all participated players
    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    //Entry requirement modifier
    modifier entranceRequirement() {
        require(
            msg.value == 0.005 ether,
            "Lottery entrance fee should be equal to 0.005 Ethers"
        );
        _;
    }

    //Enter/perticipate into the lottery
    function enter() public payable entranceRequirement {
        players.push(payable(msg.sender));
    }

    // Getting random number
    function getRandomNumber() public view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    //onlyOwner modifier
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    //Pick the winner
    function pickWinner() public onlyOwner {
        uint256 randomIndex = getRandomNumber() % players.length;
        players[randomIndex].transfer(address(this).balance);
        winners.push(players[randomIndex]);
        lotteryId++;
        players = new address payable[](0); // Clear the players array
    }
}
