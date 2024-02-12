import express from "express";
import {
    Me,
    Tampil,
    TampilBarang,
    TampilSupplier,
    Tambah,
    Detail,
    Cetak
} from "../controllers/BarangMasuk.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/',verifyUser, Me);

router.get('/barangmasuk',verifyUser, Tampil);
router.get('/getbarang',verifyUser, TampilBarang);
router.get('/getsupplier',verifyUser, TampilSupplier);
router.get('/detailbarangmasuk/:id',verifyUser, Detail);
router.get('/cetakbarangmasuk/:id', Cetak);
router.post('/tambahbarangmasuk',verifyUser, Tambah);

export default router;