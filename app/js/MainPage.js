/**
 * Created by sav on 2018/9/28.
 */
(function(){

    var $doms = {},
        _isHashLocking = false,
        _hashQueue = null,

        _contentClassDic = null,
        _currentContentClass = null;

    var self = window.MainPage =
    {
        isLogin: false,

        init: function()
        {
            Footer.init();

            $doms.sceneContainer = $("#scene-container");
            $doms.contentContainer = $doms.sceneContainer.find(".content-container");
            $doms.contentMask = $doms.sceneContainer.find(".content-mask");
            $doms.nav = $("#nav");

            _contentClassDic =
            {
                "/Index": Index,
                "/AboutUs": AboutUs,
                "/News": News,
                "/Contact": Contact,
                "/Care": Care,
                "/Environmental": Environmental,
                "/VipBaby": VipBaby
            };

            ScrollListener.init().bind(onScrolling).active();



            ApiProxy.callApi("login_status", {}, false, function(response)
            {
                if(response.status == 'true')
                {
                    self.isLogin = true;
                    Nav.toggleLogoutMode(true);
                }
            });


            Hash.init().bind(onHashChange).startListening();
            onHashChange();
        },

        logout: function()
        {
            if(_isHashLocking) return;

            ApiProxy.callApi("logout", {}, false, function()
            {
                self.isLogin = false;

                Nav.toggleLogoutMode(false);

                if(_currentContentClass && _currentContentClass.isVipOnly)
                {
                    Hash.to("/Index");
                }

            });
        },

        resetHeight: function(cb)
        {
            var contentHeight = $doms.contentContainer.height();

            var speed = 1500,
                dHeight = contentHeight - $doms.contentMask.height(),
                duration = dHeight / speed;

            duration = Math.max(.5, duration);
            duration = Math.min(1, duration);


            var tl = new TimelineMax;
            tl.to($doms.contentMask, duration, {height: contentHeight, ease:Linear.easeNone});

            if(cb) tl.add(cb);

        },

        resize: function()
        {
            if(_currentContentClass && _currentContentClass.resize)
            {
                _currentContentClass.resize();
            }
        }
    };

    function onHashChange()
    {
        if(_isHashLocking) 
        {
            _hashQueue = true;
            return;
        }

        var hashArray = Hash.analysis();
        if(hashArray.length === 0) hashArray = ['/Index'];

        //console.log(hashArray);

        var contentClass = _contentClassDic[hashArray[0]];

        if(contentClass)
        {
            _isHashLocking = true;

            if(_currentContentClass)
            {

                if(contentClass === _currentContentClass)
                {
                    toContentDetail();
                }
                else
                {
                    oldContentOut(newContentIn);
                }
            }
            else
            {
                newContentIn();
            }

        }

        function oldContentOut(cb)
        {
            ScrollListener.scrollTo(0);

            _currentContentClass.hide(function()
            {
                _currentContentClass = null;
                cb.call();
            });
        }

        function resetContainerHeight(cb)
        {
            $doms.contentContainer.append(contentClass.$doms.container);

            TweenMax.set($doms.contentContainer, {autoAlpha:0});

            self.resetHeight(function()
            {
                TweenMax.to($doms.contentContainer,.3, {autoAlpha:1});
                if(cb) cb.call();
            });
        }


        function newContentIn()
        {
            contentClass.init(function()
            {
                resetContainerHeight(function()
                {
                });

                _currentContentClass = contentClass;

                //contentClass.show(toContentDetail);
                contentClass.show();

                toContentDetail();
            });
        }

        function toContentDetail()
        {
            _isHashLocking = false;

            var scrollToHash = null;
            //if(hashArray.length === 1) scrollToHash = '/Top';
            if(hashArray.length === 1)
            {
                ScrollListener.scrollTo(0);
            }
            else if(hashArray.length === 2)
            {
                scrollToHash = hashArray[1];
                if(scrollToHash) contentClass.toContent(scrollToHash);
            }

            if(_hashQueue)
            {
                _hashQueue = false;

                onHashChange();
            }
        }
    }

    function onScrolling(bound)
    {
        var navHeight = 98,
            isPinMode = bound.top > navHeight;

        $doms.nav.toggleClass("pin-mode", isPinMode);



    }

}());