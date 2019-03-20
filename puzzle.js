$(function(){
    
    //across array is to determine which row is highlighted
    var across = [true,true,true,true,true];
    var focused= false;//purpose of this flag is to eliminate triggering onclick and onfocus at the same time.
    //array to hold down words and hints
    var downWords = [
                        {theWord:'BECK',Hint:'_ and call'},
                        {theWord:'IRON',Hint:"Makeup of most of Earth's core"},
                        {theWord:'DECAF',Hint:"Coffee that won't keep you up"},
                        {theWord:'COCO',Hint:"2017 Pixar film"},
                        {theWord:'TAKE',Hint:"Opinion, so to speak"}
                    ];
    //array to hold across words and hints
    var acrossWords=[
                        {theWord:'BID',Hint:"Attempt for a business contact"},
                        {theWord:'ERECT',Hint:"Standing up straight"},
                        {theWord:'COCOA',Hint:"Drink with marshmallow"},
                        {theWord:'KNACK',Hint:"Special Talent"},
                        {theWord:'FOE',Hint:"Enemy"}
                    ]
    var cell;
    var Rowidx;
    var Colidx;
    var cellPosition;
    
    //parallel array to relate letter to every cell position
    var arrLoc=[];
    var arrLetter=[];
    
    //disable the black text box on load
    $('.Nobox').attr('disabled','disabled');
    
    //validate user input in the textbox on keyup event
    $('.box').keyup(function (e) {       
        
        var regex = new RegExp("^[a-zA-Z]");
        var key = e.charCode ? e.charCode : e.which;
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        
        if (regex.test(str)) { 
            $(this).val(' ');
            $(this).val(str);
            checkPuzzle();
            return true;
        }else if(key==8 || key==9 || key==16 || key==20 || key==37 || key == 38 || key == 39 || key == 40 || key==46 || key == 97 ){
            return true;
        }else if(key==13 || key==17 || key==18 || key==27 || key==33 || key==34 || key==35 || key==44 || key==45 || key==91 || key==144){
            return false;
        }
        else
        {        
            $(this).val(' ');
            return false;
        }
        
    });
    
    //event listener for on click event on the text boxes
    $('.box').on('click',function(){
    //do this  only when the onfocus event for the textbox is not triggered
    if(!focused){
            $('.box').css('background-color','white');
            cellPosition=String(this.id);    
            cell = (this.id).substr(0,2);



            if(Rowidx!= Number(cell.substr(1,1)-1)){

                across[Rowidx]=true;
            }

            Rowidx = Number(cell.substr(1,1)-1);
            Colidx = Number(cell.substr(0,1))-1;

            if(across[Rowidx]){
                highlightAcross();
                findWord();
                across[Rowidx]=false;

                $('#hint').html(acrossWords[Rowidx].Hint);

            }else{
                highlightDown();
                findWord();
                across[Rowidx]=true;

                $('#hint').html(downWords[Colidx].Hint);
            }
        }
        //flag to notify that click event is triggered and not in conflict with onfocus event.
        focused=false;
        
        $(this).css('background-color','yellow');
        
    });
    
    //onfocus event listener for text box to findword and highlight when tab button is pressed.
    $('.box').on('focus',function(){
        $('.box').css('background-color','white');
        cellPosition=String(this.id);    
        cell = (this.id).substr(0,2);
        focused = true;
        
         
        if(Rowidx!= Number(cell.substr(1,1)-1)){
            $('.box').css('background-color','white');
            across[Rowidx]=true;
            
        }
        Rowidx = Number(cell.substr(1,1)-1);
        Colidx = Number(cell.substr(0,1))-1;
            highlightAcross();
            findWord();
            $('#hint').html(acrossWords[Rowidx].Hint);
            across[Rowidx]=false;
            $(this).css('background-color','yellow');           
            
    });
    
   //event listener for Reveal cell button which will reveal letter only for that cell.
    $('#Rcell').on('click',function(){
        if(Rowidx>=0){
            var loc = "#"+cellPosition;
            $(loc).val(arrLetter[arrLoc.indexOf(cellPosition)]);
             checkPuzzle();
        }
       
    });
    
    //event listener for Reveal word which will reveal the whole word for the highlighted section.
    $('#Rword').on('click',function(){
         if(Rowidx>=0){
             if(across[Rowidx]){
                 //across[Rowidx] is false when Across is selected
                 var col = cellPosition.substr(0,1);
                 for(i=1;i<=5;i++){
                     var loc = String(col)+i+"R";
                     var idx = arrLoc.indexOf(loc);
                     if(idx>-1){
                         loc="#"+loc;                         
                         $(loc).val(arrLetter[idx]);
                     }
                 }
             }else{
                 var row =cellPosition.substr(1,1);
                 for(i=1;i<=5;i++){
                     var loc = i+String(row)+"R";
                     var idx = arrLoc.indexOf(loc);
                     if(idx>-1){
                         loc="#"+loc;
                         $(loc).val(arrLetter[idx]);
                     }
                 }
             }
            checkPuzzle();
        }        
    });
    
    //eventt listener for Check Word button to verify the word entered
    $('#checkWord').on('click',function(){
        
        if(Rowidx>=0){
             if(across[Rowidx]){
                 //across[Rowidx] is turned false during onclick and onfocus events when across cells are highlighted.
                 //hence, check the column if across[Rowidx] is true, else, check the row.
                 var col = cellPosition.substr(0,1);
                 
                 //loop through the parallel array to verify the letter against each cell
                 for(i=1;i<=5;i++){
                     
                //textbox id is represented as a string which is column number+Rownumber+"R"
                //to build a string representing the textbox id, change the row number while the column number is constant
                     var loc = String(col)+i+"R";
                     var idx = arrLoc.indexOf(loc);
                     
                     //check word only if parallel arrays have corresponding values
                     if(idx>-1){
                         loc="#"+loc;
                         
                         //prevent changing the text color when the textbox is empty.
                         if($(loc).val()!=""){
                             
                             //change the text color to red if the user input is incorrect
                             if($(loc).val()!=arrLetter[idx]){
                                  $(loc).css('color','red');
                             }else{
                                 $(loc).css('color','black');
                             }
                         }
                     }
                 }
             }else{
                 var row =cellPosition.substr(1,1);
                 //loop through the parallel array to verify the letter against each cell
                 for(i=1;i<=5;i++){
                     
                //textbox id is represented as a string which is column number+Rownumber+"R"
                //to build a string representing the textbox id, change the column number while the row number is constant
                     var loc = i+String(row)+"R";
                     
                //check word only if parallel arrays have corresponding values
                     var idx = arrLoc.indexOf(loc);
                     if(idx>-1){
                         loc="#"+loc;
                         
                         //prevent changing the text color when the textbox is empty.
                         if($(loc).val()!=""){
                             
                             //change the text color to red if the user input is incorrect
                            if($(loc).val()!=arrLetter[idx]){
                                 $(loc).css('color','red');

                             }else{
                                 $(loc).css('color','black');
                             }
                         }

                     }
                 }
             }
            
        }
    });
    function checkPuzzle(){
        //variable to check how many letters are entered correctly.
        var correct = 0;
        
        //Do this when the length of parallel array is same as the number of enabled textbox.
        if(arrLoc.length==$('.box').length){
            
            //loop through the parallel array to verify the user entered letter against the correct letter in the arrLetter array.
            for(i=0;i<arrLoc.length;i++){
                var loc = "#" + arrLoc[i];
                if($(loc).val()!=arrLetter[i]){
                    return;
                }else{
                    //increment the value of variable 'correct' for every correct entry
                    correct++;
                }
            }
            
            //if the value of variable 'correct' is same as the number of enabled text boxes, you win!
            if(correct==$('.box').length){
                $('.box').css('color','black');
                $('#hint').html("Congratulations");
            }
        }        
        
    }
    
    //function to highlight down cells
    function highlightDown(){
        if(Number(cell.substr(0,1))==1) {         
                
                    
                    $('#11R').css('background-color','blue');
                    $('#12R').css('background-color','blue');
                    $('#13R').css('background-color','blue');
                    $('#14R').css('background-color','blue');                
                   
                }
        if(Number(cell.substr(0,1))==2) {         
                
                    
                    $('#21R').css('background-color','blue');
                    $('#22R').css('background-color','blue');
                    $('#23R').css('background-color','blue');
                    $('#24R').css('background-color','blue');
                }
        if(Number(cell.substr(0,1))==3) {         
                
                    
                    $('#31R').css('background-color','blue');
                    $('#32R').css('background-color','blue');
                    $('#33R').css('background-color','blue');
                    $('#34R').css('background-color','blue');
                    $('#35R').css('background-color','blue');
                }
        if(Number(cell.substr(0,1))==4) {    
                    $('#42R').css('background-color','blue');
                    $('#43R').css('background-color','blue');
                    $('#44R').css('background-color','blue');
                    $('#45R').css('background-color','blue');
                   
                }
        if(Number(cell.substr(0,1))==5) {   
                    $('#52R').css('background-color','blue');
                    $('#53R').css('background-color','blue');
                    $('#54R').css('background-color','blue');
                    $('#55R').css('background-color','blue');
                    $('#56R').css('background-color','blue');
                    $('#57R').css('background-color','blue');
                   
                }
            
    }
    
    //function to highlight across cells
    function highlightAcross(){
        if(Number(cell.substr(1,1))==1) {                 
                    
                    $('#11R').css('background-color','blue');
                    $('#21R').css('background-color','blue');
                    $('#31R').css('background-color','blue');
                   
        }
        if(Number(cell.substr(1,1))==2) {                 
                    
                    $('#12R').css('background-color','blue');
                    $('#22R').css('background-color','blue');
                    $('#32R').css('background-color','blue');
                    $('#42R').css('background-color','blue');
                    $('#52R').css('background-color','blue');
                   
        }
        if(Number(cell.substr(1,1))==3) {                 
                    
                    $('#13R').css('background-color','blue');
                    $('#23R').css('background-color','blue');
                    $('#33R').css('background-color','blue');
                    $('#43R').css('background-color','blue');
                    $('#53R').css('background-color','blue');
                   
        }
        if(Number(cell.substr(1,1))==4) {                 
                    
                    $('#14R').css('background-color','blue');
                    $('#24R').css('background-color','blue');
                    $('#34R').css('background-color','blue');
                    $('#44R').css('background-color','blue');
                    $('#54R').css('background-color','blue');
                   
        }
        if(Number(cell.substr(1,1))==5) {    
                    $('#35R').css('background-color','blue');
                    $('#45R').css('background-color','blue');
                    $('#55R').css('background-color','blue');
                   
        }
            
    }
    
    //function that finds word for the highlighted cells and enters values in the parallel array
    function findWord(){
        var word;
        var loc;
        var col=1;
        var row=1;
        var alpha = [];
        
        //determine word depending on highlighted column/row.
        if(across[Rowidx]){
            //pull the across word from the acrossWords object array if row is highlighted
            word=acrossWords[Rowidx].theWord;                
        }else{
            //pull the down word from the downWords object array if column is highlighted
            word=downWords[Colidx].theWord;                
        }
        
        //loop to connect every cell with its corresponding letter for this word using parallel array arrLoc[] and arrLetter[]
        for(i=0;i<word.length;i++){
            alpha[i]=word.substr(i,1);
            if(across[Rowidx]){               
                    
                // Since its a row, increase the column number for location
                    do{
                    //the string that represents the textbox id has first element as column, second element row and third element is letter R.
                        loc= String(col)+String(Rowidx+1)+"R";
                        col++;
                        var selector = "#"+loc;
                    }while($(selector).hasClass('Nobox'));
               
              if(arrLoc.indexOf(loc)<=-1){
                  arrLoc.push(loc); 
                  arrLetter.push(alpha[i]);
               }
              
                
            }else{
                    // Since its a column, increase the row number for location
                    do{
                    //the string that represents the textbox id has first element as column, second element row and third element is letter R.
                        loc= String(Colidx+1)+String(row)+"R";
                        row++;
                        var selector = "#"+loc;
                    }while($(selector).hasClass('Nobox'));
            
            // enter loc in arrLoc and corresponding letter in arrLetter arrays
            if(arrLoc.indexOf(loc)<=-1){
                arrLoc.push(loc);
                arrLetter.push(alpha[i]);
             }
               
                
            }
        }
        
    }
    
       
    
});