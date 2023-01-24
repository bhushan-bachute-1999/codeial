const express = require('express'); // Include module express
const port = 8000;// Define port
const expressLayouts = require('express-ejs-layouts');// Use layouts library
const bodyParse = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose1');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-googleOauth-strategy');
const MongoStore = require('connect-mongo');
const saasMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const path = require('path');

const app = express();

app.use(saasMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    // debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));

const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_socket').chatSocket(chatServer);
chatServer.listen(5000);
console.log('Chat socket is listening on port 5000');

app.set('layout', 'layouts');//Select the layout which we want to use
app.set('layout extractStyles', true);// Whenever the link tag is enountered place it in the head of html tag
app.set('layout extractScripts', true);// Whenever the script tag is enountered place it in the head of html tag
app.set('view engine', 'ejs');//Setup view engine
app.set('views', './views');//Give path to view folder

app.use('/uploads', express.static(__dirname + '/uploads')); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static('./assets'));
app.use(session({
    name:"Codeial",
    //Todo later. Change keey before deployment to production
    secret: "blahsomething",
    saveUninitialized : false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    //Mongo store is used to store session cookie
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/userCookieDB',
       autoRemove: false 
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticateUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes/index'));//When any route forward to routes/index.js

// Listen on port 8000
app.listen(port, function (err) {
    if (err) {
        console.log(`Error :${port}`);
        return;
    }
    console.log(`Server is up and running on port: ${port}`);
});
