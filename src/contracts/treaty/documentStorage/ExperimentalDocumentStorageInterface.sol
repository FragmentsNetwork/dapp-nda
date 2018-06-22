pragma solidity ^0.4.21;
pragma experimental ABIEncoderV2;


contract ExperimentalDocumentStorageInterface {

    event ExperimentalDocumentStorageInterface_Lock();

    struct Document {
        string uri;
        string hash;
    }

    //function treatyDocuments(uint256 index) public view returns (Document);
    // workaround for not supported struct usage in current version of web3 (https://github.com/ethereum/web3.js/issues/1241)
    function treatyDocuments(uint256 index) public view returns (string uri, string hash);

    function treatyDocumentCount() public view returns (uint256);
}
