import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './web3Config';

function App() {
  const [anomalyResult, setAnomalyResult] = useState('');
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [blockchainMessage, setBlockchainMessage] = useState('');

  // On component mount: get anomaly result from Flask and connect to blockchain.
  useEffect(() => {
    // Call Flask API for anomaly detection
    async function getAnomalyResult() {
      try {
        const response = await axios.post('http://localhost:5000/predict', {
          data: [0.5, 0.5]   // Sample data; in practice, this will be real input.
        });
        setAnomalyResult(response.data.result);
      } catch (error) {
        console.error("Error connecting to Flask backend", error);
      }
    }
    getAnomalyResult();

    // Connect to MetaMask / Web3
    async function loadBlockchainData() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const contractInstance = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        setContract(contractInstance);
      } else {
        console.error("MetaMask is not installed. Please install it to use blockchain features.");
      }
    }
    loadBlockchainData();
  }, []);

  // Function to call the blockchain contract and report a threat.
  const reportThreat = async () => {
    if (contract && account) {
      try {
        await contract.methods.reportThreat("Detected threat from anomaly detection").send({ from: account });
        setBlockchainMessage("Threat reported on blockchain!");
      } catch (error) {
        console.error("Error reporting threat", error);
      }
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Zero-Day Sentinel Dashboard</h1>
      <h2>Anomaly Detection Result: {anomalyResult}</h2>
      <button onClick={reportThreat}>Report Threat on Blockchain</button>
      <p>{blockchainMessage}</p>
    </div>
  );
}

export default App;
