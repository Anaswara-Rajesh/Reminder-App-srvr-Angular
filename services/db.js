const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/reminderApp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const User = mongoose.model('User',{
    userid:Number,
    username:String,
    password:String,
    date:String,
    event:String,
    todayevents:[]
})

module.exports={
    User
}