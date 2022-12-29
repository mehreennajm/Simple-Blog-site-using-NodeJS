const Blog = require('../models/blog');

const index = (req,res) =>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('blogs/index', {title: 'Blogs',blogs:result});
    })
    .catch((err)=>{
        res.render('404',{title:'Blog Not Found'});
    })
}

const create = (req,res) =>{
    res.render('blogs/create-blog', {title: 'Create Blog'});
}

const save = (req,res) => {
    const blog  = new Blog(req.body);
    blog.save()
        .then((result)=>{
            res.redirect('/');
        })
        .catch((err)=>{
            console.log(err);
        });
}

const single_raw_blog_save = (req,res) => {
    const newBlog = new Blog({
        title : "Third Blog",
        snippet : "Welcome to Third blog",
        body: "More about my new blog adajdaj aldakdja lajderkv "
    })

    newBlog.save()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
}

const single_blog = (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('blogs/single-blog',{title: result.title, 'blog':result})
    })
    .catch((err)=>{
        res.render('404',{title:'Blog not Found'});
    });
}

const delete_blog = (req,res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(()=>{
        res.json({redirect:'/'})
    })
    .catch((err)=>{
        res.render('404',{title:'Blog Not Found'});
    });
}

module.exports = {
    index,
    create,
    save,
    single_raw_blog_save,
    single_blog,
    delete_blog
}