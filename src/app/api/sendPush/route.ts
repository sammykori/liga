// pages/api/sendPush.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const payload = await req.json();
        console.log("api-payload", payload);

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-push-notifications`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`, // server key
                },
                body: JSON.stringify(payload),
            }
        );

        const data = await response.json();
        console.log("api-data", data);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: true, message: err }, { status: 500 });
    }
}
