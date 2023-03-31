import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link } from "react-router-dom";
import VendorForm from "./VendorForm";
import './App.css';
import CreateRetailer from './CreateRetailer';
import ConsumerBuys from './ConsumerBuys';
import InitialOwner from './InitialOwner';
import LoginRetailer from './LoginRetailer';
import FetchRetailerDetails from "./FetchRetailerDetails";
import ReportStolen from "./ReportStolen";
import ReturnProduct from "./ReturnProduct";
import Carousel_landing from "./Carousel_landing";

import "./index";
import './Manu_access.css';
import CreateManufacturer from './CreateManufacturer';

// import bcrypt from "bcrypt";

// const bcrypt = require('bcrypt');

function Manu_access({ contract, account }) {
    const [showResults, setShowResults] = React.useState("initial")
    const handleChange = (e, val) => {
        e.preventDefault();
        setShowResults(val);
    }
    const renderSwitch = () => {
        let param = showResults;
        // console.log("valllll", param)
        switch (param) {
            case 'Home': return <Carousel_landing contract={contract} account={account} />;
            case 'CreateManufacturer':
                return <CreateManufacturer contract={contract} account={account} />;
            case 'InitialOwner':
                return <InitialOwner contract={contract} account={account} />;
            case 'VendorForm':
                return <VendorForm contract={contract} account={account} />;
            default:
                return <CreateManufacturer contract={contract} account={account} />;
        }
    }


    return (
        <>
            <div className="App">
                <div className="topnav">
                    <a onClick={(e) => handleChange(e, "CreateManufacturer")}>
                        <div className="active">
                            <p className="legend">Create Manufacturer</p>
                        </div>
                    </a>

                    <a onClick={(e) => handleChange(e, "VendorForm")}>
                        <div className="active">
                            <p className="legend">Create Product</p>
                        </div>
                    </a>
                    <a onClick={(e) => handleChange(e, "InitialOwner")}>
                        <div className="active">
                            <p className="legend">Transfer to Seller</p>
                        </div>
                    </a>
                    {/* <a href="#about">About</a> */}
                </div>
                <div>
                    {renderSwitch()}
                    {/* {showResults === "initial" ?
                        <InitialOwner contract={contract} account={account} />
                        : <VendorForm contract={contract} account={account} />} */}
                </div>
            </div>
        </>
    );
}
export default Manu_access;

export function Retailer_Operations({ contract, account }) {
    const [showResults, setShowResults] = React.useState("initial")

    const renderSwitch = () => {
        let param = showResults;
        // console.log("valllll", param)
        switch (param) {
            case 'Home': return <Carousel_landing contract={contract} account={account} />;
            case 'createRetail':
                return <CreateRetailer contract={contract} account={account} />;
            case 'login':
                return <LoginRetailer contract={contract} account={account} />;
            case 'FetchRetailerDetails':
                return <FetchRetailerDetails contract={contract} account={account} />;
            default:
                return <CreateRetailer contract={contract} account={account} />;
        }
    }

    const handleChange = (e, val) => {
        e.preventDefault();
        console.log("vaaaa", val)
        setShowResults(val);
        // renderSwitch(val);
    }

    return (
        <>
            <div className="App">
                <div className="topnav">
                    <a onClick={(e) => handleChange(e, "Home")}>
                        <div className="active">
                            <p className="legend">Home</p>
                        </div>
                    </a>
                    <a onClick={(e) => handleChange(e, "createRetail")}>
                        <div className="active">
                            <p className="legend">Create Retailer</p>
                        </div>
                    </a>
                    <a onClick={(e) => handleChange(e, "login")}>
                        <div className="active">
                            <p className="legend"> Retailer Login</p>
                        </div>
                    </a>
                    <a onClick={(e) => handleChange(e, "FetchRetailerDetails")}>
                        <div className="active">
                            <p className="legend"> FetchRetailerDetails</p>
                        </div>
                    </a>
                </div>
                <div >
                    {renderSwitch()}
                </div>
            </div>
        </>
    );
}




export function Consumer_Operations({ contract, account }) {
    const [showResults, setShowResults] = React.useState("initial")

    const renderSwitch = () => {
        let param = showResults;
        switch (param) {
            case 'Home': return <Carousel_landing contract={contract} account={account}  />;
            case 'ConsumerBuys':
                return <ConsumerBuys contract={contract} account={account} />;
            case 'reportproductstolen':
                return <ReportStolen contract={contract} account={account} />;
            case 'returnproduct':
                return <ReturnProduct contract={contract} account={account} />;
            default:
                return <ConsumerBuys contract={contract} account={account} />;
        }
    }

    const handleChange = (e, val) => {
        e.preventDefault();
        console.log("vaaaa", val)
        setShowResults(val);
        // renderSwitch(val);
    }

    return (
        <>
            <div className="App">
                <div className="topnav">
                    <a onClick={(e) => handleChange(e, "Home")}>
                        <div className="active">
                            <p className="legend">Home</p>
                        </div>
                    </a>
                    <a onClick={(e) => handleChange(e, "ConsumerBuys")}>
                        <div className="active">
                            <p className="legend">ConsumerBuys</p>
                        </div>
                    </a>
                    <a onClick={(e) => handleChange(e, "reportproductstolen")}>
                        <div className="active">
                            <p className="legend">reportproductstolen</p>
                        </div>
                    </a>
                    <a onClick={(e) => handleChange(e, "returnproduct")}>
                        <div className="active">
                            <p className="legend">returnproduct</p>
                        </div>
                    </a>
                    {/* <a href="#about">About</a> */}
                </div>
                <div >
                    {renderSwitch()}
                </div>
            </div>
        </>
    );
}





