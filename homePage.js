$(function(){
    var slideIndex = 1;
    showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}
    
//event listener for next slide
$('.next').on('click',function(){
   if (slideIndex<3){
       slideIndex++;
       showSlides(slideIndex);
   } 
    
});

//prev button slideshow
$('.prev').on('click',function(){
   if(slideIndex>1){
       slideIndex--;
       showSlides(slideIndex);
   } 
    
});
    
//event listener for math button
 $('#math').on('click',function(){
       window.location.href = "test1.html";
 });

//event listener for crossword button
$('#puzzle').on('click',function(){
       window.location.href = "puzzle.html" ;
    });
});

