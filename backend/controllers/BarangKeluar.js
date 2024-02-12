import db from "../config/Database.js";

export const Me = async (req, res) =>{
    return res.json({Status: "Success", name: req.name, role: req.role});
}

export const Tampil = async (req, res) =>{
    const sql = "SELECT TBK.*, TB.nama_barang, TC.nama_customer FROM tbl_barang_keluar TBK JOIN tbl_customer TC ON TC.id=TBK.id_customer JOIN tbl_barang TB ON TB.id=TBK.id_barang";
    db.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const TampilCustomer = async (req, res) =>{
    const sql = "SELECT id, nama_customer FROM tbl_customer";
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
    const sql = "SELECT TBK.*, TB.nama_barang, TB.harga, TC.nama_customer, TC.nohp_customer, TC.alamat_customer FROM tbl_barang_keluar TBK JOIN tbl_customer TC ON TC.id=TBK.id_customer JOIN tbl_barang TB ON TB.id=TBK.id_barang WHERE TBK.id = ?";
    const id = req.params.id;
    db.query(sql,[id], (err, result)=> {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const Cetak = async (req, res) =>{
    const sql = "SELECT TBK.*, TB.nama_barang, TB.harga, TC.nama_customer, TC.nohp_customer, TC.alamat_customer FROM tbl_barang_keluar TBK JOIN tbl_customer TC ON TC.id=TBK.id_customer JOIN tbl_barang TB ON TB.id=TBK.id_barang WHERE TBK.id = ?";
    const id = req.params.id;
    db.query(sql,[id], (err, result)=> {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const Tambah = async (req, res) =>{
    const barang = "SELECT * FROM tbl_barang WHERE id = ?";
    db.query(barang, [req.body.id_barang], (err, data) => {
        const id          = data[0].id;
        const harga       = parseInt(data[0].harga);
        const stok        = parseInt(data[0].stok);
        const stok_keluar = parseInt(req.body.stok_keluar);
        const updatestok  = stok - stok_keluar;
        const total       = harga * stok_keluar;

        if(stok_keluar > stok) {
            return res.json({Error: "Stok Keluar Melebihi Stok"});
        }else {
            const insert = "INSERT INTO tbl_barang_keluar (`id_customer`,`id_barang`,`tgl_keluar`,`stok_keluar`,`total`) VALUES (?)";
            const values = [
                req.body.id_customer,
                req.body.id_barang,
                req.body.tgl_keluar,
                req.body.stok_keluar,
                total
            ]
            db.query(insert, [values])

            const sql = "UPDATE tbl_barang SET `stok`=? WHERE id=?";
            db.query(sql, [updatestok, id])

            return res.json({Status: "Success"});
        }
        
    })
}