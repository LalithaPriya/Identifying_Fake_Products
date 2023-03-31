import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { NavLink, Link } from "react-router-dom";
import Manu_access from "./Manu_access"
import { Retailer_Operations } from "./Manu_access"
import "./Carousel_landing.css"
// import './App.css';

function Carousel_landing({ contract, account }) {
    const [amt, setAmt] = useState('');
    const getRetailer = async (e) => {
        e.preventDefault();
        console.log("account  ", account);
        let resDt = await contract.methods.GetUserTokenBalance(account).call(function (err, res) {
            if (err) {
                console.log("An error occured", err)
                return
            }
            console.log("The balance is: ", res)
        })
        setAmt(resDt)
        // console.log("hash", resDt);
    };
    return (
        <div>
            <div className="container">
                <h1> Identification of fake products in Supply Chain System </h1>
                <div id="login-type-container">
                    <div id="options-container" >
                        <NavLink to="/Manu_operations" className="select-link">
                            <div className="options" style={{ marginLeft: "auto" }}>
                                <img
                                    src="/MIcon.png"
                                    alt="manufacturer"
                                    className="options-image"
                                />
                                <h1 className="options-image-caption">Manufacturer Login</h1>
                            </div>
                        </NavLink>
                        <NavLink to="/Retailer_Operations" className="select-link">
                            <div className="options">
                                <img
                                    src="/SIcon.png"
                                    alt="manufacturer"
                                    className="options-image"
                                />
                                <h1 className="options-image-caption">Retailer Login</h1>
                            </div>
                        </NavLink>
                        <NavLink to="/Consumer_Operations" className="select-link">
                            <div className="options">
                                <img
                                    src="/auth.jpeg"
                                    alt="manufacturer"
                                    className="options-image"
                                />
                                <h1 className="options-image-caption">Authenticate Product</h1>
                            </div>
                        </NavLink>
                    </div>
                </div>
                <div>
                    <button className="button" onClick={getRetailer}>
                        Get Balance
                    </button>
                </div>
                <div>
                    {amt}
                </div>
            </div>
        </div>
    )
}
export default Carousel_landing;