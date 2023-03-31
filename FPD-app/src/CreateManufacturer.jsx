import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';


function CreateManufacturer({ contract, account }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const handleChange = (e) => {
    setName(e.target.value);
  }
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const Submit = async (e) => {
    e.preventDefault();
    // let resDt = await contract.methods.createSeller(retailerHashedEmail, retailerName, retailerLocation).send({ from: web3.eth.defaultAccount });
    let resDt = await contract.methods.createManufacturer(email, name, phone).send({ from: account }).on("transactionHash", function (hash) {
      console.log("hash", hash);
    })
      .on("confirmation", function (confirmationNr) {
        console.log("confirmationNr", confirmationNr);
      })
      .on("receipt", function (receipt) {
        console.log("receipt", receipt);
      })
    console.log("hash", resDt, resDt.hash);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <h2> Manufacturer Registration </h2>
          <label >
            Name:
          </label>
          <input type="text" value={name} required onChange={(e) => { handleChange(e) }} /><br />
          <label >
            Phone:
          </label>
          <input type="text" value={phone} required onChange={(e) => { handlePhoneChange(e) }} /><br />
          <label>
            Email:
          </label>
          <input type="email" value={email} onChange={(e) => { handleEmailChange(e) }} /><br />
          <button className="button" onClick={Submit}>
            Submit M
          </button>
        </form>
      </header>
    </div>
  );
}

export default CreateManufacturer;

