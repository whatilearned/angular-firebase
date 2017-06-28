/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app=angular.module('wilApp',['firebase','ngRoute']);
app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);
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
app.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
}]);
app.config(function($routeProvider, $locationProvider){
    $routeProvider
            .when('/home',{
                templateUrl:'view/home.html',
                controller:'homeCtrl',
                    resolve: {
                         "currentAuth": ["Auth", function(Auth) {
                                        return Auth.$requireSignIn();
                                        }]
                            }
            })
            .when('/login',{
                templateUrl:'view/login.html',
                controller:'loginCtrl'
            })
             .when('/admin',{
                templateUrl:'view/admin.html',
                controller:'adminCtrl',
                    resolve: {
                         "currentAuth": ["Auth", function(Auth) {
                                        return Auth.$requireSignIn();
                                        }]
                    }
            })
              .when('/',{
                templateUrl:'view/login.html',
                controller:'loginCtrl'
            });
});

app.controller('rootCtrl',function($scope,$firebaseAuth){
   $scope.name="Alluri Ramesh Raju "; 
   $scope.logout=function(){
       console.log("clicked logout");
        var auth = $firebaseAuth();
        auth.$signOut();
        console.log(angular.toJson( $firebaseAuth().$signOut()));
   } ;
});

app.controller('homeCtrl',function($scope,$firebaseAuth){});
app.controller('loginCtrl',function($scope,$firebaseAuth,$location){
    
    $scope.login=function(){
                   console.log("Auth");
        var auth = $firebaseAuth();
        auth.$signInWithEmailAndPassword($scope.user,$scope.passcode).then(function(firebaseUser){
                console.log("ok");
                 $location.path("/home");
        }).catch (function(err){
            console.log("failed " + err);
        });
    
   }
});
app.controller('adminCtrl',function($scope,$firebaseAuth){});