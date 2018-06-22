pragma solidity ^0.4.21;

/*
Abstraction of ownership.
*/
contract Ownable {
    event Owned_NewOwner(address indexed newOwner);
    event Owned_Ownerless(); // makes contract independent

    address internal contractOwner;

    constructor() public {
        contractOwner = msg.sender;
        emit Owned_NewOwner(contractOwner);
    }

    modifier onlyOwner {
        require(isOwner(msg.sender));
        _;
    }

    function isOwner(address user) public view returns (bool) {
        return user == contractOwner;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        require(newOwner != contractOwner);

        contractOwner = newOwner;
        emit Owned_NewOwner(newOwner);
    }

    function removeOwner() public onlyOwner {
        contractOwner = address(0);
        emit Owned_Ownerless();
    }
}
