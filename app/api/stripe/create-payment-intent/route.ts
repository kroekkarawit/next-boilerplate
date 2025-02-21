import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const getStarPriceLocalInSmallestUnit = (currency: string, usdPrice: number) => {
  const conversionRates: { [key: string]: number } = {
    usd: 1, eur: 0.93, gbp: 0.8, aud: 1.42, cad: 1.27, jpy: 155, thb: 35, nzd: 1.5, sek: 10.5, nok: 10.0,
  };

  return Math.round(usdPrice * (conversionRates[currency] || 1) * 100);
};

const getSupportedPaymentMethods = (currency: string) => {
  const methods: { [key: string]: string[] } = {
    thb: ["promptpay", "card"], jpy: ["card"], eur: ["card", "sepa_debit"], gbp: ["card"],
    usd: ["card", "ach_debit"], aud: ["card"], cad: ["card"], nzd: ["card"], sek: ["card"], nok: ["card"],
  };

  return methods[currency] || ["card"];
};

export async function POST(request: NextRequest) {
  const { currency: frontendCurrency, userId, starId } = await request.json();

  if (!userId || !starId) {
    return NextResponse.json({ error: "User ID and Star ID are required" }, { status: 400 });
  }

  // Validate user
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true } });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  // Validate star
  const starData = await prisma.star.findUnique({
    where: { id: starId, status: "AVAILABLE" },
    select: { id: true, name: true, price: true },
  });

  if (!starData) {
    return NextResponse.json({ error: "Star not found or already owned" }, { status: 400 });
  }

  // Standardize currency
  let currency = (frontendCurrency || "usd").toLowerCase();
  const supportedCurrencies = ["usd", "thb", "jpy", "eur", "gbp", "aud", "cad", "nzd", "sek", "nok"];

  if (!supportedCurrencies.includes(currency)) currency = "usd";

  const amountInSmallestUnit = getStarPriceLocalInSmallestUnit(currency, starData.price);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInSmallestUnit,
      currency,
      payment_method_types: getSupportedPaymentMethods(currency),
      metadata: {
        userId,
        userEmail: user.email,
        starId,
        starName: starData.name,
        starPrice: starData.price,
        currency,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {

    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 });
  }
}
