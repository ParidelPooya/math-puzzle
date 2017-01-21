/**
 * Created by pooya on 2017-01-02.
 */

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$timeout,$interval) {
    var ct=this;

    var readSettings=function(section,defValue){
        if(typeof(localStorage[section])==="undefined"){
            localStorage[section]=defValue;
            return defValue;
        }

        return localStorage[section];
    };

    var checkAnswer=function(all,ch){

        if(ch.math.answer!==ch.math.correct){
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
    };

    var correctAnswer=function(){
        ct.score++;
        if(ct.score>=50 && ct.chars.length==0){
            ct.level++;
            ct.score=ct.score%50;
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
    ct.selectedChar=null;

    var addNewChar=function(){
        var math=prepareMath();

        ct.chars.push({
            type:'char' + Math.floor(1+Math.random()*2),
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
    },5000);

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