var angular = require("angular");
var _ = require("underscore");
require("./jwplayer.js");
require("./service/index.service.js");
require("./jquery/jquery.js");
require("angular-route")

var myApp = angular.module('myApp', ["ngRoute"]); 
myApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "index.html"
    })
});

var array= [
    {
        name: "trung",
        age: "23"
    },{
        name: "Hieu",
        age: "23"
    },{
        name: "Uyen",
        age: "23"
    }
]

_.map(array,function(value){
    console.log(value);
});

var player = jwplayer('player');

var file = '1b02B03R';

player.setup({
    // file: '//content.jwplatform.com/manifests/' + file + '.m3u8',
    file:"https://s3-ap-southeast-1.amazonaws.com/myyuwang/echo-hereweare.mp4",
	tracks: [{
		kind: 'thumbnails',
		file: '//content.jwplatform.com/strips/' + file + '-120.vtt'
	}],
	autostart: true,
	width: '100%'
});



//controller
require("./controller/index.controller.js");