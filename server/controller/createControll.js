
const UserDB=require('../model/userSchema');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const TodosDB = require('../model/todoSchema');

//create user
exports.signup= async (req,res)=>{
    try{
        //hash pasword
        const hashPass= await bcrypt.hash(req.body.password,10);

        const user = new UserDB({
            fname:req.body.fname,
            lname:req.body.lname,
            age:req.body.age,
            email:req.body.email,
            password:hashPass

        });
       const data= await user.save(user);

            //Genaret token
            const Token= jwt.sign({
                userID:data._id,
                userFname:data.fname
            },process.env.SECRET);

            //send cookies and data
        res.status(200).cookie('user-cookies',Token).send(data)
    }catch(error){
        console.log(error.message);
        res.status(500).send('data save faild..!')
    }
}

//login user
exports.signin= async (req,res)=>{
    try{
        
        const data= await UserDB.find({email:req.body.email})
        if(data.length > 0){
            const isValid= bcrypt.compare(req.body.password, data[0].password);
            if(isValid){
                //Genaret token
                const Token= jwt.sign({
                    userID:data[0]._id,
                    userFname:data[0].fname
                },process.env.SECRET);

                //send cookies and data
                res.status(200).cookie('user-cookies',Token).send(data)

            }else{
                res.status(401).send('password wrong')
            }
        }else{
            res.status(404).send('user not found on this email')
        }
        
    }catch(error){
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

//create Todos
exports.createTodos= async (req,res)=>{

    try{
        const user=new TodosDB({
            language:req.body.language,
            description:req.body.description,
            dayname:req.body.dayname,
            user:req.userID
        })
        const data = await user.save(user);
        
        //todo id save in user collation
        UserDB.updateOne({_id:req.userID},{
            $push:{
                todos:data._id
            }
        })
        .then(B=>B)
        .catch(err=>console.log(err.message))
       
        res.status(200).send(data)
    }catch(error){
        console.log(error.message);
        res.status(500).send('Todo creation faild ')
    }
}


