import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        console.log(reqBody);
        const user = await User.findOne({email})
        
        if(!user){
            return NextResponse.json({error: "nouser"}, {status: 400})
        }


        console.log("User Exists");

        const validPassword = await bcryptjs.compare(password, user.password);


        if (!validPassword) {
            console.log("Check your credentials")
            return NextResponse.json({error: "nopass"}, {status: 400})
        }
        if(!user.isVerified){
            console.log(user)
            return NextResponse.json({error: "noverified", email: user.email,id:user._id}, {status: 400})
        }
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email

        }

        const token = jwt.sign(tokenData , process.env.TOKEN_SECRET!,{expiresIn:'1d'})

        const reponse = NextResponse.json({
            message:"Login successful",
            success: true
        })

        reponse.cookies.set("token", token,{httpOnly: true});

        return reponse;




    } catch (error:any) {
        return NextResponse.json({ error: error.message },{status: 500});
    }

}