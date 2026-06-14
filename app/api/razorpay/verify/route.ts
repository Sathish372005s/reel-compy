import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || "";
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 400 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("verify error", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
