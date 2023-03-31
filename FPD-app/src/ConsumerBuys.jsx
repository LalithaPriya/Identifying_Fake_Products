import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Manu_access from "./Manu_access"
import './App.css';
import "./index";
// import bcrypt from "bcrypt";

// const bcrypt = require('bcrypt');

// string memory _product,//name
// string memory _consumer,//email
// string memory _seller //email

function ConsumerBuys({ contract, account }) {
    const [product, setProduct] = useState('');
    const [consumer, setconsumer] = useState('');
    const [seller, setSeller] = useState('');
    const [result, setResult] = useState('');

    const handleChange = (e) => {
        setProduct(e.target.value);
    }
    const handleRetailerChange = (e) => {
        setSeller(e.target.value);
    }
    const handleConsumerChange = (e) => {
        setconsumer(e.target.value);
    }

    const Submit = async (e) => {
        e.preventDefault();

        let resDt = await contract.methods.ConsumerBuys(product, consumer, seller).send({ from: account }).on("transactionHash", function (hash) {
            console.log("hash", hash);
        })
            .on("confirmation", function (confirmationNr) {
                console.log("confirmationNr", confirmationNr);
            })
            .on("receipt", function (receipt) {
                console.log("receipt", receipt);
            })
    };
    const checkAuth = async (e) => {
        e.preventDefault();

        let resDt1 = await contract.methods.checkFakeProd(product, seller).call(function (err, res) {
            if (err) {
                console.log("An error occured", err)
                return
            }
            console.log("The balance is: ", res)
        })
        setResult(resDt1);
        // setResult(true);
        // console.log("hash1resDt1", resDt1);

    };


    return (
        <div className="App">
            <header className="App-header">
                <form>
                    <h2> Consumer Buys </h2>
                    <label >
                        Product :
                    </label>
                    <input type="text" value={product} required onChange={(e) => { handleChange(e) }} /><br />
                    <label >
                        Consumer MailId:
                    </label>
                    <input type="text" value={seller} required onChange={(e) => { handleRetailerChange(e) }} /><br />
                    <label >
                        Retailer MailId:
                    </label>
                    <input type="text" value={consumer} required onChange={(e) => { handleConsumerChange(e) }} /><br />
                    <button className="button" onClick={checkAuth}>
                        check Authorization
                    </button>

                    <button className="button" onClick={Submit}>
                        Submit
                    </button>
                </form>
                {/* {console.log("ppppp ",result)} */}
                {result === true ?
                    <h2>Product is Authorized</h2>
                    : (result === false?
                    <h2>Its a fake Product</h2>:"")}
            </header>
        </div>
    );
}

export default ConsumerBuys;

