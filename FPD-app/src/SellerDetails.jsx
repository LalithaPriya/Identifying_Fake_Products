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

function SellerDetails({ contract, account }) {

    const [email, setEmail] = useState('');
    const [resDt, setResDt] = useState('');
    const getRetailer = async (e) => {
        e.preventDefault();
        console.log("account  ", account)
        let retailerHashedEmail = email;
        let acc = "0x0e5C12b3B839C709cc7fBfFF1F011AaaF9b24BFa"
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
        setResDt(resDt);
        console.log("hash", resDt);

    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    return (
        <div className="App">
            <label>
                Email:
            </label>
            <input type="email" value={email} onChange={(e) => { handleEmailChange(e) }} /><br />
            <button className="button" onClick={getRetailer}>
                Submit 
            </button>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                </tr>
                {/* {resDt.map((val, key) => { */}
                    {/* return ( */}
                        {/* <tr key={key}> */}
                            <td>{resDt[0]}</td>
                            <td>{resDt[1]}</td>
                            
                        {/* </tr> */}
                    {/* ) */}
                {/* })} */}
            </table>
        </div>
    );
}

export default SellerDetails;
