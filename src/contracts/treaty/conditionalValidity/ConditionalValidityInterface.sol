pragma solidity ^0.4.21;

// TODO: better naming
contract ConditionalValidityInterface {
    event ConditionalValidityInterface_ValidityChange(bool indexed isValid);

    function isTreatyValid() public view returns (bool);
}
