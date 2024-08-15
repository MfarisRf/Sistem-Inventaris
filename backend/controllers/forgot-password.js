// src/controllers/forgot-password.js
import Mailjet from 'node-mailjet';
import { mailjetConfig } from '../config/config.js';
import jwt from 'jsonwebtoken';
import db from '../config/Database.js'; // Sesuaikan dengan jalur file konfigurasi database Anda

// Inisialisasi Mailjet dengan API Key dan Secret
const mailjet = Mailjet.apiConnect(mailjetConfig.apiKey, mailjetConfig.apiSecret);

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const sql = "SELECT * FROM tbl_user WHERE email = ?";
    
    db.query(sql, [email], async (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ Error: "Database error" });
        }

        if (data.length > 0) {
            const user = data[0];
            const token = jwt.sign({ id: user.id }, "jwt-secret-key", { expiresIn: '1h' });
            const resetLink = `http://localhost:3000/reset-password?token=${token}`;

            const request = mailjet
                .post('send', { version: 'v3.1' }) // Tambahkan versi API Mailjet
                .request({
                    Messages: [
                        {
                            From: {
                                Email: 'support@satorirattan.my.id', // Ganti dengan email pengirim yang terverifikasi
                                Name: 'Support'
                            },
                            To: [
                                {
                                    Email: email
                                }
                            ],
                            Subject: 'Reset Password',
                            TextPart: `Click the following link to reset your password: ${resetLink}`,
                            HTMLPart: `<p>Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`
                        }
                    ]
                });

            try {
                const result = await request;
                console.log('Email sent successfully:', result.body);
                return res.json({ Status: "Reset link sent to your email" });
            } catch (error) {
                console.error('Failed to send email:', error.statusCode, error.message);
                return res.status(500).json({ Error: "Failed to send email" });
            }
        } else {
            return res.status(404).json({ Error: "No account found with this email" });
        }
    });
};
