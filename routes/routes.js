// routes.js
module.exports = function(app) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
	app.get('/api/imagesearch/:keywords', function(req, res){
		var result = {};
		
		
		res.send(JSON.stringify(result))
	});
	app.get('/api/latest/imagesearch/:keywords', function(req, res){
		var result = {};
		
		
		res.send(JSON.stringify(result))
	});
}