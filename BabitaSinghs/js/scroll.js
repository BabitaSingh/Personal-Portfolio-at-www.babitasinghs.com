

(function(){
    $(window).scroll(function() {

        if($(this).scrollTop() > 180) {
            $('.navbar').addClass('nav--sticky');
        } else {
            $('.navbar').removeClass('nav--sticky');
        }
    });
})();





/*$(document).ready(function(){
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900);
    });
});
*/
jQuery(document).ready(function($){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 50) {
            $('#to-top').fadeIn('slow');
        } else {
            $('#to-top').fadeOut('slow');
        }
    });
});
/*
var flkty = new Flickity( '.main-gallery', {
    cellAlign: 'left',
    wrapAround: true,
    prevNextButtons: true,
    autoPlay: 5000
});*/

$(document).ready(function(){

    var currentTime = new Date()
    var year = currentTime.getFullYear();
    $("#currentYear").html(year);
});