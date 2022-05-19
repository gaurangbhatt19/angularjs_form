var userModule= angular.module("userModule",['ngRoute'])

userModule.config(['$routeProvider',function($routeProvider){

    $routeProvider
    .when("/angular-js-playlist/index.html#!",{
        templateUrl: "views/form.html"
    })
    .when("/details",{
        templateUrl :"views/userDetails.html"
    })
}])


userModule.controller("userModuleController",function($scope,$location){
    console.log($scope.url)
 $location.path("/")
})

