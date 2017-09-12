/**
 * Created by xaipo on 7/20/2017.
 */
var express= require('express');
var router= express.Router();


var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1; //hoy es 0!
var yyyy = hoy.getFullYear();
var mes = mm;

if(mes<10) {
    mes='0'+mes
}

var fecha1 = dd+'-'+mes+'-'+yyyy;

console.log(fecha1);



router.get('/backup', function (req, res, next)  {


    

    var exec = require('child_process').exec, child;


    child = exec('mongodump --out ./backup/'+fecha1+' --db APUNACH',

        function (error, stdout, stderr) {

            console.log(stdout);
            res.json("creacion exitosa");

            if (error !== null) {
                console.log('exec error: ' + error);
                res.json(error);
            }
        });


});



module.exports=router;