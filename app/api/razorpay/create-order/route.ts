import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount } = body;

    if (!amount || isNaN(Number(amount))) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const paise = Math.round(Number(amount) * 100);

    const options = {
      amount: paise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options as any);

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("create-order error", err);
    return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
  }
}
