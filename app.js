require('dotenv').config();
var express = require('express');
var session = require('express-session');
var cookie = require('cookie-parser');


var bodyParser = require('body-parser');
const http = require('http');

var db = require('./models/db_controller')
var signup = require('./controllers/signup')
var login = require("./controllers/login");
var verify = require("./controllers/verify")
var reset = require("./controllers/reset_contoller")
var doctors = require("./controllers/doc_controller")
var employee = require("./controllers/employee")
var appointment = require("./controllers/appointment")
var store = require("./controllers/store")
var reciept = require("./controllers/receipt");
var complain = require("./controllers/complain");
var inbox = require ('./controllers/inbox');
var receipt = require ('./controllers/receipt');
var chat = require ('./controllers/chat');
var home = require("./controllers/home");
var set = require("./controllers/set_controller");
var reset = require("./controllers/reset_contoller");
var logout = require("./controllers/logout")
var landing = require("./controllers/landing");



var app = express();

const server = http.createServer(app);

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookie());
const PORT = process.env.DB_PORT||3000;
server.listen(PORT, ()=>console.log(`server running on port ${PORT}`))

app.use("/signup", signup);
app.use("/login", login)
app.use("/verify", verify);
app.use("/doctors", doctors);
app.use("/employee", employee);
app.use("/appointment", appointment);
app.use("/store", store);
app.use("/receipt", receipt);
app.use("/complain", complain);
app.use("/inbox", inbox);
app.use("/chat",chat);
app.use("/home", home);
app.use("/setpassword", set);
app.use("/resetpassword", reset);
app.use("/logout",logout);
app.use("/", landing);