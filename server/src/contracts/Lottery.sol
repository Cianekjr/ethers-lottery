// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Lottery {
    address public manager;
    address[] public tickets;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(
            msg.value >= 0.1 ether,
            "You must enter the lottery with at least 0.1 ether"
        );

        tickets.push(msg.sender);
    }

    function getTicketsCount() public view returns (uint256) {
        return tickets.length;
    }

    function random() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.difficulty, block.timestamp, tickets)
                )
            );
    }

    function drawWinner() private view returns (address) {
        uint256 index = random() % tickets.length;
        address winner = tickets[index];

        return winner;
    }

    function resetLottery() private {
        tickets = new address[](0);
    }

    function pickWinner() public payable {
        require(msg.sender == manager, "Only the manager can pick a winner");
        require(tickets.length > 0, "There are no tickets in the lottery");

        address payable winner = payable(drawWinner());

        winner.transfer(address(this).balance);

        resetLottery();
    }
}
