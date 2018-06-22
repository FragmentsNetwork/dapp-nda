pragma solidity ^0.4.21;

import './SigningDirectorInterface';

contract InclusiveSigningDirector is SigningDirectorInterface {

    mapping(address => bool) private signedParties;
    uint private signedPartiesCount = 0;

    constructor() public {

    }

    function isSignParty(address addressToCheck) public view returns (bool) {
        return true;
    }

    function isSignedByParty(address addressToCheck) public view returns (bool) {
        return signedParties[addressToCheck];
    }

    function isSignedByAllParties() public view returns (bool) {
        return false;
    }

    function signTreaty() public {
        address tmpAddress = msg.sender;
        require(!isSignedByParty(tmpAddress));

        signedParties[tmpAddress] = true;
        signedPartiesCount++;

        // TODO: resolve lock event trigger/catch architecture
        // documents.lockStorage(); // lock documents after first signing

        emit TreatyInterface_Signed(tmpAddress);

        if (isSignedByAllParties()) {
            emit TreatyInterface_SignedByAllParties(tmpAddress);
        }
    }
}
