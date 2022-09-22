const express= require("express")

const app= express()

app.use(express.json())


const Price= require("./controller")

app.use("/", Price)


app.listen(4000,()=>{
    try {
        console.log("http://localhost:4000")

    } catch (error) {
        console.log(error)
    }
})


module.exports= app