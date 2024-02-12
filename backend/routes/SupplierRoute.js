import express from "express";
import {
    Me,
    Tampil,
    Tambah,
    Edit,
    Update,
    Delete
} from "../controllers/Supplier.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/',verifyUser, Me);

router.get('/supplier',verifyUser, Tampil);
router.post('/tambahsupplier',verifyUser, Tambah);
router.get('/editsupplier/:id',verifyUser, Edit);
router.put('/updatesupplier/:id',verifyUser, Update);
router.delete('/deletesupplier/:id',verifyUser, Delete);

export default router;