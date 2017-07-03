

var app = angular.module("myApp", ['ngRoute']);
var user = {};
var user_arr = [];
app.config(function ($routeProvider) {
  
    $routeProvider.when('/', {
        templateUrl: 'login.html',
        controller:'loginCntrl'
    }).when('/register', {
        templateUrl: 'register.html',
        controller:'registerCntrl'
        }).when('/homepage', {
            templateUrl: 'homePage.html',
            controller:'homePageCntrl'
        }).when('/profile', {
            templateUrl: 'profile.html',
            controller:'profileCntrl'
        }).when('/messages', {
            templateUrl: 'messages.html',
            controller:'messageCntrl'
        }).otherwise({
        redirectTo: "/"
    });
});

app.factory('DataShareService', function () {
    var savedData = {}
    function set(data) {
        savedData = data;
    }
    function get() {
        return savedData;
    }

    return {
        set: set,
        get: get
    }

});
app.controller('loginCntrl', ['$scope', '$location', 'DataShareService',function ($scope, $location, DataShareService) {
    var current_user_Obj = {};
    $scope.Login = function () {
        var user_name = $scope.usernameL;
        var pwd = $scope.passwordL;
        var localStorageLength = JSON.parse(localStorage.getItem('userlist')).length;
        for (var i = 0; i < localStorageLength; i++) {
            var val = JSON.parse(localStorage.getItem('userlist'));
            if (val[i].username == user_name && val[i].password == pwd) {
                DataShareService.set(val[i]);
                val.status = 1; //logged in
                alert('Login successful');
                $location.path("/homepage");
            }
            else {
                alert('User Credentials are wrong');
                return false;
            }
        }

    }
        
    }
]);
app.controller('registerCntrl', ['$scope','$location', function ($scope, $location) {

    $scope.CreateAccount = function () {

        user.username = $scope.userName;
        user.firstname = $scope.firstName;
        user.lastname = $scope.lastName;
        user.phone = $scope.phone;
        user.email = $scope.email;
        user.gender = $scope.myVar;
        user.password = $scope.password;
        user.status = 0; //not logged in
        user.msg = [];
        if (localStorage.getItem('userlist') != null) {
            user_arr = JSON.parse(localStorage.getItem('userlist'));
        }
        user_arr.push(user);
        localStorage.setItem('userlist', JSON.stringify(user_arr));
        alert('you are now registered');
        $location.path("/");
    }
}]);
app.controller('homePageCntrl', ['$scope', '$location', 'DataShareService', function($scope, $location,DataShareService) {

    $scope.Current_User_Email = DataShareService.get().email;
    
   
    $scope.logout = function () {
     
        $location.path("/");
    }
  

}])
app.controller('profileCntrl', ['$scope', '$location', 'DataShareService', function ($scope, $location,DataShareService) {

    $scope.firstName = DataShareService.get().firstname;
    $scope.lastName = DataShareService.get().lastname;
    $scope.userName = DataShareService.get().username;
    $scope.email = DataShareService.get().email;
    $scope.myVar = DataShareService.get().gender;
    $scope.phone = DataShareService.get().phone;
    $scope.password = DataShareService.get().password;

    $scope.updateAccount = function () {
        up_user = {};
        up_user.username = $scope.userName;
        up_user.firstname = $scope.firstName;
        up_user.lastname = $scope.lastName;
        up_user.phone = $scope.phone;
        up_user.email = $scope.email;
        up_user.gender = $scope.myVar;
        up_user.password = $scope.password;
        
        alert('update success');

    }
    $scope.logout = function () {
        $location.path("/");

    }
}])
app.controller('messageCntrl', ['$scope', '$location', function ($scope, $location) {
    var username_arr = [];
    var localStorageLength = JSON.parse(localStorage.getItem('userlist')).length;
    for (var i = 0; i < localStorageLength; i++) {
        var val = JSON.parse(localStorage.getItem('userlist'))
        username_arr.push(val[i].username);
        }

    $scope.names = username_arr;

    $scope.logout = function () {
        $location.path("/");

    }

}])
