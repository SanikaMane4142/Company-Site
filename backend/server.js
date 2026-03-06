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
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= DATABASE =================
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

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

// check connection
transporter.verify((error, success) => {
  if (error) {
    console.error("Email server error:", error);
  } else {
    console.log("Email server ready");
  }
});

// ================= CREATE TABLE =================
const createTable = async () => {
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
};

createTable();

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

    // 1️⃣ Save to database
    await pool.query(
      `INSERT INTO applications 
      (name, role, email, message, resume)
      VALUES ($1,$2,$3,$4,$5)`,
      [
        name,
        role || "General Application",
        email,
        message || "",
        resumeFile ? resumeFile.filename : null,
      ]
    );

    // 2️⃣ Send Email
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

    console.log("Application submitted:", name);

    res.json({
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
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});