
const mongoose=require('mongoose');

const Schema= new mongoose.Schema({
    language:{
        type:String,
        default:'programaing language'
    },
    description:{
        type:String,
        
    },
    dayname:{
        type:String
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});

const TodosDB=mongoose.model('Todo',Schema);

module.exports=TodosDB;