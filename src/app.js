const express = require("express");
require("express-async-errors")
const  router  = require("./router");

const app = express()


app.use(express.json())
app.use(router)

app.use((error , req, res, next)=>{
    return res.json({
        status: "Error",
        message: error.message
    })
})

module.exports = app;