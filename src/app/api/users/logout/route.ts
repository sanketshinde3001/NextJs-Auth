import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest){
// export async function POST(request: NextRequest){
// no need to do anything add to server..    
    try {
        const response = NextResponse.json({
            message : "Logout Sucessfully",
            success : true,
        });

        response.cookies.set("token", "",{
            httpOnly : true,
            expires:new Date(0)
        })

        return response;



    } catch (error:any) {
        return NextResponse.json({ error: error.message },{status: 500});
    }

}