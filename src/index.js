const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");

const {url, password} = require('./credentials')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => console.log("mongo connected"))
    .catch(err => console.log('mogno error', err))


    app.get("/health", (req, res) => {
        // console.log("req", req)
        res.status(200).json({
            message: "you server is up and running"
        })
    })

app.listen(PORT, () => console.log(`app running at PORT ${PORT}`))