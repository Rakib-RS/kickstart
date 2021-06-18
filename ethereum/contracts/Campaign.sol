pragma solidity ^0.4.17;

contract Campaign {
    struct Request{
        string description;
        uint value;
       address recipient;
       bool complete;
    }

    Request[] public request;
    address public manager;
    uint public minimumContribution;
    address[] public approvers;

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
        approvers.push(msg.sender);
    }

    function createRequest(description,value,recipient) public restricted{
        Request memory newRequest = Request({
            description:description,
            value:value,
            recipient:recipient,
            complete:false

        })
        request.push(newRequest);
    }
    
}