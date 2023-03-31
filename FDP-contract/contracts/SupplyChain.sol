pragma solidity >=0.6.0 <=0.8.9;
pragma experimental ABIEncoderV2;
import "./ERC_20.sol";

contract SupplyChain {
    uint256 productID;

    // IERC20 token;
    // address private owner;

    address payable owner;
    SupplyDapp supplyobj;

    enum State {
        ForSale, // 1
        Sold, // 2
        Shipped, // 3
        Received, // 4
        Purchased // 5
    }

    State constant defaultState = State.ForSale;

    struct manfacturerDetails {
        string name;
        string phone;
        string[] product;
        address manufacturerID;
        //consumer has a set of products
        string hashedEmail;
        bool existing;
        //existing will tell whether a manufacturer is already existing or not
        // string[] product - array of products owned by the customer
    }

    // struct which helps create a new product. Product is a combination all of the below things
    struct productDetails {
        uint256 productID;
        string brand;
        uint256 productPrice; // Product Price
        State itemState; // Product State in the supply chain as represented in the enum above
        uint256 state;
        string description; // Product decription
        address payable manufacturerID; // Metamask-Ethereum address of the Manufacturer
        address payable consumerID; // Metamask-Ethereum address of the Consumer
        address[] retailerID; // Metamask-Ethereum address of the all Retailers
        address ownerID; // Metamask-Ethereum address of the current owner as the product moves through 5 stages
        address lastretailer; //address of the Last Retailer of the supply chain
    }

    struct consumerDetails {
        string name;
        string phone;
        string[] product;
        address consumerID;
        //consumer has a set of products
        string hashedEmail;
        bool existing;
        //existing will tell whether a customer is already existing or not
        // string[] product - array of products owned by the customer
    }

    struct sellerDetails {
        string name;
        string location;
        string[] product;
        address retailerID;
        string hashedEmail;
        bool existing;
    }

    mapping(string => manfacturerDetails) manufacturerArr;
    mapping(string => productDetails) productArr;
    mapping(string => consumerDetails) consumerArr;
    mapping(string => sellerDetails) sellerArr;
    mapping(address => string) addresstoHashedEmail;

    // 5 events
    event ForSale(uint256 productID);
    event Sold(uint256 productID);
    event Shipped(uint256 productID);
    event Received(uint256 productID);
    event Purchased(uint256 productID);

    event Approval(
        address indexed tokenOwner,
        address indexed spender,
        uint256 tokens
    );
    event Transfer(address indexed from, address indexed to, uint256 tokens);
    mapping(address => uint256) balances;

    mapping(address => mapping(address => uint256)) allowed;

    // Define a modifer that verifies the Caller
    modifier verify(address _address) {
        require(msg.sender == _address, "Caller couldn't be verified.");
        _;
    }

    // Define a modifier that checks if the amount paid is sufficient enough
    modifier paidEnough(uint256 _price) {
        require(
            msg.value >= _price,
            "The amount paid is not sufficient to cover the price of the product."
        );
        _;
    }

    // Define a modifier that checks the price and refunds the remaining balance
    modifier check(string memory _product) {
        _;
        uint256 _price = productArr[_product].productPrice;
        uint256 amountToReturn = msg.value - _price;
        productArr[_product].consumerID.transfer(amountToReturn);
    }

    // Define a modifier that checks if an product.itemState of a product is ForSale
    modifier forSale(string memory _product) {
        require(
            productArr[_product].itemState == State.ForSale,
            "Product is not in the 'For Sale' State."
        );
        _;
    }

    // Define a modifier that checks if the product.itemState of a product is Sold
    modifier sold(string memory _product) {
        require(
            productArr[_product].itemState == State.Sold,
            "product is not in the sold State."
        );
        _;
    }

    // Define a modifier that checks if the product.itemState of a product is Shipped
    modifier shipped(string memory _product) {
        require(
            productArr[_product].itemState == State.Shipped,
            "product is not in the 'Shipped' State."
        );
        _;
    }

    // Define a modifier that checks if the product.itemState of a product is Received
    modifier received(string memory _product) {
        require(
            productArr[_product].itemState == State.Received,
            "product is not in the 'Received' State."
        );
        _;
    }

    // Define a modifier that checks if the product.itemState of a product is Purchased
    modifier purchased(string memory _product) {
        require(
            productArr[_product].itemState == State.Purchased,
            "product is not in the 'Purchased' State."
        );
        _;
    }

    modifier OnlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor(address tokenAddress) public payable {
        supplyobj = SupplyDapp(tokenAddress);
        // token = IERC20(tokenAddress);
        // owner = msg.sender;

        owner = payable(msg.sender);
        productID = 1;
    }

    // Define a function 'kill' if required. Only the owner/the address who deployed the contract can kill the contract
    function kill() public {
        if (msg.sender == owner) {
            selfdestruct(owner);
        }
    }

    // Function to create a new product that allows a manfacturer to mark an item 'ForSale'
    function createProduct(
        string memory _product,
        uint256 _price,
        string memory _brand,
        string memory _description
    ) public payable returns (uint256) {
        productDetails memory newproduct;
        newproduct.brand = _brand;
        newproduct.productPrice = _price;
        newproduct.manufacturerID = payable(msg.sender);
        newproduct.productID = productID;
        newproduct.itemState = State.ForSale;
        newproduct.state = 1;
        newproduct.description = _description;
        productArr[_product] = newproduct;
        productID = productID + 1;
        emit ForSale(productID);
        return 1;
    }

    // Function for creating a new customer/user
    function createManufacturer(
        string memory _hashedEmail,
        string memory _name,
        string memory _phone
        // address toAddress
    ) public payable returns (bool) {
        if (manufacturerArr[_hashedEmail].existing) {
            return false;
        }
        manfacturerDetails memory newManfacturer;
        newManfacturer.name = _name;
        newManfacturer.phone = _phone;
        newManfacturer.existing = true;
        newManfacturer.hashedEmail = _hashedEmail;
        newManfacturer.manufacturerID = msg.sender;
        manufacturerArr[_hashedEmail] = newManfacturer;
        // supplyobj.transfer(
        //     toAddress,
        //     987*10**8
        // );
        // TestTransfer(receiver,numTokens);
        return true;
    }

    function GetUserTokenBalance(address _acc) public view returns (uint256) {
        return supplyobj.balanceOf(_acc);
    }

    function TestTransfer(address receiver, uint256 numTokens)
        public
        returns (bool)
    {
        require(numTokens <= GetUserTokenBalance(msg.sender));
        // emit Transfer(msg.sender, receiver, numTokens);
        supplyobj.transfer(receiver, numTokens);
        return true;
    }

    function add_mint(address acc) public returns (bool) {
        supplyobj.mint(acc, 1000 * 10**18);
        return true;
    }

    // Function to get product details except retailer/seller information

    function getProductDetails1(string memory _product)
        public
        view
        returns (
            string memory,
            uint256,
            uint256,
            address
        )
    {
        return (
            productArr[_product].brand,
            productArr[_product].productID,
            productArr[_product].productPrice,
            productArr[_product].manufacturerID
        );
    }

    function getProductDetails2(string memory _product)
        public
        view
        returns (State, string memory)
    {
        return (
            productArr[_product].itemState,
            productArr[_product].description
        );
    }

    // Function to get retailer(s) information associated with the product

    function getProductRetailerDetails(string memory _product)
        public
        view
        returns (string[][2] memory)
    {
        uint256 sellersassociatedwithproduct = productArr[_product]
            .retailerID
            .length;
        uint256 i;
        string[][2] memory ans;
        for (i = 0; i < sellersassociatedwithproduct; i++) {
            string memory retailerHashedEmail = addresstoHashedEmail[
                productArr[_product].retailerID[i]
            ];
            ans[i][0] = sellerArr[retailerHashedEmail].name;
            ans[i][1] = sellerArr[retailerHashedEmail].location;
        }
        return ans;
    }

    // Function for creating a new customer/user
    function createCustomer(
        string memory _hashedEmail,
        string memory _name,
        string memory _phone,
        address toAddress
    ) public payable returns (bool) {
        if (consumerArr[_hashedEmail].existing) {
            return false;
        }
        consumerDetails memory newCustomer;
        newCustomer.name = _name;
        newCustomer.phone = _phone;
        newCustomer.existing = true;
        newCustomer.hashedEmail = _hashedEmail;
        newCustomer.consumerID = msg.sender;
        consumerArr[_hashedEmail] = newCustomer;
        // supplyobj.transfer(toAddress, 999 * 10**10);
        return true;
    }

    // Function to get consumer details

    function getConsumerDetails(string memory _hashedEmail)
        public
        view
        returns (string memory, string memory)
    {
        return (
            consumerArr[_hashedEmail].name,
            consumerArr[_hashedEmail].phone
        );
    }

    // Function for creating a seller

    function createSeller(
        string memory _hashedEmail,
        string memory _sellerName,
        string memory _sellerLocation,
        address toAddress
    ) public payable returns (uint256) {
        sellerDetails memory newSeller;
        newSeller.name = _sellerName;
        newSeller.location = _sellerLocation;
        newSeller.hashedEmail = _hashedEmail;
        newSeller.retailerID = msg.sender;
        newSeller.existing = true;
        sellerArr[_hashedEmail] = newSeller;
        // supplyobj.transfer(msg.sender, 50 * 10**18);
        // supplyobj.transfer(
        //     toAddress,
        //     688 * 10**18
        // );

        return 1;
    }

    //Function to get Seller Details

    function getSellerDetails(string memory _hashedEmail)
        public
        view
        returns (string memory, string memory)
    {
        return (sellerArr[_hashedEmail].name, sellerArr[_hashedEmail].location);
    }

    // Return all products of a given customer/seller

    function getProducts(uint256 flag, string memory _hashedEmail)
        public
        view
        returns (string[] memory)
    {
        if (flag == 1) {
            return consumerArr[_hashedEmail].product;
        }
        return sellerArr[_hashedEmail].product;
    }

    // Cannot directly compare strings in Solidity
    // This function hashes the 2 strings and then compares the 2 hashes
    function compareStrings(string memory a, string memory b)
        internal
        returns (bool)
    {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }

    function ConsumerBuys(
        string memory _product, //name
        string memory _consumer, //email
        string memory _seller //email
    )
        public
        payable
        //Call modifier to check if product is for Sale
        forSale(_product)
        // Call modifer to check if consumer has paid enough
        paidEnough(productArr[_product].productPrice)
        // Call modifer to send any excess ether back to consumer
        check(_product)
        returns (bool)
    {
        uint256 i;
        bool flag = false;
        sellerDetails memory seller = sellerArr[_seller];
        uint256 productsassociatedwithseller = seller.product.length;
        consumerDetails memory consumer = consumerArr[_consumer];
        //check if the product has the seller
        // check if the seller has the product listed. if yes, remove the product and add the product to consumer. add consumer to product

        if (seller.existing && consumer.existing) {
            if (productArr[_product].ownerID == seller.retailerID) {
                flag = true;
            }
            if (flag == true) {
                for (i = 0; i < productsassociatedwithseller; i++) {
                    if (
                        compareStrings(sellerArr[_seller].product[i], _product)
                    ) {
                        remove(i, sellerArr[_seller].product);
                        consumerArr[_consumer].product.push(_product);
                        productArr[_product].consumerID = payable(
                            consumer.consumerID
                        );
                        productArr[_product].ownerID = consumer.consumerID;
                        productArr[_product].lastretailer = seller.retailerID;
                        productArr[_product].itemState = State.Sold;
                        productArr[_product].state = 3;
                        // Transfer money to manfacturer
                        // productArr[_product].manufacturerID.transfer(
                        //     productArr[_product].productPrice
                        // );
                        // supplyobj.transfer(productArr[_product].ownerID, productArr[_product].productPrice);
                        // supplyobj.transfer(msg.sender, 50 * 10**18);
                        // emit the appropriate event
                        emit Sold(productArr[_product].productID);
                        flag = true;
                        break;
                    }
                }
            }
        }
        return flag;
    }

    // ShipProduct is function
    function ShipProduct(string memory _product)
        public
        // Call modifier to check if product has passed previous stage of supply chain
        sold(_product)
        // Call modifier to verify caller of this function
        verify(productArr[_product].lastretailer)
    {
        // Update the state
        productArr[_product].itemState = State.Shipped;
        // Emit the appropriate event
        emit Shipped(productArr[_product].productID);
    }

    // Define a function 'receiveItem'
    function receiveItem(string memory _product)
        public
        // Call modifier to check if product has passed previous stage of supply chain
        shipped(_product)
        verify(productArr[_product].ownerID)
    {
        productArr[_product].itemState = State.Received;
        emit Received(productArr[_product].productID);
    }

    // Define a function 'purchaseItem' that allows the consumer to mark an item 'Purchased'
    function purchaseItem(string memory _product)
        public
        received(_product)
        verify(productArr[_product].ownerID)
    {
        productArr[_product].itemState = State.Purchased;
        emit Purchased(productArr[_product].productID);
    }

    function RetailertoRetailer(
        string memory _product,
        string memory _fromseller,
        string memory _toseller
    ) public payable returns (bool) {
        uint256 i;
        bool flag = false;
        sellerDetails memory oldSeller = sellerArr[_fromseller];
        sellerDetails memory newSeller = sellerArr[_toseller];
        uint256 productsassociatedwitholdseller = oldSeller.product.length;

        if (oldSeller.existing && newSeller.existing) {
            if (productArr[_product].ownerID == oldSeller.retailerID) {
                flag = true;
            }
            if (flag == true) {
                for (i = 0; i < productsassociatedwitholdseller; i++) {
                    if (
                        compareStrings(
                            sellerArr[_fromseller].product[i],
                            _product
                        )
                    ) {
                        remove(i, sellerArr[_fromseller].product);
                        sellerArr[_toseller].product.push(_product);
                        productArr[_product].retailerID.push(
                            newSeller.retailerID
                        );
                        productArr[_product].ownerID = newSeller.retailerID;
                        flag = true;
                        break;
                    }
                }
            }
        }
        return flag;
    }

    function InitialOwner(string memory _product, string memory _retailer)
        public
        payable
        returns (bool)
    {
        if (sellerArr[_retailer].existing) {
            productArr[_product].retailerID.push(
                (sellerArr[_retailer].retailerID)
            );
            productArr[_product].ownerID = sellerArr[_retailer].retailerID;
            productArr[_product].state = 2;
            sellerArr[_retailer].product.push(_product);
            return true;
        }
        return false;
    }

    // Function to delete an element from an array
    function remove(uint256 index, string[] storage array)
        internal
        returns (bool)
    {
        if (index >= array.length) return false;

        for (uint256 i = index; i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }
        array.pop();
        return true;
    }

    function checkFakeProd(string memory _product, string memory _retailer)
        public
        payable
        returns (bool)
    {
        productDetails memory newproduct = productArr[_product];
        if (newproduct.ownerID == sellerArr[_retailer].retailerID) {
            // Check if retailer data matches with retailers data in BC
            return true;
        }
        return false;
    }

    // Function to report stolen
    function reportproductstolen(
        string memory _consumer,
        string memory _product
    ) public payable returns (bool) {
        uint256 i;
        if (consumerArr[_consumer].existing) {
            for (i = 0; i < consumerArr[_consumer].product.length; i++) {
                if (
                    compareStrings(consumerArr[_consumer].product[i], _product)
                ) {
                    productArr[_product].state = 4;
                }
                return true;
            }
        }
        return false;
    }

    function returnproduct(string memory _consumer, string memory _product)
        public
        payable
        returns (bool)
    {
        if (consumerArr[_consumer].existing) {
            uint256 productsellers = productArr[_product].retailerID.length;
            string memory retailerHashedEmail = addresstoHashedEmail[
                productArr[_product].retailerID[productsellers - 1]
            ];
            if (sellerArr[retailerHashedEmail].existing) {
                productArr[_product].ownerID = productArr[_product].retailerID[
                    productsellers - 1
                ];
                productArr[_product].consumerID = payable(address(0));
                uint256 i;
                for (i = 0; i < consumerArr[_consumer].product.length; i++) {
                    if (
                        compareStrings(
                            consumerArr[_consumer].product[i],
                            _product
                        )
                    ) {
                        sellerArr[retailerHashedEmail].product.push(_product);
                        remove(i, consumerArr[_consumer].product);
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
