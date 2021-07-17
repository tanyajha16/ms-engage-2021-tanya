const express = require('express');

// using express router 
const router = express.Router();

// using home controller here to require all the controllers
const homeController = require('../controllers/home_controller');

console.log('index.js router is loaded');

// using '/' url for the home page 
router.get('/', homeController.home);

// using '/users' for the user controller and middleware is used to call the users router
router.use('/users', require('./users'));

// using '/posts' for the general channel posts controller and middleware is used to call the posts router
router.use('/posts', require('./posts'));

// using '/comments' for the general channel comments controller and middleware is used to call the comments router
router.use('/comments', require('./comments'));

// using '/likes' for liking the posts ans comments and calling the likes controller and middleware is used to call the posts router
router.use('/likes', require('./likes'));


router.use('/api', require('./api'));

router.use('/chatapp', require('./chatapp'));
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));

// exporting the router 
module.exports = router;