// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Sentinel {
    // Event to log detected threats
    event ThreatDetected(string message, uint256 timestamp);

    // Call this function to report a threat
    function reportThreat(string memory _message) public {
        emit ThreatDetected(_message, block.timestamp);
    }
}
