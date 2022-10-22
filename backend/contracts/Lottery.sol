// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Lottery {
    address public owner;
    address payable[] public players; //array of player
    address[] public winners; //array of past winner
    uint256 public lotteryId;

    //Constructor
    constructor() {
        owner = payable(msg.sender);
        lotteryId = 0; //initially id is 0.
    }

    //Get all previous winners
    function getWinners() public view returns (address[] memory) {
        return winners;
    }

    //Check the balanceof this lottery
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    //Get all players
    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    //Enter/perticipate into the lottery
    function enter() public payable {
        require(msg.value >= 0.005 ether);
        players.push(payable(msg.sender)); // address of player entering lottery
    }

    // Getting random number
    function getRandomNumber() public view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    //Get lottery Id
    function getLotteryId() public view returns (uint256) {
        return lotteryId;
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

        // Clear the players array. ['player1', 'player2'] 👉 []
        players = new address payable[](0);
    }
}
