(function(){

    "use strict";
    var self = window.Main =
    {
        viewport:
        {
            width: 0,
            height: 0,
            ranges: [640],
            index: -1,
            changed: false
        },

        init: function()
        {

            $(window).on("resize", onResize);
            onResize();
        }
    };

    function onResize()
    {
        var width = $(window).width(),
            height = $(window).height();
    }

}());
