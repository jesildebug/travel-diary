import Payment from '../models/Payment.js';
import paypal from 'paypal-rest-sdk';
import Booking from "../models/Booking.js"

paypal.configure({
  mode: 'sandbox',
  client_id: 'AYYAXdCfk0DLkA8aC50qX7Pz_EPW-L3BMwZ-TQ2vOVwbe_d5AN5speQR4_QyWHk6DZ2Q5FHsyLkelxze',
  client_secret: 'EDd4pm8q2bO6T_MWUFjWKIszo8_r6e_6dSCvrY857bAntMpjs3kplyANHglm3vSuVb2coWaz5Xq5t-88',
});


// Create a new booking with PayPal payment
export const createBookingWithPayPal = async (req, res) => {
  try {
    // Get the booking details from the req.body
    const bookingData = req.body.booking;
     console.log(req.body.booking);
    // Create the booking in your database
    const savedBooking = await Booking.create(bookingData);

    // Define the PayPal payment details
    const payment = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      transactions: [
        {
          // Include booking details in the 'item_list' section
          item_list: {
            items: [
              {
                name: savedBooking.tourName, // Use your booking details
                sku: 'item',
                price: savedBooking.totalAmount, // Use the booking total amount
                currency: savedBooking.currency, // Use the appropriate currency code
                quantity: 1,
              },
            ],
          },
          amount: {
            total: savedBooking.totalAmount, // Use the booking total amount
            currency: savedBooking.currency, // Use the appropriate currency code
          },
          custom: savedBooking._id.toString(), // Add the booking ID
        },
      ],
      redirect_urls: {
        return_url: 'http://localhost:3000/home', // Use your success URL
        cancel_url: 'http://localhost:3000/home', // Use your cancel URL
      },
    };

    try {
      // Create the PayPal payment (await for the promise to resolve)
      const paymentResponse = await new Promise((resolve, reject) => {
        paypal.payment.create(payment, (error, payment) => {
          if (error) {
            reject(error);
          } else {
            resolve(payment);
          }
        });
      });

      // Redirect to the PayPal payment approval URL
      const approvalUrl = paymentResponse.links.find((link) => link.rel === 'approval_url');
      res.status(200).json({
        success: true,
        approval_url: approvalUrl.href,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'PayPal payment creation error',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

