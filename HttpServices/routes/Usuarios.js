/**
 * Created by xaipo on 7/20/2017.
 */
/**
 * Created by xaipo on 7/17/2017.
 */
var express= require('express');
var router= express.Router();

var user = require('../models/user');

user.methods(['get','put','post','delete','search']);
user.register(router,'/user');


router.get('/usuario_Tipo', function (req, res, next)  {
    user.aggregate(

        [
            { "$match": { "estado": "0" } },
            {"$lookup": {
                "from": "tipoUsuario",
                "localField": "tipoUsuario",
                "foreignField": "_id",
                "as": "R"
            }}

        ],function (err, tareas) {
            if (err) { return next(err) }
            res.json(tareas);
        }
    )


});

module.exports=router;