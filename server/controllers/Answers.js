import mongoose from 'mongoose';
import questions from '../models/questions.js';
import users from '../models/auth.js'

export const postAnswer = async(req, res) =>{
    const { id: _id } = req.params;
    const { noOfAnswers, answerBody, userAnswered, userId } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable');
    }

    updatedNoOfQuestions(_id, noOfAnswers)
    updateUser(userId);

    try{
        const updatedQuestion = await questions.findByIdAndUpdate(_id, { $addToSet: {'answer': [{ answerBody, userAnswered, userId }]}})
        res.status(200).json(updatedQuestion);
    }
    catch(error){
        res.status(400).json('error in updating...')
    }
}

const updateUser = async(userId) => {
    try {
        const existingUser = await users.findById(userId);
        await users.findByIdAndUpdate(userId, {$set: {'questionAnswered': existingUser.questionAnswered + 1}});
    } 
    catch (error) {
        console.log(error)    
    }
}

const updatedNoOfQuestions = async(_id, noOfAnswers) => {
    try {
        await questions.findByIdAndUpdate(_id, {$set: {'noOfAnswers': noOfAnswers}})
    } catch (error) {
        console.log(error);
    }
}

export const deleteAnswer = async(req, res) => {
    const { id:_id } = req.params;
    const { answerId, noOfAnswers } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Question unavailable');
    }

    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send('Answer unavailable');
    }


    updatedNoOfQuestions(_id, noOfAnswers)
    try{
        await questions.updateOne(
            {_id},
            {$pull: {'answer': {_id: answerId }}}
        )
        res.status(200).json({message: "Successfully deleted"})
    }
    catch(error){
        res.status(405).json(error);
    }
}