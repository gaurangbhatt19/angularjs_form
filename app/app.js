var userModule= angular.module("userModule",['ngRoute'])

userModule.config(['$routeProvider',function($routeProvider){
    
    $routeProvider
    .when("/",{
        templateUrl: "app/views/form.html"
        ,controller: "userModuleController"
    })
    .when("/details",{
        templateUrl :"app/views/useDetails.html",
        controller:"userDetailsController"
    })
    .otherwise({
        redirectTo:"/"
    })
}])


userModule.controller("userModuleController",["$scope","$location","$rootScope",function($scope,$location,$rootScope){
    $scope.getUserDetails=function(user){
        $location.path("/details")
        let date=new Date(user.dateofjoining)
        let [month,day,year]=date.toLocaleDateString().toString().split("/")
        user.dateofjoining=day+"/"+month+"/"+year
        console.group(typeof user.dateofjoining)
        $rootScope.$broadcast("Formsubmitted",user)
        console.log(user)
    }
}])

userModule.controller("userDetailsController",["$scope","$rootScope",function($scope,$rootScope){
   $rootScope.$on("Formsubmitted",function(evnt,data){
       console.log(data)
       let res=[]
       for(let [key,value] of Object.entries(data)){
           res.push(value)
       }
       $scope.details=res
       console.log($scope.details)
   })

   
}])