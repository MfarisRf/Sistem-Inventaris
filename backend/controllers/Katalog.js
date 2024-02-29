import db from "../config/Database";

export const Me = async (req, res) =>{
    return res.json({Status: "Success", name: req.name, role: req.role});
}

export const Tampil = async (req, res) =>{
    const sql = "SELECT * FTOM tbl_catalog";
    db.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const Tambah = async (req, res) =>{
    const sql = "INSERT INTO tbl_catalog (`nama_produk`,`image`,`deskripsi`) VALUES (?)";
    const values = [
        req.body.nama_produk,
        req.body.image,
        req.body.deskripsi
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
}

export const Edit = async (req, res) =>{
    const sql = "SELECT * FROM tbl_catalog WHERE id = ?";
    const id = req.params.id;
    db.query(sql,[id], (err, result)=> {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const Update = async (req, res) =>{
    const sql = "UPDATE tbl_catalog SET `nama_produk`=?, `image`=?, `deskripsi`=? WHERE id=?";
    const id = req.params.id;
    
    db.query(sql, [req.body.nama_produk, req.body.image, req.body.deskripsi, id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
}   

export const Delete = async (req, res) =>{
    const sql = "DELETE FROM tbl_catalog WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

