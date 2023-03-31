import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Manu_access from "./Manu_access"
import './App.css';
import "./index";
// import bcrypt from "bcrypt";

function FetchRetailerDetails({ contract, account }) {
    const [email, setEmail] = useState('');
    const [resDt, setResDt] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const getRetailer = async (e) => {
        e.preventDefault();
        console.log("account  ", account);
        // let resDt = await contract.getSellerDetails(account);
        // console.log("hash", resDt, resDt.hash);
        // await resDt.wait();

        let resDt = await contract.methods.getSellerDetails(email).call(function (err, res) {
            if (err) {
                console.log("An error occured", err)
                return
            }
            console.log("The balance is: ", res)
        })
        setResDt(resDt)
        console.log("hash", resDt);


    };

    return (
        <div className="App">
            <header className="App-header">
                <form>
                    <h2> Fetch Retailer Details </h2>
                    <table>
                        <tr>
                            <td>Email</td>
                            <td>:
                                <input type="email" value={email} onChange={(e) => { handleEmailChange(e) }} /><br />
                            </td>
                        </tr>
                    </table>
                    <button className="button" onClick={getRetailer}>
                        Get Retailer Details
                    </button>
                </form>
                <h4>Retailer Details</h4>
                {resDt && resDt[0] !== "" &&
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                        </tr>
                        <tr>
                            <td>{resDt[0]}</td>
                            <td>{resDt[1]}</td>
                        </tr>
                    </table>
                }
                    {resDt && resDt[0] === "" &&
                    <p>No results found</p>
                }

            </header>
        </div>
    );
}

export default FetchRetailerDetails;

