pragma solidity ^0.4.21;
pragma experimental ABIEncoderV2;

import '../treaty/TreatyInterface';
import '../treaty/signing/InclusiveSigningDirector';
//import '../treaty/documentStorage/MinimalDocumentStorage';
//import '../treaty/documentStorage/DocumentStorageInterface';
import '../treaty/documentStorage/ExperimentalDocumentStorage';
import '../treaty/conditionalValidity/UnconditionedValidity';

//contract OneClickTreaty is TreatyInterface, MinimalDocumentStorage, InclusiveSigningDirector, UnconditionedValidity {
contract OneClickTreaty is TreatyInterface, ExperimentalDocumentStorage, InclusiveSigningDirector, UnconditionedValidity {

    // TODO: use this solution when web3js support is ready
    //constructor(Document[] newTreatyDocuments) InclusiveSigningDirector() ExperimentalDocumentStorage(newTreatyDocuments) UnconditionedValidity() public {

    // TODO: delete or use this secondary solution (unfortunately also not supported by web3js now)
    //constructor(string[] documentUris, string[] documentHashes) InclusiveSigningDirector() ExperimentalDocumentStorage(documentUris, documentHashes) UnconditionedValidity() public {
    constructor(
        string documentUri1,
        string documentHash1,

        string documentUri2,
        string documentHash2,

        string documentUri3,
        string documentHash3
    ) InclusiveSigningDirector() ExperimentalDocumentStorage(documentUri1, documentHash1, documentUri2, documentHash2, documentUri3, documentHash3) UnconditionedValidity() public {


        /*
        TODO: accept documents as two arrays and create contracts on the fly
        address[newTreatyDocuments.length] documents;
        for (uint256 i = 0; i < newTreatyDocuments.length; i++) {
            documents[i] = new
        }
        */
    }

    function isValid() public view returns (bool) {
        return false;
    }

    function isPartiallyValid(address addressToCheck) public view returns (bool) {
        //return isSignedByParty(addressToCheck) && isTreatyValid();
        return isSignedByParty(addressToCheck);
    }
}
