pragma solidity ^0.4.21;

import './MinimalDocument';
import '../../basic/Ownable';

//contract MultiOriginDocument is MinimalDocument { // TODO: desired definition
contract MultiOriginDocument is Ownable, MinimalDocument {

    string[] public origins;

    /*
    TODO: This is desired constructor.
    Unfortunately array string as parameter doesn̈́'t seem to work in Solidity(4.21) right now.

    pragma experimental ABIEncoderV2;
    function MultiOriginDocument(string[] newOrigins, string newHash) MinimalDocument(newOrigins[0], newHash) public  {
        origins = newOrigins[0];
    }
    */

    constructor(string newUri, string newHash) MinimalDocument(newUri, newHash) public  {
        origins = [newUri];
    }

    function addOrigin(string newUri) public onlyOwner {
        origins.push(newUri);
    }

    function getOriginCount() public view returns (uint256) {
        return origins.length;
    }
}
