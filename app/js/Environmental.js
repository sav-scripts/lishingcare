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

                    /* facilites */
                    (function ()
                    {
                        var data = _data.facilites,
                            $container = $doms.container.find(".part-1");

                        $container.find(".right-part .title").html(data.title);
                        $container.find(".right-part .detail").html(data.detail);
                        $container.find(".left-part").css("background-image", "url("+data.image.pc+")");


                        var i,
                            $roomContainer = $doms.container.find(".part-2 .container"),
                            $roomSample = $($roomContainer.find(".room")[0]),
                            $featureContainer = $doms.container.find(".part-3 .container"),
                            $featureSample = $($featureContainer.find(".item")[0]);

                        $roomSample.toggleClass("small", false).toggleClass("large", false);

                        $roomContainer.empty();
                        $featureContainer.empty();

                        for(i=0;i<data.rooms.length;i++){ buildRoom(i); }
                        for(i=0;i<data.features.length;i++){ buildFeature(i); }

                        $featureContainer.append('<div class="spacer"></div>');

                        function buildRoom(index)
                        {
                            var roomData = data.rooms[index],
                                $room = $roomSample.clone();

                            $room.toggleClass(roomData.type, true);
                            $room.find(".left-part").text(roomData.name);
                            $room.find(".right-part .row:nth-child(1)").text(roomData.size);
                            $room.find(".right-part .row:nth-child(2)").text(roomData.view);
                            $room.find(".image").css("background-image", "url("+roomData.thumb.pc+")");

                            $roomContainer.append($room);
                        }

                        function buildFeature(index)
                        {
                            var featureData = data.features[index],
                                $feature = $featureSample.clone();

                            $feature.find(".title-text").text(featureData.title);
                            $feature.find(".detail").html(featureData.detail);

                            $featureContainer.append($feature);
                        }

                    }());


                    /* public area */
                    (function(){

                        var dataList = _data.public_area,
                            i,
                            $container = $doms.container.find(".part-4 .container"),
                            $sample = $($container.find(".room")[0]);

                        $container.empty();

                        for(i=0;i<dataList.length;i++){ buildArea(i); }

                        $container.append('<div class="spacer"></div>');

                        function buildArea(index)
                        {
                            var areaData = dataList[index],
                                $area = $sample.clone();

                            $area.find(".detail .text").html(areaData.title);
                            $area.find(".image").css("background-image", "url("+areaData.thumb.pc+")");

                            $container.append($area);
                        }


                    }());

                    end();
                });

                $doms.container.find(".back-to-top").on("click", function(event)
                {
                    event.preventDefault();

                    ScrollListener.scrollTo(0);
                });

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