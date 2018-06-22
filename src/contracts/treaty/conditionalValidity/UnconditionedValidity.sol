pragma solidity ^0.4.21;

import './ConditionalValidityInterface';

contract UnconditionedValidity is ConditionalValidityInterface {

    constructor() public {
        emit ConditionalValidityInterface_ValidityChange(true);
    }

    function isTreatyValid() public view returns (bool) {
        return true;
    }
}