
import { createClient } from "@supabase/supabase-js";
import formidable from "formidable";
import nodemailer from "nodemailer";
import fs from "fs";

export const config = {
    api: {
        bodyParser: false,
    },
};

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const form = formidable({});

    try {
        const [fields, files] = await form.parse(req);

        const name = fields.name?.[0];
        const email = fields.email?.[0];
        const message = fields.message?.[0];
        const role = fields.role?.[0];
        const resumeFile = files.resume?.[0];

        if (!name || !email) {
            return res.status(400).json({ message: "Name and Email are required" });
        }

        let resumeFileName = null;

        if (resumeFile) {
            const fileBuffer = fs.readFileSync(resumeFile.filepath);
            const fileName = `${Date.now()}-${resumeFile.originalFilename}`;

            const { error: uploadError } = await supabase.storage
                .from("resumes")
                .upload(fileName, fileBuffer, {
                    contentType: resumeFile.mimetype,
                });

            if (uploadError) {
                console.error("Supabase upload error:", uploadError);
            } else {
                resumeFileName = fileName;
            }
        }

        const { error: dbError } = await supabase.from("applications").insert([
            {
                name,
                role: role || "General Application",
                email,
                message: message || "",
                resume: resumeFileName,
            },
        ]);

        if (dbError) throw dbError;

        await transporter.sendMail({
            from: `"Cocpit Careers" <${process.env.EMAIL_USER}>`,
            to: process.env.HR_EMAIL,
            subject: `New Job Application - ${role || "General Application"}`,
            html: `
        <h2>New Job Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role || "General Application"}</p>
        <p><strong>Message:</strong> ${message || "No message provided"}</p>
      `,
            attachments: resumeFile
                ? [
                    {
                        filename: resumeFile.originalFilename,
                        path: resumeFile.filepath,
                    },
                ]
                : [],
        });

        console.log("Application submitted:", name);

        return res.status(200).json({
            success: true,
            message: "Application submitted successfully",
        });
    } catch (error) {
        console.error("Application Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}
