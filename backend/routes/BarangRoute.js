import express from "express";
import {
    Me,
    Tampil,
    Tambah,
    Edit,
    Update,
    Delete,
    getBarangById,
    TotalBarang,
    TotalStock
} from "../controllers/Barang.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/',verifyUser, Me);

router.get('/getbarang/:id',verifyUser, getBarangById);
router.get('/barang',verifyUser, Tampil);
router.post('/tambahbarang',verifyUser, Tambah);
router.get('/editbarang/:id',verifyUser, Edit);
router.put('/updatebarang/:id',verifyUser, Update);
router.delete('/deletebarang/:id',verifyUser, Delete);
router.get('/totalBarang', TotalBarang);
router.get('/totalStock', TotalStock);

export default router;
