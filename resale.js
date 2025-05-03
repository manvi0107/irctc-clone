// resale.js

let web3;
let contract;
let account;

// Your contract ABI and address
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "buyTicket",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_from",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_to",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "listTicket",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getTicket",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tickets",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "seller",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "from",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "to",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isSold",
        "type": "bool"
      }
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
      console.error(error);
      alert('Error fetching balance.');
    }
  } else {
    alert('Please connect to MetaMask first.');
  }
};

// Handle train search form submission
document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const fromStation = document.getElementById('fromStation').value.trim();
  const toStation = document.getElementById('toStation').value.trim();

  // Mock data for demonstration
  const trains = [
    { id: 1, name: 'Express 101', from: 'Delhi', to: 'Mumbai', departure: '10:00 AM', arrival: '08:00 PM' },
    { id: 2, name: 'Express 202', from: 'Delhi', to: 'Mumbai', departure: '02:00 PM', arrival: '12:00 AM' },
    { id: 3, name: 'Express 303', from: 'Delhi', to: 'Mumbai', departure: '06:00 PM', arrival: '04:00 AM' }
  ];

  const results = trains.filter(train =>
    train.from.toLowerCase() === fromStation.toLowerCase() &&
    train.to.toLowerCase() === toStation.toLowerCase()
  );

  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';

  if (results.length > 0) {
    results.forEach(train => {
      const trainDiv = document.createElement('div');
      trainDiv.classList.add('train-item');
      trainDiv.innerHTML = `
        <h3>${train.name}</h3>
        <p><strong>From:</strong> ${train.from}</p>
        <p><strong>To:</strong> ${train.to}</p>
        <p><strong>Departure:</strong> ${train.departure}</p>
        <p><strong>Arrival:</strong> ${train.arrival}</p>
      `;
      resultsContainer.appendChild(trainDiv);
    });
  } else {
    resultsContainer.innerHTML = '<p>No trains found for the selected route.</p>';
  }
});
