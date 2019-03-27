(function ()
{

    var $doms,
        _isInit = false,
        _isHiding = true;

    var self = window.Contact =
    {
        $doms: undefined,

        init: function(onReady)
        {
            if(_isInit)
            {
                onReady.call();
                return;
            }

            self.$doms = $doms = {};

            var templates =
                [
                    {url: "templates/_contact.html", startWeight: 0, weight: 100, dom: null}
                ];

            MyLoader.loadTemplate(null, templates, function loadComplete()
            {
                build(templates);
                _isInit = true;
                onReady.apply(null);

            }, 0);

            function build(templates)
            {
                $("#invisible-container").append(templates[0].dom);
                $doms.parent = $("#scene-container").find(".content-container");
                $doms.container = $("#contact");

                $doms.container.find(".map-part").append($("body").find(".contact-info").clone());

                var mapDom = $doms.container.find("#contact-map")[0];

                Footer.buildGoogleMap(mapDom, true);

                $doms.reservationContainer = $doms.container.find(".reservation-container");

                Reservation.setupDom($doms.reservationContainer);

                $doms.container.detach();
            }
        },

        toContent: function (hash)
        {
        },

        show: function (cb)
        {
            if (!_isHiding)
            {
                cb.call();
                return;
            }

            $doms.parent.append($doms.container);

            //Footer.toggleMapOnlyMode(true);

            var tl = new TimelineMax;
            tl.set($doms.container, {autoAlpha: 0});
            tl.to($doms.container, .4, {autoAlpha: 1});
            tl.add(function ()
            {
                _isHiding = false;
                if(cb) cb.call();
            });
        },

        hide: function (cb)
        {
            if (_isHiding)
            {
                cb.call();
                return;
            }

            //Footer.toggleMapOnlyMode(false);

            var tl = new TimelineMax;
            tl.to($doms.container, .4, {autoAlpha: 0});
            tl.add(function ()
            {
                _isHiding = true;
                $doms.container.detach();
                if(cb) cb.call();
            });

        }
    };
}());