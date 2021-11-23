const db = require('./db')
users = {
  1000: { userid: 1000, username: "Aahil", password: "userone", date: "01/02/1997",event:"birthday", todayevents:[] },
  1001: { userid: 1001, username: "Bahit", password: "usertwo", date: "01/02/1997",event:"birthday", todayevents:[] },
  1002: { userid: 1002, username: "Cahit", password: "userthree", date: "01/02/1997",event:"birthday", todayevents:[] },
  1003: { userid: 1003, username: "Dahit", password: "userfour", date: "01/02/1997",event:"birthday", todayevents:[] }
}

const register = (userid, username, password) => {

  return db.User.findOne({ userid })
    .then(user => {
      if (user) {
        return {
          statusCode: 422,
          status: false,
          message: "User already exist... Please Log In"
        }
      }
      else {
        const newUser = new db.User({
          userid,
          username,
          password,
          date:0,
          event:0,
          todayevents:[]
        })
        newUser.save()
        return {
          statusCode: 200,
          status: true,
          message: "Sucessfully Registered"
        }
      }
    })
}

const login = (req, userid, password) => {

  return db.User.findOne({
    userid,
    password,
  })
    .then(user => {
      if (user) {
        req.session.currentAcc = userid
        return {
          statusCode: 200,
          status: true,
          message: "sucessfully login",
          userName: user.username,
          currentAcc: user.userid

        }
      }
      return {
        statusCode: 422,
        status: false,
        message: "invalid Account details"
      }
    })
}

const remind = (userid, password, date,event) => {

  var dt = date
  var ev = event
  return db.User.findOne({
    userid,
    password
  })
    .then(user => {
      if (!user) {
        return {
          statusCode: 422,
          status: false,
          message: "invalid user"
        }
      }
      user.date = dt
      user.event = ev
      user.todayevents.push({
        date: dt,
        event: ev,
      })
      user.save()
      return {
        statusCode: 200,
        status: true,
        message: " succesfully added: " 
      }
    })
}

const getEvents = (userid) => {
  return db.User.findOne({
    userid
  })
    .then(user => {
      if (user) {
        return {
          statusCode: 200,
          status: true,
          todayevents: user.todayevents
        }
      }
      else {
        return {
          statusCode: 422,
          status: false,
          message: "invalid operation"
        }
      }
    })
}

const deleteAcc = (userid) => {
  return db.User.deleteOne({
    userid
  }).then(user => {
    if (!user) {
      return {
        statusCode: 422,
        status: false,
        message: " operation failed"
      }
    }
    return {
      statusCode: 200,
      status: true,
      message: "Account " + userid + " deleted succesfully"
    }
  })
}


module.exports = {
  register,
  login,
  remind,
  getEvents,
  deleteAcc,
  
}