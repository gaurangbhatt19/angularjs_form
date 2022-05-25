var userModule= angular.module("userModule",['ngRoute','ui.bootstrap'])

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
        description:{
            fullname:"Gaurang Bhatt",
            emp_id:`CTE`,
               dateofjoining:`17/05/2022`,
               contact_number:`1234567890`,
               email:`gaurangbhatt19@gmail.com`,
               experience:`1`,
               city:`Haridwar`,
               hobbies:``
        },
        emp_id:"CTE-",
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
        console.log(user)
        var details=formDetails.getDetails()
       var description=""
       var description1={}
       var res={}

       if(details.hobbies===undefined){
           details.hobbies=""
       }

       if(details.middlename===undefined){
           details.middlename=""
           description1={
               fullname:details.firstname+" "+details.lastname,
               emp_id:details.emp_id,
               dateofjoining:details.dateofjoining,
               contact_number:details.contact_number,
               email:details.email,
               experience:details.experience,
               city:details.city,
               hobbies:details.hobbies
           }
           description="Full Name: "+details.firstname+" "+details.lastname+` \r\nEmployee Id : ${details.emp_id} \nDate Of Joining  ${details.dateofjoining} \nContact Number ${details.contact_number} \nEmail ${details.email} \nExperience (yrs) ${details.experience} \nCity ${details.city} \nHobbies: ${details.hobbies}`
           res={
              title:details.firstname+" "+details.lastname,
              description:description1,
              emp_id:details.emp_id
            }
       }else{
        description1={
            fullname:details.firstname+" "+details.middlename+" "+details.lastname,
            emp_id:details.emp_id,
            dateofjoining:details.dateofjoining,
            contact_number:details.contact_number,
            email:details.email,
            experience:details.experience,
            city:details.city,
            hobbies:details.hobbies
        }
        description=`Full Name: ${details.firstname} ${details.middlename} ${details.lastname} \r\nEmployee Id - ${details.emp_id} \nDate Of Joining  ${details.dateofjoining} \nContact Number ${details.contact_number} \nEmail ${details.email} \nExperience (yrs) ${details.experience} \nCity ${details.city} Hobbies: ${details.hobbies}` 
            res={
            title:details.firstname+" "+details.middlename+" "+details.lastname,
            description:description1,
            emp_id:details.emp_id
          }
    }
        allUsersDetails.saveValues(res)
    }
}])

userModule.controller("userDetailsController",["$scope","formDetails","$location","allUsersDetails",function($scope,formDetails,$location,allUsersDetails){
    $scope.searchBy="First Name"
        $scope.setSearchBy=function(searchBy){
            $scope.searchBy=searchBy
        }

        $scope.isShowMore=true
        console.log($scope.isShowMore)
        
        $scope.navigateBack=function(){
           $location.path("/")
       }
       console.log(formDetails.getDetails(),"userDetailsController")

       
       $scope.details=allUsersDetails.getValues()
       
       $scope.searchDetails=function(searchvalue){
           console.log($scope.searchBy)
           if(searchvalue===undefined){
               searchvalue=""
           }
           if($scope.searchBy==="First Name"){
            
            $scope.details= allUsersDetails.getValues().filter((i)=>{
                console.log(i.title.split(" ")[0].includes(searchvalue),i.title.split(" ")[0])

                return i.title.split(" ")[0].includes(searchvalue)
            })
            console.log($scope.details)

           }else if($scope.searchBy==="Emp Id"){
            $scope.details= allUsersDetails.getValues().filter((i)=>{
                console.log(searchvalue,i.emp_id)
                return i.emp_id.includes(searchvalue)
            })
            console.log($scope.details)
           }
       }

       $scope.redirectUser=function(){
        $location.path("/addUser")
       }


       
    this.ScopeToggle=false
    $scope.isShowMore=this.ScopeToggle


    $scope.toggleShowMore=function(){
        $scope.isShowMore=!$scope.isShowMore
     }



}])