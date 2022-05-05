const express = require('express');
const app = express();

const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const Post = require('./public/models/Post');

// CSS:
app.use(express.static('public'));

// Configurations ##########
 	// Template Engine - HANDLEBARS:
        app.engine('handlebars', handlebars.engine({
            defaultLayout: 'main',
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: false,
            },
        }));
        app.set('view engine', 'handlebars');
    // Body Parser:
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
    // .env
        const path = require('path');
        const dotenv = require('dotenv');
        dotenv.config({ path: path.resolve(__dirname, '/.env')});


// Routes:
app.get('/', (req, res) => {
    Post.findAll({
        order:[['id', 'DESC']]
    }).then((posts) => {
        res.render('home', {
            style: 'notes.css',
            posts: posts
        })
    })
});
app.post('/add', (req, res) => {
    Post.create({
        content: 'New note...'
    }).then(() => {
        console.log("New sticky note created!");
        res.redirect('/');
    }).catch((err) => {
        console.log("Error creating new sticky note: " + err);
        res.redirect('/');
    })
});
app.post('/update/:id', (req, res) => {
    //console.log(req.body.content);
    //console.log(req.params.id);
    Post.update({
        content: req.body.content
    }, {
        where: {'id': req.params.id},
    }).then(() => {
        console.log("Sticky note updated.");
        res.redirect('/');
    }).catch((err) => {
        console.log("Error updating sticky note: " + err);
        res.redirect('/');
    })
});
app.get('/delete/:id', (req, res) => {
    Post.destroy({
        where: {'id': req.params.id}
    }).then(() => {
        console.log("Sticky note deleted!!!");
        res.redirect('/');
    }).catch((err) => {
        console.log("Error deleting sticky note: " + err);
        res.redirect('/');
    })
});

// Server:        
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log("Env: " + process.env.NODE_ENV);
	console.log("Server opened! Port: " + PORT);
});