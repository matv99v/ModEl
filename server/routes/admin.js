const express = require('express');
const path = require('path');
const auth = require('../middlewares/auth.js');

const adminRouter = express.Router();

adminRouter.route('/')
    .get(auth, (req, res) => {
        res.sendFile(path.resolve(__dirname, '../public/bundle', 'admin-index.html'));
    });


module.exports = adminRouter;
