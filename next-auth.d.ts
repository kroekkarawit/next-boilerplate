import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      username: string;
      name: string;
      email?: string | null;
      image?: string | null;
      balance?: number;
    } & DefaultSession["user"];
  }
}
