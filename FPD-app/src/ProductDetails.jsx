import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import "./index";// Example of a data array that
// you might receive from an API
const data = [
    { name: "Anom", age: 19, gender: "Male" },
    { name: "Megha", age: 19, gender: "Female" },
    { name: "Subham", age: 25, gender: "Male" },
]

function ProductDetails({ contract, account }) {

    const [email, setEmail] = useState('');
    const [flag, setFlag] = useState('');
    const [resDt, setResDt] = useState('');
    const getProds = async (e) => {
        e.preventDefault();
        console.log("account  ", account)
        let acc = "0x0e5C12b3B839C709cc7fBfFF1F011AaaF9b24BFa"

        let resDt = await contract.methods.getProducts(flag, email).call(function (err, res) {
            if (err) {
                console.log("An error occured", err)
                return
            }
            console.log("The balance is: ", res)
        })
        setResDt(resDt);
        console.log("hash", resDt);

    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleFlagChange = (e) => {
        setFlag(e.target.value);
    }
    return (
        <div className="App">
            <label>
                FLag:
            </label>
            <input type="text" value={flag} onChange={(e) => { handleFlagChange(e) }} /><br />
            <label>
                Email:
            </label>
            <input type="email" value={email} onChange={(e) => { handleEmailChange(e) }} /><br />
            <button className="button" onClick={getProds}>
                Fetch Product Details
            </button>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                </tr>
                <td>{resDt[0]}</td>
                <td>{resDt[1]}</td>
            </table>
        </div>
    );
}

export default ProductDetails;
