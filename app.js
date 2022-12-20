const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

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



app.get('/add-blog',(req,res)=>{
    const blog = new Blog( {
        title : "Third Blog",
        snippet : "Welcome to Third blog",
        body: "More about my new blog adajdaj aldakdja lajderkv "
    });
    blog.save()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
});

//this middleware is used for logging
app.use(morgan('dev'));


//this middleware would allow static css and image files to load
app.use(express.static('public'));


// routing with express , routes should be in order
app.get('/',(req,res)=>{
    res.redirect('/blogs')
});

app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index', {title: 'Blogs',blogs:result});
    })
    .catch((err)=>{
        console.log(err);
    })
    
});


app.get('/about',(req,res)=>{
    res.render('about', {title: 'About'})
});

//get the blog page
app.get('/blogs/create',(req,res)=>{
    res.render('create-blog', {title: 'Create Blog'})
});

//save the blog 
app.post('/blogs',(req,res)=>{
    const blog  = new Blog(req.body);
    blog.save()
        .then((result)=>{
            res.redirect('/');
        })
        .catch((err)=>{
            console.log(err);
        })
});

// fetch single blog 
app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('single-blog',{title: result.title, 'blog':result})
    })
    .catch((err)=>{
        console.log(err);
    })
});

//delete a blog 
app.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(()=>{
        res.json({redirect:'/blogs'})
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/about-me',(req,res)=>{
    res.redirect('/about');
});

//404 for rest of the web pages
app.use((req,res)=>{
    res.render('404', {title: '404'})
});