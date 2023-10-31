var router =require('express').Router()

router.route('/').get((req,res,next)=>{
   return res.json({message:"HEELO WORLD"})
})
module.exports=router