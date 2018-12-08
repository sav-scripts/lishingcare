/**
 * Created by sav on 2018/10/16.
 */
(function(){

    window.ImageSlider = ImageSlider;

    function ImageSlider(dataList, $container, withController)
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

        if(withController)
        {
            self._controller = new window.ImageSlider.Controller(self);
        }
    }

    ImageSlider.prototype =
    {
        _dataList: undefined,
        _$container: undefined,

        _contentClassName: 'banner-image',
        _duration: 3,
        _animeDuration : 2,

        _currentIndex: -1,
        _currentImage: undefined,

        _timer: undefined,
        _paused: true,

        _controller: undefined,

        _queueIndex: undefined,

        _isLocking: false,

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

        toIndex: function(newIndex, skipLoading, cb)
        {
            var self = this;
            if(newIndex === self._currentIndex) return;


            if(self._isLocking)
            {
                self._queueIndex = newIndex;
                return;
            }

            var oldIndex = self._currentIndex,
                $oldImage;

            //console.log("to index: " + newIndex);

            if(oldIndex !== -1)
            {
                $oldImage = self._dataList[oldIndex].$image;
            }

            self._currentIndex = newIndex;

            if(self._controller) self._controller.updateDot();

            var newObj = self._dataList[self._currentIndex];

            if(skipLoading)
            {
                if($oldImage) $oldImage.detach();
                self._$container.append(newObj.$image);
            }
            else
            {
                self._isLocking = true;

                self._timer.pause();

                var tl = new TimelineMax();
                tl.set(newObj.$image, {autoAlpha: 0});
                tl.to(newObj.$image, self._animeDuration,{autoAlpha: 1, ease:Power1.easeInOut});
                tl.add(function()
                {
                    self._isLocking = false;
                    if($oldImage)
                    {
                        $oldImage.detach();
                    }

                    if(self._queueIndex !== undefined)
                    {
                        var i = self._queueIndex;
                        self._queueIndex = undefined;
                        self.toIndex(i);
                    }
                    else if(!self._paused)
                    {
                        self._timer.restart();
                    }

                    if(cb) cb.call();



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
        },

        destroy: function()
        {
            this.stop();
            this._$container.find("." + this._contentClassName).detach();

            if(this._controller) this._controller.destroy();
        }

    };

}());

(function(){

    window.ImageSlider.Controller = MyClass;

    function MyClass(imageSlider)
    {
        var self = this;
        self._imageSlider = imageSlider;


        var $container = self._$container = $('<div class="image-slider-controller"></div>'),
            dataList = imageSlider._dataList,
            i;

        imageSlider._$container.append($container);

        for(i=0;i<dataList.length;i++)
        {
            generateDot(self, i);
        }

        self.updateDot();
    }

    function generateDot(controller, index)
    {
        var $dot = $('<div class="dot"><div class="icon"></div></div>');
        controller._$container.append($dot);

        $dot.on("click", function(event)
        {
            event.preventDefault();

            controller.toIndex(index);
        });
    }

    MyClass.prototype =
    {
        _imageSlider: undefined,
        _$container: undefined,

        _$dots: [],

        toIndex: function(index)
        {
            var self = this;

            self._imageSlider.toIndex(index);
        },

        updateDot: function()
        {
            var currentIndex = this._imageSlider._currentIndex;


            this._$container.find(".dot").toggleClass('selected', false);
            this._$container.find(".dot:nth-child("+(currentIndex+1)+")").toggleClass('selected', true);
        },

        destroy: function()
        {
            this._$container.detach();
        }
    };

}());