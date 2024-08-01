import { NextRequest, NextResponse } from "next/server";
import { connectToDataBase } from "../../_config/db";
import Banner from "../../_models/banner";

export async function PUT(req: NextRequest){
    try{
        await connectToDataBase();
        const body = await req.json();
        const { id, title, description, image } = body;
        const banner = await Banner.findByIdAndUpdate(
            id,
            { title, description, image},
            { new: true, runValidators: true } 
        );
        return NextResponse.json(banner, { status: 200 });
    }catch(error){
        return NextResponse.json({error}, {status : 500});
    }
}

export async function POST(req: NextRequest) {
    try{
        await connectToDataBase();
        const body = await req.json(); 
        const { id, title, description, cta, image, background } = body;
        const banner = new Banner({ id, title, description, cta, image, background })
        await banner.save();
        return NextResponse.json(banner, {status: 201});
    }catch(error){
        return NextResponse.json({error}, {status : 500});
    }
}

export async function GET(){
    try{
        await connectToDataBase();
        const banners = await Banner.find({});
        return NextResponse.json(banners, {status: 200});
    }catch(error){
        return NextResponse.json({error}, {status : 500});
    }
}
