var userModule= angular.module("userModule",['ngRoute'])

userModule.config(['$routeProvider',function($routeProvider){
    
    $routeProvider
    .when("/",{
        templateUrl: "./app/views/form.html"
        ,controller: "userModuleController"
    })
    .when("/details",{
        templateUrl :"./app/views/useDetails.html",
        controller:"userDetailsController"
    })
    .otherwise({
        redirectTo:"/"
    })
}])

userModule.factory("formDetails",function(){
    let formValues={}
    var save_values={}
    formValues.saveDetails=function(values){
        save_values=values
    }

    formValues.getDetails=function(){
        return save_values
    }
    return formValues

})

userModule.controller("userModuleController",["$scope","$location","$rootScope","formDetails",function($scope,$location,$rootScope,formDetails){
    $scope.getUserDetails=function(user){
        $location.path("/details")
        let date=new Date(user.dateofjoining)
        let [month,day,year]=date.toLocaleDateString().toString().split("/")
        user.dateofjoining=day+"/"+month+"/"+year

        formDetails.saveDetails(user)
        console.log(formDetails.getDetails(),"userModuleController")
        $rootScope.$broadcast("Formsubmitted",user)
        console.log(user)
    }
}])

userModule.controller("userDetailsController",["$scope","formDetails","$location",function($scope,formDetails,$location){
       $scope.navigateBack=function(){
           $location.path("/")
       }
       console.log(formDetails.getDetails(),"userDetailsController")
       var res=[]
       for(let [key,value] of Object.entries(formDetails.getDetails())){
           res.push([key,value])
       }
       $scope.details=res
       console.log($scope.details)
   

   
}])