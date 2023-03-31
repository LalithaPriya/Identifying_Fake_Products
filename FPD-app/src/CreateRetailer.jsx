import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from "react";

// import './CreateRetailer.css';
import './App.css';
import "./index";
// import bcrypt from "bcrypt";

// const bcrypt = require('bcrypt');

const CreateRetailer = ({ contract, account }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [data, setData] = useState([]);
  const [load, setLoad] = useState('');
  const [allowances, setAllowances] = useState([]);

  const handleChange = (e) => {
    setName(e.target.value);
  }
  const handleAgeChange = (e) => {
    setAge(e.target.value);
  }
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  }
  const Submit = async (e) => {
    e.preventDefault();
    let retailerName = name;
    let retailerLocation = location;
    let retailerHashedEmail = email;
    let acc = "0x0e5C12b3B839C709cc7fBfFF1F011AaaF9b24BFa"
    // let resDt = await contract.methods.createSeller(retailerHashedEmail, retailerName, retailerLocation).send({ from: web3.eth.defaultAccount });
    // let resDt = await contract.createSeller(retailerHashedEmail, retailerName, retailerLocation);
    console.log("innnnnnnnn")

    fetch('retailerSignup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ "email": email, "name": name, "location": location, "password": password })
    }).then((response) => response.json())
      .then((actualData) => console.log("dddddd", actualData));



    let resDt = await contract.methods.createSeller(retailerHashedEmail, retailerName, retailerLocation).send({ from: account }).on("transactionHash", function (hash) {
      console.log("hash", hash);
    })
      .on("confirmation", function (confirmationNr) {
        console.log("confirmationNr", confirmationNr);
      })
      .on("receipt", function (receipt) {
        console.log("receipt", receipt);
      })

    // await resDt.wait();
    // console.log("hash", resDt);
  };
  const getRetailer = async (e) => {
    e.preventDefault();
    console.log("account  ", account)
    let retailerHashedEmail = email;
    let acc = "0x0e5C12b3B839C709cc7fBfFF1F011AaaF9b24BFa"
    // let resDt = await contract.getSellerDetails(account);
    // console.log("hash", resDt, resDt.hash);
    // await resDt.wait();

    let resDt = await contract.methods.getSellerDetails("345").call(function (err, res) {
      if (err) {
        console.log("An error occured", err)
        return
      }
      console.log("The balance is: ", res)
    })
    console.log("hash", resDt,);


  };

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <h2> Retailer Registration </h2>
          <table>
            <tr>
              <td>Name</td>
              <td>:
                <input type="text" value={name} required onChange={(e) => { handleChange(e) }} /><br />
              </td>
            </tr>
            <tr>
              <td>Age</td>
              <td>:
                <input type="text" value={age} required onChange={(e) => { handleAgeChange(e) }} /><br />
              </td>
            </tr>
            <tr>
              <td>Location</td>
              <td>:
                <input type="text" value={location} required onChange={(e) => { handleLocationChange(e) }} /><br />
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>:
                <input type="email" value={email} onChange={(e) => { handleEmailChange(e) }} /><br />
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>:
                <input type="password" value={password} onChange={(e) => { handlePasswordChange(e) }} /><br />
              </td>
            </tr>
            <tr>
              <td>Confirm Password</td>
              <td>:
                <input type="password" value={confirmpassword} onChange={(e) => { handleConfirmPasswordChange(e) }} /><br />
              </td>
            </tr>
          </table>
          <button className="button" onClick={Submit}>
            Submit
          </button>
          <div>
            <button className="button" onClick={getRetailer}>
              Get Retailer Details
            </button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default CreateRetailer;

