import db from "../config/Database.js";

export const Me = async (req, res) => {
    return res.json({ Status: "Success", name: req.name, role: req.role });
};

export const Tampil = async (req, res) => {
    const sql =
        "SELECT TBM.*, TB.nama_barang, TS.nama_supplier FROM tbl_barang_masuk TBM JOIN tbl_barang TB ON TB.id=TBM.id_barang JOIN tbl_supplier TS ON TS.id=TBM.id_supplier";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ Error: "Error inside server" });
        return res.json(result);
    });
};

export const TampilSupplier = async (req, res) => {
    const sql = "SELECT id, nama_supplier FROM tbl_supplier";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ Error: "Error inside server" });
        return res.json(result);
    });
};

export const TampilBarang = async (req, res) => {
    const sql = "SELECT id, nama_barang FROM tbl_barang";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ Error: "Error inside server" });
        return res.json(result);
    });
};

export const Detail = async (req, res) => {
    const id = req.params.id;
    const sql =
        "SELECT TBM.*, TB.nama_barang, TB.harga, TS.nama_supplier, TS.nohp_supplier, TS.alamat_supplier FROM tbl_barang_masuk TBM JOIN tbl_barang TB ON TB.id=TBM.id_barang JOIN tbl_supplier TS ON TS.id=TBM.id_supplier WHERE TBM.id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ Error: "Error inside server" });
        return res.json(result);
    });
};

export const Cetak = async (req, res) => {
    const id = req.params.id;
    const sql =
        "SELECT TBM.*, TB.nama_barang, TB.harga, TS.nama_supplier, TS.nohp_supplier, TS.alamat_supplier FROM tbl_barang_masuk TBM JOIN tbl_barang TB ON TB.id=TBM.id_barang JOIN tbl_supplier TS ON TS.id=TBM.id_supplier WHERE TBM.id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ Error: "Error inside server" });
        return res.json(result);
    });
};

export const Tambah = async (req, res) => {
    const { id_supplier, id_barang, tgl_masuk, stok_masuk } = req.body;
    try {
        const barangQuery = "SELECT * FROM tbl_barang WHERE id = ?";
        db.query(barangQuery, [id_barang], (err, data) => {
            if (err || !data.length) {
                return res.status(400).json({ Error: "Invalid barang ID" });
            }

            const barang = data[0];
            const id = barang.id;
            const harga = parseFloat(barang.harga);
            const stok = parseFloat(barang.stok);
            const stokMasuk = parseFloat(stok_masuk);
            const updateStok = stok + stokMasuk;
            const total = harga * stokMasuk;

            const insertQuery =
                "INSERT INTO tbl_barang_masuk (id_supplier, id_barang, tgl_masuk, stok_masuk, total) VALUES (?, ?, ?, ?, ?)";
            const values = [id_supplier, id_barang, tgl_masuk, stok_masuk, total];

            db.query(insertQuery, values, (err) => {
                if (err) {
                    return res.status(500).json({ Error: "Error inside server" });
                }

                const updateQuery = "UPDATE tbl_barang SET stok = ? WHERE id = ?";
                db.query(updateQuery, [updateStok, id], (err) => {
                    if (err) {
                        return res.status(500).json({ Error: "Error inside server" });
                    }
                    return res.json({ Status: "Success" });
                });
            });
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ Error: "Internal Server Error" });
    }
};

export const HapusMasuk = async (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM tbl_barang_masuk WHERE id=?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ Error: "Error inside server" });
        return res.json({ Status: "Success" });
    });
};

export const TotalBarangMasukPerBulan = async (req, res) => {
    try {
        const sql = "SELECT MONTH(tgl_masuk) AS bulan, YEAR(tgl_masuk) AS tahun, SUM(stok_masuk) AS total_barang_masuk FROM tbl_barang_masuk GROUP BY YEAR(tgl_masuk), MONTH(tgl_masuk)";
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error:', err);
                return res.status(500).json({ Error: "Error inside server" });
            }
            if (!result || result.length === 0) {
                return res.status(404).json({ Error: "Data not found" });
            }
            return res.json(result);
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ Error: "Internal Server Error" });
    }
}

