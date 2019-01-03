(function ()
{

    var $doms,
        _isInit = false,
        _isHiding = true;

    var self = window.Care =
    {
        name: "Care",

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

                setupAnime();

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

                ScrollAnimeManager.switchListener(self.name, true);
                self.resize();

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
                ScrollAnimeManager.switchListener(self.name, false);
                _isHiding = true;
                $doms.container.detach();
                if(cb) cb.call();
            });

        },

        resize: function()
        {
            if(!_isHiding)
            {
                if(Main.viewport.index === 0)
                {
                    ScrollAnimeManager.completeAll(self.name);
                }
            }
        }
    };



    function setupAnime()
    {
        setupPart(1, -200);
        setupPart(2, 200);
        setupPart(3, -200);
        setupPart(4, 200);

        function setupPart(index, xOffset)
        {
            var container = $doms.container.find(".part-" + index)[0];

            var tl = new TimelineMax;
            tl.set(container, {autoAlpha: 0, x: xOffset});
            tl.to(container, .9, {marginLeft: 0, autoAlpha: 1, x: 0, ease:Back.easeOut}, .1);

            tl.pause();

            ScrollAnimeManager.registAnime(self.name, "part" + index, tl, {dom: container, topOffset: 0, bottomOffset: -150});
        }
    }
}());