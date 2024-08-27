const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Get port and environment variables
const port = process.env.PORT || 3000;
const environment = process.env.ENVIRONMENT || 'sandbox';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const endpoint_url = environment === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

// Define routes
app.post('/create_order', async (req, res) => {
    try {
        const access_token = await get_access_token();
        const response = await fetch(`${endpoint_url}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'USD',
                        value: '100.00'
                    },
                    shipping: {
                        address: {
                            address_line_1: req.body.address.line1,
                            admin_area_2: req.body.address.city,
                            admin_area_1: req.body.address.state,
                            postal_code: req.body.address.zip,
                            country_code: 'US',
                        },
                    },
                }]
            })
        });
        const json = await response.json();
        res.send(json);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.post('/complete_order', async (req, res) => {
    try {
        const access_token = await get_access_token();
        const response = await fetch(`${endpoint_url}/v2/checkout/orders/${req.body.order_id}/capture`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        });
        const json = await response.json();
        res.send(json);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

async function get_access_token() {
    const auth = `${client_id}:${client_secret}`;
    const response = await fetch(`${endpoint_url}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
        },
        body: 'grant_type=client_credentials'
    });
    const json = await response.json();
    return json.access_token;
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle React routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
