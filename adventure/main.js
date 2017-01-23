/**
 * Created by pooya on 2017-01-02.
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

    ct.correct=0;
    ct.wrong=0;

    ct.gameBoard={};

    var setGameBoard = function(){
        ct.gameBoard["background-image"]="url('img/game-back" + ct.level + ".png')";
    };

    var readSettings=function(section,defValue){
        if(typeof(localStorage[section])==="undefined"){
            localStorage[section]=defValue;
            return defValue;
        }

        return localStorage[section];
    };

    var writeSettings=function(section,value){
        localStorage[section]=value;
    };

    var checkAnswer=function(all,ch){

        if(ch.math.answer!==ch.math.correct){
            if(ch.math.answer.length==ch.math.correct.length){
                wrongAnswer();
            }

            return;
        }

        var ipos;
        for(ipos=0;ipos<all.length;ipos++){
            if(all[ipos]===ch){
                correctAnswer();

                all.splice(ipos, 1);

                if(all.length!=0)
                    ct.selectedChar=all[all.length-1];
                else
                    ct.selectedChar=null;

            }
        }

        if(all.length==0)
            addNewChar();
    };

    var wrongAnswer=function(){
        var audio = new Audio('sound/wrong.wav');
        audio.play();

        ct.wrong++;
    };

    var correctAnswer=function(){
        ct.correct++;
        ct.score++;
        if(ct.score>=25 && ct.chars.length<2){
            ct.level++;

            var audio = new Audio('sound/levelup.wav');
            audio.play();

            setGameBoard();
            writeSettings('level',ct.level);
            ct.score=ct.score%25;
        }
        else
        {
            var audio = new Audio('sound/correct.wav');
            audio.play();
        }
    };

    var prepareMath=function(level){
        return question[0]();
    };

    var question=[];

    question[0]=function(){
        var sign="+";

        var number1 = Math.round(Math.random()*30);

        var number2 = Math.round(Math.random()*30);

        var correct=""+(parseInt(number1,10)+parseInt(number2,10));

        return {
            question:number1 + sign + number2,
            correct:correct,
            answer:''
        }
    }

    ct.chars=[];

    ct.level=parseInt(readSettings('level','1'));
    ct.score=parseInt(readSettings('score','0'));

    ct.mode="game";
    setGameBoard();
    ct.selectedChar=null;

    var addNewChar=function(){
        var math=prepareMath();

        ct.chars.push({
            type:'char' + Math.floor(1+Math.random()*5),
            col:Math.floor(Math.random()*10),
            row:2*Math.floor(Math.random()*5),
            math:math
        });

        if(ct.selectedChar===null){
            ct.selectedChar=ct.chars[ct.chars.length-1];
        }
    };

    for(var ipos=0;ipos<10;ipos++){
        addNewChar();
    }

    $interval(function(){
        if(ct.mode==="game")
            addNewChar();
    },8000);

    ct.keypress=function(e){
        if(ct.selectedChar===null)
            return;

        if(e.key==="Backspace")
        {
            if(ct.selectedChar.math.answer.length>0)
                ct.selectedChar.math.answer=ct.selectedChar.math.answer.substring(0, ct.selectedChar.math.answer.length-1);
        }
        else if(e.key==="Escape")
        {
            ct.selectedChar.math.answer='';

        }
        else if(e.key.length>1){
            return;
        }
        else
        {
            ct.selectedChar.math.answer+= e.key;
            checkAnswer(ct.chars,ct.selectedChar);

        }

        //console.log(e);
    };

    ct.selectChar=function(ch){
        ct.selectedChar=ch;
        return;
    };

    ct.prepareClass=function(ch){
        return ch.type + " col" + ch.col + " row" + ch.row;
    };


});