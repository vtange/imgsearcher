# imgsearcher

Client sends keyword, Server performs Bing Search on behalf of Client and returns to Client the results.

# Takeaways

 - CSS => Using flexbox to display results in gallery format
 - How to use Bing API with pages and all.
 - Storing recent searches in a server side variable.
 - How to use a Promise with 'Q'. respond for GET and POST request after Promise is resolved
 
```
	var deferred = Q.defer();
    request.get(url, {auth: { user: key, password: key} }, function (error, result) {
		     deferred.resolve(result.body);
    })
    
  	deferred.promise.then(function (value) {
  		value = JSON.parse(value);
  		var arr = value.d.results;
  		res.send(arr.slice(0,10));
  	});
```
