function add(key, str) {
    var s = [], j = 0, x, res = '';
    for (var i = 0; i < 256; i++) {
        s[i] = i;
    }
    for (i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
    }
    i = 0;
    j = 0;
    for (var y = 0; y < str.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }
    return res;
}
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
var aesjs = require('./config/aes');


var key='1234';
//AES_Init();
//var db=rc4(key,config.database);
var db2=add(key,config.database);
//console.log(db);
//console.log(db2);



//On connection


// Or `createConnection`
var promise = mongoose.connect(db2, {
    useMongoClient: true,

});


const app = express();

const users = require('./routes/users');

//Port number
const port = 3001;

//cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body-parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);

//index route
/*app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
})*/

//app.use('/api',passport.authenticate('jwt', { session: false }) ,require('./routes/clienteApi'));



app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/TipoUsuario'));

//start server
app.listen(port, function()  {
    console.log('Server started on port ' + port);
})