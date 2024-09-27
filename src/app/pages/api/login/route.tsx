import {SHA256 as sha256} from "crypto-js";
import pool from "../connect";
import { PrismaClient } from "@prisma/client";
import prisma from "../connect";

export default async function POST(req: any, res: any) {

    const reqBody = await req.json();
    const { email, password } = reqBody;

    if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
    }

    try{
        
        const user = await prisma.User.findUnique({
            where: {
                email: email
            },
            select: {
                id: true, 
                name: true, 
                email: true, 
                password: true
            }
        })
        if (user && user.password == sha256(password).toString()) { 

            return res.status(200).json({ user: user });

        }else {
            return res.status(400).json({ error: "Invalid email or password" });
        }

    }catch(err:any){
        throw new Error(err)
    }

}
