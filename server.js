const express = require('express'); // Include module express
const port = 8000;// Define port
const expressLayouts = require('express-ejs-layouts');// Use layouts library

const app = express();

app.use(expressLayouts);
app.set('layout', 'layouts');//Select the layout which we want to use

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
