pragma solidity ^0.4.21;

// until struct can be imported or defined in interface contract must be used instead

import './DocumentInterface';

contract MinimalDocument is DocumentInterface {

    constructor(string newUri, string newHash) public {
        uri = newUri;
        hash = newHash;
    }
}

/*
struct Document {
    string uri;
    string hash;
}
*/
