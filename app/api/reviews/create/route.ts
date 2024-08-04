import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { verifyToken } from '@/lib/auth';


export const POST = async (req: NextRequest) => {

    try {
        const { userId }= await verifyToken(req);

        const {rating, comment } = await req.json();

        if (!rating || !comment) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        const user = await db.user.findUnique({
            where: { id: userId },
            select: { email: true },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const review = await  db.review.create({
            data: {
                rating,
                comment,
                userId
            }
        })
        
        return NextResponse.json({ message: 'Booking created successfully', review }, { status: 201 });
    
    } catch(err) {
        return NextResponse.json({ message: 'Cannot create review!' }, { status: 500 });
    }
}