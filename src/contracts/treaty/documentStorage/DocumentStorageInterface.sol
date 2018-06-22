pragma solidity ^0.4.21;

import './DocumentInterface';

contract DocumentStorageInterface {

    event DocumentStorageInterface_Lock();

    function getTreatyDocuments() public view returns (DocumentInterface[]);
    function lockStorage() public;
    function isStorageLocked() public view returns (bool);
}
