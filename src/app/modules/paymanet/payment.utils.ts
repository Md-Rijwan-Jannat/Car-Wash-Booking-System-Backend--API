import axios from "axios";
import config from "../../config";
import { IPaymentData } from "./paymanet.interface";

export const initialPayment = async (paymentData: IPaymentData) => {
  const frontendUrl = `${config.node_dev === "development" ? config.frontend_base_url : config.frontend_live_url}`;
  const backendUrl = `${config.node_dev === "development" ? "http://localhost:5000" : config.backend_live_url}`;

  const response = await axios.post(config.aamarpay_url!, {
    store_id: config.store_id,
    signature_key: config.signature_key,
    tran_id: paymentData.transitionId,
    success_url: `${backendUrl}/api/payment/conformation?transitionId=${paymentData.transitionId}&status=success`,
    fail_url: `${backendUrl}/api/payment/conformation?transitionId=${paymentData.transitionId}&status=failed`,
    cancel_url: `${frontendUrl}`,
    amount: paymentData.amount,
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: paymentData.customerName,
    cus_email: paymentData.customerEmail,
    cus_add1: paymentData.customerAddress,
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "1206",
    cus_country: "Bangladesh",
    cus_phone: paymentData.customerNumber,
    type: "json",
  });

  return response.data;
};

// verify payment
export const verifyPayment = async (transitionId: string) => {
  const response = await axios.get(config.payment_verify_url!, {
    params: {
      request_id: transitionId,
      store_id: config.store_id,
      signature_key: config.signature_key,
      type: "json",
    },
  });

  return response.data;
};
