/**
 * Created by sav on 2018/10/16.
 */
(function(){

    window.ImageSlider = ImageSlider;

    function ImageSlider(dataList, $container)
    {
        var self = this;

        self._dataList = dataList;
        self._$container = $container;

        for(var i=0;i<self._dataList.length;i++)
        {
            var obj = self._dataList[i],
                $image = obj.$image = $('<div class="'+self._contentClassName+'"></div>');

             //$image.css('background-image', 'url('+obj.pc+')');

        }

        self._timer = new TimelineMax({paused:true});
        self._timer.add(function()
        {
            self.toNext();
        }, self._duration);

        self.toIndex(0, true);
        //self.start();
    }

    ImageSlider.prototype =
    {
        _dataList: undefined,
        _$container: undefined,

        _contentClassName: 'banner-image',
        _duration: 3,

        _currentIndex: -1,
        _currentImage: undefined,

        _timer: undefined,
        _paused: true,

        start: function()
        {

            if(this._paused)
            {
                this._paused = false;
                this._timer.restart();
            }
        },

        stop: function()
        {
            if(!this._paused)
            {
                this._paused = true;
                this._timer.pause();
            }
        },

        toNext: function()
        {
            var self = this;

            var newIndex = self._currentIndex + 1;
            if(newIndex >= self._dataList.length)
            {
                newIndex = 0;
            }

            self.toIndex(newIndex);
        },

        toIndex: function(newIndex, skipLoading)
        {
            var self = this;

            if(newIndex === self._currentIndex) return;

            var oldIndex = self._currentIndex,
                $oldImage;

            //console.log("to index: " + newIndex);

            if(oldIndex !== -1)
            {
                $oldImage = self._dataList[oldIndex].$image;
            }

            self._currentIndex = newIndex;

            var newObj = self._dataList[self._currentIndex];

            if(skipLoading)
            {
                if($oldImage) $oldImage.detach();
                self._$container.append(newObj.$image);
            }
            else
            {
                var tl = new TimelineMax();
                tl.set(newObj.$image, {autoAlpha: 0});
                tl.to(newObj.$image, 2,{autoAlpha: 1, ease:Power1.easeInOut});
                tl.add(function()
                {
                    if($oldImage)
                    {
                        $oldImage.detach();
                    }

                    if(!self._paused)
                    {
                        self._timer.restart();
                    }
                });

                tl.pause();

                self._$container.append(newObj.$image);
                newObj.$image.waitForImages(function()
                {
                    tl.restart();
                });
            }

        },

        replaceImages: function(imageType)
        {
            var self = this;

            for(var i=0;i<self._dataList.length;i++)
            {
                var obj = self._dataList[i],
                    imageSrc = obj[imageType];

                obj.$image.css('background-image', 'url('+imageSrc+')');

            }
        }

    };




}());