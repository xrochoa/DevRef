$(function () {
    var nav = $('#nav');
    var navref = $('#navref');

    var navrefPosition = navref.offset().top;
    var windowVar = $(window);
    windowVar.scroll(function () {
        var windowPosition = windowVar.scrollTop();
        console.log(windowPosition);

        if (windowPosition > navrefPosition) {
            nav.fadeIn('fast');
        } else {
            nav.fadeOut('fast');
        }
    });

});