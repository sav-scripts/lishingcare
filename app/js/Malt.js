(function ()
{

    var $doms,
        _isInit = false,
        _isHiding = true;

    var self = window.Malt =
    {
        name: 'Malt',

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
                    {url: "templates/_malt.html", startWeight: 0, weight: 100, dom: null}
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
                $doms.container = $("#malt");


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

            var tl = new TimelineMax;
            tl.to($doms.container, .4, {autoAlpha: 0});
            tl.add(function ()
            {
                ScrollAnimeManager.switchListener(self.name, false);
                _isHiding = true;
                $doms.container.detach();
                if (cb) cb.call();
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
        var $container = $doms.container.find(".malt-part"),
            titleImage = $doms.titleImage = $container.find(".title-image")[0],
            titleText1 = $container.find(".title-text-1")[0],
            line = $container.find(".line")[0],
            titleText2 = $doms.titleText2 = $container.find(".title-text-2")[0],
            group = [titleImage, titleText1, line, titleText2];

        var tl = new TimelineMax;
        tl.set(group, {autoAlpha: 0});
        tl.staggerTo(group, .5,{autoAlpha:1}, .1, .5);

        tl.pause();

        ScrollAnimeManager.registAnime(self.name, "title", tl, titleImage, titleText2);

        setupStep(1);
        setupStep(2);
        setupStep(3);

        function setupStep(index)
        {
            var $container = $doms.container.find(".step-" + index),
                left = $container.find(".left")[0],
                right = $container.find(".right")[0],
                middle = $container.find(".middle")[0],
                titleImage = $container.find(".title-image")[0],
                title = $container.find(".title")[0],
                line = $container.find(".line")[0],
                detail = $container.find(".detail")[0],
                group = [middle, titleImage, title, line, detail];

            var tl = new TimelineMax;
            tl.set(group, {autoAlpha: 0});
            tl.set(left, {marginLeft: 200, autoAlpha: 0});
            tl.set(right, {marginLeft: -200, autoAlpha: 0});
            tl.staggerTo(group, .5, {autoAlpha: 1}, .2, .2);
            tl.to(left, .8, {marginLeft: 0, autoAlpha: 1, ease:Back.easeOut}, .4);
            tl.to(right, .8, {marginLeft: 0, autoAlpha: 1, ease:Back.easeOut}, .4);

            tl.pause();

            ScrollAnimeManager.registAnime(self.name, "step" + index, tl, $container[0], {dom:$container[0], bottomOffset: 150});
        }
    }
}());