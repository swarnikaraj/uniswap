const express= require("express")

const router= express.Router()
const FetchPrice=require("./util")
const FetchMidPrice=require("./midprice")

router.get("/getSpotPrice",async(req,res)=>{
    try {
      
        const price= await FetchPrice.getSpotPrice()
        return res.status(200).send({price})
    } catch (error) {
         return res.status(401).send({error})
    }
})

router.get("/getMidPrice",async(req,res)=>{
    try {
      
        const price= await FetchMidPrice.fetchMidPrice()
        return res.status(200).send({price})
    } catch (error) {
         return res.status(401).send({error})
    }
})

module.exports= router