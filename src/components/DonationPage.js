import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import config from "./config";

const DonationPage = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set a default value for totalAmount for testing purposes
    setTotalAmount(100.00); // Replace with actual value
  }, []);

  const handleSuccessPayment = async (details) => {
    try {
      if (details.status === "COMPLETED") {
        setIsLoading(true); // Start loading animation
  
        // Save payment details to localStorage
        localStorage.setItem("paymentDetails", JSON.stringify(details));
  
        // Handle order completion logic here (e.g., save order to backend)
        setPaymentComplete(true);
        setOrderPlaced(true);
  
        setTimeout(() => {
          setIsLoading(false);
          window.location.href = "/orders"; // Redirect to orders page
        }, 2000);
      } else {
        setMessage("Payment was not successful. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to process payment. Please try again.");
    }
  };
  

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalAmount.toFixed(2),
          },
        },
      ],
    });
  };

  return (
    <div className="buy-checkout-container">
      <h2>Donate 100$ for sustainble development </h2>
      {message && <div className="buy-message">{message}</div>}

      {orderPlaced ? (
        <div className="content1">
          <svg width="400" height="400">
            <circle
              fill="none"
              stroke="#68E534"
              strokeWidth="20"
              cx="200"
              cy="200"
              r="190"
              strokeLinecap="round"
              transform="rotate(-90 200 200)"
              className="circle"
            />
            <polyline
              fill="none"
              stroke="#68E534"
              points="88,214 173,284 304,138"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tick"
            />
          </svg>
          <div className="order-text">Order Placed!</div>
        </div>
      ) : (
        <>
          <PayPalScriptProvider
            options={{
              "client-id": config.paypal.clientId,
              currency: config.paypal.currency,
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  localStorage.setItem("payment", JSON.stringify(details));
                  handleSuccessPayment(details);
                });
              }}
              onError={(err) => {
                setMessage("Payment failed. Please try again.");
              }}
            />
          </PayPalScriptProvider>
        </>
      )}
    </div>
  );
};

export default DonationPage;