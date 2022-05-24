var userModule= angular.module("userModule",['ngRoute'])

userModule.config(['$routeProvider',function($routeProvider){
    
    $routeProvider
    .when("/",{
        templateUrl: "./app/views/home.html",
        controller:"userDetailsController"
    })
    .when("/addUser",{
        templateUrl:"./app/views/form.html",
        controller:"userModuleController"
    })
    .when("/details",{
        templateUrl :"./app/views/useDetails.html",
        controller:"userDetailsController"
    })
    .otherwise({
        redirectTo:"/"
    })
}])
userModule.factory("allUsersDetails",function(){
    let usersValues=[{
        title:"Gaurang Bhatt",
        description:"Description",
        emp_id:"CTE-",
    },{
        title:"Gaurang Bhatt",
        description:"Description",
        emp_id:"CTE-"
    }]

    var allDetails={}
    allDetails.saveValues=function(value){
        usersValues.push(value)
    }
    allDetails.getValues=()=>{
        return usersValues
    }
    allDetails.setValues=function(values){
        usersValues=values
    }

    return allDetails
})

userModule.factory("formDetails",function(){
    let formValues={}
    var save_values={
        
    }
    formValues.saveDetails=function(values){
        save_values=values
    }

    formValues.getDetails=function(){
        return save_values
    }
    return formValues

})

userModule.controller("userModuleController",["$scope","$location","formDetails","allUsersDetails",function($scope,$location,formDetails,allUsersDetails){
    $scope.getUserDetails=function(user){
        $location.path("/")
        let date=new Date(user.dateofjoining)
        let [month,day,year]=date.toLocaleDateString().toString().split("/")
        user.dateofjoining=day+"/"+month+"/"+year

        formDetails.saveDetails(user)
        console.log(formDetails.getDetails(),"userModuleController")
        // $rootScope.$broadcast("Formsubmitted",user)
        console.log(user)
        var details=formDetails.getDetails()
       var description=""
       var res={}
       if(details.middlename===undefined){
         details.middlename=""
       }

       if(details.hobbies===undefined){
           details.hobbies=""
       }

       if(details.middlename===undefined){
           description="Full Name: "+details.firstname+" "+details.lastname+` \r\nEmployee Id : ${details.emp_id} \nDate Of Joining  ${details.dateofjoining} \nContact Number ${details.contact_number} \nEmail ${details.email} \nExperience (yrs) ${details.experience} \nCity ${details.city} \nHobbies: ${details.hobbies}`
           res={
              title:details.firstname+" "+details.lastname,
              description:description,
              emp_id:details.emp_id
            }
       }else{
        description=`Full Name: ${details.firstname} ${details.middlename} ${details.lastname} \r\nEmployee Id - ${details.emp_id} \nDate Of Joining  ${details.dateofjoining} \nContact Number ${details.contact_number} \nEmail ${details.email} \nExperience (yrs) ${details.experience} \nCity ${details.city} Hobbies: ${details.hobbies}` 
            res={
            title:details.firstname+" "+details.middlename+" "+details.lastname,
            description:description,
            emp_id:details.emp_id
          }
    }
        allUsersDetails.saveValues(res)
    }

    


}])

userModule.controller("userDetailsController",["$scope","formDetails","$location","allUsersDetails",function($scope,formDetails,$location,allUsersDetails){
       
        $scope.isShowMore=true
        console.log($scope.isShowMore)
        
        $scope.navigateBack=function(){
           $location.path("/")
       }
       console.log(formDetails.getDetails(),"userDetailsController")

       $scope.details=allUsersDetails.getValues()
       console.log($scope.details)

       $scope.redirectUser=function(){
        $location.path("/addUser")
       }
}])

userModule.controller("toggleSeeMore",["$scope",function($scope){ 
    $scope.isShowMore=true
    $scope.toggleShowMore=function(emp_id){
       
        $scope.isShowMore=!$scope.isShowMore
        // console.log(emp_id)
        // let userValues=allUsersDetails.getValues()
        // console.log(userValues)
        // userValues=userValues.map((value)=>{
        //     if(value.emp_id===emp_id){
        //         value.isShowMore=!value.isShowMore
        //     }
        //     else{
        //         return value
        //     }
        // })
        // allUsersDetails.setValues(userValues)
        // console.log($scope.isShowMore)

    }
}])