pragma solidity ^0.4.17;

contract Campaign {
    address public manager;
    uint public minimumAmount;

    // Once someone raise the contract, we want to... 
    function Campaign (uint minimum) {
        // define who is the contract owner
        manager = msg.sender;
        // define the minimum amount to contribuite
        minimumAmount = minimum;
    }
}