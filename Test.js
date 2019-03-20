$(function(){
            $('#ans').hide();
            var count = 6;
            var ques = -1;
            var randomNumber=0;
            var showTable = false;
            var showTimer = true;
            var randomPlace;
    //array that contains questions and answers with options
            var arr=[
                ["4 + 10 - 6 = _",8,16,6,4],
                ["2 + 3 - 4 + 5= _", 6,5,15,10],
                ["7 - 3 + 10 - 6 * 2 = _ ", 2,1,8,16],
                ["5 + 3 - 6 + 9 = _", 11,10,13,9],
                ["(8 - 3 + 1) * 2 = _", 12,7,14,10],
                ["6 + 2 - _ = 5", 3,8,4,1],
                ["2 * 6 - 4 + _ = 15",7,8,9,10],
                ["5 - 7 + 20 / _ = 3",4,6,8,5],
                ["2 + _ + 9 = 17",6,7,8,9],
                ["_ * 5 / 2 + 3 = 8",2,4,5,1]
            ]
            
            //variable that counts the score.
            var correct = 0;
            
            //initiate timer function every 1000 miliseconds.
            var counter = setInterval(timer,1000); 
            
           function timer(){
               
               if(count<=0){
                    
                   //clear interval when count=0;
                    clearInterval(counter); 
                    $('#seconds').html(count + " seconds");
                   //change the timer image
                    $('#timer').attr('src','timer'+count+".jpg");
                   
                   //increase the counter for question in the array
                    ques++;
                    if(ques>=arr.length){
                        $('#holder').hide();
                        ques=-1;                        
                        setTimeout(Results(),1000); // display final results after all questions
                               
                        
                    }else{
                        if(!showTable){
                            $('#ans').show();
                            showTable=true;
                        }
                        
                        //move to next question.
                        nextQues();
                        $('#msg').html("");
                        setTimeout(function(){$('.num').removeClass('disabled');},1000);
                    }
                    
                    return;
                   
               }else {
                   //decrease the count from 5 to 0.
                   count=count-1;
               }
               if(count>0){
                   $('#seconds').html(count + " seconds").css({color:'yellow'});//display remaining seconds to respond to the question
                   $('#timer').attr('src','timer'+count+".jpg");//change the timer image according to the remaining seconds
               }
               
               
           }
    
        //function to move to next question.
            function nextQues(){
                
                //variable to display the question number on screen
                var Qnum=ques+1;
                
                //display the question number and the question
                $('#QuesNum').html("Question " +Qnum + " : ")
                $('#ques').html(arr[ques][0]);                               
                count=6;   // here we reset the count variable to begin the 5 second countdown for next question             
                
                //create a random number to decide which place the correct ans will be shown on screen
                randomPlace =Math.floor(Math.random()*4);
                
               //populate table dynamically with answer and options in place depending on randomPlace variable above.
                var tab = "<br><br><table border=1 id='tb'><tr><td>";
                if(randomPlace==0){
                   $('#one').html(arr[ques][1]);
                    $('#two').html(arr[ques][2]);
                    $('#three').html(arr[ques][3]);
                    $('#four').html(arr[ques][4]);
                }else if(randomPlace==1){
                   $('#one').html(arr[ques][2]);
                    $('#two').html(arr[ques][1]);
                    $('#three').html(arr[ques][3]);
                    $('#four').html(arr[ques][4]);
                   
                }else if(randomPlace==2){
                    $('#one').html(arr[ques][2]);
                    $('#two').html(arr[ques][3]);
                    $('#three').html(arr[ques][1]);
                    $('#four').html(arr[ques][4]);
                    
                }else if(randomPlace==3){
                    $('#one').html(arr[ques][2]);
                    $('#two').html(arr[ques][3]);
                    $('#three').html(arr[ques][4]);
                    $('#four').html(arr[ques][1]);
                }
                
                $('#heading').html("Choose correct answer from the below options.");               
                $('.num').css({color:'darkblue'});
                
                //show the timer and seconds
                if (!showTimer){
                       $('#holder').show();
                       showTimer=true;
                   }
                
                counter = setInterval(timer,1000);
            }
    
            //function to display results
            function Results(){
                
                //display score
                $('#msg').html("Your current score is " + correct + " out of 10.");
                
                //hide timer and seconds
                $('#holder').show();
                $('#seconds').html("");
                
                //Display grade depending on score
                    if((correct/10)>=0.9){
                         $('#timer').attr('src','GradeA.jpg');
                    }else if((correct/10)>=0.8){
                        $('#timer').attr('src','GradeB.jpg');
                    }else if((correct/10)>=0.7){
                        $('#timer').attr('src','GradeC.jpg');
                    }else if((correct/10)>=0.6){
                        $('#timer').attr('src','GradeD.jpg');
                    }else{
                        $('#timer').attr('src','GradeF.jpg');
                    }
                }
                        
            
            $('.num').on('click',function(){ 
                
                //disable table once clicked.
                $('.num').addClass('disabled');
                
                //turn the clicked number green
                $(this).css({color:'green'});
                
                //Display response depending on whether correct ans was chosen    
              if(Number($(this).html())==arr[ques][1]){
                  
                  $('#msg').html("Well Done!").css({color:'blue'});
                  correct+=1;
                 
              }else{
                 $('#msg').html("Wrong ans. Correct ans is " + arr[ques][1]).css({color:'red'});
                
              }          
                
                //hide the timer and seconds
                $('#holder').hide();
                $('#heading').html("");
                
                //flag to prevent timer showing before next question
                showTimer=false;
                
                //set time out for 3 seconds in case the response was given within first 3 seconds.
                //had to tweek the timeout to prevent timer from jumping
                var wait= count-2;
                if(wait>3){
                setTimeout(function(){
                    
                        },1000);
                }else{
                    setTimeout(function(){
                    
                        },8000);
                    
                }
                
                
            });
            
        });