(function ()
{

    var $doms,
        _isInit = false,
        _ws_url,
        _durationLimit = 0,
        _tlTimeout,
        _player,
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
            ApiProxy.callApi("trade_vip_camera_token", {vip_token: token}, false, function(response)
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

            if(_tlTimeout)
            {
                _tlTimeout.kill();
                _tlTimeout = null;
            }
            if(_player)
            {
                _player.destroy();
                _player = null;
            }

            LiveQrcode.hide();

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
                //_durationLimit = parseInt(response.duration);

                _player = new JSMpeg.Player(_ws_url, {canvas: $doms.videoCanvas[0], pauseWhenHidden: false});

                $doms.container.find(".baby-name").text(response.baby_name);
                $doms.container.find(".mon-name").text(response.mon_name);

                var shareUrl = Utility.getPath() + "?live=" + vipToken;
                if(Main.settings.useFakeData) shareUrl += '&usefakedata=1';
                shareUrl += "#/OpenLive";

                //console.log("share url: " + shareUrl);

                //console.log(_player.source);

                LiveQrcode.setQrcode(shareUrl);

                if(_durationLimit > 0)
                {
                    var tl = _tlTimeout = new TimelineMax;
                    tl.add(function()
                    {
                        if(_tlTimeout)
                        {
                            _tlTimeout.kill();
                            _tlTimeout = null;
                        }
                        //if(_player)
                        //{
                        //    _player.destroy();
                        //    _player = null;
                        //}

                        //console.log("check");

                        alert('視訊連線逾時, 將登出使用者帳號');

                        Vip.logout(function()
                        {
                            Hash.to("/Login");
                        });

                    }, _durationLimit);
                }
            }

            cb.call();
        }, null, true);
    }
}());