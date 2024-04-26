
import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

        const user = await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}});

        if(!user){
            return NextResponse.json({error : "User not found ! "},{status:400});
        }

        console.log(user);
        user.forgotPasswordToken =  undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({message : "User verified successfully! ",sucess:true,email:user.email},{status:200});


    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}