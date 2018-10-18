(function ()
{

    var $doms,
        _isInit = false,
        _isHiding = true;

    var self = window.Care =
    {
        $doms: undefined,

        init: function (onReady)
        {
            if (_isInit)
            {
                onReady.call();
                return;
            }

            self.$doms = $doms = {};

            var templates =
                [
                    {url: "templates/_care.html", startWeight: 0, weight: 100, dom: null}
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
                $doms.container = $("#care");

                $doms.contents =
                {
                    "/Top": true,
                    "/Team": $doms.container.find(".part-1"),
                    "/Others": $doms.container.find(".part-3")
                };


                $doms.container.find(".back-to-top").on("click", function(event)
                {
                    event.preventDefault();

                    ScrollListener.scrollTo(0);
                });

                $doms.container.detach();
            }
        },

        toContent: function (hash)
        {
            var $content = $doms.contents[hash];

            if($content)
            {
                var targetScrollTop = 0;

                if(hash !== "/Top")
                {
                    var navHeight = Nav.getHeight(),
                        containerTop = $('#scene-container').find('> .content-mask').position().top,
                        contentTop = $content.position().top;

                    targetScrollTop = containerTop + contentTop - navHeight;
                }

                ScrollListener.scrollTo(targetScrollTop);
            }
        },

        show: function (cb)
        {
            if (!_isHiding)
            {
                cb.call();
                return;
            }

            $doms.parent.append($doms.container);

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