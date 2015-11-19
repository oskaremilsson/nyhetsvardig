$(window).scroll(function () {
    if ($(document).scrollTop() == 0) {
        $('header').removeClass('tiny');
        $('#title').removeClass('shrinky');
        $('body').removeClass('topless');
        $('.picture').removeClass('pic');
    } else {
        $('header').addClass('tiny');
        $('#title').addClass('shrinky');
        $('body').addClass('topless');
        $('.picture').addClass('pic');
    }
});
