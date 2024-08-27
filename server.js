import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
const environment = process.env.ENVIRONMENT || 'sandbox';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const endpoint_url = environment === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

// Create Order
app.post('/create_order', (req, res) => {
    get_access_token().then(access_token => {
        let order_data_json = {
            'intent': req.body.intent,
            'purchase_units': [{
                'amount': {
                    'currency_code': 'USD',
                    'value': '100.00'
                }
            }]
        };
        fetch(endpoint_url + '/v2/checkout/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(order_data_json)
        })
        .then(res => res.json())
        .then(json => res.send(json))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
    });
});

// Complete Order
app.post('/complete_order', (req, res) => {
    get_access_token().then(access_token => {
        fetch(endpoint_url + '/v2/checkout/orders/' + req.body.order_id + '/capture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(res => res.json())
        .then(json => {
            res.send(json);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
    });
});

// Get Access Token
function get_access_token() {
    const auth = `${client_id}:${client_secret}`;
    const data = 'grant_type=client_credentials';
    return fetch(endpoint_url + '/v1/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
        },
        body: data
    })
    .then(res => res.json())
    .then(json => json.access_token);
}

// Serve static files
app.use(express.static('public'));

// Thank You Page
app.get('/thank_you', (req, res) => {
    const transaction_id = req.query.transaction_id;
    res.send(`
        <html>
        <body>
            <h1>Thank You!</h1>
            <p>Your transaction ID is: ${transaction_id}</p>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
