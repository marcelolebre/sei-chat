'use strict';

angular.module('sails-chat-example', ['luegg.directives'])
  
  .controller('MainCtrl', ['$scope', function ($scope) {
    
    $scope.messages = [];
    $scope.data = {
      name    : null,
      message : null
    };
    $scope.names = {};

    $scope.send = function(){
      io.socket.post('/message/chat', $scope.data, function(res){});
    };

    $scope.updateNames = function(message) {
      if(message) {
        $scope.assignNumberToName(message);
      } else {
        $scope.messages.forEach(function(msg) {
          $scope.assignNumberToName(msg);
        });
      }
    };

    $scope.assignNumberToName = function(message) {
      var name = message.name.toLowerCase();

      if($scope.names[name] === undefined) {
        $scope.names[name] = Object.keys($scope.names).length;
      }

      message.colorNumber = $scope.names[name];
    };

    io.socket.get('/message/all', function(messages){
      $scope.messages = messages;
      $scope.updateNames();
      $scope.$apply();
    });

    io.socket.get('/message/subscribe', function(res){});

    io.socket.on('message', function onServerSentEvent (msg) {
      switch(msg.verb) {

        case 'created':
          $scope.messages.push(msg.data);
          $scope.updateNames(msg.data);
          $scope.data.message = ''
          $scope.$apply();
          break;

        default: return;
      }
    });
  }]);
