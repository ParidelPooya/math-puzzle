/**
 * Created by pooya on 2016-12-12.
 */

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$timeout,$interval) {

    var ct=this;

    var startTime=new Date();

    ct.time="00:00";

    $interval(function(){
        var sec=Math.floor(((new Date())-startTime)/1000);

        var minutes=Math.floor(sec/60);

        if(minutes<10)
            minutes="0"+minutes;

        sec=sec%60;

        if(sec<10)
            sec="0"+sec;


        ct.time=minutes+":"+sec;
    },1000);

    ct.correct= 0;
    ct.wrong=0;

    ct.msg="";

    ct.answer="";
    ct.correctAnswer="";
    ct.sign=""

    ct.awards=[];

    ct.set="set0"+Math.floor(Math.random()*3);

    ct.howManyMore="";

    ct.phs=["ph.png","ph.png","ph.png","ph.png","ph.png","ph.png"];

    var thresholds=[
        {correct:10,ratio:10},
        {correct:20,ratio:12},
        {correct:40,ratio:14},
        {correct:60,ratio:16},
        {correct:80,ratio:18},
        {correct:100,ratio:20}
    ]

    ct.next=function() {
        if(ct.answer=="")
            return;


        if(ct.answer==ct.correctAnswer){
            ct.correct++;
            ct.newNumbers();

            ct.showAlert("Correct Answer. Keep Going");

        }
        else
        {
            ct.showAlert("Oh No, Wrong Answer. Do it again");

            ct.wrong++;
            ct.giveAward();
        }
        ct.answer="";

        return;
    }

    ct.giveAward=function(){
        if(ct.awards.length>=thresholds.length)
        {
            ct.howManyMore="";
            return;
        }

        var ratio=1000;
        if(ct.wrong!=0)
            ratio=ct.correct/ct.wrong;

        var threshold=thresholds[ct.awards.length];

        if(ratio>=threshold.ratio && ct.correct>=threshold.correct)
        {
            ct.awards.push("award0" + ct.awards.length + ".png");
            ct.phs.pop();
            ct.giveAward();
        }
        else
        {
            var bratio=0;
            if(ct.wrong!=0)
                bratio=threshold.ratio*ct.wrong-ct.correct;

            var bcorrect=threshold.correct-ct.correct;

            ct.howManyMore=Math.max(bratio,bcorrect);
        }
    }

    ct.newNumbers=function() {
        var r=Math.random();


        ct.sign="x";

        ct.number1 = 1+Math.floor(Math.random()*9);

        ct.number2 = 1+Math.floor(Math.random()*9);

        ct.correctAnswer=""+(parseInt(ct.number1,10)*parseInt(ct.number2,10));

        ct.giveAward();


        return;
    }

    ct.newNumbers();

    ct.showAlert= function(msg){
        ct.msg=msg;

        $timeout(function() {ct.msg="";},2000);

        return;
    }

});