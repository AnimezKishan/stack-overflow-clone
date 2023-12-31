import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    userPosted: { type: String, required: "Question must have an author"},
    userId: { type: String, required: "Question must have an author's id"},
    postTitle: { type: String, required: "Post must have a title"},
    postFile: { type: String },
    postedOn: { type: Date, default: Date.now}
})

export default mongoose.model("Post", PostSchema)