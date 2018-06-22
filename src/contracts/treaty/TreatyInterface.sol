pragma solidity ^0.4.21;

contract TreatyInterface {

    event TreatyInterface_Signed(address signingAddress);
    event TreatyInterface_SignedByAllParties(address signingAddress);

    function isValid() public view returns (bool);
    function isPartiallyValid(address relevantAddress) public view returns (bool);
}
