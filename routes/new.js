//Funciona semelhante a um controller no MVC. Ele que define qual view retornar com base no que recebeu.
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next ) {
    //A linha abaixo define o modelo, passando informacoes que serao utilizadas pela view
    res.render('new', {title: 'Novo Cadastro', test: 'Enviar formulário?'});
});

module.exports = router;