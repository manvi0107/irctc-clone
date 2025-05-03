# 🚆 IRCTC Clone with AI Fare Prediction & Blockchain Ticket Resale

This is a modern web-based clone of the IRCTC train booking platform that integrates **AI-based fare prediction** and a **blockchain-powered ticket resale marketplace**. The project demonstrates how emerging technologies can be used to enhance transparency, user experience, and operational efficiency in travel platforms.

---

## 🌟 Features

### 🔍 Train Search
- Search for trains between two stations
- User-friendly interface with basic train listing (mock data)

### 🤖 AI-Powered Fare Prediction
- Predicts train ticket fares dynamically based on:
  - Base Fare
  - Reservation Charge
  - Superfast Charge
  - Fuel Amount
  - Distance
  - Duration
- Powered by a Flask API and a trained machine learning model (e.g., XGBoost or Linear Regression)

### 🔗 Blockchain Ticket Resale
- Built using Solidity and deployed on Ethereum-compatible networks
- Allows users to **list** and **buy** second-hand train tickets in a transparent and secure manner
- Integrates MetaMask for wallet connection and transaction handling

---

## 🛠️ Tech Stack

| Frontend | Backend | Machine Learning | Blockchain |
|----------|---------|------------------|------------|
| HTML, CSS, JavaScript | Flask (Python) | Scikit-learn, XGBoost | Solidity, Web3.js, MetaMask |

---

## 🚀 How to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/irctc-clone.git
cd irctc-clone
