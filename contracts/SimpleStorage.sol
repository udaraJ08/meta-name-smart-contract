// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract SimpleStorage {
  string storedData;
  mapping(address => string) ownerName;

  modifier validateTransact {
    require(msg.value >= 5 ether, "minimum price is 1 ether");
    _;
  }

  function set(string memory x) public payable {
    storedData = x;
    ownerName[msg.sender] = storedData;
  }

  function get() public view returns (string memory) {
    return storedData;
  }
}
