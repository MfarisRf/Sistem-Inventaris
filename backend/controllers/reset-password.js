import jwt from 'jsonwebtoken';
import db from '../config/Database.js'; // Adjust path as needed
import bcrypt from 'bcrypt';

export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    console.log('Received token:', token);
    console.log('Received newPassword:', newPassword);

    if (!token || !newPassword) {
        return res.status(400).json({ Error: 'Token and new password are required' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, 'jwt-secret-key');
        console.log('Decoded token:', decoded);

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log('Hashed password:', hashedPassword);

        // Update password in database
        const sql = 'UPDATE tbl_user SET password = ? WHERE id = ?';
        db.query(sql, [hashedPassword, decoded.id], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ Error: 'Failed to update password. Please try again later.' });
            }

            console.log('Database result:', result);
            if (result.affectedRows > 0) {
                return res.json({ Status: 'Password updated successfully' });
            } else {
                return res.status(404).json({ Error: 'User not found' });
            }
        });
    } catch (err) {
        console.error('JWT error:', err);
        return res.status(400).json({ Error: 'Invalid or expired token' });
    }
};
