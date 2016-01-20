var Q = require('q');

// routes.js
module.exports = function(app) {
	
function searchBing(query, page, res) {
    var request=require('request');
    var url= !!(page) ? "https://api.datamarket.azure.com/Bing/Search/v1/Image?Query='"+query+"'&$format=JSON&$skip="+(page*10) : "https://api.datamarket.azure.com/Bing/Search/v1/Image?Query='"+query+"'&$format=JSON&$skip="+0 ;
    var key="gpfMNHL5VVhAnl0FaDb90ykr8rMRNYUgYs6f/uK9xiU";
	var deferred = Q.defer();
    request.get(url, {auth: { user: key, password: key} }, function (error, result) {
		deferred.resolve(result.body);
    })
	deferred.promise.then(function (value) {
		value = JSON.parse(value);
		var arr = value.d.results;
		res.send(arr.slice(0,10));
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
			"page": req.query.page
		};
		//do img search API
		//store search keywords, drop 11th if 10+
		result = searchBing(req.params.keywords, req.query.page, res)
		if(!app.lastSearch){
			//init app.lastSearch
			app.lastSearch = [];
		}
		app.lastSearch.push(req.params.keywords)
	});
	app.get('/api/latest/imagesearch', function(req, res){
		var result = {};
		if(!app.lastSearch){
			res.send("No searches so far.")
		}
		//return search keywords
		res.send(app.lastSearch)
	});
}