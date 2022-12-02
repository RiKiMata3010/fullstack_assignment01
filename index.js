const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");
const sessions = require("express-session");

module.exports = app;
// session
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "my secret key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay }
}))

const {url, password} = require('./src/credentials')

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const userRouter = require('./src/routes/user')
const employeeRouter = require('./src/routes/employee')

app.use('/api/user', userRouter)
app.use('/api/employee', employeeRouter)
app.get('/',function(req, res){
    res.status(200).json({message:'Working'})
})
    
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => console.log("mongo connected"))
    .catch(err => console.log('mogno error', err))


app.listen(4000, () => console.log(`app running at PORT ${PORT}`))