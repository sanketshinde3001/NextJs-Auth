import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email} = reqBody

        console.log(reqBody);
        const user = await User.findOne({email})
        console.log("here",user)
        
        if(!user){
            return NextResponse.json({error: "User does not exists"}, {status: 400})
        }

        console.log("User Exists");

        await sendEmail({email, emailType: "RESET", userId: user._id})

        const reponse = NextResponse.json({
            message:"Forgot Password Mail sent successfully", 
            success: true
        })

        return reponse;

    } catch (error:any) {
        return NextResponse.json({ error: error.message },{status: 500});
    }

}