pragma solidity ^0.4.21;

import './SigningDirectorInterface';

contract MultipartySigningDirector is SigningDirectorInterface {

    address[] private signingParties;
    mapping(address => bool) private signingPartiesMap;
    mapping(address => bool) private signedParties;
    uint private signedPartiesCount = 0;

    constructor(address[] newSigningParties) public {
        require(newSigningParties.length > 0);

        signingParties = newSigningParties;

        // TODO: get rid of loop
        // transform array to mapping
        for (uint i = 0; i < signingParties.length; i++) {
            signingPartiesMap[signingParties[i]] = true;
        }
    }

    function isSignParty(address addressToCheck) public view returns (bool) {
        return signingPartiesMap[addressToCheck];
    }

    function isSignedByParty(address addressToCheck) public view returns (bool) {
        return signedParties[addressToCheck];
    }

    function isSignedByAllParties() public view returns (bool) {
        return signedPartiesCount == signingParties.length;
    }

    function signTreaty() public {
        address tmpAddress = msg.sender;
        require(isSignParty(tmpAddress) && !isSignedByParty(tmpAddress));

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
