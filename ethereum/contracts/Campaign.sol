pragma solidity ^0.4.17;

contract Campaign {
    address public manager;
    function Campaign()public {
        manager = msg.sender;
        
    }
    
}