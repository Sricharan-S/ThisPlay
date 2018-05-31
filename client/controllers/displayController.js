thisplay.controller('displayController',['$scope','$http','socketio',function($scope,$http,socketio){

  socketio.on('info',function(data){
   $scope.arr = data.data;
 });

$http.get('/app/display').then(function(res){
  console.log(res.data);
   $scope.items = res.data.item;
})

$http.get("/app/template").then(function(response){
  $scope.img = response.data.templateImage;
  $scope.templateId = response.data.templateId;
});

$http.get("/app/manage").then(function(response){
  console.log(response.data);
  $scope.aimg = response.data.templateImage;
  $scope.templateId = response.data.templateId;
});

}])
