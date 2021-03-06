pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaign;
    function createCampaign(uint minimum){
        address newCampaign = new Campaign(minimum,msg.sender);
        deployedCampaign.push(newCampaign);
    }
    function getDeployedCampaign() public view returns (address []) {
        return deployedCampaign;    
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalsCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    //address[] public approvers;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    function Campaign(uint contribution,address creator) public {
        manager = creator;
        minimumContribution = contribution;
        
    }
    function contribute() payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description,uint value,address recipient) public restricted{
        Request memory newRequest = Request({
            description:description,
            value:value,
            recipient:recipient,
            complete:false,
            approvalsCount:0

        });
        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        //is he a contributor?true
        require(approvers[msg.sender]);
        //did he vote already?false
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalsCount++;

    }
    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];
        require(request.approvalsCount > approversCount/2);
        require(!request.complete);
        request.recipient.transfer(request.value);
        request.complete = true;
    }
    function getSummary() public view returns(uint,uint,uint,uint,address){
        return (
            this.balance,
            minimumContribution,
            requests.length,
            approversCount,
            manager
        );

    }
    function getRequestsCount() public view returns(uint){
        return requests.length;
    }
    
}