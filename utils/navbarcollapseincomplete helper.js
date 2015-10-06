        var navParent = $('#navParent');
    var windowVar = $(window);
    var section = $('#section');

    var navPosition, navParentPosition, windowPosition, sectionPosition;

    function changingValues() {
        navPosition = nav.offset().top;
        navParentPosition = navParent.offset().top;
        windowPosition = windowVar.scrollTop();
        sectionPosition = section.offset().top;
    };

    nav.on('shown.bs.collapse', function(){
        initialNavOpenHeight = nav.height();

        if (windowPosition >= navParentPosition) {
            console.log('opened');
            sectionPosition = sectionPosition + initialNavOpenHeight - initialNavClosedHeight;
            section.offset({top: (sectionPosition)});

        };

    });

    nav.on('hidden.bs.collapse  ', function(){
        if (windowPosition >= navParentPosition) {
            console.log('closed');
            sectionPosition = sectionPosition - initialNavOpenHeight + initialNavClosedHeight;
            section.offset({top: (sectionPosition)});
        };

    });



