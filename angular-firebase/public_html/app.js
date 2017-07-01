/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app=angular.module('wilApp',['firebase','ngRoute']);
app.config(firebaseConfig);

function firebaseConfig(){
    console.log('firebase configurate');
  var config = {
    apiKey: "AIzaSyBzmIl7fq6wloZnRS9pUyuFcrHuljTqgRA",
    authDomain: "testproject-4f2e6.firebaseapp.com",
    databaseURL: "https://testproject-4f2e6.firebaseio.com",
    projectId: "testproject-4f2e6",
    storageBucket: "testproject-4f2e6.appspot.com",
    messagingSenderId: "390674072393"
  };
  firebase.initializeApp(config);
}; 
app.controller('userCtrl',user);

function user($scope,$firebaseAuth,$firebaseObject){
    
    $scope.name="ramesh";
var auth = $firebaseAuth();
    
    $scope.signIn = function() {
      $scope.firebaseUser = null;
      $scope.error = null;

      auth.$signInAnonymously().then(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;
        console.log( "user :" + firebase);
        $scope.getData();
      }).catch(function(error) {
        $scope.error = error;
      });
    };
    $scope.signIn();

        $scope.getData=function(){
            console.log('gettijng data');
              var ref = firebase.database().ref();
     var obj = $firebaseObject(ref);
    obj.$loaded()
        .then(function(data) {
          console.log( angular.toJson(data.commodity)); // true
            $scope.commodity=data.commodity;
            console.log('got data');
            auth.$signOut();    
        })
        .catch(function(error) {
          console.error("Error:", error);
          auth.$signOut();
        });
        
        }

}

