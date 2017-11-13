var $ = require("jquery");
var app = angular.module("myApp");

app.controller("firstController", function($http){
    var ctrl = this;
    ctrl.name = "trung";
    ctrl.picture = "";
    ctrl.accountFacebook = "";

    ctrl.functionLoginFacebook = function(){
        FB.login(function(res){
            ctrl.accountFacebook = res;
            var request = $http({
                method: 'GET',
                url: "https://graph.facebook.com/v2.6/"+ ctrl.accountFacebook.authResponse.userID + "?access_token="+ ctrl.accountFacebook.authResponse.accessToken,
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                }
            }).then(function successCallback(response) {
                console.log(response);
                ctrl.name = response.data.name;
                ctrl.userId  = response.data.id;
            }, function (error) {
                console.log(error);
            });
        });
    };

    ctrl.functionLogOutFacebook = function(){
        FB.logout(function(res){
            console.log(res);
        });
    };

    ctrl.functionGetAPIFacebook = function(){
        // &callback=FB.__globalCallbacks.f1708d444defc7c&fields=id%2Cname%2Cpicture&method=get&pretty=0&sdk=joey
        var request = $http({
            method: 'GET', 
            // url: "https://graph.facebook.com/v2.10/"+ctrl.userId +"?access_token="+ ctrl.accountFacebook.authResponse.accessToken + "&fields=id,name,picture,location",
            url: "https://graph.facebook.com/v2.10/"+ctrl.userId +"?fields=location",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
            }
        }).then(function successCallback(response) {
            console.log(response);
            ctrl.picture = response.data.picture.data.url;
        }, function (error) {
            console.log(error);
        });
    };

    ctrl.functionShareFacebook = function(){
        FB.ui({
            app_id:'2001674743395522',
            method: 'share',
            href: 'https://www.youtube.com/watch?v=EV-91JV4Fws',
        }, function(response){
            console.log(response);
        });
    }

    ctrl.functionLoginGoogle = function(){
        attachSignin(document.getElementById("buttonClickGoogle"));
    };
    
    
    var googleUser = {};
    var startApp = function() {
        gapi.load('auth2', function(){
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            auth2 = gapi.auth2.init({
                client_id: '244174154611-4ls9l09thmhqdlvjovq7qnuqd1986e02.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                // Request scopes in addition to 'profile' and 'email'
                //scope: 'additional_scope'
            });
            attachSignin(document.getElementById('buttonClickGoogle'));
        });
    };
    
    function attachSignin(element) {
        console.log(element.id);
        auth2.attachClickHandler(element, {},
            function(googleUser) {
                var request = $http({
                    method: 'GET',
                    url: "https://www.googleapis.com/plus/v1/people/"+ googleUser.getBasicProfile().getId() +"?fields=birthday&key=AIzaSyCkY-eRGPaQ0hLCh5QAM_sAe951USltG2g",
                    "headers": {
                        "content-type": "application/x-www-form-urlencoded",
                    }
                }).then(function successCallback(response) {
                    console.log(response);
                }, function (error) {
                    console.log(error);
                });
                
            console.log(googleUser.getBasicProfile().getId());
            }, function(error) {
            alert(JSON.stringify(error, undefined, 2));
            }
        );
    }
    startApp();
});