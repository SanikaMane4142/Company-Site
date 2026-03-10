// const express = require('express');
// const cors = require('cors');
// const { Pool } = require('pg');
// const nodemailer = require('nodemailer');
// const multer = require('multer');
// const path = require('path');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ================= DATABASE =================
// const pool = new Pool({
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'database_web',
//   password: 'cocpit2025',
//   port: 5432,
// });

// // ================= FILE UPLOAD =================
// const storage = multer.diskStorage({
//   destination: './uploads/',
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage });

// // ================= EMAIL =================
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'sanikamane8081@gmail.com',
//     pass: 'aiylzwmajrojqvdm'
//   }
// });

// // ================= CREATE TABLE =================
// const createTable = async () => {
//   await pool.query(`
//     CREATE TABLE IF NOT EXISTS applications (
//       id SERIAL PRIMARY KEY,
//       name VARCHAR(255),
//       role VARCHAR(255),
//       email VARCHAR(255),
//       message TEXT,
//       resume VARCHAR(255),
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//   `);
// };

// createTable();


// // ================= APPLY JOB =================
// app.post('/api/apply', upload.single('resume'), async (req, res) => {

//   const { name, email, message, role } = req.body;
//   const resumeFile = req.file;

//   if (!name || !email) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }

//   try {

//     // 1️⃣ Save in database
//     await pool.query(
//       `INSERT INTO applications 
//       (name, role, email, message, resume)
//       VALUES ($1,$2,$3,$4,$5)`,
//       [
//         name,
//         role || 'General Application',
//         email,
//         message || '',
//         resumeFile ? resumeFile.filename : null
//       ]
//     );

//     // 2️⃣ Send email to recruiter
//     await transporter.sendMail({
//       from: 'sanikamane8081@gmail.com',
//       to: 'sanikamane8081@gmail.com',
//       subject: `New Job Application`,
//       html: `
//         <h2>New Application Received</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Role:</strong> ${role || 'General Application'}</p>
//         <p><strong>Message:</strong> ${message || 'No message'}</p>
//       `,
//       attachments: resumeFile
//         ? [
//             {
//               filename: resumeFile.originalname,
//               path: resumeFile.path
//             }
//           ]
//         : []
//     });

//     res.json({ message: 'Application submitted successfully' });

  
//   } catch (error) {

//   console.error(error);

//   if (error.code === '23505') {
//     return res.status(400).json({
//       message: 'You already applied for this role'
//     });
//   }

//   res.status(500).json({
//     message: 'Server error'
//   });
//   }







  
// });


// // ================= START SERVER =================
// app.listen(5000, () => {
//   console.log('Server running on http://localhost:5000');
// });

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= DATABASE =================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ================= SUPABASE =================
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// ================= FILE UPLOAD =================
const uploadDir = "./uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ================= EMAIL =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("Email server error:", error);
  } else {
    console.log("Email server ready");
  }
});

// ================= CREATE TABLES =================
const createTables = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS applications (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      role VARCHAR(255),
      email VARCHAR(255),
      message TEXT,
      resume VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

createTables();

// ================= WAITLIST =================
app.post("/api/waitlist", async (req, res) => {
  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    await pool.query(
      "INSERT INTO waitlist (email) VALUES ($1)",
      [email]
    );

    console.log("New waitlist signup:", email);

    res.json({
      message: "Successfully joined the waitlist 🚀",
    });

  } catch (error) {

    if (error.code === "23505") {
      return res.status(400).json({
        message: "You are already on the waitlist",
      });
    }

    console.error("Waitlist error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ================= APPLY JOB =================
app.post("/api/apply", upload.single("resume"), async (req, res) => {

  try {

    const { name, email, message, role } = req.body;
    const resumeFile = req.file;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and Email are required",
      });
    }

    let resumeFileName = null;

    // ===== Upload resume to Supabase Storage =====
    if (resumeFile) {

      const fileBuffer = fs.readFileSync(resumeFile.path);
      const fileName = Date.now() + "-" + resumeFile.originalname;

      const { error } = await supabase.storage
        .from("resumes")
        .upload(fileName, fileBuffer, {
          contentType: resumeFile.mimetype,
        });

      if (error) {
        console.error("Supabase upload error:", error);
      } else {
        resumeFileName = fileName;
      }
    }

    // ===== Save to Database =====
    await pool.query(
      `INSERT INTO applications 
      (name, role, email, message, resume)
      VALUES ($1,$2,$3,$4,$5)`,
      [
        name,
        role || "General Application",
        email,
        message || "",
        resumeFileName,
      ]
    );

    // ===== Send Email =====
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
              filename: resumeFile.originalname,
              path: resumeFile.path,
            },
          ]
        : [],
    });

    // ===== Delete temp file AFTER email =====
    if (resumeFile && fs.existsSync(resumeFile.path)) {
      fs.unlinkSync(resumeFile.path);
    }

    console.log("Application submitted:", name);

    res.json({
      success: true,
      message: "Application submitted successfully",
    });

  } catch (error) {

    console.error("Application Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});