var express = require('express');
var router = express.Router();

router.get('/new', function(req, res, next ) {
  //A linha abaixo define o modelo, passando informacoes que serao utilizadas pela view
  res.render('new', {title: 'Novo Cadastro', doc: {"nome":"", "idade":""}, action: '/new'});
  });
  router.post('/new', function(req, res) {
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  var uf = req.body.uf;

  global.db.insertCustomer({nome, idade, uf}), (err, result) => {
    if(err) {return console.log(err);}
  }
  
  res.redirect('/');
});

router.get('/edit/:id', function(req, res, next ) {
  var id = req.params.id;
  global.db.findCustomer(id, (e, docs) => {
    if(e) {return console.log(e);}
    res.render('new', {title: 'Edição de Cliente' , doc: docs[0], action: '/edit/' + docs[0]._id});
  })
});

router.post('/edit/:id', function(req, res) {
  var id = req.params.id;
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  var uf = req.body.uf;

  global.db.updateCustomer(id, {nome, idade, uf}), (err, result) => {
    if(err) {return console.log(err);}
  }
  res.redirect('/');
});

router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteCustomer(id, (e, r) => {
    if(e) {return console.log(e);}
    res.redirect('/');
    });
});

router.get('/:pagina?', async function(req, res) {
  const pagina = parseInt(req.params.pagina || "1");
  const docs = await global.db.findAll(pagina);
  const count = await global.db.countAll();
  const qtdPaginas = Math.ceil(count/ global.db.pagina_size);
  res.render('./index', {title: 'lista de clientes', docs, count, qtdPaginas, pagina});
});

module.exports = router;