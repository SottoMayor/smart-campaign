pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        // Instanciate the Campaign contract
        address newCampaign = new Campaign(minimum, msg.sender);

        // Adding the address of this instance inside the deployedCampaigns array
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }

}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumAmount;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public approversCount;

    // Modifiers should be defined above the constructor, as a convention...

    // Only managers can access function with this modifier.
    modifier restricted () {
        require(manager == msg.sender);
        _;
    }

    // Once someone raise the contract, we want to... 
    function Campaign (uint minimum, address creator) {
        // define who is the contract owner
        manager = creator;
        // define the minimum amount to contribute
        minimumAmount = minimum;
    }

    // Once someone contribute to the contract, we want to...
    function contribute() public payable { //It is payable because this function receives some amount of Ether
        // Check if the incomming amount is grather than the minimum amount
        require(msg.value > minimumAmount);

        // Someone can contribute more than one time, if this happens we do not want to trigger the approvers counter!
        if(!approvers[msg.sender]) {
            // Include the address in the mapping of approvers.
            // BTW, we are using mapping stead of array because this approach is cheaper.
            approvers[msg.sender] = true;


            // Save in the contract the total amount of contributers
            approversCount++;
        }
        
    }

    // Once the manager (and only the manager) creates a request, he want to...
    function createRequest(string description, uint value, address recipient)
        public restricted {
            // create a request 
            // OBS: It must be marked as memory because this function is creating a data structure available only on memory
            Request memory newRequest = Request({
                description: description,
                value: value,
                recipient: recipient,
                complete: false,
                approvalCount: 0
            });

            // put this new request in the list of requests
            requests.push(newRequest);
    }

    // Once someone wants to approve a request...
    function approveRequest(uint index) public {
        Request storage request = requests[index];

        // The address should be inside the mapping that controls the contributors
        require(approvers[msg.sender]);
        // The address should not vote again in the same request
        require(!request.approvals[msg.sender]);

        // The address must no vote again
        request.approvals[msg.sender] = true;
        // The counter of approvals must be incremented
        request.approvalCount++;
    }

    // Once the manager finalize the request...
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        // The majoraty of contributers must have approved the request
        require(request.approvalCount > (approversCount/2));
        // The request must not be completed
        require(!request.complete);

        // Transfer the money to the recipient of this request
        request.recipient.transfer(request.value);
        // The request must be set as completed
        request.complete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
            minimumAmount,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsAccount() public view returns (uint) {
        return requests.length;
    }
}