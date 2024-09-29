import pool from "../connect";
import { PrismaClient } from "@prisma/client";
import prisma from "../connect";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default async function POST(req: NextRequest, res: NextResponse) {

    const reqBody = await req.json();
    const { email, password } = reqBody;

    if (!email || !password) {
        return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }
    try{
        
        const user = await prisma.user.findUnique({
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
        const validPassword = await bcrypt.compare(password, user.password);

        if (user && validPassword) { 
            
            const tokenData = {
                id: user.id,
                username: user.name,
                email: user.email,
            };

            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
                expiresIn: "1d",    
            })

            const response = NextResponse.json({ user: user, token: token }, { status: 200 });

            return response;

        }else {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });  
        }

    }catch(err:any){
        throw new Error(err)
    }

}
