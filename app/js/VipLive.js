(function ()
{

    var $doms,
        _isInit = false,
        _ws_url,
        _isHiding = true;

    var self = window.VipLive =
    {
        isVipOnly: true,

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
                    {url: "templates/_vip_live.html", startWeight: 0, weight: 100, dom: null}
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
                $doms.container = $("#vip-live");

                $doms.videoCanvas = $doms.container.find(".video-canvas");

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
        //console.log(Hash.getHash());

        //var vipToken = Hash.getHash() === "/OpenLive"? Main.settings.liveToken: Vip.getVipToken();
        var vipToken = Vip.getVipToken();

        //console.log("vip token: " + vipToken);

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

                //var shareUrl = Utility.getPath() + "?live=" + vipToken + "#/OpenLive";
                //
                //console.log("share url: " + shareUrl);
                //
                //$doms.qrCodeBlock = $doms.container.find(".qr-code");
                //var qrcode = new QRCode($doms.qrCodeBlock[0], {
                //    text: shareUrl,
                //    width: 80,
                //    height: 80
                //});
            }

            cb.call();
        });
    }
}());