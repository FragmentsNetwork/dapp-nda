pragma solidity ^0.4.21;

contract SigningDirectorInterface {

    event TreatyInterface_Signed(address indexed signingAddress);
    event TreatyInterface_SignedByAllParties(address indexed signingAddress);

    function isSignParty(address addressToCheck) public view returns (bool);
    function isSignedByParty(address addressToCheck) public view returns (bool);
    function isSignedByAllParties() public view returns (bool);
    function signTreaty() public;
}
