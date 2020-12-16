const express = require('express');
const router = express.Router();
const { isAuth} = require('../middlewares/auth.middleware');
router.get('/', isAuth, (req, res) => {
    if(!req.isLoged)
        res.render('landing');
    else{
        if(req.role == 'QuanLy')
            res.redirect('/BSQuanLy');
        else if(req.role == 'BacSi')
            res.redirect('/BacSi');
        else if(req.role == 'BenhNhan')
            res.redirect('/BenhNhan');
    }   
})

module.exports = router;