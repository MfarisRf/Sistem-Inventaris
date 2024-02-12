import express from "express";
import {
    Me,
    Tampil,
    Tambah,
    Edit,
    Update,
    Delete
} from "../controllers/User.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/',verifyUser, Me);

router.get('/user',verifyUser, Tampil);
router.post('/tambahuser',verifyUser, Tambah);
router.get('/edituser/:id',verifyUser, Edit);
router.put('/updateuser/:id',verifyUser, Update);
router.delete('/deleteuser/:id',verifyUser, Delete);

export default router;