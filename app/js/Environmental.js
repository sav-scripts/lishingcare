(function ()
{

    var $doms,
        _isInit = false,
        _isHiding = true,

        _data,
        _keyImageSlider;

    var self = window.Environmental =
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
                    {url: "templates/_environmental.html", startWeight: 0, weight: 100, dom: null}
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
                $doms.container = $("#environmental");

                $doms.contents =
                {
                    "/Top": true,
                    "/Rooms": $doms.container.find(".part-1"),
                    "/PublicArea": $doms.container.find(".part-4"),
                    "/BabyRoom": $doms.container.find(".part-5")
                };



                /* 動態內容 */
                ApiProxy.callApi("environmental", {}, false, function(response)
                {
                    _data = response;

                    /* banner */
                    (function ()
                    {
                        var imageList = _data.banner.images,
                            $container = $doms.container.find(".key-images");

                        $container.empty();

                        _keyImageSlider = new ImageSlider(imageList, $container, "image");
                        _keyImageSlider.replaceImages(Main.viewport.imageType);

                    }());
                });

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
                if(_keyImageSlider) _keyImageSlider.start();

                _isHiding = false;
                if (cb) cb.call();
            });
        },

        hide: function (cb)
        {
            if (_isHiding)
            {
                cb.call();
                return;
            }

            if(_keyImageSlider) _keyImageSlider.stop();

            var tl = new TimelineMax;
            tl.to($doms.container, .4, {autoAlpha: 0});
            tl.add(function ()
            {
                _isHiding = true;
                $doms.container.detach();
                if (cb) cb.call();
            });

        },

        resize: function()
        {
            var vp = Main.viewport;
            if(vp.changed)
            {
                if(_keyImageSlider)
                {
                    _keyImageSlider.replaceImages(vp.imageType);
                }
            }
        }
    };
}());