const User = require('../models/users');


module.exports = {
    index
};


function index(req, res) {
    console.log(req.user);
    res.render('users/index', {
        title: "Lists - Users", 
        page: 'userIndex',
        user: req.user
    })
};