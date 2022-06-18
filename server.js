const { response } = require('express');
require('dotenv').config()

const express = require('express'),
      app = express(),
      bcrypt = require('bcrypt-nodejs'),
      cors = require('cors'),
      knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client:'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        port: '5432',
        password: process.env.POSTGRES_KEY,
        database: 'smartbrain'
    }
    });

app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {res.send('success')})
app.post('/signin', signin.handleSignIn(db,bcrypt));
    
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)}); // Dependency injection

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req,res,db)});

app.put('/image', (req,res) => { image.handleImage(req,res,db)});
app.post('/imageurl', (req,res) => { image.handleApiCall(req,res)});


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})
