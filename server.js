const express = require('express');
require('dotenv').config();
var cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post("/checkout", async(req, res) => {
  const items = req.body.items;
  let lineItems = [];
  items.forEach(item => {
    lineItems.push(
      {
        price: item.id,
        quantity: item.quantity
      }
    )
  })
  //creating checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel'
  })
  //send the created session url to the frontend
  res.send(JSON.stringify({
    url: session.url
  }))
});

app.listen(4000, () => console.log('listening on port' + 4000))
