const List = require('../models/lists');
const User = require('../models/users');


module.exports = {
    index,
    newList,
    create,
    show
};

function index(req, res){
    List.find({}, function(err, lists){
        if(err) return next(err);
        res.render('lists/index', {
            lists,
            title: 'All Lists'
        })
    })
};

function newList(req, res){
    res.render('lists/new', {title: 'New Post'});
};

function create(req, res){
    const list = new List(req.body);
    list.user = req.user;
    list.save(function(err) {
        if (err) return res.render('lists/new', {title: 'New Post'});
        User.findById(req.user.id, function(err, user){
            user.lists.push(list._id);
            user.save(function(err){
                res.redirect(`/lists/${list._id}`);
            });
        });
    });
};


function show(req, res){
    List.findById(req.params.id, function(err, list){
        res.render('lists/show',{
            list,
            title: list.title
        });
    });
};