const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");
const sessions = require("express-session");

// session
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "my secret key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay }
}))

const {url, password} = require('./credentials')

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const userRouter = require('./routes/user')
const employeeRouter = require('./routes/employee')

app.use('/api/user', userRouter)
app.use('/api/employee', employeeRouter)
    
    
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => console.log("mongo connected"))
    .catch(err => console.log('mogno error', err))


app.listen(PORT, () => console.log(`app running at PORT ${PORT}`))