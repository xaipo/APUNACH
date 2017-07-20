const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to database


//On connection


// Or `createConnection`
var promise = mongoose.connect(config.database, {
    useMongoClient: true,
    /* other options */
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
app.use('/api',require('./routes/track'));
//app.use('/api', require('./routes/routeMaeFire'));
/*app.use('/api', require('./routes/configuracionApi'));
app.use('/api', require('./routes/detalleFacturaApi'));
app.use('/api', require('./routes/facturaApi'));
app.use('/api', require('./routes/productoApi'));
app.use('/api', require('./routes/promocionesApi'));
app.use('/api', require('./routes/proveedorApi'));
app.use('/api', require('./routes/tipoClienteApi'));
app.use('/api', require('./routes/tipoProductoApi'));
app.use('/api', require('./routes/tipoPromocionApi'));*/

//start server
app.listen(port, function()  {
    console.log('Server started on port ' + port);
})