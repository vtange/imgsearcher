var Q = require('q');

// routes.js
module.exports = function(app) {
	
function searchBing(query, page, res) {
    var request=require('request');
    var url="https://api.datamarket.azure.com/Bing/Search/v1/Image?Query='"+query+"'&$format=JSON&$skip="+(page*10);
    var key="gpfMNHL5VVhAnl0FaDb90ykr8rMRNYUgYs6f/uK9xiU";
	var deferred = Q.defer();
    request.get(url, {auth: { user: key, password: key} }, function (error, result) {
		deferred.resolve(result.body);
    })
	deferred.promise.then(function (value) {
		value = JSON.parse(value);
		var arr = value.d.results;
		arr = chunk(arr,10);
		res.send(arr);
	});
}
function chunk(arr, limit) {
  var newarr = []
  for (var i = 0; i < limit; i++){
	   newarr.push(arr[i]);
  }
  return newarr;
}

	app.lastSearch = [];
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
		app.lastSearch.push(req.params.keywords)
	});
	app.get('/api/latest/imagesearch', function(req, res){
		var result = {};
		//return search keywords
		
		res.send(app.lastSearch)
	});
}