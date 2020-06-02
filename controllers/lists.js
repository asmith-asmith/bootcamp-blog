const List = require('../models/lists');


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
    list.user = req.user.id;
    list.save(function(err) {
        if (err) return render('/lists/new');
        User.find({_id: req.user.id}, function(err, user){
            user.lists.push(list);
        });
        res.redirect(`/lists/${list._id}`);
    });
};


function show(req, res){
    List.find({_id: req.params.id}, function(err, list){
        res.render(`/lists/${list._id}`,{
            list,
            title: list.title
        })
    })
}