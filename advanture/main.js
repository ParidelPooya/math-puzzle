/**
 * Created by pooya on 2017-01-02.
 */

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$timeout,$interval) {

    var ct=this;

    ct.chars=[];


    $interval(function(){

        ct.chars.push({
            type:'char' + Math.floor(1+Math.random()*2),
            col:Math.floor(Math.random()*10),
            row:Math.floor(Math.random()*10)
        });

    },5000);

    ct.prepareClass=function(ch){
        return ch.type + " col" + ch.col + " row" + ch.row;
    }
});