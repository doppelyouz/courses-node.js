const express = require('express');
const path = require("path");

const session = require('express-session');

const mongoose = require("mongoose");
const MongoStore = require('connect-mongodb-session')(session);

const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');

const exphbs = require('express-handlebars');

const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const homeRoutes = require('./routes/home');
const cardRoutes = require('./routes/card');
const coursesRoutes = require('./routes/course');
const addRoutes = require('./routes/add');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

const User = require('./models/user');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main', 
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

const MONGODB_URI = `mongodb+srv://doppelyouz:daneka18@cluster0.tt7avdq.mongodb.net/shop`;

const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store 
}));

app.use(varMiddleware);
app.use(userMiddleware);

app.use('/', homeRoutes);
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', orderRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', false);

async function start() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser:true
        });
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch(e) {
        console.log(e);
    }
}

start();