var con = require('./config.js');

var respSend = function(res, resp, format){
	if(!format || format == 'json'){
		res.json(resp);
	}else{
		var Js2Xml = require("js2xml").Js2Xml,
			xml = new Js2Xml("item", resp);
		// xml = xml.toString();
		res.send(xml);
	}
}

exports.search = function(res, string, format){
	console.log(string);

	var objER = /^[0-9]{5}-[0-9]{3}$/;

	if(!objER.test(string)) {
		var resp = {
			status: 'error',
			data: {},
			message: 'Formato do CEP precisa ser utilizado no formato 00000-000'
		}

		respSend(res, resp, format);		
		
		return false;
	}

	con.mysql.query('SELECT uf FROM cep_log_index WHERE cep5='+string.substr(0,5),
	  				 function(err, result, fields) {
		if (err) throw err;
		else {
			for (var i in result) {
				var cep_index = result[i],
					uf = cep_index.uf;
				
				con.mysql.query('SELECT * FROM '+uf+' WHERE cep="'+string+'"',
					function(err, result, fields) {
						if (err) throw err;
						else {
							for (var i in result) {
								var item = result[i];
								
								address = {
									tipo_logradouro: item.tp_logradouro,
									logradouro: item.logradouro,
									bairro: item.bairro,
									cep: item.cep,
									cidade: item.cidade
								}

								var resp = {
									status: 'success',
									message: 'CEP encontrado com sucesso',
									data: address
								}

								respSend(res, resp, format);
							}
						}
				});
			}
		}
	});
	
}