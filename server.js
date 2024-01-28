const stripe = require('stripe')('sk_test_51OMlSSSJ4zvOHLVnupdbij0RFLReOrfNnEUhyhpw0Ds9veURjkbDpsS11XNARsGXFaWNWalnJ0NrscVN04lIaU2t00Mm9csrTY');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// const cors = require('cors');
// app.use(cors());

app.use(bodyParser.json())

app.get('/',(req, res) => {
    res.send("Its Bmusician Channel")
})

// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

app.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const {amount, currency} = req.body
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2023-10-16'}
  );
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    // automatic_payment_methods: {
    //   enabled: true,
    // },
    payment_method_types: ['card'],
  });
  console.log(paymentIntent, ephemeralKey, customer)

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});

app.listen(4002, ()=> console.log("Running on http://localhost:4002"))