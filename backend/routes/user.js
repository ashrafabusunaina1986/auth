const path=require('path')
const fs=require('fs')
const {v4:id}=require('uuid')
const router =require('express').Router()
const {createJSONToken}=require('./../util/auth')


router.route('/login').post((req,res,next)=>{
    const {email,password}=req.body
    const errors={}

    const filename = path.join(__dirname, '../public/users.json')
    if (fs.existsSync(filename)) {
        try {
            const users=fs.readFileSync(filename,'utf-8')
            const userss=JSON.parse(users)
            const user=userss.find(u=>u.email===email && u.password===password)
             if(user){
                return res.status(201).json({token:createJSONToken(email)})
             }
            else{
                errors.message='email or password error.'
                return res.status(401).json({errors:errors,user:user})
            }
                      
        } catch (error) {
            return res.json({message:error.message}).status(500)
        }
    }
})
router.route('/signup').post((req,res,next)=>{


    const {email,password}=req.body
    const user={
        email:email,password:password
    } 
    const errors={}
    const filename = path.join(__dirname, '../public/users.json')
    if (fs.existsSync(filename)) {
        const users=require(filename)
        const user1=users.find(u=>u.email===email)
        if(user1) {
            errors.message='user already exit'
            return res.status(422).json({errors:errors})
        }
        users.push(user)
        try {
            fs.writeFileSync(filename,JSON.stringify(users,null,2),'utf-8')
            return res.status(201).json({message:'user saved'})          
        } catch (error) {
            return res.status(500).json({message:error.message})
        }
    }
})
module.exports=router