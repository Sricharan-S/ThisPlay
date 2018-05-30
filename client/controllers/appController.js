
thisplay.controller('appController',['$http','$scope',function($http,$scope){
$scope.tellId = function(id){
  console.log(id);
  $http({
        url:"/app/template",
       method:"POST",
    data:{
      id:id
    }
  }).then(function(response){
    console.log(response.data);
  })
}



$http.get('/app/alltemplates').then(function(response){
  $scope.items = response.data;
})

$http.get("/app/").then(function(response){
  var regex = /[a-zA-z\d]+\s/g;

  $scope.name = response.data.name.match(regex)[0];
  $scope.image= response.data.image;
});

}]);
