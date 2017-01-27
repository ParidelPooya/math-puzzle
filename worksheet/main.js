/**
 * Created by pooya on 2016-12-12.
 */

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$timeout,$interval) {

    var ct=this;

    ct.questions=[];


    ct.newNumbers=function() {
        var r=Math.random();

        if(r>0.5){
            ct.sign="+";

            ct.number1 = Math.round(Math.random()*30);
            if(ct.number1<10)
                ct.number1="0"+ct.number1;

            ct.number2 = Math.round(Math.random()*30);

            if(ct.number2<10)
                ct.number2="0"+ct.number2;

            ct.correctAnswer=""+(parseInt(ct.number1,10)+parseInt(ct.number2,10));

        }
        else
        {
            ct.sign="-";

            var n1 = Math.round(Math.random()*30);
            var n2 = Math.round(Math.random()*30);

            ct.number1=Math.max(n1,n2);
            ct.number2=Math.min(n1,n2);

            ct.correctAnswer=""+(parseInt(ct.number1,10)-parseInt(ct.number2,10));

            if(ct.number1<10)
                ct.number1="0"+ct.number1;

            if(ct.number2<10)
                ct.number2="0"+ct.number2;

        }

        ct.questions.push({
            sign:ct.sign,
            number1:ct.number1,
            number2:ct.number2,
            correctAnswer:ct.correctAnswer
        });

        return;
    }

    for(var ipos=0;ipos<84;ipos++)
    {
        ct.newNumbers();
    }



});