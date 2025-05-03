// Initialize Web3 and Contract
let web3;
let contract;
let account;

// Corrected Contract ABI (flattened array)
const contractABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "_id", "type": "uint256" }
    ],
    "name": "buyTicket",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_from", "type": "string" },
      { "internalType": "string", "name": "_to", "type": "string" },
      { "internalType": "uint256", "name": "_price", "type": "uint256" }
    ],
    "name": "listTicket",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" },
      { "indexed": false, "internalType": "address", "name": "buyer", "type": "address" }
    ],
    "name": "TicketBought",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "from", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "to", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" }
    ],
    "name": "TicketListed",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_id", "type": "uint256" }
    ],
    "name": "getTicket",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextId",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "tickets",
    "outputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" },
      { "internalType": "address payable", "name": "seller", "type": "address" },
      { "internalType": "string", "name": "from", "type": "string" },
      { "internalType": "string", "name": "to", "type": "string" },
      { "internalType": "uint256", "name": "price", "type": "uint256" },
      { "internalType": "bool", "name": "isSold", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const contractAddress = "0xf8e81D47203A594245E36C48e151709F0C19fBe8"; // Replace with actual contract address

// Connect to MetaMask
document.getElementById("connectButton").onclick = async function () {
  if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();  // Request access to MetaMask
    account = (await web3.eth.getAccounts())[0]; // Get user's account
    contract = new web3.eth.Contract(contractABI, contractAddress);
    alert('Connected to MetaMask!');
  } else {
    alert('Please install MetaMask!');
  }
};

// Example function to interact with the contract
document.getElementById("getBalanceButton").onclick = async function () {
  if (contract && account) {
    try {
      const balance = await web3.eth.getBalance(account);
      document.getElementById("contractResult").textContent = `Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`;
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  } else {
    alert('Please connect to MetaMask first.');
  }
};

// Handle Train Search Form Submission
document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const fromStation = document.getElementById('fromStation').value;
  const toStation = document.getElementById('toStation').value;

  // Mock data for demonstration
  const mockTrains = [
    { name: 'Express 101', departure: '09:00', arrival: '12:00', fare: 500 },
    { name: 'Superfast 202', departure: '14:00', arrival: '18:00', fare: 700 }
  ];

  let resultsHTML = '<h3>Available Trains:</h3><ul>';
  mockTrains.forEach(train => {
    resultsHTML += `<li>${train.name} - Departure: ${train.departure}, Arrival: ${train.arrival}, Fare: ₹${train.fare}</li>`;
  });
  resultsHTML += '</ul>';

  document.getElementById('trainResults').innerHTML = resultsHTML;
});

// Handle Fare Prediction Form Submission
document.getElementById('predictForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const payload = {
    baseFare: parseFloat(document.getElementById('baseFare').value),
    reservationCharge: parseFloat(document.getElementById('reservationCharge').value),
    superfastCharge: parseFloat(document.getElementById('superfastCharge').value),
    fuelAmount: parseFloat(document.getElementById('fuelAmount').value),
    distance: parseFloat(document.getElementById('distance').value),
    duration: parseFloat(document.getElementById('duration').value)
  };

  const apiUrl = "http://127.0.0.1:5000";  // Update this to your deployed API endpoint

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    document.getElementById("predictionResult").innerHTML =
      `<strong>Estimated Fare:</strong> ₹${result.predictedFare.toFixed(2)}`;
  } catch (error) {
    document.getElementById("predictionResult").innerHTML =
      `<span style="color: red;">Error fetching prediction.</span>`;
    console.error(error);
  }
});
