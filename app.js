const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogRoute')

//initializing our express app
const app = express();

//register the ejs view engine
app.set('view engine','ejs');
// app.set('views', 'myviews');

//request the form body as an object
app.use(express.urlencoded({extended:true}));

mongoose.set('strictQuery', true);
//connect to MonogDB database
const dbURI = "mongodb+srv://nodeninja:test1234@cluster0.chjtufy.mongodb.net/node-tuts";
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));


//this middleware is used for logging
app.use(morgan('dev'));


//this middleware would allow static css and image files to load
app.use(express.static('public'));


// routing with express , routes should be in order
app.get('/',(req,res)=>{
    res.redirect('/blogs')
});

app.get('/about',(req,res)=>{
    res.render('about', {title: 'About'})
});


app.get('/about-me',(req,res)=>{
    res.redirect('/about');
});

//blog routes 
app.use('/blogs',blogRouter);

//404 for rest of the web pages
app.use((req,res)=>{
    res.render('404', {title: '404'})
});