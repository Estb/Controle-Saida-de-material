const express = require('express');
const requisition = require('../controllers/Requisitions')
const users = require('../controllers/User') 
const controller =require('../controllers/index')
const router = express.Router()



// requisitions

router.get('/requisition/:id', controller.verifyJWT, requisition.findone) //find one requisition

router.get('/requisitions', controller.verifyJWT, requisition.findAll) // find all requisitions

router.post('/requisition', controller.verifyJWT, requisition.create) //create a new requisition

router.put('/requisition/:id', controller.verifyJWT, requisition.update) // update or change some information about one requisition

router.put('/requisitionout/:id', controller.verifyJWT, controller.verifySec, requisition.requisition_out) // release requisition for material issue

router.put('/requisitionin/:id', controller.verifyJWT, controller.verifySec, requisition.requisition_in) //return on requisition material

router.delete('/requisition/:id', controller.verifyJWT, requisition.delete) // delete requisition

router.put('/requisition/authorize/:id', controller.verifyJWT, requisition.authorize) //authorize requisition, it can be authorised by, 1 ,2 or 3 levels

//router.put('/requisition/denegate/:id', controller.verifyJWT, requisition.denegate)

//rotas a configurar




//users

router.post('/user/new', users.createUser)



//login && logout

router.post('/login', users.login)

module.exports = router