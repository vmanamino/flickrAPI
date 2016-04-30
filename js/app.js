angular.module("myApp", ['ngAnimate'])
.config(function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
})
    .controller("myCtrl", function($scope, $http, $sce, $q, $timeout){
        
        //getting the response
        $scope.getting = false;
        
        // delay disappearance of loading bar
        var wait = function(){
            var defer = $q.defer();
            $timeout(function(){
                defer.resolve();
            }, 5000); // 5 seconds corresponds to animation myResults
            return defer.promise;
        };
        
        /* build URLs of this form */
        // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
        
        /* */
        $scope.trustSrc = function(src) {
	        return $sce.trustAsResourceUrl(src);
	    };
	    
	    $scope.flickr = function(){
	        $scope.tag = $scope.query;
	        console.log($scope.tag);
            $scope.query = '';
            
            var url = "https://api.flickr.com/services/rest/";
            
            var request = {
                method: "flickr.photos.search",
                api_key: "852cfd93b491490693c52b019ab0fa92",
                tags: $scope.tag,
                format: 'json',
                per_page: 24,
                nojsoncallback: 1
            };
             $http({
                method: 'GET',
                url: url,
                params: request 
            })
            .then(function(response){
                $scope.results = response.data.photos.photo;
                console.log($scope.results);
            }),
            function(response){
                alert("error");
            };
            $scope.getting = true;
            wait().then(function(){
                $scope.getting = false;
            });
	    };
        
    })