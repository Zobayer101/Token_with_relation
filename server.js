
const express=require('express');
const dotenv=require('dotenv');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const route=require('./server/routes/route');
const DBconnect=require('./server/database/DBconnect');


const app=express();
dotenv.config();
const PORT=process.env.PORT||8800;

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.json());

DBconnect();

app.use('/',route);

app.use((error,req,res,next)=>{
    if(error){
        res.status(401).send(error.message)
        console.log(error.message);
    }else{
        res.status(500).send('This is a server side error')
        console.log('This is a server side error');
    }
})

app.listen(PORT,()=>{
    console.log(`Server run on http://localhost:${PORT}`);
})