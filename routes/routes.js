var Q = require('q');

// routes.js
module.exports = function(app) {
	
function searchBing(query, res) {
    var request=require('request');
    var url="https://api.datamarket.azure.com/Bing/Search/v1/Image?Query='"+query+"'&$format=JSON";
    var key="gpfMNHL5VVhAnl0FaDb90ykr8rMRNYUgYs6f/uK9xiU";
	var deferred = Q.defer();
    request.get(url, {auth: { user: key, password: key} }, function (error, result) {
		deferred.resolve(result.body);
    })
	deferred.promise.then(function (value) {
		value = JSON.parse(value);
		console.log(typeof value)
		res.send(value);
	});
}
	
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
	app.get('/api/imagesearch/:keywords', function(req, res){
		var result = {
			"params": req.params,
			"query": req.query
		};
		var dude = "dude";
		//do img search API
		//store search keywords, drop 11th if 10+
		result = searchBing(req.params.keywords, res)
	});
	app.get('/api/latest/imagesearch/:keywords', function(req, res){
		var result = {};
		//return search keywords
		
		res.send(JSON.stringify(result))
	});
}