/**
 * Created by xaipo on 8/21/2017.
 */

var express= require('express');
var router= express.Router();
var nodemailer = require('nodemailer');


var mail='apunach2017@gmail.com';
var password='@PUN@CH2017';

router.post('/sendMail',function(req,res) {


    //for
    var paginaWeb = "<h1>Estado de Cuenta APUNACH</h1>"
        + "<br>"
        + "<table style=\"width:100%\">"
        + "<tr><th>Cédula Docente</th>"
        + "<th>Nombre Docente</th>"
        + "<th>Fecha</th>"
        + "<th>Valor a Pagar</th>"
        + "<th>Valor Arrastre</th>"
        + "</tr>"
        + "<tr>"
        + "<td style=\"text-align: center\">" + req.body.cedula + "</td>"
        + "<td style=\"text-align: center\">" + req.body.nombre + "</td>"
        + "<td style=\"text-align: center\">" + req.body.fecha + "</td>"
        + "<td style=\"text-align: center\">$" + req.body.valorPagar + "</td>"
        + "<td style=\"text-align: center\">$" + req.body.valorArrastre + "</td>"
        + "</tr>"
        + "</table><br>"
        + "<h3>Detalle</h3><br><br>"
        + "<table style=\"width:100%\">"
        + "<tr>"
        + "<th>Local</th>"
        + "<th>Motivo</th>"
        + "<th>Valor</th>"
        + "</tr>";


    //  console.log(paginaWeb);

    var n = req.body.detalle.length;
    for (var i = 0; i < n; i++) {
        paginaWeb += "<tr>";
        paginaWeb += "<td style=\"text-align: center\">" + req.body.detalle[i].nombre_local + "</td>";
        paginaWeb += "<td style=\"text-align: center\">" + req.body.detalle[i].descripcion + "</td>";
        paginaWeb += "<td style=\"text-align: center\">$" + req.body.detalle[i].valor_descuento + "</td>";
        paginaWeb += "</tr>";
    }

    paginaWeb += "</table>"
    paginaWeb += "<br><br>"


// create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: mail,
            pass: password
        }
    });

// setup email data with unicode symbols
    let mailOptions = {
        from: '"APUNACH" <' + mail + '>', // sender address
        to: req.body.mail, // list of receivers
        subject: 'Estado de Cuenta', // Subject line
        text: 'Estado de Cuenta ', // plain text body
        html: paginaWeb // html body
    };

// send mail with defined transport object

    //   console.log(mailOptions);
    transporter.sendMail(mailOptions, function(err, doc) {
        if(err) return next(err);
       // res.json(doc);

        res.send('enviado');
});




});



    router.post('/sendMail1',function(req,res){


        //for
        var paginaWeb = "<h1>Valor por descontar</h1>"
            +"<br>"
            +"<table style=\"width:100%\">"
            +"<tr><th>Cédula Docente</th>"
            +"<th>Nombre Docente</th>"
            +"<th>Fecha</th>"
            +"<th>Valor a descontar el siguiente mes</th>"
            +"</tr>"
            + "<tr>"
            +"<td style=\"text-align: center\">"+req.body.cedula+"</td>"
            + "<td style=\"text-align: center\">"+req.body.nombre+"</td>"
            + "<td style=\"text-align: center\">"+req.body.fecha+"</td>"
            + "<td style=\"text-align: center\">$"+req.body.valorPagar+"</td>"
            + "</tr>"
            + "</table><br>"
            + "<h3>Detalle</h3><br><br>"
            + "<h4>"+req.body.detalle+"</h4><br><br>"


        //  console.log(paginaWeb);






// create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // secure:true for port 465, secure:false for port 587
            auth: {
                user:mail,
                pass: password
            }
        });

// setup email data with unicode symbols
        let mailOptions = {
            from: '"APUNACH" <'+mail+'>', // sender address
            to: req.body.mail, // list of receivers
            subject: 'Valor por descontar', // Subject line
            text: 'Valor por descontar ', // plain text body
            html: paginaWeb // html body
        };

// send mail with defined transport object

        //   console.log(mailOptions);
        transporter.sendMail(mailOptions, function(err, doc) {
            if(err) return next(err);
            // res.json(doc);

            res.send('enviado');
        });
    

});

module.exports=router;