pragma solidity ^0.4.21;

import '../../basic/Ownable';
import './MinimalDocumentStorage';


contract AppendableDocumentStorage is Ownable, MinimalDocumentStorage {

    bool internal locked = false;

    constructor(DocumentInterface[] newTreatyDocuments) MinimalDocumentStorage(newTreatyDocuments) public {
        // pass
    }

    function appendTreatyDocument(DocumentInterface document) public onlyOwner  {
        treatyDocuments.push(document);
    }

    function lock() public onlyOwner {
        locked = true;

        emit DocumentStorageInterface_Lock();
    }

    function isStorageLocked() public view returns (bool) {
        return locked;
    }
}
