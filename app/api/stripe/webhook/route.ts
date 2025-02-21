import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const prisma = new PrismaClient();

export async function POST(request: Request) {
  let checkResult: any = {};

  const payload = await request.text();
  const sig = request.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

  } catch (error) {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  try {
    switch (event.type) {

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const userId = paymentIntent.metadata?.userId;
        const starId = paymentIntent.metadata?.starId;
        const amount = paymentIntent.amount;

        if (!userId || !starId) {
          return NextResponse.json({ error: "Invalid payment metadata" }, { status: 400 });
        }

        // Prevent duplicate processing
        const existingTransaction = await prisma.transaction.findFirst({
          where: { ref: paymentIntent.id },
        });


        if (existingTransaction) {
          return NextResponse.json({ message: "Duplicate transaction ignored" });
        }

        const result = await prisma.$transaction(async (tx) => {
          // Get user & star data
          const userData = await tx.user.findUnique({ where: { id: userId } });
          const starData = await tx.star.findUnique({
            where: { id: starId, status: "AVAILABLE" },
          });

          if (!userData || !starData) {
            throw new Error("User or star not found.");
          }

          // Assign the star to the user
          const updatedStar = await tx.star.update({
            where: { id: starId },
            data: { status: "PUBLIC", ownerId: userId },
          });


          const newTransaction = await tx.transaction.create({
            data: {
              userId,
              amount: amount / 100, // Convert from cents
              ref: paymentIntent.id, // Store Stripe PaymentIntent ID
              type: "PURCHASE",
            },
          });

          return { updatedStar, newTransaction };
        });

        checkResult = result;
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true, checkResult });
}