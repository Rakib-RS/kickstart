pragma solidity ^0.4.17;

contract Campaign {
    struct Request{
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

    modifier restricted(){
        require(msg.sender == manager)'
        _;
    }
    function Campaign(contribution)public {
        manager = msg.sender;
        minimumContribution = contribution
        
    }
    function contribute() payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
    }

    function createRequest(description,value,recipient) public restricted{
        Request memory newRequest = Request({
            description:description,
            value:value,
            recipient:recipient,
            complete:false,
            approvalsCount:0

        })
        requests.push(newRequest);
    }

    function approveRequest(uint index)public{
        Request storage request = requests[index];

        //is he a contributor
        require(approvers[msg.sender]);
        //did he vote already
        require(request.approvals[msg.sender])

        request.approvals[msg.sender] = true;
        request.approvalsCount++;


    }
    
}