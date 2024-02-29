import express from 'express';
import {
    Me,
    Tampil,
    Tambah,
    Edit,
    Update,
    Delete
} from '../controllers/Katalog.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/',verifyUser, Me);

router.get('/katalog',verifyUser, Tampil);
router.post('/tambahkatalog',verifyUser, Tambah);
router.get('/editkatalog/:id',verifyUser, Edit);
router.put('/updatekatalog/:id',verifyUser, Update);
router.delete('/deletekatalog/:id',verifyUser, Delete);

export default router;