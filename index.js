const express = require('express');
const path = require("path");
const exphbs = require('express-handlebars');
const mongoose = require("mongoose");

const homeRoutes = require('./routes/home');
const cardRoutes = require('./routes/card');
const coursesRoutes = require('./routes/course');
const addRoutes = require('./routes/add');

const app = express();

const hbs = exphbs.create({
    defaultLayout:'main',
    extname:'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));

app.use('/', homeRoutes);
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', false);

async function start() {
    try {
        const url = `mongodb+srv://doppelyouz:azamat20031232003123@cluster0.tt7avdq.mongodb.net/shop`;
        await mongoose.connect(url, {useNewUrlParser:true});
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch(e) {
        console.log(e);
    }
}

start();