import express from 'express';
import { upload, Me, Tampil, Tambah, Edit, Update, Delete } from '../controllers/Katalog.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/', verifyUser, Me);
router.get('/katalog', Tampil);
router.post('/tambahkatalog', verifyUser, upload.single('image'), Tambah); // Tambahkan middleware upload di sini
router.put('/updatekatalog/:id', verifyUser, upload.single('image'), Update); // Tambahkan middleware upload di sini
router.get('/editkatalog/:id', verifyUser, Edit);
router.delete('/deletekatalog/:id', verifyUser, Delete);

export default router;
