
const express = require('express');


const app = express();


const mongojs = require('mongojs');


const database = mongojs('node_express_rest_mongo', ['members']);


const morgan = require('morgan');

app.use(morgan('short'));


const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const expressValidator = require('express-validator');


const path = require('path');


app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));



app.get('/', (req, res) => {
    res.render('index', {
        title: 'Customers List...'
    });

});


app.get('/list', (req, res) => {
    database.members.find((err, docs) => {
        res.json(docs);
    });
});

// Create From Form
app.post('/create', (req, res) => {

    var newMember = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        instruments: req.body.instruments
    };

    database.members.insert(newMember, (err, result) => {
        if (err) {
            console.log('Error Occured' + err.message)
        }
    });

    res.redirect('/list');
});



app.listen(3000, (req, res) => {
    console.log('Server up and running on Port 3000');
});


