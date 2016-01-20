(function() {
    //start of function
  var app = angular.module('imgsearcher', []);

app.controller('MainCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){
	$scope.images;
	$scope.imgSearch = function(){
		$http.post($window.location.href+"api/imagesearch/"+$scope.userInputKeywords).success(function(data){$scope.images=data;}).error(function(err){throw err;});
	};
	$scope.barHeight = function(){
		if($scope.images){
			return {"top":"5%"}
		}
		else{
			return {"top":"30%"}
		}
	}
}]);//end of controller
  //end of function
})();
