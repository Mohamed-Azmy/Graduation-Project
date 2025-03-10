import express from "express"
import bootStrap from "./src/app.controller.js"

const app= express()
const port=Number(process.env.PORT)

bootStrap(app,express)

app.listen(port,()=> console.log(`app listening on port ${port} !`))