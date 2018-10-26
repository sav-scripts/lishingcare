/**
 * Created by sav on 2018/10/25.
 */
(function(){

    var _isInit = true,
        _isHiding = true,
        _imageList,
        $doms = {},

        _currentIndex = -1,
        _numImages,
        _currentImage,
        _imageOnLoading;

    var self = window.ImageViewer =
    {
        init: function()
        {
            $doms.container = $("#image-viewer");
            $doms.parent = $("body");

            $doms.ui = $doms.container.find(".ui");

            $doms.currentIndex = $doms.container.find(".current-index");
            $doms.totalNumber = $doms.container.find(".total-number");

            $doms.imageContainer = $doms.container.find(".image-container");

            $doms.btnPrev = $doms.container.find(".btn-prev").on("click", function(event)
            {
                event.preventDefault();
                self.toPrev();
            });

            $doms.btnNext = $doms.container.find(".btn-next").on("click", function(event)
            {
                event.preventDefault();
                self.toNext();
            });

            $doms.container.find(".btn-close").on("click", function(event)
            {
                event.preventDefault();
                self.hide();
            });


            $doms.container.detach();
            _isInit = true;

            //self.updateData
            //([
            //    {
            //        "pc": "./test/images/full-sample-1.jpg",
            //        "mobile": "./test/images/full-sample-1.m.jpg"
            //    },
            //
            //    {
            //        "pc": "./test/images/full-sample-2.jpg",
            //        "mobile": "./test/images/full-sample-2.m.jpg"
            //    }
            //]);
            //
            //self.show();
        },

        updateData: function(imageList)
        {
            self.clear();

            _imageList = imageList;
            _numImages = imageList.length;

            $doms.totalNumber.text(_numImages);

            self.toIndex(0);

            return self;
        },

        clear: function()
        {
            _currentIndex = -1;

            if(_imageOnLoading)
            {
                _imageOnLoading._isUselss = true;
            }

            if(_currentImage)
            {
                $(_currentImage).detach();
            }
        },

        toPrev: function()
        {
            var newIndex = _currentIndex - 1;
            if(newIndex < 0) return;

            self.toIndex(newIndex);
        },

        toNext: function()
        {
            var newIndex = _currentIndex + 1;
            if(newIndex >= _numImages) return;

            self.toIndex(newIndex);

        },

        toIndex: function(newIndex)
        {
            if(newIndex === _currentIndex) return;

            _currentIndex = newIndex;

            $doms.btnPrev.toggleClass("disable-mode", _currentIndex === 0);
            $doms.btnNext.toggleClass("disable-mode", _currentIndex === (_numImages - 1));

            $doms.currentIndex.text(_currentIndex+1);

            updateImage();
        },

        show: function(cb)
        {
            if(!_isHiding) return;
            _isHiding = false;

            MainPage.setSceneScrollLock(true);

            $doms.parent.append($doms.container);
            self.resize();

            var tl = new TimelineMax;
            tl.set($doms.container, {autoAlpha: 0});
            tl.to($doms.container, .4, {autoAlpha: 1});
            tl.add(function ()
            {
                if (cb) cb.apply();
            });
        },

        hide: function(cb)
        {
            if(_isHiding) return;
            _isHiding = true;

            MainPage.setSceneScrollLock(false);

            var tl = new TimelineMax;
            tl.to($doms.container, .4, {autoAlpha: 0});
            tl.add(function ()
            {
                $doms.container.detach();
                if (cb) cb.apply();
            });
        },

        resize: function()
        {
            if(!_isInit || _isHiding) return;

            if(!_imageList) return;

            var vp = Main.viewport;

            if(vp.changed)
            {
                updateImage();
            }

            fitImageSize();
        }
    };

    function updateImage()
    {
        var imageData = _imageList[_currentIndex],
            imageType = Main.viewport.imageType;

        if(!imageType) return;

        changeImageTo(imageData[imageType]);
    }

    function fitImageSize()
    {
        if(!_currentImage) return;

        var w = _currentImage._initWidth,
            h = _currentImage._initHeight,
            cw = w + 2,
            ch = h + 2;

        var vp = Main.viewport,
            //wBleed = vp.index === 0? 1: 20,
            wBleed = 20,
            hBleed = 20,
            uiHeight = $doms.ui.height();

        var bound = Helper.getSize_contain(vp.width - wBleed*2, vp.height - hBleed*2 - uiHeight, cw, ch);

        if(bound.ratio > 1) bound.ratio = 1;

        cw = parseInt(cw * bound.ratio);
        ch = parseInt(ch * bound.ratio);
        w = cw - 2;
        h = ch - 2;

        //$doms.currentIndex.text(window.innerWidth);

        TweenMax.to($doms.imageContainer,.3,{width: cw, height: ch, ease:Power1.easeInOut});
        TweenMax.to(_currentImage,.3,{width: w, height: h, ease:Power1.easeInOut});
    }

    function changeImageTo(newImageSrc, cb)
    {
        if(_currentImage && newImageSrc === _currentImage.src) return;



        var image = _imageOnLoading = new Image;



        image.onload = function()
        {
            //console.log("image loaded");

            _imageOnLoading = null;

            if(image._isUselss) return;


            var oldImage = _currentImage;
            _currentImage = image;

            _currentImage._initWidth = _currentImage.width;
            _currentImage._initHeight = _currentImage.height;

            var $image = $(_currentImage);
            $image.attr("width", "100%");
            $image.attr("height", "100%");

            var tl = new TimelineMax;
            tl.set(_currentImage, {autoAlpha: 0});

            if(oldImage)
            {
                tl.to(oldImage,.3,{autoAlpha: 0});
                tl.add(function()
                {
                    $(oldImage).detach();
                });
            }

            //tl.to($doms.imageContainer,.3,{width: w, height: h, ease:Power1.easeInOut});

            tl.add(fitImageSize);

            tl.add(function()
            {
                $doms.imageContainer.append(_currentImage);
            }, "+=.3");

            tl.to(_currentImage,.3, {autoAlpha: 1});

            if(cb) tl.add(cb);

        };

        image.onerror = function(e)
        {
            console.log("load image on error");
            console.log(e);
        };

        image.src = newImageSrc;
    }

}());