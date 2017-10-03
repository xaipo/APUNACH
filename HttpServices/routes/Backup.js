/**
 * Created by xaipo on 7/20/2017.
 */
var express= require('express');
var router= express.Router();





router.get('/backup', function (req, res, next)  {



    var uploadDate = new Date().toISOString();
    uploadDate = uploadDate.replace(':','-');
    uploadDate = uploadDate.replace(':','-');

    var exec = require('child_process').exec, child;


    child = exec('mongodump --out ./backup/'+uploadDate+' --db APUNACH',

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