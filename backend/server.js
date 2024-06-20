import express from 'express';
import cors from 'cors';
import db from './config/Database.js';
import cookieParser from 'cookie-parser';

import AuthRoute from './routes/AuthRoute.js';
import UserRoute from './routes/UserRoute.js';
import SupplierRoute from './routes/SupplierRoute.js';
import CustomerRoute from './routes/CustomerRoute.js';
import BarangRoute from './routes/BarangRoute.js';
import BarangMasukRoute from './routes/BarangMasukRoute.js';
import BarangKeluarRoute from './routes/BarangKeluarRoute.js';
import LaporanRoute from './routes/LaporanRoute.js';
import KatalogRoute from './routes/KatalogRoute.js'; 

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET', 'DELETE', 'PUT'],
    credentials: true
}));
app.use(cookieParser());

// Static file serving
app.use('/uploads', express.static('uploads'));

app.use(AuthRoute);
app.use(UserRoute);
app.use(SupplierRoute);
app.use(CustomerRoute);
app.use(BarangRoute);
app.use(BarangMasukRoute);
app.use(BarangKeluarRoute);
app.use(LaporanRoute);
app.use(KatalogRoute); 

app.listen(8081, () => {
    console.log('Running ...');
});
