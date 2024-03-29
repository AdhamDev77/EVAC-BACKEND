const express = require('express')
const Users = require('../models/userModel')
const requireAuth = require('../middleware/requireAuth')
const {createUser,logUser,getUsers,getOneUser,deleteUser,updateUser} = require("../Controllers/usersController")

const router = express.Router()

//router.use(requireAuth)

router.get('/', getUsers)

router.post('/signup', createUser)

router.post('/login', logUser)

router.get('/:id', getOneUser)

router.delete('/:id', deleteUser)

router.patch('/:id', updateUser)

module.exports = router