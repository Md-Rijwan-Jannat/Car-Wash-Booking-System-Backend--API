import { CatchAsync } from "../../utils/catchAsync";
import { PaymentService } from "./payment.service";

const paymentConformation = CatchAsync(async (req, res) => {
  const { transitionId } = req.query;

  const result = await PaymentService.paymentConformationIntoDB(
    transitionId as string,
  );

  if (!result) {
    return res.status(404).send("Transaction not found or already confirmed");
  }

  res.send(result);
});

export const PaymentController = {
  paymentConformation,
};
