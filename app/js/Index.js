(function(){

    var $doms,
        _isInit = false,
        _isHiding = true,
        _keyImageSlider = undefined,

        _data;

    var self = window.Index =
    {
        $doms: undefined,

        init: function(onReady)
        {
            if(_isInit)
            {
                onReady.call();
                return;
            }

            self.$doms = $doms = {};

            var templates =
                [
                    {url: "templates/_index.html", startWeight: 0, weight: 100, dom: null}
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
                $doms.container = $("#index");

                $doms.contents =
                {
                    "/Top": true,
                    "/AboutUs": $doms.container.find(".about-us"),
                    "/Environmental": $doms.container.find(".environmental"),
                    "/Malt": $doms.container.find(".malt"),
                    "/Care": $doms.container.find(".care"),
                    "/Contact": $doms.container.find(".page-bottom")
                };

                $doms.container.find(".reservation-icon").on("click", function(event)
                {
                    event.preventDefault();

                    Hash.to("/Reservation");
                });

                $doms.container.find(".back-to-top").on("click", function(event)
                {
                    event.preventDefault();

                    ScrollListener.scrollTo(0);
                });

                /* 動態內容 */
                ApiProxy.callApi("index", {}, false, function(response)
                {
                    _data = response;

                    /* banner */
                    (function(){
                        var imageList = _data.banner.images,
                        $container = $doms.container.find(".key-images .image-container");

                        $container.empty();

                        _keyImageSlider = new ImageSlider(imageList, $container, "image");
                        _keyImageSlider.replaceImages(Main.viewport.imageType);

                    }());

                    /* enviornmental */
                    updateEnvironmental();

                    end();
                });

                /* about us & malt */
                (function(){

                    $doms.container.find(".about-us .btn-more").on("click", function(event)
                    {
                        event.preventDefault();

                        Hash.to("/AboutUs");
                    });

                    $doms.container.find(".malt .btn-more").on("click", function(event)
                    {
                        event.preventDefault();

                        Hash.to("/Malt");
                    });

                    updateMalt();

                }());

                /* care */
                (function(){

                    var $container = $doms.container.find(".care"),
                        $details = $container.find(".detail");

                    $($details[0]).find(".btn-more").on("click", function(event)
                    {
                        event.preventDefault();

                        Hash.to("/Care/Team");
                    });

                    $($details[1]).find(".btn-more").on("click", function(event)
                    {
                        event.preventDefault();

                        Hash.to("/Care/Others");
                    });

                    $($details[2]).find(".btn-more").on("click", function(event)
                    {
                        event.preventDefault();

                        Hash.to("/Care/Others");
                    });

                    $($details[3]).find(".btn-more").on("click", function(event)
                    {
                        event.preventDefault();

                        Hash.to("/Care/Others");
                    });

                }());



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

        toContent: function(hash)
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

        show: function(cb)
        {
            if(!_isHiding)
            {
                cb.call();
                return;
            }

            $doms.parent.append($doms.container);

            var tl = new TimelineMax;
            tl.set($doms.container, {autoAlpha: 0});
            tl.to($doms.container,.4, {autoAlpha: 1});
            tl.add(function()
            {
                if(_keyImageSlider) _keyImageSlider.start();

                _isHiding = false;
                if(cb) cb.call();
            });
        },

        hide: function(cb)
        {
            if(_isHiding)
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
                if(cb) cb.call();
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

                    updateEnvironmental();
                    updateMalt();
                }
            }
        }
    };

    function updateMalt()
    {
        var $samplePart = $doms.container.find(".malt .sample-part");

        if(Main.viewport.index === 0)
        {
            $samplePart.pep
            ({
                shouldPreventDefault: false,
                useCSSTranslation: false,
                axis: 'x',
                shouldEase: false,
                start: function()
                {
                    TweenMax.killTweensOf($samplePart);
                },
                stop: function()
                {
                    //console.log(e);
                    var gridSize = 640,
                        newLeft = parseInt($samplePart.css("left")),
                        targetGridIndex = Math.round(newLeft / gridSize);

                    //console.log(targetGridIndex);

                    targetGridIndex = Math.min(targetGridIndex, 0);
                    targetGridIndex = Math.max(targetGridIndex, -2);

                    var targetLeft = gridSize * targetGridIndex;

                    //TweenMax.killTweensOf($samplePart);
                    TweenMax.to($samplePart,.3,{left: targetLeft, ease:Power3.easeOut});


                }
            });
        }
        else
        {
            TweenMax.killTweensOf($samplePart);
            $.pep.unbind($samplePart);
            $samplePart.css
            ({
                left: '',
                top: ''
            })
        }



    }

    function updateEnvironmental()
    {

        var imageType = Main.viewport.imageType;

        var data = _data.environmental;

        var $container = $doms.container.find(".environmental");

        $container.find(".detail").html(data.description);

        setupSample(1, "rooms", "/Environmental/Rooms");
        setupSample(2, "public_area", "/Environmental/PublicArea");
        setupSample(3, "baby_room", "/Environmental/BabyRoom");

        function setupSample(index, keyword, hash)
        {
            var $sample = $container.find(".sample:nth-child("+index+")");

            $sample.find(".image").css("background-image", "url("+data.images[keyword][imageType]+")");

            $sample.on("click", function(event)
            {
                event.preventDefault();

                //Hash.to("/Environmental/Rooms");
                Hash.to(hash);
            });
        }
    }

}());