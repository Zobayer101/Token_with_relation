
const mongoose=require('mongoose');

const Schema= new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    lname:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    todos:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Todo'
        }
    ]
    

},{
    timestamps:true
});

const UserDB= mongoose.model('User',Schema);

module.exports=UserDB;