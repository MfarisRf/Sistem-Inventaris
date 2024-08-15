import express from "express";
import {Login, Logout} from "../controllers/Auth.js";
import { forgotPassword } from "../controllers/forgot-password.js";
import { resetPassword } from "../controllers/reset-password.js";

const router = express.Router();

router.post('/login', Login);
router.get('/logout', Logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;