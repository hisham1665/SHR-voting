import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
    election_id : {
        type : String,
        required : true
    },
    session_id: {
        type: String,
        required: true
    },
    boy_vote_sr_no : {
        type : String, 
        required : true
    },
    girl_vote_sr_no : {
        type : String, 
        required : true
    },
},{
    timestamps : true
})
const vote = mongoose.model('votes' ,voteSchema) ;
export default vote ;