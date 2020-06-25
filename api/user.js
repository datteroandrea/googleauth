const express = require('express');
const auth = require('../middleware/auth.service');
const isAuthenticated = require('../middleware/auth.service');
const router = express.Router();

router.get('/', isAuthenticated, (req,res)=>{
    res.json(req.session.passport.user);
});

module.exports = router;