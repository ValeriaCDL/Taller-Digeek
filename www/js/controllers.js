angular.module('starter.controllers', ['starter.services'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats, $ionicPopup, $ionicListDelegate) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();

  $scope.remove = function(chat) {

    var confirmPopup = $ionicPopup.confirm({
     title: 'Borrar',
     template: '¿Seguro que quieres borrarlo?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       Chats.remove(chat);
     } else {
       $ionicListDelegate.closeOptionButtons();
     }
   });
  };

  $scope.edit = function(chat){
    $scope.data={};

    var myPopup = $ionicPopup.show({
        title: 'Editar',
        template: '<input type="text" ng-model="data.name">',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive'
          }
        ]
      });

      myPopup.then(function(res) {
        $scope.data.id=chat.id;
        Chats.editar($scope.data);
        $ionicListDelegate.closeOptionButtons();
      });

  };

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
///
.controller('GeoCtrl', function($scope,GeoServicio) {
  $scope.activate = false;
  $scope.toggleChange= function(check){
    if(check){
      var posicion=GeoServicio.posicion();
      $scope.latitud=posicion.lat;
      $scope.longitud=posicion.lng;

    } else {
      $scope.latitud=0;
      $scope.longitud=0;
    }
  };
});
