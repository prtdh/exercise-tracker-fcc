const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
app.use(express.json())
const bodyparser=require('body-parser')
const mongoose=require('mongoose')



app.use(cors())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended:true}))

//connecting database

mongoose.connect('mongodb+srv://prtdh20:preetpal@nodeexpress.bdgie.mongodb.net/exerciseTracker?retryWrites=true&w=majority',{
          useUnifiedTopology:true,
          useNewUrlParser:true
},
()=>{
  console.log('database is connected');
})

//making a schema

const userSchema=mongoose.Schema({
  username:String
})
const User=mongoose.model('User',userSchema)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
//creating a user
app.post('/api/users',async (req,res)=>{
  const user= await User.create(req.body)
  res.json({username:user.username,id:user.id})  
})

//getting ll users
app.get('/api/users',async(req,res)=>{
  const user=await User.find({})
  res.json({user})
})

//posting exercises

app.post('/api/users/:_id/exercises',async(req,res)=>{

  const user=await User.findByIdAndUpdate(req.params.id,{description:req.body.description,
  duration:req.body.duration,date:req.body.date})
  // if(!req.body.description||!req.body.duration){
  //   res.send(error)
  // }
  // if(!req.body.date){
  //   req.body.date=Date.now()
  // }
  console.log(user);
  res.json({user})
})




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
