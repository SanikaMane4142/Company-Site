
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const { error } = await supabase
            .from("waitlist")
            .insert([{ email }]);

        if (error) {
            if (error.code === "23505") {
                return res.status(400).json({ message: "You are already on the waitlist" });
            }
            throw error;
        }

        console.log("New waitlist signup:", email);

        return res.status(200).json({
            message: "Successfully joined the waitlist 🚀",
        });
    } catch (error) {
        console.error("Waitlist error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}
