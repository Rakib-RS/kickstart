pragma solidity ^0.4.17;

contract Campaign {
    struct Request{
        string description;
        uint value;
       address receipt;
       bool complete;
    }

    Request[] public request;
    address public manager;
    uint public minimumContribution;
    address[] public approvers;

    modifier restrictedO(){
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
    
}