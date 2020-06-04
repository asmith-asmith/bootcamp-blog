const express = require('express');
const router = express.Router();
const listsCtrl = require('../controllers/lists');

// page to view all users posts/lists
router.get('/lists', listsCtrl.index);
// route to form to create a new list
router.get('/lists/new', listsCtrl.newList);
// route to create/post new list
router.post('/lists', isLoggedIn, listsCtrl.create);
// route to view particular list
router.get('/lists/:id', listsCtrl.show);
// route to delete
router.delete('/lists/:id', listsCtrl.deleteList)
// router to create a comment
router.post('/lists/:id/comments', isLoggedIn, listsCtrl.createComment);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/');
    }
};

module.exports = router;