// routes.js
module.exports = function(app) {
	
function searchBing(query) {
    var request=require('request');
    var url="https://api.datamarket.azure.com/Bing/Search/v1/Image?Query='"+query+"'&$format=JSON";
    var key="gpfMNHL5VVhAnl0FaDb90ykr8rMRNYUgYs6f/uK9xiU";
    request.get(url, {auth: { user: key, password: key} }, function (error, result) {
        console.log(error, result.body);
		return result.body;
    })
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
		//do img search API
		//store search keywords, drop 11th if 10+
		result = searchBing(req.params.keywords)
		res.send(JSON.stringify(result))
	});
	app.get('/api/latest/imagesearch/:keywords', function(req, res){
		var result = {};
		//return search keywords
		
		res.send(JSON.stringify(result))
	});
}