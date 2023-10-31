const path=require('path')
const fs=require('fs')

const router=require('express').Router()


router.route('/:eventId').get((req,res,next)=>{
    const eventId=req.params.eventId
    const filename = path.join(__dirname, '../public/events.json')
    if (fs.existsSync(filename)) {
        fs.readFile(filename, 'utf-8', (err,result) => {
            if (err) return res.json({ "Error message": err }).status(500)
            const events=JSON.parse(result)
            
            const event=events.find(e=>e.id===eventId)
            if(event){
                return res.json(event).status(200)
            }else return res.json({message:'could not find details selected event.'}).status(500)
        })
    }
})
module.exports=router