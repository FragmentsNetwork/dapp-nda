pragma solidity ^0.4.21;


// list all relevant top level contracts

// nda
import './treaty/NDA';

// nda building components
import './treaty/conditionalValidity/ExpirableValidity';
import './treaty/conditionalValidity/UnconditionedValidity';
import './treaty/documentStorage/MinimalDocument';
import './treaty/documentStorage/MultiOriginDocument';
import './treaty/documentStorage/MinimalDocumentStorage';
import './treaty/documentStorage/AppendableDocumentStorage';
import './treaty/signing/MultipartySigningDirector';
import './treaty/signing/InclusiveSigningDirector';

// OneClickTreaty
import './oneClickDemo/OneClickTreaty';





contract MainContract /*is Treaty*/ {
/*
    address public tmp1;
    address private tmp2;

    function MainContract(address tmp) public {
        tmp1 = tmp;
        tmp2 = tmp;
    }
    /*
    bool public a = true;

    mapping(address => bool) authorizedUsers;

    function authorize() public {
        authorizedUsers[msg.sender] = true;
    }

    function isAuthorized(address user) public view returns (bool) {
        return authorizedUsers[user] == true;
    }
    */
}
