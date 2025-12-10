import mongoose from "mongoose";
const noteschema=mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type:String,
        require:true
    },
    Content:{
        type:String,
        required:true
    }
},
{timestamps:true});
const note=mongoose.model("Note",noteschema);
export default note;