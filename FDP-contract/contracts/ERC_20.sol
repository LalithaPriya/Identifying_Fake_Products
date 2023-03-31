//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <=0.8.9;
// pragma solidity ^0.8.7;

// import "https://github.com/OpenZeppelin/openz...";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// import "https://github.com/OpenZeppelin/openz...";
// contract BonafideToken is ERC20("Bonafide Token", "BT"){
//     constructor(uint256 initialSupply) public ERC20("BonafideToken", "BT") {        //token name: MyToken, token symbol: MYT
//         _mint(msg.sender, initialSupply);
//     }
// }

contract SupplyDapp is ERC20, ERC20Burnable, Pausable, Ownable {
    address _owner;
    // constructor() ERC20("Bonafide Token", "BT") public {
    //     _owner = msg.sender;
    //     _mint(msg.sender, 1000*10**18);
    // }


    constructor() ERC20("Bonafide Token", "BT") {
        _mint(msg.sender, 1000*10**18);
    }

    function mint(address to, uint256 amount) public payable {
        _mint(to, amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return 18; // eg. return 12;
    }


}
