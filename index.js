const express = require('express');
const path = require("path");

const session = require('express-session');

const mongoose = require("mongoose");

const varMiddleware = require('./middleware/variables');

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

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false
}));

app.use(varMiddleware);

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
        const url = `mongodb+srv://doppelyouz:sdGHhSL4Mnb6mZqv@cluster0.tt7avdq.mongodb.net/shop`;
        await mongoose.connect(url, {
            useNewUrlParser:true
        });
        // const candidate = await User.findOne();
        // if(!candidate) {
        //     const newUser = new User({
        //         email:"azamatryssalievyouz@gmail.com",
        //         name:"Azamat",
        //         cart: {items:[]}
        //     })
        //     await newUser.save();
        // }
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch(e) {
        console.log(e);
    }
}

start();