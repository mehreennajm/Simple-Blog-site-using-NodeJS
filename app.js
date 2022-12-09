const express = require('express');

//initializing our express app
const app = express();

//register the ejs view engine
app.set('view engine','ejs');

// app.set('views', 'myviews');


//our app port number
app.listen(3000);

// routing with express , routes should be in order
app.get('/',(req,res)=>{
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index', {title: 'Home',blogs});
});


app.get('/about',(req,res)=>{
    res.render('about', {title: 'About'})
});

app.get('/blogs/create',(req,res)=>{
    res.render('create-blog', {title: 'Create Blog'})
});

app.get('/about-me',(req,res)=>{
    res.redirect('/about');
});

//404 for rest of the web pages
app.use((req,res)=>{
    res.render('404', {title: '404'})
});