pragma solidity ^0.4.21;

import './ConditionalValidityInterface';

contract ExpirableValidity is ConditionalValidityInterface {

    uint targetBlock;

    // expireAt is last block when treaty is valid
    constructor(uint expireAt) public {
        require(expireAt >= block.number);
        targetBlock = expireAt;

        emit ConditionalValidityInterface_ValidityChange(isTreatyValid());
    }

    function isTreatyValid() public view returns (bool) {
        return block.number <= targetBlock;
    }
}
