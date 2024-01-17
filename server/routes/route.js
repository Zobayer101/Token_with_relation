
const express=require('express');
const createControll=require('../controller/createControll');
const readControll=require('../controller/readeControll');
const checkLogin=require('../middleware/AutheGard');

const route=express.Router();

// ---------------------all api here-----------------

// signup user api---
route.post('/route/api/signup',createControll.signup);

//signin user api---
route.post('/route/api/signin',createControll.signin);

//Todos create
route.post('/route/api/createTodos',checkLogin,createControll.createTodos);


// show users
route.get('/route/api/showUser',checkLogin,readControll.showUser);

//show todos
route.get('/route/api/showTodos',checkLogin,readControll.showTodos);

module.exports=route;