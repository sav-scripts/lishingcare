/**
 * Created by sav on 2018/11/19.
 */
(function(){

    var $doms = {},
        _imageSlider,
        _roomDic,
        _isHiding = true;

    var self = window.Environmental.SubPage =
    {
        init: function($container, roomDic)
        {
            $doms.container = $container;
            _roomDic = roomDic;

            $doms.keyImageContainer = $doms.container.find(".sub-key-images");

            $doms.container.find(".btn-back").on("click", function(event)
            {
                event.preventDefault();

                Hash.to("/Environmental/Rooms");
            });

        },

        changeContent: function(hash)
        {
            if(_imageSlider) _imageSlider.destroy();
            $doms.keyImageContainer.empty();

            var obj = _roomDic[hash];

            $doms.container.find(".title-text").text(obj.rawData.name_ch);

            //console.log(obj.rawData.images);

            $doms.container.find(".features > .right-part").html(obj.rawData.features);
            $doms.container.find(".equipments > .right-part").html(obj.rawData.equipments);

            _imageSlider = new ImageSlider(obj.rawData.images, $doms.keyImageContainer);
            _imageSlider.replaceImages(Main.viewport.imageType);
        },

        show: function (cb)
        {
            if (!_isHiding)
            {
                if(cb) cb.call();
                return;
            }

            //$doms.parent.append($doms.container);

            _isHiding = false;
            if(_imageSlider) _imageSlider.start();

            //var tl = new TimelineMax;
            //tl.set($doms.container, {autoAlpha: 0});
            //tl.to($doms.container, .4, {autoAlpha: 1});
            //tl.add(function ()
            //{
            //    if (cb) cb.call();
            //});
        },

        hide: function (cb)
        {
            if (_isHiding)
            {
                if(cb) cb.call();
                return;
            }
            _isHiding = true;

            if(_imageSlider) _imageSlider.stop();

            //var tl = new TimelineMax;
            //tl.to($doms.container, .4, {autoAlpha: 0});
            //tl.add(function ()
            //{
            //    //$doms.container.detach();
            //    if (cb) cb.call();
            //});

        },

        resize: function()
        {
            if(_imageSlider)
            {
                _imageSlider.replaceImages(Main.viewport.imageType);
            }
        }
    };

}());