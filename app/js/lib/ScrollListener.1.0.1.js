/* change log
    1.0.1
        支援 addListener 和 removeListener
        移除 bind, 統一由 listener 回應捲動事件


 */

(function(){

    var _isLocking = false,
        _listenerDic = {},
        _scrollBound =
        {
            top: 0,
            left: 0,
            width: 0,
            height: 0
        },
        _tweenDic = {scrollTop:0};

    var self = window.ScrollListener =
    {
        _isActive: false,

        init: function()
        {

            return self;
        },

        addListener: function(id, func)
        {
            _listenerDic[id] = func;

            return self;
        },

        removeListener: function(id)
        {
            delete _listenerDic[id];

            return self;
        },

        active: function()
        {
            self._isActive = true;

            $(window).on('scroll', updateScrollTop);
            updateScrollTop();

            return self;
        },

        disactive: function()
        {
            self._isActive = false;
            $(window).unbind('scroll', updateScrollTop);

            return self;
        },

        testDom: function(dom, topOffset, bottomOffset)
        {
            var bound = dom.getBoundingClientRect();

            if(topOffset === undefined) topOffset = 0;
            if(bottomOffset === undefined) bottomOffset = 0;

            var top = topOffset,
                bottom = _scrollBound.height + bottomOffset;

            return {
                bound: bound,
                topInside: (bound.top >= top && bound.top <= bottom),
                bottomInside: (bound.bottom >= top && bound.bottom <= bottom),
                contentInside: bound.top < bottom && bound.bottom > top
            };
        },

        scrollTo: function(targetTop, cb, __speed)
        {

            var speed = __speed? __speed: 1000,
                dy = Math.abs(targetTop - _tweenDic.scrollTop),
                duration = Math.min(.8, dy/speed);

            TweenMax.killTweensOf(_tweenDic);
            _tweenDic.scrollTop = $(window).scrollTop();

            TweenMax.to(_tweenDic,duration, {scrollTop: targetTop, onStart: function()
            {
                //Menu.setLockFocus(true);
                //Menu.setFocusTo(anchor);
            }, onUpdate: function()
            {
                window.scrollTo($(window).scrollLeft(), _tweenDic.scrollTop);
            }, onComplete: cb});
        }
    };

    function updateScrollTop()
    {
        if(_isLocking) return;
        if(!self._isActive) return;

        var doc = document.documentElement;
        _scrollBound.left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        _scrollBound.top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        _scrollBound.width = $(window).width();
        _scrollBound.height = $(window).height();

        _tweenDic.scrollTop = $(window).scrollTop();

        //if(_cbOnScrolling) _cbOnScrolling.call(null, _scrollBound);
        var id, func;
        for(id in _listenerDic)
        {
            func = _listenerDic[id];
            func.call(null, _scrollBound);
        }
    }

}());
