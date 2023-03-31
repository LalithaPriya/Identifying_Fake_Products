import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
// import bcrypt from "bcrypt";

// const bcrypt = require('bcrypt');
function LoginRetailer({ contract, account }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState('');
  const [load, setLoad] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const Submit = async (e) => {
    e.preventDefault();
    // let email = email;
    // let password = password;

    fetch('retailerLogin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ "email": email, "password": password })
    })
      .then(response => response.json())
      .then(data => 
        setData(data),
        setLoad(false)
        )
      // .then(function (response) {
      //   if (response) {
      //     console.log("successfully logged in");
      //   }
      // });
  };
  return (
    <div className="App">
      <header className="App-header">
        <form>
          <h2> Login Form Retailer </h2>
          <label >
            Email:
          </label>
          <input type="text" value={email} required onChange={(e) => { handleEmailChange(e) }} /><br />
          <label >
            Password:
          </label>
          <input type="password" value={password} required onChange={(e) => { handlePasswordChange(e) }} /><br />
          <button className="button" onClick={Submit}>
            Submit
          </button>
        </form>
      </header>
    </div>
  );
}

export default LoginRetailer;

