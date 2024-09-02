import config from "../../config";
import { ServiceSlotBooking } from "../serviceSlotBooking/serviceSlotBooking.model";
import { verifyPayment } from "./payment.utils";

const paymentConformationIntoDB = async (
  transitionId: string,
  status: string,
) => {
  let paymentStatus = "failed";
  let message = "Payment Failed. Please try again.";

  if (status === "success") {
    const verifyResponse = await verifyPayment(transitionId);

    if (verifyResponse && verifyResponse.pay_status === "Successful") {
      // Update the payment status and return the updated document
      await ServiceSlotBooking.findOneAndUpdate(
        { transitionId },
        { paymentStatus: "Paid" },
        { new: true },
      );

      paymentStatus = "success";
      message = "Payment Successful!";
    }
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
                color: ${paymentStatus === "success" ? "#F5A524" : "#F5A524"};
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
                color: ${paymentStatus === "success" ? "#FDF1DC" : "#FDF1DC"};
                margin-bottom: 20px;
            }
            .button {
                display: inline-block;
                background-color: ${paymentStatus === "success" ? "#FDF1DC" : "#FDF1DC"};
                color: ${paymentStatus === "success" ? "#F5A524" : "#F5A524"};
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
            <div class="success-icon"><img src="${paymentStatus === "success" ? "https://img.icons8.com/?size=100&id=123575&format=png&color=FAB005" : "https://img.icons8.com/?size=100&id=7703&format=png&color=FAB005"}" /></div>
            <h1>${message}</h1>
            <p>${paymentStatus === "success" ? "Thank you for your payment. Your transaction has been completed successfully." : "There was an issue with your payment. Please try again or contact support."}</p>
            <a href="${config.node_dev === "development" ? config.frontend_base_url : config.frontend_live_url}" class="button">Return to Home</a>
        </div>
    </body>
    </html>
  `;
};

export const PaymentService = { paymentConformationIntoDB };
