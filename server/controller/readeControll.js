
const UserDB=require('../model/userSchema');
const TodosDB=require('../model/todoSchema');

exports.showUser= async (req,res)=>{
    try{
        const data=await UserDB.find({_id:req.userID}).populate('todos');

        res.status(200).send(data)

    }catch(error){
        console.log(error.message)
        res.status(500).send('User data not found')
    }
}

exports.showTodos= async (req,res)=>{
    try{
        const data= await TodosDB.find().populate('user');
        res.status(200).send(data)
    }catch(error){
        console.log(error);
        res.status(500).send(error.message)
    }
}