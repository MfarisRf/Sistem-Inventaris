import db from "../config/Database.js";

export const Me = async (req, res) => {
    return res.json({Status: "Success", name: req.name, role: req.role});
}

export const Tampil = async (req, res) => {
    const sql = "SELECT * FROM tbl_barang";
    db.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const getBarangById = async (req, res) => {
    const { id } = req.params; // Ambil ID barang dari parameter request
    const sql = "SELECT id, nama_barang, stok FROM tbl_barang WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ Error: "Internal server error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ Error: "Barang not found" });
        }
        return res.json(result[0]); // Mengembalikan data barang pertama yang ditemukan
    });
};

export const Tambah = async (req, res) => {
    const sql = "INSERT INTO tbl_barang (`nama_barang`, `harga`, `stok`, `deskripsi`) VALUES (?)";
    const values = [
        req.body.nama_barang,
        req.body.harga,
        req.body.stok,
        req.body.deskripsi
    ];
    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
}

export const Edit = async (req, res) => {
    const sql = "SELECT * FROM tbl_barang WHERE id_barang = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const Update = async (req, res) => {
    const sql = "UPDATE tbl_barang SET `nama_barang` = ?, `harga` = ?, `stok` = ?, `deskripsi` = ? WHERE id_barang = ?";
    const id = req.params.id;
    db.query(sql, [req.body.nama_barang, req.body.harga, req.body.stok, req.body.deskripsi, id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
}

export const Delete = async (req, res) => {
    const sql = "DELETE FROM tbl_barang WHERE id_barang = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Error inside server"});
        return res.json(result);
    })
}

export const TotalBarang = async (req, res) => {
    const sql = `SELECT COUNT(*) as totalBarang FROM tbl_barang`;
    db.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error inside server" });
        return res.json(result);
    });
};

export const TotalStock = async (req, res) => {
    const sql = "SELECT id_barang, nama_barang, stok FROM tbl_barang";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ Error: "Internal server error" });
        return res.json(result);
    });
};