var app = require('express').createServer(),
	jade = require('jade'),
	cep = require('./cep.js');

app.configure(function(){
	app.set('view engine', 'jade');
	app.set('views', __dirname + '/views');
	app.use("/css", __dirname + '/css');
});

app.enable("jsonp callback");

app.get('/', function(req, res){
	res.render('index');
});

app.get('/cep.:format?/:cep', function(req, res){
	var string = req.params.cep,
		format = req.params.format;
	cep.search(res, string, format);
});

app.listen(3000);