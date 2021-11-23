const express = require ('express')
const session = require('express-session')
const cors = require('cors')
const dataService = require('./services/data.service')
const app = express()

app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))

app.use(session({
    secret: 'randomsecurestring',
    resave: false,
    saveUninitialized: false
}))

const logMiddleware = (req, res, next) => {
    console.log("Application specific Middleware");
    next()
}

//app.use(logMiddleware)

const authMiddleware = (req, res, next) => {
    if (!req.session.currentAcc) {
        res.json({
            statusCode: 422,
            status: false,
            message: "Please Log In"
        })
    }
    else {
        next()
    }
}

app.use(express.json())

app.get('/', (req, res) => {
    res.send("GET METHOD")
})

app.post('/', (req, res) => {
    res.send("POST METHOD")
})

app.put('/', (req, res) => {
    res.send("PUT METHOD")
})

app.patch('/', (req, res) => {
    res.send("PATCH METHOD")
})

app.delete('/', (req, res) => {
    res.send("DELETE METHOD")
})

app.post('/register', (req, res) => {
    dataService.register(req.body.userid, req.body.username, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/login', (req, res) => {
    console.log(req.body);
    dataService.login(req, req.body.userid, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/remind', authMiddleware, (req, res) => {
    console.log(req.body);
    dataService.remind(req.body.userid, req.body.password, req.body.date,req.body.event)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/getEvents', authMiddleware, (req, res) => {
    dataService.getEvents(req.body.userid)
    .then(result=>{
     res.status(result.statusCode).json(result)
    })
     
 })

 app.delete('/deleteAcc/:userid', authMiddleware, (req, res) => {
    dataService.deleteAcc(req.body.userid)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })    
})

app.listen(3000,()=>{
    console.log("server start at port number:3000");
})


