import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";


connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const { email, id} = reqBody


        const data = await sendEmail({email, emailType: "VERIFY", userId: id})

        return NextResponse.json({
            message: "Verify Mail Sent Successfully",
            success: true,
            reqBody,
            data
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}