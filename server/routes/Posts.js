import express from "express";
import { getAllPosts, makePost } from '../controllers/Posts.js'

const router = express.Router();

router.post('/makePost', makePost);
router.get('/get', getAllPosts);

export default router