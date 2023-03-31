import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Manu_access from "./Manu_access"
import './App.css';
import "./index";
// import bcrypt from "bcrypt";

// const bcrypt = require('bcrypt');


function InitialOwner({ e, contract, account }) {
    // e.preventDefault();

    const [product, setProduct] = useState('');
    const [retailer, setRetailer] = useState('');

    const handleChange = (e) => {
        setProduct(e.target.value);
    }
    const handleRetailerChange = (e) => {
        setRetailer(e.target.value);
    }

    const Submit = async (e) => {
        e.preventDefault();

        let resDt = await contract.methods.InitialOwner(product, retailer).send({ from: account }).on("transactionHash", function (hash) {
            console.log("hash", hash);
        })
            .on("confirmation", function (confirmationNr) {
                console.log("confirmationNr", confirmationNr);
            })
            .on("receipt", function (receipt) {
                console.log("receipt", receipt);
            })
    };

    return (
        <div className="App">
            {/* <Manu_access /> */}
            <header className="App-header">
                <form>
                    <h2> Initial Owner </h2>
                    <label >
                        Product:
                    </label>
                    <input type="text" value={product} required onChange={(e) => { handleChange(e) }} /><br />
                    <label >
                        Retailer:
                    </label>
                    <input type="text" value={retailer} required onChange={(e) => { handleRetailerChange(e) }} /><br />
                    <button className="button" onClick={Submit}>
                        Submit
                    </button>
                </form>
            </header>
        </div>
    );
}
export default InitialOwner;

