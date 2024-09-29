declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      name: string;
      email: string;
      image: string;
      balance: number;
    };
  }
}
