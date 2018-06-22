pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import './ExperimentalDocumentStorageInterface';


contract ExperimentalDocumentStorage is ExperimentalDocumentStorageInterface {

    Document[] public treatyDocuments;

/*
    constructor(Document[] newTreatyDocuments) public {
        uint256 max = newTreatyDocuments.length;
        for (uint256 i = 0; i < max; i++) {
            treatyDocuments.push(newTreatyDocuments[0]);
        }
        //treatyDocuments = newTreatyDocuments;

        emit ExperimentalDocumentStorageInterface_Lock();
    }
*/

    /*
    workaround for Document[] not working with current versions of web3js (https://github.com/ethereum/web3.js/issues/1241)

    constructor(string[] documentUris, string[] documentHashes) public {
        require(documentUris.length == documentHashes.length);
        uint256 max = documentUris.length;
        for (uint256 i = 0; i < max; i++) {
            treatyDocuments.push(Document(documentUris[i], documentHashes[i]));
        }
    }
    */


    // workaround for not supporting string[] in constructor by current versions web3
    constructor(
        string documentUri1,
        string documentHash1,

        string documentUri2,
        string documentHash2,

        string documentUri3,
        string documentHash3
    ) public {

        treatyDocuments.push(Document(documentUri1, documentHash1));

        if (bytes(documentUri2).length != 0 && bytes(documentHash2).length != 0) {
            treatyDocuments.push(Document(documentUri2, documentHash2));
        }

        if (bytes(documentUri3).length != 0 && bytes(documentHash3).length != 0) {
            treatyDocuments.push(Document(documentUri3, documentHash3));
        }

        emit ExperimentalDocumentStorageInterface_Lock();

    }

    /*
    function treatyDocuments(uint256 index) public view returns (Document) {
        return treatyDocuments[index];
    }
    */

    function treatyDocuments(uint256 index) public view returns (string uri, string hash) {
        //return treatyDocuments[index];
        return (treatyDocuments[index].uri, treatyDocuments[index].hash);
    }

    function treatyDocumentCount() public view returns (uint256) {
        return treatyDocuments.length;
    }

    function lockStorage() public {
        // do nothing
        // this storage is permanently locked; only allows adding of documents in constructor
    }

    function isStorageLocked() public view returns (bool) {
        return true;
    }
}
