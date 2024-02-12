import db from "../config/Database.js";
import bcrypt from 'bcrypt';

const salt = 10;

export const Me = async (req, res) =>{
    return res.json({Status: "Success", id: req.id, nama_user: req.nama_user, role: req.role});
}

export const Tampil = async (req, res) =>{
    const sql = "SELECT * FROM tbl_user";
    db.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const Tambah = async (req, res) =>{
    const sql = "INSERT INTO tbl_user (`nama_user`,`username`,`password`,`role`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error: "Error for hashing password"});
        const values = [
            req.body.nama_user,
            req.body.username,
            hash,
            req.body.role,
        ]
        db.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "Inserting data error in server"});
            return res.json({Status: "Success"});
        })
    })
}

export const Edit = async (req, res) =>{
    const sql = "SELECT * FROM tbl_user WHERE id = ?";
    const id = req.params.id;
    db.query(sql,[id], (err, result)=> {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const Update = async (req, res) =>{
    const sql = "UPDATE tbl_user SET `nama_user`=?, `username`=?, `password`=?, `role`=? WHERE id=?";
    const id = req.params.id;
    
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error: "Error for hashing password"});

        db.query(sql, [req.body.nama_user, req.body.username, hash, req.body.role, id], (err, result) => {
            if(err) return res.json({Message: "Error inside server"});
            return res.json(result);
        })
    })
}

export const Delete = async (req, res) =>{
    const sql = "DELETE FROM tbl_user WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}