/**
 * Created by pooya on 2016-12-12.
 */

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$timeout,$interval) {

    var ct=this;

    ct.questions=[];

    ct.type="multiply";

    var questions=[];

    questions.push(function(){
        ct.sign="+";

        ct.number1 = Math.round(Math.random()*40);
        if(ct.number1<10)
            ct.number1="0"+ct.number1;

        ct.number2 = Math.round(Math.random()*40);

        if(ct.number2<10)
            ct.number2="0"+ct.number2;

        ct.correctAnswer=""+(parseInt(ct.number1,10)+parseInt(ct.number2,10));

        return {
            sign:ct.sign,
            number1:ct.number1,
            number2:ct.number2,
            correctAnswer:ct.correctAnswer
        };
    });

    questions.push(function(){
        ct.sign="-";

        var n1 = Math.round(Math.random()*50);
        var n2 = Math.round(Math.random()*40);

        ct.number1=Math.max(n1,n2);
        ct.number2=Math.min(n1,n2);

        ct.correctAnswer=""+(parseInt(ct.number1,10)-parseInt(ct.number2,10));

        if(ct.number1<10)
            ct.number1="0"+ct.number1;

        if(ct.number2<10)
            ct.number2="0"+ct.number2;

        return {
            sign:ct.sign,
            number1:ct.number1,
            number2:ct.number2,
            correctAnswer:ct.correctAnswer
        };
    });

    questions.push(function(){
        var r=Math.random();

        if(r>0.5){
            return questions[0]();
        }
        else
        {
            return questions[1]();
        }

    });

    questions.push(function(){
        ct.sign="*";

        ct.number1 = 2+Math.floor(Math.random()*8);
        ct.number2 = 2+ Math.floor(Math.random()*8);

        ct.correctAnswer=""+(parseInt(ct.number1,10)*parseInt(ct.number2,10));

        return {
            sign:ct.sign,
            number1:ct.number1,
            number2:ct.number2,
            correctAnswer:ct.correctAnswer
        };
    });

    ct.newNumbers=function() {

        switch(ct.type){

            case 'additon':
                ct.questions.push(questions[0]());
                break;
            case 'subtract':
                ct.questions.push(questions[1]());
                break;
            case 'add+sub':
                ct.questions.push(questions[2]());
                break;
            case 'multiply':
                ct.questions.push(questions[3]());
                break;
        }

        return;
    }

    ct.change=function() {
        ct.questions=[];

        for (var ipos = 0; ipos < 84; ipos++) {
            ct.newNumbers();
        }
    };

    ct.change();
});