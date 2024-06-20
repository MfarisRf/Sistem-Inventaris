import express from "express";
import {
    Me,
    Tampil,
    TampilBarang,
    TampilCustomer,
    Tambah,
    Detail,
    Cetak,
    HapusKeluar,
    TotalBarangKeluarPerBulan
} from "../controllers/BarangKeluar.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/',verifyUser, Me);

router.get('/barangkeluar',verifyUser, Tampil);
router.get('/getbarang',verifyUser, TampilBarang);
router.get('/getcustomer',verifyUser, TampilCustomer);
router.get('/detailbarangkeluar/:id',verifyUser, Detail);
router.get('/cetakbarangkeluar/:id', Cetak);
router.post('/tambahbarangkeluar',verifyUser, Tambah);
router.delete('/deletebarangkeluar/:id',verifyUser, HapusKeluar);
router.get('/totalbarangkeluarperbulan', TotalBarangKeluarPerBulan);

export default router;