const User = require('../models/users');

module.exports = {
    index,
    showAll
};

function index(req, res) {
  User.findById(req.params.id).populate('lists'), function(err, user){
    res.render("users/index", {
      title: 'Logged in User',
      user
    });
  };
}


function showAll(req, res) {

  console.log(req.query);
  let modelQuery = req.query.name? {name: new RegExp(req.query.name, "i"),}: {};
  let sortKey = req.query.sort || "name";
  User.find(modelQuery)
    .sort(sortKey)
    .exec(function (err, users) {
      if (err) return next(err);

      res.render("users/all", {
        title: 'All Users',
        users,
        user: req.user,
        name: req.query.name,
        sortKey,
      });
    });
};

