var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    //console.log("Hello World from controller");
   $scope.searchFilter   = '';
   $scope.sortType   = 'name';
   $scope.sortReverse  = false;   
 
   var refresh = function(){ 
    $http.get('/contactlist').success(function(response){


    	console.log('I got the data i requested');
    	$scope.contactlist = response;
    	console.log($scope.contactlist);
    	$scope.contact ="";
    });
}

refresh();
   

   $scope.addContact = function(){

    // console.log($scope.contact);
     var email=$scope.contact.email;
     var number=$scope.contact.number;
    
	

  if($scope.validate_email(email)==false ) {
		 
          alert("Invalid email");
   }
   

	
  else {
          
		   if(isNaN(number)==false && number.length == 10 && number.indexOf('0') == '0')
		   	{
		   		    console.log($scope.contact.email);
                   

            $http.post('/contactlist', $scope.contact).success(function(response){
                   
                   console.log("ddddddddddddd");
                   console.log(response);
			     
           	                 if(response.message != undefined) {

                                 

                               alert(response.message);
                             }
			     	
                             else refresh();


			     	
	           });
         }
		   

       else{
		
		       alert("invalid Phone Number");
			     
			   }

	        
 	   };
 	 
      
   };
   $scope.remove = function(id){

   console.log(id);
   if(confirm("Are you sure you want to remove contact?")){

    //alert ("removed"+id);
    
    $http.delete('/contactlist/'+id).success(function(response){
       refresh();
   });

   }
   
   };
   $scope.edit= function (id){
 		console.log(id);
 		$http.get('/contactlist/'+id ).success(function(response){
            $scope.contact = response;

 		});


   };
   $scope.update =function(){

   	  console.log($scope.contact._id);
   	   var email=$scope.contact.email;
       var number=$scope.contact.number;
   	     if($scope.validate_email(email)==false ) alert("Invalid email");
		
	     else {
          
		   if(isNaN(number) == false && number.length == 10 && number.indexOf('0') == '0'){
		   	
		   		
                    $http.put('/contactlist/' + $scope.contact._id,$scope.contact).success(function(response){
   	  	            refresh();
	                });
            }
		   else{
		
		          alert("invalid Phone Number");
			     
		   }
	        
 	    };
   	  
		
    };
  



   $scope.deselect =function(){
		$scope.contact = "";
		console.log($scope.contactlist);

   }
  


   $scope.validate_email =function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
   }




 
   
    
}]);

