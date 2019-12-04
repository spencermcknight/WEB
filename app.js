const express= require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bcrypt = require('bcryptjs');
const session = require("express-session");
const fileupload = require("express-fileupload");
const app = express();

const userRoutes = require("./routes/User");
const generalRoutes = require("./routes/General");
const taskRoutes = require("./routes/Task");


app.use(fileupload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(session({secret: 'whoa there buddy, where are you looking?'}));

app.use((req,res,next)=>{
    res.locals.user= req.session.userInfo;
    next();
})

const PORT = process.env.PORT || 3000;



const DBURL= "mongodb+srv://smcknight:135135@cluster0-nahcc.mongodb.net/AirBnb?retryWrites=true&w=majority";
mongoose.connect(DBURL, {useNewUrlParser: true})
.then(()=>{
    console.log(`Database is connected`)
})
.catch(err=>{
    console.log(`Something went wrong : ${err}`);
})


app.get('/', (req, res)=> {
    console.log(res.locals.user);
    res.render("index");
});


app.use(express.static('public'));
app.use("/user",userRoutes);
app.use("/task",taskRoutes);

app.use("/gen",generalRoutes);




app.listen(PORT);