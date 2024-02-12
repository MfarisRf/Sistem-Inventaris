import express from "express";
import {
    Me,
    Tampil,
    Tambah,
    Edit,
    Update,
    Delete
} from "../controllers/Customer.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/',verifyUser, Me);

router.get('/customer',verifyUser, Tampil);
router.post('/tambahcustomer',verifyUser, Tambah);
router.get('/editcustomer/:id',verifyUser, Edit);
router.put('/updatecustomer/:id',verifyUser, Update);
router.delete('/deletecustomer/:id',verifyUser, Delete);

export default router;