import mongoose from "mongoose";
import post from '../models/posts.js'

export const makePost = async(req, res) => {

    const postReqData = req.body;
    const postData = new post(postReqData);
    
    try {
        await postData.save();
        res.status(200).json(postData);
    } catch (error) {
        console.log(error);
        res.status(409).json("Couldn't make a post!")
    }
}

export const getAllPosts = async(req, res) => {
    try {
        const postList = await post.find();
        res.status(200).json(postList);
    } 
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}