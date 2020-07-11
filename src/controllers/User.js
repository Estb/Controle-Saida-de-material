const Status = require('http-status')
const bcrypt = require ('bcrypt')
const jwtConfig = require('../config/jwt')
const jwt = require('jsonwebtoken')
const Models = require('../models/Users')


exports.login = (request, response, next) => {

  const username = request.body.username
  const password = request.body.password

  if(username && password ) {
    Models.find({username})
    .then(user => {
      if(!user) {
        response.json({sucess: false, message: 'This username no exist'})
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result==true){       
            const id2 = user.id   
            const token = jwt.sign({ id2 }, jwtConfig.secret, {
              expiresIn: 300 // expires in 5min
            });
            response.status(200).send({ auth: true, token: token, id:id2});
          } else {
            response.json({sucess: false, message: 'Incorrect password'})
          }
        })  
      }
    })
    .catch((error) => next(error))
  } else {
    response.json({sucess: false, message:'Username and password fields are requireds', statusCode: 400})
  }
}

exports.createUser = (request, response, next ) => {

  const username = request.body.username
  const password = request.body.password
  const password2 = request.body.password2
  const mail = request.body.mail
  const name = request.body.name
  const lastname =  request.body.lastname
  const department =  request.body.department
  const role =  request.body.role
  const isAdmin =  0

  if(username && password ) {
    if(password && password2 == password){
      Models.findOne({username, where: {username:username}})
      .then(user => {
        if(user) {
          response.json({sucess: false, message: 'This username has no available'})
        } else {
          bcrypt.hash(password, 10)
          .then(hash => {
            let encryptedPassword = hash
            
            Models.create({
              username : username,
              name: name,
              password:encryptedPassword,
              mail:mail,
              lastname: lastname,
              department:department,
              role:role,
              isAdmin:isAdmin  
            })
            .then(()=> {response.status(201).send()})
            .catch((error) => next(error))
          })
          .catch((error) => next(error))
        }
      })
    } else { 
      response.json({sucess: false, message:'Passwords doesnt match', statusCode: 400})
    }
  } else {
    response.json({sucess: false, message:'Username and password fields are requireds', statusCode: 400})
  }
}