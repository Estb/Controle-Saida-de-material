var express = require('express');
const controller = require('../controllers/Requisition')
//const Users = require('../controllers/User') 
const jwtConfig = require('../config/jwt')
const jwt = require('jsonwebtoken')

const router = express.Router()



function verifyJWT(req, res, next){
  const token = req.headers['x-access-token']
  if(!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    jwt.verify(token, jwtConfig.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
  
      req.userId = decoded.id
      next()
    })
  }

  
// requisitions

router.get('/requisition/:id', verifyJWT, controller.findone)

router.get('/requisitions', verifyJWT, controller.findAll)

router.post('/requisition', verifyJWT, controller.create)

router.put('/requisition/:id', verifyJWT, controller.update)

router.delete('/requisition/:id', verifyJWT, controller.delete)


//users

//router.post('/user/new', Users.createUser)



//login && logout

//router.post('/login', Users.login)

module.exports = router