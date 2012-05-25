var app = require('express').createServer(),
	jade = require('jade'),
	url = require('url'),
	qs = require('querystring'),
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

app.get('/cep/', function(req, res){

	var string,
		format;

	if(req.method == "POST") {
		var body = '';
		req.on('data', function (data) {
			body += data;
		});

		string = (body.cep) ? body.cep : '';
		format = (body.format) ? body.format : 'json';

	}else if(req.method == 'GET') {
		var url_parts = url.parse(req.url, true);

		string = (url_parts.query.cep) ? url_parts.query.cep : '';
		format = (url_parts.query.format) ? url_parts.query.format : 'json';
		
	}else{
		return false;
	}

	cep.search(res, string, format);
});

app.listen(3000);