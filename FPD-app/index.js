var express = require('./node_modules/express');
var app = express();
app.use(express.json());

const {Client } = require("pg");
app.use(express.static('src'));
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});
client.connect();

app.post('/retailerSignup', (req, res) => {
    console.log('Request to /retailerSignuppppp\n',req.body);
    let retailerEmail = req.body.email;
    let retailerName = req.body.name;
    let retailerLocation = req.body.location;
    let retailerHashedPassword = req.body.password;
    // Adding the retailer to the PostgreSQL database
	const fetchRetailer = async (retailerEmail) => {
		const query = `SELECT * 
					   FROM RETAILER
					   WHERE retailerEmail = $1`;
		try {
			const { rows } = await client.query(query, [retailerEmail]); // sends queries
			if (rows.length)
			{
				console.log(rows[0]);
            	return res.status(400).send('Email already exists!');
			}
			else
			{
				const query = `INSERT INTO RETAILER (retailerName, retailerEmail, 
					retailerLocation, retailerHashedPassword) VALUES ($1,$2,$3,$4) RETURNING *`;
				try {
					
					await client.query(query, [retailerName, retailerEmail, 
					retailerLocation, retailerHashedPassword]);
                    console.log("updated successfully")
				}

				catch(error){
					console.error(error.stack);
					return res.status(400).send('Some Error');
				}

		
		}}
		catch (error) {
			console.error(error.stack);
			return res.status(400).send('Some Error');
		} 
	};
	fetchRetailer(retailerEmail);
    });

app.post('/retailerLogin', (req, res) => {
    console.log('Request to /retailerLogin\n');
    let retailerEmail = req.body.email;
    let retailerHashedPassword = req.body.password;
    const fetchRetailer = async (retailerEmail) => {
		const query = `SELECT * FROM RETAILER WHERE retailerEmail = $1`;
		try {
			const { rows } = await client.query(query, [retailerEmail]); // sends queries
            let pass = rows[0].retailerhashedpassword;
			if (retailerHashedPassword === pass)
			{
				console.log(`${retailerEmail} has successfully logged in\n`);
                return res.status(200).send('Retailer login successful!');
			}
			else
			{
                console.log(`${retailerEmail} COULD NOT login\n`);
                return res.status(400).send('Retailer login failed.');	
            }
		
		}
		catch (error) {
			console.error(error.stack);
			return res.status(400).send('Some Error');
		} 
	};
	fetchRetailer(retailerEmail);
    });

    app.post('ManufacturerSignup', (req, res) => {
        console.log('Request to /ManufacturerSignup\n',req.body);
        let email = req.body.email;
        let name = req.body.name;
        let hashedpassword = req.body.password;
        let phone = req.body.phone;
        // Adding the retailer to the PostgreSQL database
        const fetchManufacturer = async (email) => {
            const query = `SELECT * 
                           FROM manufacturer
                           WHERE  = $1`;
            try {
                const { rows } = await client.query(query, [email]); // sends queries
                if (rows.length)
                {
                    console.log(rows[0]);
                    return res.status(400).send('Email already exists!');
                }
                else
                {
                    const query = `INSERT INTO manufacturer (name,email,hashedpassword,phone) VALUES ($1,$2,$3,$4) RETURNING *`;
                    try {
                        
                        await client.query(query, [name,email,hashedpassword,phone]);
                    }
    
                    catch(error){
                        console.error(error.stack);
                        return res.status(400).send('Some Error');
                    }
    
            
            }}
            catch (error) {
                console.error(error.stack);
                return res.status(400).send('Some Error');
            } 
        };
        fetchManufacturer(email);
        });
    
        app.post('/manufacturerLogin', (req, res) => {
            console.log('Request to /manufacturerLogin\n');
            let email = req.body.email;
            let password = req.body.password;
            const fetchRetailer = async (email) => {
                const query = `SELECT * FROM manufacturer WHERE retailerEmail = $1`;
                try {
                    const { rows } = await client.query(query, [email]); // sends queries
                    let pass = rows[0].password;
                    if (password === pass)
                    {
                        console.log(`${email} has successfully logged in\n`);
                        return res.status(200).send('Manufacturer login successful!');
                    }
                    else
                    {
                        console.log(`${email} COULD NOT login\n`);
                        return res.status(400).send('Manufacturer login failed.');	
                    }
                
                }
                catch (error) {
                    console.error(error.stack);
                    return res.status(400).send('Some Error');
                } 
            };
            fetchRetailer(email)});
    

    
// get all product details
app.get('/getProductDetails', (req, res) => {
        console.log('Request to /getproductDetails\n');
        const { rows } = client.query(query); // sends queries
        return rows;
});




app.listen(3001, function () {
    console.log('Supply chain Dapp listening on port 3001!');
});