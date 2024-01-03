import express from "express";
import multer from "multer";
import { login, signup, forgotPassword, resetPassword, logInfo } from "../controllers/auth.js";
import { addAce, addPro, getAllUsers, updateProfile } from '../controllers/Users.js';
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.patch('/logInfo', logInfo)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword/:id/:token', resetPassword)

router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', auth, updateProfile)

router.patch('/addSub/pro', addPro);
router.patch('/addSub/ace', addAce);

export default router