console.clear()
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressHbs = require('express-handlebars');
// import routes
const indexRouter = require('./routes/index')
const pageRouter = require('./routes/pages');
const shopRouter = require('./routes/shop');
const userRouter = require('./routes/user');

//connect Db
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => console.log(`app is connected to the Database`))
    .catch(err => console.log(err));
app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', '.hbs');

//use middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use Router
app.use('/', indexRouter);
app.use('/page/', pageRouter);
app.use('/shop/', shopRouter);
app.use('/user/', userRouter);


port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port: ${port}!`);
});