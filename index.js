let express = require('express'),
    bodyParser = require('body-parser');

const User = require("./Models/User");
const Database = require('./Database/Database');
const Address = require("./Models/Address");
const StaticClass = require('./StaticClass');





const  app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

const db = new Database();
let user = new User();

async function authenticate(req, res, next) {
    db.openTransaction();
    /*db.findUser(req.body.username).then( result =>
        console.log( result ) );*/
    const val = await db.findUser(req.body.username)
    if(val != null){
        console.log("username in database");
        const password = await db.findPassword(req.body.password);
        if(password != null){
            console.log(password);
            user = password;
            next();
        }else{
            console.log('user is not registered');
            return next("error");
        }
    }
    else{
        console.log("user not in database");
        return next("error");
    }


}




user.username = 'cw2636@email.vccs.edu';
user.authToken = 'james';
user.password = 'john';




const address = new Address();


global.user = user;

address.city = "james";
address.country = "USA";
address.region = "james";
address.street_address = "bjbkj";
address.town = "bjbhh";


    app.get('/', (req,res) => {
    res.render('home');
});





app.post('/login', authenticate,function(req, res, next) {
    res.render('show', {currentUser: user});
});


app.post('/signup', authenticate, (req,res) =>{
    res.send('restricted');
});


const  port = process.env.PORT || 8000;
app.listen(port,() => console.log('listening on ' + port));
