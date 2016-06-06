$(function () {
    var nav = $('#nav');
    var navParent = $('#navParent');
    var windowVar = $(window);

    var navParentPosition, windowPosition;

    function changingValues() {
        navParentPosition = navParent.offset().top;
        windowPosition = windowVar.scrollTop();
    };

    windowVar.scroll(function () {

        changingValues();

        if (windowPosition >= navParentPosition) {

            nav.addClass('navbar-fixed-top');

        } else {
            nav.removeClass('navbar-fixed-top');
        }
    });
});
