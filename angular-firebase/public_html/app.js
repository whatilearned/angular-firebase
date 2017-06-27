/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app=angular.module('wilApp',['firebase']);

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
app.controller('rootCtrl',function($scope,$firebaseAuth){
   $scope.name="Alluri Ramesh Raju "; 
   
   
   $scope.login=function(){
                   console.log("Auth");
        var auth = $firebaseAuth();
        auth.$signInWithEmailAndPassword('user1@testapp.com', "password").then(function(firebaseUser){
                console.log("ok");
        }).catch (function(err){
            console.log("failed");
        });
    
   }
});

