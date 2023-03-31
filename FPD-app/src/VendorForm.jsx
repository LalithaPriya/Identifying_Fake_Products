import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Manu_access from "./Manu_access";
import './App.css';

function VendorForm({ contract, account }) {
    const [brand, setBrand] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [manufacturerID, setManufacturerID] = useState('');
    const [productID, setProductID] = useState('');
    const [retailerName, setRetailerName] = useState('');
    const [description, setDescription] = useState('');

    const handleChange = (e) => {
        setBrand(e.target.value);
    }
    const handleProductPriceChange = (e) => {
        setProductPrice(e.target.value);
    }
    const handleManufacturerIDChange = (e) => {
        setManufacturerID(e.target.value);
    }
    const handleProductIDChange = (e) => {
        setProductID(e.target.value);
    }
    const handleRetailerNameChange = (e) => {
        setRetailerName(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const Submit = async (e) => {
        e.preventDefault();
        // let retailerHashedEmail = email;
        let acc = "0x0e5C12b3B839C709cc7fBfFF1F011AaaF9b24BFa"
        // let resDt = await contract.methods.createSeller(retailerHashedEmail, retailerName, retailerLocation).send({ from: web3.eth.defaultAccount });
        let resDt = await contract.methods.createProduct(productID, productPrice, brand, description).send({ from: account }).on("transactionHash", function (hash) {
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
                    <h2> Product Registration </h2>
                    <table>
                        <tr>
                            <td>Brand</td>
                            <td>:
                                <input type="text" value={brand} required onChange={(e) => { handleChange(e) }} /><br />
                            </td>
                        </tr>
                        <tr>
                            <td>ProductPrice</td>
                            <td>:
                                <input type="text" value={productPrice} required onChange={(e) => { handleProductPriceChange(e) }} /><br />
                            </td>
                        </tr>
                        <tr>
                            <td>ProductID</td>
                            <td>:
                                <input type="text" value={productID} onChange={(e) => { handleProductIDChange(e) }} /><br />
                            </td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>:
                                <input type="text" value={description} onChange={(e) => { handleDescriptionChange(e) }} /><br />
                            </td>
                        </tr>
                    </table>
                    <button className="button" onClick={Submit}>
                        Submit
                    </button>
                </form>
            </header>
        </div>
    );
}

export default VendorForm;

