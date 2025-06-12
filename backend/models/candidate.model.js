import mongoose from "mongoose";

// Define the individual candidate schema
const candidateSchema = mongoose.Schema({
    SR_NO : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    Votes : {
        type : Number,
        required : true,
        default : 0,
    },
});

// Define the candidates list schema, embedding the candidateSchema
const candidatesListSchema = mongoose.Schema({
    election_id : {
        type : String,
        required : true
    },
    candidate_list_id: {
        type: String,
        required: true
    },
    boy_candidates : {
        type : [candidateSchema], // This makes it an array of candidateSchema documents
        default: [] // Good practice to default arrays to empty array
    },
    girl_candidates : {
         type : [candidateSchema],
         default: []
     }
});

// Export your models
export const Candidate = mongoose.model("Candidate", candidateSchema); // You might not need to export this if only embedded
export const CandidatesList = mongoose.model("CandidatesList", candidatesListSchema);