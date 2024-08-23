pragma solidity ^0.4.17;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
    }

    address public manager;
    uint public minimumAmount;
    address[] public approvers;
    Request[] public requests;

    // Modifiers should be defined above the constructor, as a convention...

    // Only managers can access function with this modifier.
    modifier restricted () {
        require(manager === msg.sender);
        _;
    }

    // Once someone raise the contract, we want to... 
    function Campaign (uint minimum) {
        // define who is the contract owner
        manager = msg.sender;
        // define the minimum amount to contribute
        minimumAmount = minimum;
    }

    // Once someone contribute to the contract, we want to...
    function contribute() public payable { //It is payable because this function receives some amount of Ether
        // Check if the incomming amount is grather than the minimum amount
        require(msg.value > minimumAmount);

        // Add the address of the donator into the approvers list.
        approvers.push(msg.sender);
    }

    // Once the manager (and only the manager) creates a request, he want to...
    function createRequest(string description, uint value, address recipient)
        public modifier {
            // create a request
            Request newRequest = Request({
                description: description,
                value: value,
                recipient: recipient,
                complete: false
            });

            // put this new request in the list of requests
            requests.push(newRequest);
    }
}