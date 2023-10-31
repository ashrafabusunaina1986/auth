const router=require('express').Router()

router.post('/newsletter',(req,res)=>{
    return res.json(req.body)
})
module.exports=router