(function ()
{

    var $doms,
        _isInit = false,
        _isHiding = true,
        _data;

    var self = window.News =
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
                    {url: "templates/_news.html", startWeight: 0, weight: 100, dom: null}
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
                $doms.container = $("#news");

                $doms.mainTitle = $doms.container.find(".title .title-text");
                $doms.newsContainer = $doms.container.find(".news-container");
                $doms.newsSample = $doms.newsContainer.find(".news-block").detach();

                ApiProxy.callApi("news", {}, false, function(response)
                {
                    _data = response;

                    //$doms.mainTitle.text(_data.main_title);

                    for(var i=0;i<_data.data_list.length;i++){ createNews(i); }

                    updateNewsImages();
                    //_keyImageSlider = new ImageSlider(imageList, $container, "image");

                    function createNews(index)
                    {
                        var dataObj = _data.data_list[index],
                            $news = $doms.newsSample.clone();

                        $news.find(".year").text(dataObj.year);
                        $news.find(".month").text(dataObj.month);
                        $news.find(".day").text(dataObj.day);

                        $news.find(".title").text(dataObj.title);
                        $news.find(".detail").html(dataObj.content);

                        //console.log($news.find('.detail').length);

                        dataObj.$news = $news;

                        $doms.newsContainer.append($news);
                    }

                    end();
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
                _isHiding = true;
                $doms.container.detach();
                if(cb) cb.call();
            });

        }
    };

    function updateNewsImages()
    {
        var imageType = Main.viewport.imageType,
            dataObj,
            $news,
            $images;

        for(var i=0;i<_data.data_list.length;i++)
        {
            dataObj = _data.data_list[i];
            $news = dataObj.$news;

            $images = $news.find(".images");
            $images.empty();

            for(var k=0;k<dataObj.images.length;k++){ updateImage($images, dataObj, imageType, k); }
        }
    }

    function updateImage($container, dataObj, imageType, index)
    {
        var $image = $("<div class='image'></div>");

        $container.append($image);
        $image.css("background-image", "url("+dataObj.images[index][imageType]+")");
    }
}());