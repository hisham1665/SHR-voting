import mongoose from "mongoose";

const ClassAssignSchema = new mongoose.Schema({
    CS_faculty : {
        type : String, 
        require : true
    },
    EC_faculty : {
        type : String, 
        require : true
    },
    EE_faculty : {
        type : String, 
        require : true
    },
    BT_faculty : {
        type : String, 
        require : true
    },
    BM_faculty : {
        type : String, 
        require : true
    },
    CE_faculty : {
        type : String, 
        require : true
    }
    
},{
    timestamps : true
})
const YearassignSchema = new mongoose.Schema({
    election_id : {
        type : String,
        required : true
    },
    first_year : {
        type : [ClassAssignSchema] ,
        require : true
    },
    second_year : {
        type : [ClassAssignSchema] , 
        require : true
    },
    third_year : {
        type : [ClassAssignSchema] , 
        require : true
    },
    fourth_year : {
        type : [ClassAssignSchema] , 
        require : true
    }
},{
    timestamps : true
})

const ClassAssign = mongoose.model('ClassAssign' ,ClassAssignSchema) ;
export default ClassAssign ;
export const YearAssign = mongoose.model('YearAssign' , YearassignSchema) ;// Exporting YearAssign for use in other parts of the application