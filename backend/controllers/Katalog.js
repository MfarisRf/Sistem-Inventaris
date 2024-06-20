import db from "../config/Database.js";
import multer from 'multer';
import path from 'path';

// Konfigurasi multer untuk menyimpan file gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Inisialisasi upload multer dengan konfigurasi
export const upload = multer({ storage: storage });

export const Me = async (req, res) =>{
    return res.json({Status: "Success", name: req.name, role: req.role});
}

// Handler untuk menambahkan katalog baru
export const Tambah = async (req, res) =>{
    try {
        const { nama_produk, deskripsi } = req.body;
        let image = '';

        if (req.file) {
            image = req.file.filename;
        }

        const sql = "INSERT INTO tbl_catalog (`nama_produk`,`image`,`deskripsi`) VALUES (?, ?, ?)";
        const values = [nama_produk, image, deskripsi];

        db.query(sql, values, (err, result) => {
            if(err) {
                console.error(err);
                return res.status(500).json({ Error: "Error inside server" });
            }
            return res.json({ Message: "Katalog added successfully" });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: "Error uploading file" });
    }
}

// Handler untuk mengupdate katalog
export const Update = async (req, res) =>{
    try {
        const id = req.params.id;
        const { nama_produk, deskripsi } = req.body;
        let image = '';

        if (req.file) {
            image = req.file.filename;
        }

        const sql = "UPDATE tbl_catalog SET `nama_produk`=?, `image`=?, `deskripsi`=? WHERE id=?";
        
        db.query(sql, [nama_produk, image, deskripsi, id], (err, result) => {
            if(err) {
                console.error(err);
                return res.status(500).json({ Error: "Error inside server" });
            }
            return res.json({ Message: "Katalog updated successfully" });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: "Error updating katalog" });
    }
}

export const Delete = async (req, res) =>{
    try {
        const id = req.params.id;
        const sql = "DELETE FROM tbl_catalog WHERE id = ?";
        
        db.query(sql, [id], (err, result) => {
            if(err) return res.status(500).json({ Error: "Error inside server" });
            return res.json({ Message: "Katalog deleted successfully" });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: "Error deleting katalog" });
    }
}

export const Edit = async (req, res) =>{
    try {
        const id = req.params.id;
        const sql = "SELECT * FROM tbl_catalog WHERE id = ?";
        
        db.query(sql, [id], (err, result)=> {
            if(err) return res.status(500).json({ Error: "Error inside server" });
            return res.json(result);
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: "Error editing katalog" });
    }
}

export const Tampil = async (req, res) =>{
    try {
        const sql = "SELECT * FROM tbl_catalog";
        db.query(sql, (err, result) => {
            if(err) return res.status(500).json({ Error: "Error inside server" });
            return res.json(result);
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: "Error retrieving katalog" });
    }
}
