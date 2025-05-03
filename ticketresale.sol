// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TicketResale {
    struct Ticket {
        uint id;
        address payable seller;
        string from;
        string to;
        uint price;
        bool isSold;
    }

    uint public nextId = 1;
    mapping(uint => Ticket) public tickets;

    event TicketListed(uint id, string from, string to, uint price);
    event TicketBought(uint id, address buyer);

    function listTicket(string memory _from, string memory _to, uint _price) public {
        tickets[nextId] = Ticket(nextId, payable(msg.sender), _from, _to, _price, false);
        emit TicketListed(nextId, _from, _to, _price);
        nextId++;
    }

    function buyTicket(uint _id) public payable {
        Ticket storage ticket = tickets[_id];
        require(!ticket.isSold, "Ticket already sold");
        require(msg.value >= ticket.price, "Not enough Ether sent");

        ticket.seller.transfer(msg.value);
        ticket.isSold = true;

        emit TicketBought(_id, msg.sender);
    }

    function getTicket(uint _id) public view returns (string memory, string memory, uint, bool) {
        Ticket storage ticket = tickets[_id];
        return (ticket.from, ticket.to, ticket.price, ticket.isSold);
    }
}
