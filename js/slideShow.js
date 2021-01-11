/** 
 * Name: slideShow.js
 * 
 * Author: Manuel Tognon <manuel.tognon@univr.it>
 * 
 * Description: JS script to construct a slide show for the news in the home page 
 *                  of InfOmics lab website. The slideshow is built through three
 *                  different functions: plusSlides(), currentSlide() and showSlides().
 *                  
 * Version: 1.0.0
 * 
 * //------------------------------------------------------------------------------
 *      IF MODIFYING THIS CODE, WRITE YOUR CODE AND MAKE A PULL REQUEST ON GITHUB 
 * //------------------------------------------------------------------------------
*/


/**
 * @desc skip a user defined number of images during the slide show
 * @param {int} n - number of images to skip
 */
function plusSlides(n) {

    // better to reset timer
    clearTimeout(timer); 

    // show the (idx + n)th slide
    showSlides(idx += n);
}


/**
 * @desc thumbnail image control
 * @param {int} n - index of the slide to display
 */
function currentSlide(n) {

    var idx = n; 

    // reset timer
    clearTimeout(timer);

    // display idx-th slide
    showSlides(idx);
}


/**
 * @desc implementation of automatic slide show. Image transition is made by disappearing images
 *          diseappereance
 * @param {int} n - slide show starting index
 */
function showSlides(n) {

    var i;
    var slides = document.getElementsByClassName("mySlides");  // slides array --> "mySlides" defined in 'css/homepage.css'
    var dots = document.getElementsByClassName("dot");  // dots array under slide --> "dot"defined in 'css/homepage.css' 


    if (n == undefined) {n = ++idx}   // n != 0 || n != k, with k >= 1
    
    if (n > slides.length) {idx = 1}  // ensure the slide show starts from the beginning
    
    if (n < 1) {idx = slides.length}  // ensure the slide show starts from the beginning ==> skip the current display
                                      // and start from the beginning 

    // slide show
    for(i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // color current dot with darker grey
    for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
    }

    // show active slide and color active dot
    slides[idx - 1].style.display = "block";
    dots[idx - 1].className += " active"

    // stop on current slide for 4s
    timer = setTimeout(showSlides, 4000);
}


//------------------------------------------------------------------------------
//  entry point 
//------------------------------------------------------------------------------

var idx = 0;  // start from first image
var timer = null;  
showSlides(idx);  // start slide show

