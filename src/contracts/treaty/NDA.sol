pragma solidity ^0.4.21;

import './TreatyInterface';
import './signing/SigningDirectorInterface';
import './documentStorage/DocumentStorageInterface';
import './conditionalValidity/ConditionalValidityInterface';

contract NDA is TreatyInterface {

    SigningDirectorInterface public signingDirector;
    DocumentStorageInterface public documents;

    // TODO: rename
    ConditionalValidityInterface public validityContract;


    // TODO: check if adresss(0) can be passed as argument -> if so add necessary require()
    constructor(SigningDirectorInterface newSigningDirector, DocumentStorageInterface newDocuments, ConditionalValidityInterface newValidityContract) public {
        require(newSigningDirector != address(0));
        require(newDocuments != address(0));
        require(newValidityContract != address(0));

        signingDirector = newSigningDirector;
        documents = newDocuments;
        validityContract = newValidityContract;
    }

    function isValid() public view returns (bool) {
        return signingDirector.isSignedByAllParties() && validityContract.isTreatyValid();
    }

    function isPartiallyValid(address addressToCheck) public view returns (bool) {
        return signingDirector.isSignedByParty(addressToCheck) && validityContract.isTreatyValid();
    }
}
