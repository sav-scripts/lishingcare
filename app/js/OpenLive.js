(function ()
{

    var $doms,
        _isInit = false,
        _ws_url,
        _isHiding = true;

    var self = window.OpenLive =
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
                    {url: "templates/_open_live.html", startWeight: 0, weight: 100, dom: null}
                ];

            MyLoader.loadTemplate(null, templates, function loadComplete()
            {
                build(templates, function()
                {
                    _isInit = true;
                    onReady.apply(null);
                });

            }, 0);

            function build(templates, cb)
            {
                $("#invisible-container").append(templates[0].dom);
                $doms.parent = $("#scene-container").find(".content-container");
                $doms.container = $("#open-live");

                $doms.videoCanvas = $doms.container.find(".video-canvas");

                LiveQrcode.init($('#live-qrcode'));

                $doms.container.find(".btn-share").on("click", function(event)
                {
                    event.preventDefault();

                    LiveQrcode.show();

                });

                end();


                /* end */
                function end()
                {
                    $doms.container.waitForImages(function()
                    {
                        $doms.container.detach();
                        cb.call();
                    });
                }
            }
        },

        toContent: function (hash)
        {
        },

        validTokenExist: function(token, cb)
        {
            ApiProxy.callApi("trade_vip_camera_token", {vip_token: vipToken}, false, function(response)
            {
                if(response.error)
                {
                    //alert(response.error);
                    cb.call(null, false);
                }
                else
                {
                    cb.call(null, true);
                }
            });
        },

        show: function (cb)
        {
            if (!_isHiding)
            {
                cb.call();
                return;
            }

            $doms.parent.append($doms.container);

            getLiveData(function()
            {
                var tl = new TimelineMax;
                tl.set($doms.container, {autoAlpha: 0});
                tl.to($doms.container, .4, {autoAlpha: 1});
                tl.add(function ()
                {
                    _isHiding = false;
                    if (cb) cb.call();
                });
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
                if (cb) cb.call();
            });

        }
    };

    function getLiveData(cb)
    {
        var vipToken = Main.settings.liveToken;

        ApiProxy.callApi("trade_vip_camera_token", {vip_token: vipToken}, false, function(response)
        {
            if(response.error)
            {
                if(response.error === 'outdated')
                {
                    alert('所要求的視訊已過期');
                }
                else
                {
                    alert(response.error);
                }
            }
            else
            {
                _ws_url = response.ws_url;

                var player = new JSMpeg.Player(_ws_url, {canvas: $doms.videoCanvas[0], pauseWhenHidden: false});

                $doms.container.find(".baby-name").text(response.baby_name);
                $doms.container.find(".mon-name").text(response.mon_name);

                var shareUrl = Utility.getPath() + "?live=" + vipToken;
                if(Main.settings.useFakeData) shareUrl += '&usefakedata=1';
                shareUrl += "#/OpenLive";

                console.log("share url: " + shareUrl);

                LiveQrcode.setQrcode(shareUrl);
            }

            cb.call();
        }, null, true);
    }
}());