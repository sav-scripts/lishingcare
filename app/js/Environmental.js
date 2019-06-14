(function ()
{

    var $doms,
        _isInit = false,
        _isHiding = true,

        _isMainMode = true,
        _currentSubHash = null,

        _data,
        _roomDic,
        _publicAreaDic,
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

                $doms.envMain = $doms.container.find(".env-main");
                $doms.envSub = $doms.container.find(".env-sub");

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

                        _keyImageSlider = new ImageSlider(imageList, $container);
                        _keyImageSlider.replaceImages(Main.viewport.imageType);

                    }());

                    updateFacilites();
                    updatePublicArea();

                    self.SubPage.init($doms.envSub, _roomDic);

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
            if(_roomDic[hash])
            {
                toSub(hash);
            }
            else
            {
                toMain(function()
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
                });
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

                    updateFacilites();
                    updatePublicArea();
                }

                self.SubPage.resize();
            }
        }
    };

    function toMain(cb)
    {
        if(_isMainMode)
        {
            if(cb) cb.call();
            return;
        }
        _isMainMode = true;


        var tl = new TimelineMax;
        tl.to($doms.envSub, .4,{autoAlpha:0});
        tl.add(function()
        {
            $doms.container.toggleClass('sub-mode', false);
            MainPage.resetHeight();
            self.SubPage.hide();
        });
        tl.to($doms.envMain, .4, {autoAlpha:1});

        if(cb) tl.add(cb);

    }

    function toSub(hash)
    {
        //if(!_isMainMode) return;

        var tl;

        if(_isMainMode)
        {

            tl = new TimelineMax;
            tl.to($doms.envMain, .4,{autoAlpha:0});
            tl.add(function()
            {
                self.SubPage.changeContent(hash);
                ScrollListener.scrollTo(0);

                self.SubPage.show();

                $doms.container.toggleClass('sub-mode', true);
                MainPage.resetHeight();
            });
            tl.to($doms.envSub, .4, {autoAlpha:1});
        }
        else
        {

            tl = new TimelineMax;
            tl.to($doms.envSub, .4,{autoAlpha:0});
            tl.add(function()
            {
                self.SubPage.changeContent(hash);
                ScrollListener.scrollTo(0);

                self.SubPage.show();

                $doms.container.toggleClass('sub-mode', true);
                MainPage.resetHeight();
            });
            tl.to($doms.envSub, .4, {autoAlpha:1});
        }

        _isMainMode = false;




        //MainPage.resetHeight();
    }

    function updatePublicArea()
    {
        var dataList = _data.public_area,
            imageType = Main.viewport.imageType,
            i,
            $container = $doms.container.find(".part-4 .container"),
            $sample = $($container.find(".room")[0]);


        if(_publicAreaDic)
        {
            for(i=0;i<dataList.length;i++){ updateAreaImage(i); }
        }
        else
        {
            _publicAreaDic = {};
            $container.empty();


            $container.toggleClass("num-" + dataList.length);

            for(i=0;i<dataList.length;i++){ buildArea(i); }
        }


        $container.append('<div class="spacer"></div>');

        function buildArea(index)
        {
            var areaData = dataList[index],
                $area = $sample.clone();

            var hash = "/" + index,
                obj = _publicAreaDic[hash] = {};

            obj.rawData = areaData;
            obj.$area = $area;


            $area.on('click', function(event)
            {
                event.preventDefault();
                ImageViewer.updateData(areaData.full_image).show();
            });

            $area.find(".name-ch").html(areaData.title);

            updateAreaImage(index);

            $container.append($area);
        }



        function updateAreaImage(index)
        {
            var hash = "/" + index,
                obj = _publicAreaDic[hash];


            obj.$area.css("background-image", "url("+obj.rawData.thumb[imageType]+")");

            //_roomDic[id].$room.css("background-image", "url("+roomData.thumb[imageType]+")");
        }
    }

    function updateFacilites()
    {
        var data = _data.facilites,
            imageType = Main.viewport.imageType;



        //var $container = $doms.container.find(".part-1");
        //$container.find(".right-part .title").html(data.title);
        //$container.find(".right-part .detail").html(data.detail);
        //$container.find(".left-part").css("background-image", "url("+data.image.pc+")");


        var i,
            $roomContainer = $doms.container.find(".part-2 .container"),
            $roomSample = $($roomContainer.find(".room")[0]),
            $featureContainer = $doms.container.find(".part-3 .container"),
            $featureSample = $($featureContainer.find(".item")[0]);

        //$roomSample.toggleClass("small", false).toggleClass("large", false);

        if(_roomDic)
        {
            for(i=0;i<data.rooms.length;i++){ updateRoomImage(i); }
        }
        else
        {
            //data.rooms.pop();
            //data.rooms.pop();
            //data.rooms.pop();
            //data.rooms.pop();

            $roomContainer.toggleClass("num-" + data.rooms.length);

            _roomDic = {};

            $roomContainer.empty();
            $featureContainer.empty();

            for(i=0;i<data.rooms.length;i++){ buildRoom(i); }
            for(i=0;i<data.features.length;i++){ buildFeature(i); }
        }

        $featureContainer.append('<div class="spacer"></div>');

        function buildRoom(index)
        {


            var roomData = data.rooms[index],
                id = roomData.id,
                hash = "/" + id,
                $room = $roomSample.clone();

            var obj = _roomDic[hash] = {};

            obj.rawData = roomData;
            obj.$room = $room;

            //$room.on('click', function(event)
            //{
            //    event.preventDefault();
            //    ImageViewer.updateData(roomData.full_image).show();
            //});

            $room.css("background-image", "url("+roomData.thumb[imageType]+")");

            $room.find(".detail .name-ch").text(roomData.name_ch);
            $room.find(".detail .name-en").text(roomData.name_en);

            $roomContainer.append($room);

            $room.on('click', function(event)
            {
                event.preventDefault();
                //ImageViewer.updateData(roomData.full_image).show();

                Hash.to("/Environmental" + hash);
            });

            /*
            var roomData = data.rooms[index],
                $room = $roomSample.clone();

            $room.on('click', function(event)
            {
                event.preventDefault();
                ImageViewer.updateData(roomData.full_image).show();
            });

            $room.toggleClass(roomData.type, true);
            $room.find(".left-part").text(roomData.name);
            $room.find(".right-part .row:nth-child(1) .detail").text(roomData.size);
            $room.find(".right-part .row:nth-child(2) .detail").text(roomData.view);
            $room.find(".image").css("background-image", "url("+roomData.thumb[imageType]+")");

            $roomContainer.append($room);
            */
        }

        function updateRoomImage(index)
        {
            var roomData = data.rooms[index],
                id = "/" + roomData.id;

            _roomDic[id].$room.css("background-image", "url("+roomData.thumb[imageType]+")");
        }

        function buildFeature(index)
        {
            var featureData = data.features[index],
                $feature = $featureSample.clone();

            $feature.find(".title-text").text(featureData.title);
            $feature.find(".detail").html(featureData.detail);

            $featureContainer.append($feature);
        }
    }
}());