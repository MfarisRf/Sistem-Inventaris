import db from "../config/Database.js";

export const Me = async (req, res) =>{
    return res.json({Status: "Success", name: req.name, role: req.role});
}

export const Tampil = async (req, res) =>{
    const sql = "SELECT * FROM tbl_customer";
    db.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const Tambah = async (req, res) =>{
    const sql = "INSERT INTO tbl_customer (`nama_customer`,`nohp_customer`,`email_customer`,`alamat_customer`) VALUES (?)";
    const values = [
        req.body.nama_customer,
        req.body.nohp_customer,
        req.body.email_customer,
        req.body.alamat_customer
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
}

export const Edit = async (req, res) =>{
    const sql = "SELECT * FROM tbl_customer WHERE id = ?";
    const id = req.params.id;
    db.query(sql,[id], (err, result)=> {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const Update = async (req, res) =>{
    const sql = "UPDATE tbl_customer SET `nama_customer`=?, `nohp_customer`=?, `email_customer`=?, `alamat_customer`=? WHERE id=?";
    const id = req.params.id;
    
    db.query(sql, [req.body.nama_customer, req.body.nohp_customer, req.body.email_customer, req.body.alamat_customer, id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
}

export const Delete = async (req, res) =>{
    const sql = "DELETE FROM tbl_customer WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}