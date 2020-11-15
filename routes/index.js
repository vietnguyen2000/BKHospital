const express = require('express');
const router = express.Router();
const sql = require('mysql');

router.get('/', (req, res) => {
    res.render('landing')
})

module.exports = router;