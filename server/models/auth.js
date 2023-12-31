import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    about: {type: String},
    tags: {type: [String]},
    joinedOn: {type: Date, default: Date.now},
    info: [{
        browser: String,
        os: String, 
        device: String, 
        ip: String,
        loggedOn: {type: Date, default: Date.now}
    }],
    questionAnswered: {type: Number, default: 0},
    questionQouta: {type: Number, default: 5}
})

export default mongoose.model("User", userSchema)