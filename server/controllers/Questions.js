import questions from "../models/questions.js"
import users from '../models/auth.js'
import mongoose from "mongoose"

export const AskQuestion = async (req, res) => {
    const postQuestionData = req.body;
    const { userId } = req.body;

    updateUser(userId)

    const postQuestion = new questions(postQuestionData);
    try{
        await postQuestion.save();
        res.status(200).json(postQuestion);
    }
    catch(error){
        console.log(error);
        res.status(409).json("Couldn't post a new question")
    }
}

const updateUser = async(userId) => {
    try {
        const existingUser = await users.findById(userId);
        await users.findByIdAndUpdate(userId, {$set: {'questionQouta': existingUser.questionQouta - 1}});
    } 
    catch (error) {
        console.log(error)    
    }
}

export const getAllQuestions = async (req, res) => {
    try{
        const questionList = await questions.find();
        res.status(200).json(questionList);
    } 
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const deleteQuestion = async(req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable');
    }

    try {
        await questions.findByIdAndRemove(_id);
        res.status(200).json({message: "Successfully deleted..."})
    } 
    catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const voteQuestion = async(req, res) => {
    const { id:_id } = req.params;
    const { value, userId } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable');
    }

    try {
        const q = await questions.findById(_id); 
        const upIndex = q.upVote.findIndex((id) => id === String(userId))
        const downIndex = q.downVote.findIndex((id) => id === String(userId))

        if(value === 'upvote'){
            if(downIndex !== -1){
                q.downVote = q.downVote.filter((id) => id !== String(userId))
            }
            if(upIndex === -1){
                q.upVote.push(userId)
            }
            else{
                q.upVote = q.upVote.filter((id) => id !== String(userId))
            }
        }
        else if(value === 'downvote'){
            if(upIndex !== -1){
                q.upVote = q.upVote.filter((id) => id !== String(userId))
            }
            if(downIndex === -1){
                q.downVote.push(userId)
            }
            else{
                q.downVote = q.downVote.filter((id) => id !== String(userId))
            }
        }

        await questions.findByIdAndUpdate(_id, q);
        res.status(200).json({message: "voted successfully..."})
    } 
    catch (error) {
        res.status(404).json({message: "id not found"})
    }
}