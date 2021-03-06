const express=require('express');
const cors =require('cors');
const bcrypt= require('bcrypt-nodejs');
const knex = require('knex');
const register = require('./Controllers/register.js');
const signin = require('./Controllers/signin.js');
const profile = require('./Controllers/profile.js');
const image = require('./Controllers/image.js');

const db = knex({
	client: 'pg',
	connection:{
		
		host:'smartbrainserver.cidljb0otnui.eu-west-2.rds.amazonaws.com', //localhost
		user:'ganga',
		password:'Comnet2008',
		database:'smartbrain',

	}
	
});


const app=express();


//app uses middleware to send json response using express

app.use(express.json());

// app uses middleware cor to connect securly to the frontend

app.use(cors());


// res ---> GET simple response as client ip address

app.get('/',(req,res)=>{
	//const ip = req.info.remoteAddress
	
    const xFF = req.headers['x-forwarded-for']
    const ip = xFF ? xFF.split(',')[0] : req.info.remoteAddress
    const useragent = req.headers['user-agent']


	res.send(`IP Address: ----> ${ip}   ----  and ----    USERAgent : -----> ${useragent}`);	
})


// signin ROUTE as POST request 
// resulting in either success or fail response


app.post('/signin',(req, res) => { signin.handleSignin(req, res, db, bcrypt)})

// register ROUTE as POST request 
// resulting in adding a new user in database

app.post('/register',(req, res) =>	{ register.handleRegister(req, res, db, bcrypt )})

// profile/:userid ROUTE as GET request 
// to view the profile of an existing user

app.get('/profile/:id',(req, res) => { profile.handleProfileGet(req, res, db )})

// image ---> PUT user info 

app.put('/image',(req,res) => { image.handleImage( req, res, db )})

// imageUrl

app.post('/imageurl',(req,res) => { image.handleApiCall( req, res )})


// servser lostens to port 3000

app.listen(process.env.PORT || 3000,()=>{
 console.log(`App is running on port ${process.env.PORT}`);

})




