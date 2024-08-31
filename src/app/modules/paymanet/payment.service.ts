import { ServiceSlotBooking } from "../serviceSlotBooking/serviceSlotBooking.model";
import { verifyPayment } from "./payment.utils";

const paymentConformationIntoDB = async (transitionId: string) => {
  const verifyResponse = await verifyPayment(transitionId);

  let paymentStatus;
  let message;

  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    // Update the payment status and return the updated document
    await ServiceSlotBooking.findOneAndUpdate(
      { transitionId },
      { paymentStatus: "Paid" },
      { new: true },
    );

    paymentStatus = "success";

    message = "Payment Successful!";
  } else {
    paymentStatus = "failed";
    message = "Payment Failed. Please try again.";
  }

  // Return the dynamically generated HTML
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment ${paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .container {
                background-color: #ffffff;
                padding: 50px;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .container h1 {
                color: ${paymentStatus === "success" ? "#F5A524" : "#DA0000"};
                font-size: 2.5rem;
                margin-bottom: 20px;
            }
            .container p {
                color: #555555;
                font-size: 1.1rem;
                margin-bottom: 30px;
            }
            .success-icon {
                font-size: 4rem;
                color: ${paymentStatus === "success" ? "#FDF1DC" : "#DA0000"};
                margin-bottom: 20px;
            }
            .button {
                display: inline-block;
                background-color: ${paymentStatus === "success" ? "#FDF1DC" : "#FFC7C7"};
                color: ${paymentStatus === "success" ? "#F5A524" : "#DA0000"};
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 5px;
                font-size: 1rem;
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: ${paymentStatus === "success" ? "#FDF3DC" : "#FFEEEE"};
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="success-icon"><img src="${paymentStatus === "success" ? "https://img.icons8.com/?size=100&id=123575&format=png&color=FAB005" : "https://img.icons8.com/?size=100&id=120650&format=png&color=FF5555"}" /></div>
            <h1>${message}</h1>
            <p>${paymentStatus === "success" ? "Thank you for your payment. Your transaction has been completed successfully." : "There was an issue with your payment. Please try again or contact support."}</p>
            <a href="http://localhost:5173/services" class="button">Return to Home</a>
        </div>
    </body>
    </html>
  `;
};

export const PaymentService = { paymentConformationIntoDB };
