import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import './App.css';
import { ethers } from "ethers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SupplyChain from "./utils/SupplyChain.json";
import SupplyChain from "./abi/SupplyChain.json";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel_landing from './Carousel_landing';
import { NavLink, Link } from "react-router-dom";
import CreateRetailer from "./CreateRetailer";
import CreateManufacturer from "./CreateManufacturer";
import VendorForm from "./VendorForm";
import SellerDetails from "./SellerDetails";
import ProductDetails from "./ProductDetails";
import Manu_access from "./Manu_access";
import {Retailer_Operations} from "./Manu_access";
import {Consumer_Operations} from "./Manu_access";
import InitialOwner from "./InitialOwner";
import Web3 from 'web3';


const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [wallet, setWallet] = useState("Please Connect Your Wallet to Proceed");
  const [contract, setContract] = useState(null);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];

      console.log("Found an authorized account!!&!!:", account);
      setWallet("Connected");

      setCurrentAccount(account);

      const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545"|| "https://goerli.infura.io/v3/7e155d8b460d4f8d991e50353f107a7b");
      const accts = await web3.eth.getAccounts()

      // web3.eth.defaultAccount = "0x2FeC1Ac536C084ae6e7250C8EE0714af330D59e9";
      const contractAddress = "0x2d8f6a1369156269e4F5Be2Bb5aac175C13C6e51"; // MY smart contract address
      const contract = new web3.eth.Contract(SupplyChain.abi, contractAddress, {});
      console.log("contract", contract, account);
      setContract(contract);
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);

      setWallet("Connected");

      setCurrentAccount(accounts[0]);

      const provider = new ethers.providers.JsonRpcProvider();
      const network = await provider.getNetwork();
      const contractAddress = "0x2d8f6a1369156269e4F5Be2Bb5aac175C13C6e51"; //MY smart contract address
      // const contractAddress = artifact.networks[network.chainId].address;

      const contract = new ethers.Contract(
        contractAddress,
        // AssetTracker.abi,
        SupplyChain.abi,
        provider.getSigner(),
      );
      setContract(contract);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <>
      <div>
        {contract ? (
          <div className="App">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Carousel_landing contract={contract} account={currentAccount} />}></Route>
                <Route exact path="/CreateRetailer" element={<CreateRetailer contract={contract} account={currentAccount} />} />
                <Route exact path="/CreateManufacturer" element={<CreateManufacturer contract={contract} account={currentAccount} />} />
                <Route exact path="/VendorForm" element={<VendorForm contract={contract} account={currentAccount} />} />
                <Route exact path="/SellerDetails" element={<SellerDetails contract={contract} account={currentAccount} />} />
                <Route exact path="/ProductDetails" element={<ProductDetails contract={contract} account={currentAccount} />} />
                <Route exact path="/InitialOwner" element={<InitialOwner contract={contract} account={currentAccount} />} />
                <Route exact path="/Manu_operations" element={<Manu_access contract={contract} account={currentAccount} />} />
                <Route exact path="/Retailer_Operations" element={<Retailer_Operations contract={contract} account={currentAccount} />} />
                <Route exact path="/Consumer_Operations" element={<Consumer_Operations contract={contract} account={currentAccount} />} />
              </Routes>
            </BrowserRouter>
            {console.log("kjhgf")}
          </div>
        ) : (
          <div>
            <div>
              <div className="connectWalletContainer">
                {wallet === "Please Connect Your Wallet to Proceed" && (
                  <button onClick={connectWallet} className="connectWalletBtn">
                    <img
                      src={
                        "https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
                      }
                      className="img"
                      alt="metamask"
                    />{" "}
                    {wallet}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;

