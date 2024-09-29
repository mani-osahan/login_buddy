import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../connect";
import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export default NextAuth({
  pages: {
    signIn: "auth/signin",
  },

  callbacks: {
    async signIn({user}: {user: any}) {
      const userExists = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
        select: {
          id: true,
          email: true,
          password: true,
        }
      });

      if (userExists) {
        return true;
      } else {
        return "/unauthorized";
      }
    },

    },
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    CredentialsProvider({
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"},
      },

      async authorize(credentials: any) {
        const userCredentials = prisma.user.findUnique({
          where: {
            email: credentials.email,
            password: credentials.password,
          },
          select: {
              email: true,
              password: true
          }
        });


        return {userCredentials} as any;
      },
    }),
  ],
});
function PrismaAdapter(
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) {
  throw new Error("Function not implemented.");
}
