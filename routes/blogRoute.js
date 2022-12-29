const express = require('express');
const Blog = require('../models/blog');
const route = express.Router();
const blogController = require('../controller/blogController');

route.get('/',blogController.index);

//get the blog page
route.get('/create',blogController.create)

//save a new object of blog 
route.get('/add-blog',blogController.single_raw_blog_save);

//save the blog 
route.post('/',blogController.save);

// fetch single blog 
route.get('/:id',blogController.single_blog);

//delete a blog 
route.delete('/:id',blogController.delete_blog);

module.exports = route;