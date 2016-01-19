// routes.js
module.exports = function(app) {

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
		
		res.send(JSON.stringify(result))
	});
	app.get('/api/latest/imagesearch/:keywords', function(req, res){
		var result = {};
		//return search keywords
		
		res.send(JSON.stringify(result))
	});
}