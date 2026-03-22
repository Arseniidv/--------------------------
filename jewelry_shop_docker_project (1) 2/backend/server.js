
const express=require('express')
const mysql=require('mysql2')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cors=require('cors')

const app=express()
app.use(cors())
app.use(express.json())

const db=mysql.createConnection({
 host:"db",
 user:"root",
 password:"root",
 database:"shop"
})

const SECRET="secret123"

app.post("/register",async(req,res)=>{
 const {email,password}=req.body
 const hash=await bcrypt.hash(password,10)
 db.query("INSERT INTO users(email,password) VALUES (?,?)",
 [email,hash],
 (err)=>{
  if(err) return res.status(400).json(err)
  res.json({status:"ok"})
 })
})

app.post("/login",(req,res)=>{
 const {email,password}=req.body
 db.query("SELECT * FROM users WHERE email=?",[email],
 async(err,result)=>{
  if(result.length===0) return res.status(401).json({error:"user"})
  const user=result[0]
  const valid=await bcrypt.compare(password,user.password)
  if(!valid) return res.status(401).json({error:"password"})
  const token=jwt.sign({userId:user.id},SECRET,{expiresIn:"7d"})
  res.json({token})
 })
})

app.get("/me",(req,res)=>{
 const token=req.headers.authorization?.split(" ")[1]
 if(!token) return res.status(401).json({error:"no token"})
 const decoded=jwt.verify(token,SECRET)
 db.query("SELECT id,email FROM users WHERE id=?",[decoded.userId],
 (err,result)=>{
  res.json(result[0])
 })
})

app.listen(3000,()=>console.log("backend running"))
