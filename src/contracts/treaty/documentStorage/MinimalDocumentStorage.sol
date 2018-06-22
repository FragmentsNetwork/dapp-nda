pragma solidity ^0.4.21;

import './DocumentStorageInterface';

contract MinimalDocumentStorage is DocumentStorageInterface {

    // these properties will get default getters, thus fullfilling DocumentsStorageInterface
    DocumentInterface[] internal treatyDocuments;

    constructor(DocumentInterface[] newTreatyDocuments) public {
        treatyDocuments = newTreatyDocuments;

        emit DocumentStorageInterface_Lock();
    }

    function getTreatyDocuments() public view returns (DocumentInterface[]) {
        return treatyDocuments;
    }

    function lockStorage() public {
        // do nothing
        // this storage is permanently locked; only allows adding of documents in constructor
    }

    function isStorageLocked() public view returns (bool) {
        return true;
    }
}
