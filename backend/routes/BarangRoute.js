import express from "express";
import {
    Me,
    Tampil,
    Tambah,
    Edit,
    Update,
    Delete
} from "../controllers/Barang.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/',verifyUser, Me);

router.get('/barang',verifyUser, Tampil);
router.post('/tambahbarang',verifyUser, Tambah);
router.get('/editbarang/:id',verifyUser, Edit);
router.put('/updatebarang/:id',verifyUser, Update);
router.delete('/deletebarang/:id',verifyUser, Delete);

export default router;