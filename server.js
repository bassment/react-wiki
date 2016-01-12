var express = require('express');
var port = process.env.PORT || 3000;

express()
  .set('view engine', 'ejs')
  .use(express.static('./public'))
  .use(require('./accounts'))
  .get('*', function(req, res) {
    res.render('index', { user: JSON.stringify(req.session.user || null) });
  })
  .listen(port, function() {
    console.log('Listening on port localhost:3000');
  });
