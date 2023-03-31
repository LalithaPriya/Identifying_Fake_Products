import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Manu_access from "./Manu_access"
import './App.css';
import "./index";
// import bcrypt from "bcrypt";

function ReturnProduct({ contract, account }) {
    const [consumer, setconsumer] = useState('');
    const [product, setProduct] = useState('');
    const [res, setRes] = useState('');

    const handleConsumerChange = (e) => {
        setconsumer(e.target.value);
    }
    const handleProductChange = (e) => {
        setProduct(e.target.value);
    }

    const reportStolen = async (e) => {
        e.preventDefault();
        console.log("account  ", account);
        // let resDt = await contract.getSellerDetails(account);
        // console.log("hash", resDt, resDt.hash);
        // await resDt.wait();

        let resDt = await contract.methods.returnproduct(consumer, product).send({ from: account }).on("transactionHash", function (hash) {
            console.log("hash", hash);
        })
            .on("confirmation", function (confirmationNr) {
                console.log("confirmationNr", confirmationNr);
            })
            .on("receipt", function (receipt) {
                console.log("receipt", receipt);
            })

        console.log("hash", resDt);
        setRes(resDt)
    };

    return (
        <div className="App">
            <header className="App-header">
                <form>
                    <h2> Return Product </h2>
                    <table>
                        <tr>
                            <td>Consumer MailId</td>
                            <td>:
                                <input type="text" value={consumer} onChange={(e) => { handleConsumerChange(e) }} /><br />
                            </td>
                        </tr>
                        <tr>
                            <td>Product Id</td>
                            <td>:
                                <input type="text" value={product} onChange={(e) => { handleProductChange(e) }} /><br />
                            </td>
                        </tr>
                    </table>
                    <button className="button" onClick={reportStolen}>
                        Return
                    </button>
                </form>
                {res!=="" && <p> Return Confirmed!!!</p>}
            

            </header>
        </div>
    );
}

export default ReturnProduct;

