
thisplay.controller('templateController',['$http','$scope','$window','socketio',function($http,$scope,$window,socketio){
$scope.showing = false;
$scope.changeImage =function(){
  $scope.showing = $scope.showing ? false : true;
}

$scope.imageChanged = function(){
  $http({
    url:"/app/manage",
    data:{
      image:  $scope.changeimg,
      templateId:$scope.templateId
    } ,
    method:'POST'
  })
$scope.showing = false;
$scope.img = $scope.changeimg;
}


$http.get("/app/").then(function(response){
  var regex = /[a-zA-z\d]+\s/g;
  $scope.name = response.data.name.match(regex)[0];
  $scope.image= response.data.image;
});

$http.get("/app/template").then(function(response){
  console.log(response.data);
  $scope.img = response.data.templateImage;
  $scope.templateId = response.data.templateId;
});

$scope.items = [];

$scope.addItem = function(){
 $scope.items.push({
   pname:$scope.pname,
   price:parseFloat($scope.price),
   description:$scope.description,
   tempId:$scope.templateId
 })
 $scope.pname = "";
 $scope.price = "";
 $scope.description = "";

 $http({
   method:"POST",
   data:{
     items:$scope.items
   },
   url:'/app/manage'
 })

 socketio.emit('info',{
   data : $scope.items
 });
}

$scope.OpenWindow = function(){
  $window.open('#/app/display','_blank');
}


}]);
