
const jwt=require('jsonwebtoken');

const checkLogin=(req,res,next)=>{

    try{
        const cookie=req.cookies;
        const cookieValue= Object.values(cookie);
        
        const decode=jwt.verify(cookieValue[0],process.env.SECRET);
        //set value
        req.userID=decode.userID;
        req.userFname=decode.userFname;
        //pass next middleware
        next();
    }catch(error){
        console.log(error.message);
        res.status(401).send('authentication faled')
        next(new Error('authentication faled'))
    }

}

module.exports=checkLogin;