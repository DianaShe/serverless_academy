const express = require('express')

const validateBody = require("../../middlewares/validateBody");

const authSchema = require("../../schemas/authSchema");

const ctrl = require('../../controllers/users');
const authenticate = require('../../middlewares/authenticate');

const router = express.Router()

router.post('/sign-up', validateBody(authSchema), ctrl.signUp)

router.post('/sign-in', validateBody(authSchema), ctrl.signIn)

// router.use(authenticate)

// router.get('/me', ctrl.getCurrent)

module.exports = router