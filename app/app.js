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
        firstname:"Gaurang",
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
userModule.factory("searchText",function(){
    let arr={}
    var text=""
    arr.setText=function(text1){
     text=text1
    }
    arr.getText=function(){
        return text
    }
    return arr
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
              firstname:details.firstname,
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
            firstname:details.firstname,
            description:description1,
            emp_id:details.emp_id
          }
    }
        allUsersDetails.saveValues(res)
    }
}])

userModule.controller("userDetailsController",["$scope","formDetails","$location","allUsersDetails","$rootScope","searchText",function($scope,formDetails,$location,allUsersDetails,$rootScope,searchText){
    $scope.searchBy="First Name"

        $scope.setSearchBy=function(searchBy){
            console.log("Search By",searchBy)
            $scope.searchBy=searchBy
        }
        // $scope.setSearchValue=function(searchValue){
        //     $scope.searchValue=searchValue
        // }


       $scope.setText=(text)=>{
        searchText.setText(text)
       }

        $scope.isShowMore=true
        console.log($scope.isShowMore)
        
        $scope.navigateBack=function(){
           $location.path("/")
       }
       console.log(formDetails.getDetails(),"userDetailsController")

       
       $scope.details=allUsersDetails.getValues()
      
       $scope.searchFunction=function(i){
           console.log("search Function",i)
           console.log(searchText.getText(),"Root Scope")
           return i.firstname.toLowerCase().includes(searchText.getText().toLowerCase())
       }
       
    //    $scope.searchDetails=function(searchvalue){
    //        console.log("Search Detail Search By",$scope.searchBy)
    //        console.log("Search value",searchvalue)

    //        if(searchvalue===undefined){
    //            searchvalue=""
    //            $scope.searchText=searchvalue
    //            console.log("userDetails",$scope.searchText)
    //        }else{
    //            $scope.searchText=searchvalue
    //            console.log("userDetails",$scope.searchText)
    //        }
    //    }

       $scope.redirectUser=function(){
        $location.path("/addUser")
       }


       
    this.ScopeToggle=false
    $scope.isShowMore=this.ScopeToggle


    $scope.toggleShowMore=function(){
        $scope.isShowMore=!$scope.isShowMore
     }



}])