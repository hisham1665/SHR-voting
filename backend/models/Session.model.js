import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
    election_id: {
        type: String,
        required: true
    },
    candidate_list_id: {
        type: String,
        required: true
    },
    session_id: {
        type: String,
        required: true
    },
    session_class: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
}, {
    timestamps: true,
});
const session = mongoose.model('sessions' ,sessionSchema); ;
export default session; ;