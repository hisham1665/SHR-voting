import mongoose from "mongoose";

const ElectionSchema = mongoose.Schema({
    election_id : {
        type : String,
        required : true
    },
    election_year : {
        type : Number,
        required : true,
    },
    isActive : {
        type : Boolean ,
        required : true,
        default : true,
    },
},{
    Timestamp : true,
})

const Election = mongoose.model("Election" , ElectionSchema);
export default Election;