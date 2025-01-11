import GoogleProvider from "next-auth/providers/google";
import LineProvider from "next-auth/providers/line";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    LineProvider({
      authorization: { params: { scope: "openid profile email" } },
      clientId: process.env.LINE_CLIENT_ID!,
      clientSecret: process.env.LINE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET!,
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: any;
      user: any;
      account: any;
    }) {
      if (user && account) {
        const provider = account.provider;
        const providerUserId = account.providerAccountId;

        // First, try to find the social account by provider and providerUserId
        const socialAccount = await prisma.socialAccount.findFirst({
          where: {
            provider: provider,
            providerUserId: providerUserId,
          },
          include: { user: true },
        });

        let dbUser = socialAccount?.user || null;

        // If no social account is found, check by email
        if (!dbUser && user.email) {
          dbUser = await prisma.user.findFirst({
            where: { email: user.email },
          });
        }

        // If no user is found, create a new user and associate with social account
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email: user.email || null,
              name: user.name,
              username: user.email?.split("@")[0] || providerUserId,
              balance: 0.0,
              referralCode: Array.from({ length: 8 }, () =>
                Math.floor(Math.random() * 10),
              ).join(""),
              socialAccounts: {
                create: {
                  provider: provider,
                  providerUserId: providerUserId,
                  email: user.email || null,
                  name: user.name,
                  picture: user.image,
                },
              },
            },
          });
        } else if (!socialAccount) {
          // If the user exists but no social account for this provider, create it
          await prisma.socialAccount.create({
            data: {
              provider: provider,
              providerUserId: providerUserId,
              email: user.email || null,
              name: user.name,
              picture: user.image,
              userId: dbUser.id, // Link it to the existing user
            },
          });
        }

        // Add user data to the token
        token.id = dbUser.id;
        token.username = dbUser.username;
        token.name = dbUser.name;
        token.balance = dbUser.balance;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.name = token.name as string;
        session.user.balance = token.balance as number;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
};
