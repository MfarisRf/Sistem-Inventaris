import express from "express";
import {
    Me,
    TampilBarangMasuk,
    TampilBarangKeluar,
    CetakBarangMasuk,
    CetakBarangKeluar
} from "../controllers/Laporan.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/',verifyUser, Me);

router.get('/laporanbarangmasuk',verifyUser, TampilBarangMasuk);
router.get('/laporanbarangkeluar',verifyUser, TampilBarangKeluar);
router.get('/cetakallbarangmasuk', CetakBarangMasuk);
router.get('/cetakallbarangkeluar', CetakBarangKeluar);

export default router;