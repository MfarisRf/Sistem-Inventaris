import db from "../config/Database.js";

export const Me = async (req, res) =>{
    return res.json({Status: "Success", name: req.name, role: req.role});
}

export const TampilBarangMasuk = async (req, res) =>{
    const sql = "SELECT TBM.*, TB.nama_barang, TS.nama_supplier FROM tbl_barang_masuk TBM JOIN tbl_barang TB ON TB.id=TBM.id_barang JOIN tbl_supplier TS ON TS.id=TBM.id_supplier";
    db.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const TampilBarangKeluar = async (req, res) =>{
    const sql = "SELECT TBK.*, TB.nama_barang, TC.nama_customer FROM tbl_barang_keluar TBK JOIN tbl_customer TC ON TC.id=TBK.id_customer JOIN tbl_barang TB ON TB.id=TBK.id_barang";
    db.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const CetakBarangMasuk = async (req, res) =>{
    const sql = "SELECT TBM.*, TB.nama_barang, TS.nama_supplier FROM tbl_barang_masuk TBM JOIN tbl_barang TB ON TB.id=TBM.id_barang JOIN tbl_supplier TS ON TS.id=TBM.id_supplier";
    db.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const CetakBarangKeluar = async (req, res) =>{
    const sql = "SELECT TBK.*, TB.nama_barang, TC.nama_customer FROM tbl_barang_keluar TBK JOIN tbl_customer TC ON TC.id=TBK.id_customer JOIN tbl_barang TB ON TB.id=TBK.id_barang";
    db.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}