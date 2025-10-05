import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;

    if (!token_hash || !type) return redirect("/error");

    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });

    if (error) return redirect("/error");

    if (type === "recovery") {
        // User came from password reset link
        redirect("/change-password");
    }

    // Default: other verification (signup, etc.)
    redirect("/");
}
