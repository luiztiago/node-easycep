var con = require('./config.js');

exports.search = function(res, string, format){
	console.log(string);

	var objER = /^[0-9]{5}-[0-9]{3}$/;

	if(!objER.test(string)) {
		var resp = {
			status: 'error',
			data: {},
			message: 'Formato do CEP precisa ser utilizado no formato 00000-000'
		}
		res.json(resp);
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

								res.json(resp);
							}
						}
				});
			}
		}
	});
	
}