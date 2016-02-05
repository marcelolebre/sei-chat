'use strict';

var seiChatApp = angular.module('sails-chat-example', ['luegg.directives']);
  
seiChatApp.controller('MainCtrl', ['$scope', function ($scope) {
    
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
      if(message.name !== undefined) {
        var name = message.name.toLowerCase();

        if($scope.names[name] === undefined) {
          $scope.names[name] = Object.keys($scope.names).length;
        }

        message.colorNumber = $scope.names[name];
      }
    };

    io.socket.get('/message/all', function(all){
      $scope.$apply(function(){
        $scope.userHandle = all.userHandle;
        $scope.messages = all.messages;
        $scope.updateNames();
      }); 
    });

    io.socket.get('/message/subscribe', function(res){});

    io.socket.on('message', function onServerSentEvent (msg) {
      switch(msg.verb) {

        case 'created':
          $scope.$apply(function(){
            $scope.messages.push(msg.data);
            $scope.updateNames(msg.data);
            $scope.data.message = ''
          });
          break;

        default: return;
      }
    });
  }]);
