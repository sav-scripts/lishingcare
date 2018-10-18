(function ()
{

    var $doms,
        _isInit = false,
        _isHiding = true,
        _currentContentHash = undefined;

    var self = window.VipBaby =
    {
        $doms: undefined,

        isVipOnly: true,

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
                    {url: "templates/_vip_baby.html", startWeight: 0, weight: 100, dom: null}
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
                $doms.container = $("#vip-baby");

                $doms.contents =
                {
                    "/ForParents": $doms.container.find(".part-1"),
                    "/AboutMe": $doms.container.find(".part-2"),
                    "/Recoard": $doms.container.find(".part-3")
                };

                $doms.partSelect = $doms.container.find(".part-select").change(function()
                {
                    var newHash = $doms.partSelect[0].value;

                    Hash.to("/VipBaby" + newHash);
                });

                $doms.container.find(".content-part").css("display", "none");

                $doms.container.detach();
            }
        },

        toContent: function (hash)
        {
            if(!$doms.contents[hash] || hash === _currentContentHash) return;

            if(_currentContentHash)
            {
                var $content = $doms.contents[_currentContentHash];
                var tl = new TimelineMax;
                tl.to($content,.4,{autoAlpha:0});
                tl.add(function()
                {
                    $content.css("display", "none");
                    newContentIn();
                });
            }
            else
            {
                newContentIn();
            }


            function newContentIn()
            {
                $doms.partSelect.val(hash);

                _currentContentHash = hash;
                var $content = $doms.contents[_currentContentHash];

                var tl = new TimelineMax;
                tl.set($content, {autoAlpha: 0, display: "block"});
                tl.to($content,.4,{autoAlpha:1});
                tl.add(function()
                {

                });

                MainPage.resetHeight();

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

            $("#footer").toggleClass("pink-mode", true);

            var tl = new TimelineMax;
            tl.set($doms.container, {autoAlpha: 0});
            tl.to($doms.container, .4, {autoAlpha: 1});
            tl.add(function ()
            {
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

            $("#footer").toggleClass("pink-mode", false);

            var tl = new TimelineMax;
            tl.to($doms.container, .4, {autoAlpha: 0});
            tl.add(function ()
            {
                _isHiding = true;
                $doms.container.detach();
                if (cb) cb.call();
            });

        }
    };
}());