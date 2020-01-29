pragma solidity ^0.5.0;

contract GetterSetter {
    uint storedNumber;
    string storedString;

    constructor () public {
        storedNumber = 2019;
        storedString = "Noruega";
    }

    function setNumber(uint x) public {
        storedNumber = x;
    }

    function getNumber() public view returns (uint) {
        return storedNumber;
    }

    function setString(string memory s) public {
        storedString = s;
    }

    function getString() public view returns (string memory) {
        return storedString;
    }
}