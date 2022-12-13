const express = require('express'); // Include module express
const port = 8000;// Define port
const expressLayouts = require('express-ejs-layouts');// Use layouts library
const bodyParse = require('body-parser');


const app = express();
app.use(express.urlencoded());

app.use(expressLayouts);
app.set('layout', 'layouts');//Select the layout which we want to use

app.set('layout extractStyles', true);// Whenever the link tag is enountered place it in the head of html tag
app.set('layout extractScripts', true);// Whenever the script tag is enountered place it in the head of html tag

app.use(express.static('./assets'));
app.set('view engine', 'ejs');//Setup view engine
app.set('views', './views');//Give path to view folder
app.use('/', require('./routes/index'));//When any route forward to routes/index.js

// Listen on port 8000
app.listen(port, function (err) {
    if (err) {
        console.log(`Error :${port}`);
        return;
    }
    console.log(`Server is up and running on port: ${port}`);
});
