export const CONTRACT_ADDRESS = "0xYourDeployedContractAddressHere";

export const CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "ThreatDetected",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "reportThreat",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
