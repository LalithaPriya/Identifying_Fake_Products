var  AuthentifiSP= artifacts.require("SupplyChain"); 

const SupplyChainToken = artifacts.require("SupplyDapp");


module.exports = async function(deployer) {

// deployer.deploy(AuthentifiSP);
await deployer.deploy(SupplyChainToken);
const SupplyChainObj = await SupplyChainToken.deployed();

await deployer.deploy(AuthentifiSP,SupplyChainObj.address);
const AuthentifiObj = await SupplyChainToken.deployed();

};