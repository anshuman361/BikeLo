import Razorpay from "razorpay";
import Booking from "../model/Booking.js";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: "rzp_test_SIY3Gh9wktCcpS",
  key_secret: "R4yrnrU1jkyrGivz2okEzuTS",
});

export const createPaymentOrder = async (req, res) => {
  const { bookingId } = req.body;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  const options = {
    amount: booking.totalPrice * 100, // Razorpay works in paise
    currency: "INR",
    receipt: `receipt_${bookingId}`,
  };

  const order = await razorpay.orders.create(options);

  res.json(order);
};

export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    bookingId,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "R4yrnrU1jkyrGivz2okEzuTS")
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    await Booking.findByIdAndUpdate(bookingId, {
      paymentStatus: "paid",
      razorpay_payment_id,
    });

    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
};
