/**
 * Created by xaipo on 7/20/2017.
 */
/**
 * Created by xaipo on 7/17/2017.
 */
var express= require('express');
var router= express.Router();

var Carreras = require('../models/Carrera');

Carreras.methods(['get','put','post','delete','search']);
Carreras.register(router,'/carrera');

router.get('/carrera_facultad', function (req, res, next)  {
    Carreras.aggregate(

        [
            { "$match": { "estado": "0" } },
            {"$lookup": {
                "from": "facultad",
                "localField": "id_facultad",
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