angular.module("myApp", ['ngAnimate'])
    .controller("myCtrl", function($scope){
        $scope.query = '';
        $scope.tag = '';
        $scope.submit = function(){
           
           $scope.tag = $scope.query;
           $scope.query = '';
            
        };
        
        
    })