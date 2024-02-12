import db from "../config/Database.js";

export const Me = async (req, res) =>{
    return res.json({Status: "Success", name: req.name, role: req.role});
}

export const Tampil = async (req, res) =>{
    const sql = "SELECT TBM.*, TB.nama_barang, TS.nama_supplier FROM tbl_barang_masuk TBM JOIN tbl_barang TB ON TB.id=TBM.id_barang JOIN tbl_supplier TS ON TS.id=TBM.id_supplier";
    db.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const TampilSupplier = async (req, res) =>{
    const sql = "SELECT id, nama_supplier FROM tbl_supplier";
    db.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const TampilBarang = async (req, res) =>{
    const sql = "SELECT id, nama_barang FROM tbl_barang";
    db.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const Detail = async (req, res) =>{
    const sql = "SELECT TBM.*, TB.nama_barang, TB.harga, TS.nama_supplier, TS.nohp_supplier, TS.alamat_supplier FROM tbl_barang_masuk TBM JOIN tbl_barang TB ON TB.id=TBM.id_barang JOIN tbl_supplier TS ON TS.id=TBM.id_supplier WHERE TBM.id = ?";
    const id = req.params.id;
    db.query(sql,[id], (err, result)=> {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const Cetak = async (req, res) =>{
    const sql = "SELECT TBM.*, TB.nama_barang, TB.harga, TS.nama_supplier, TS.nohp_supplier, TS.alamat_supplier FROM tbl_barang_masuk TBM JOIN tbl_barang TB ON TB.id=TBM.id_barang JOIN tbl_supplier TS ON TS.id=TBM.id_supplier WHERE TBM.id = ?";
    const id = req.params.id;
    db.query(sql,[id], (err, result)=> {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const Tambah = async (req, res) =>{
    const barang = "SELECT * FROM tbl_barang WHERE id = ?";
    db.query(barang, [req.body.id_barang], (err, data) => {
        const id         = data[0].id;
        const harga      = parseInt(data[0].harga);
        const stok       = parseInt(data[0].stok);
        const stok_masuk = parseInt(req.body.stok_masuk);
        const updatestok = stok + stok_masuk;
        const total      = harga * stok_masuk;

        const insert = "INSERT INTO tbl_barang_masuk (`id_supplier`,`id_barang`,`tgl_masuk`,`stok_masuk`,`total`) VALUES (?)";
        const values = [
            req.body.id_supplier,
            req.body.id_barang,
            req.body.tgl_masuk,
            req.body.stok_masuk,
            total
        ]
        db.query(insert, [values])

        const sql = "UPDATE tbl_barang SET `stok`=? WHERE id=?";
        db.query(sql, [updatestok, id])

        return res.json({Status: "Success"});
    })
}