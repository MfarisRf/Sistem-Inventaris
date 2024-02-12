import db from "../config/Database.js";
import jwt, { verify } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const salt = 10;

export const Login = async (req, res) =>{
    const sql = "SELECT * FROM tbl_user WHERE username = ?";
    db.query(sql, [req.body.username], (err, data) => {
        if(err) return res.json({Error: "Login error in serve"});
        if(data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) return res.json({Error: "Password compare error"});
                if(response) {
                    const id = data[0].id;
                    const nama_user = data[0].nama_user;
                    const role = data[0].role;
                    const token = jwt.sign({id, nama_user, role}, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "Success"});
                }else {
                    return res.json({Error: "Password not matched"});
                }
            })
        }else {
            return res.json({Error: "No username existed"});
        }
    })
}

export const Logout = async (req, res) =>{
    res.clearCookie('token');
    return res.json({Status: "Success"});
}