const List = require('../models/lists');
const User = require('../models/users');


module.exports = {
    index,
    newList,
    create,
    show,
    deleteList,
    createComment,
    edit,
    update
};

function index(req, res){
    List.find({}).populate('user') .exec(function(err, lists){
        if(err) return next(err);
        res.render('lists/index', {
            lists,
            title: 'All Lists',
        });
    });
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
    List.findOne({_id: req.params.id}).populate('user').exec(function(err, list){
        console.log(list, "this is the list in show")
        console.log(list.comments, "this is lisst.commetns in show")
        res.render('lists/show',{
            list,
            title: list.title,
        });
    });
};

function deleteList(req, res){
    User.findById(req.user._id, function(err, user){
        user.lists.remove(req.params.id);
        user.save(function(err){
            List.remove({_id: req.params.id}, function(err, list){
                if (err) return res.status(500).send(err);
                res.redirect(`/lists`);
            });
        });
    });
}

function createComment(req, res){
    List.findById(req.params.id, function(err, list) {
        req.body.user= req.user._id;
        console.log(req.body, "this is req.body in createcomment")
        console.log(list, "this is list in createCometns")
        console.log(list.comments, "this is list.commetns in creaateCommetn")
        list.comments.push(req.body);
        list.save(function(err) {
          res.redirect(`/lists/${list._id}`);
        });
    });
}

function edit(req, res) {
    List.findById(req.params.id, function(err, list) {
      if (!list.user.equals(req.user._id)) return res.redirect('/lists');
      res.render('/lists/edit', {list});
    });
}

function update(req, res){
    List.findByIdAndUpdate(req.params.id, function(err, list){
        list.title = req.body.title;
        list.category = req.body.category;
        list.content = req.body.content;
        list.save(function(err){
            res.redirect(`/lists/${list._id}`)
        })
    })
}