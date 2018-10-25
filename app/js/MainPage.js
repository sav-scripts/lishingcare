/**
 * Created by sav on 2018/9/28.
 */
(function(){

    var $doms = {},
        _isHashLocking = false,
        _sceneScrollLocking = false,
        _hashQueue = null,

        _lockingScrollTop = 0,
        _contentClassDic = null,
        _currentContentClass = null,
        _$calenderSample;

    var self = window.MainPage =
    {
        isLogin: false,

        init: function()
        {

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
                "/Malt": Malt,
                "/Reservation": Reservation,
                "/Environmental": Environmental,
                "/VipBaby": VipBaby,
                "/VipCourse": VipCourse,
                "/Login": Vip
            };



            Footer.init();
            ImageViewer.init();


            Vip.init(function()
            {
                ScrollListener.init().bind(onScrolling).active();

                checkLoginStatus(function()
                {
                    Hash.init().bind(onHashChange).startListening();
                    onHashChange();
                });
            });

            function checkLoginStatus(cb)
            {

                var hash = Hash.getHash(),
                    hashArray = Hash.analysis();

                var contentClass = _contentClassDic[hashArray[0]];

                Vip.getLoginStatus(function(isLogin)
                {
                    if(contentClass)
                    {
                        if(isLogin)
                        {
                            if(contentClass === Vip)
                            {
                                Hash.to('/Index');
                            }
                        }
                        else
                        {
                            if(contentClass.isVipOnly)
                            {
                                Vip.setHashAfterLogin(hash);
                                Hash.to('/Login');
                            }
                        }
                    }


                    cb.call();
                });
            }

            /*
            loadCalender();
            function loadCalender()
            {
                var frameDom = document.createElement("div");

                $(frameDom).load("./templates/calender.html" + "?v=" + _version, function()
                {
                    var $sample = $(frameDom).find(".my-calender").detach();
                    var calender = new Calender($sample.clone());
                    calender.show();

                });
            }
            */
        },

        getIsHashLocking: function()
        {
            return _isHashLocking;
        },

        blockNoneVipContent: function()
        {
            if(_currentContentClass && _currentContentClass.isVipOnly)
            {
                Hash.to("/Index");
            }
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

        setSceneScrollLock: function(b)
        {
            if(b !== undefined) _sceneScrollLocking = b;

            if(_sceneScrollLocking)
            {
                _lockingScrollTop = $(window).scrollTop();

                $doms.sceneContainer.css
                ({
                    "height": Main.viewport.height,
                    "overflow": 'hidden',
                    "top": -_lockingScrollTop
                });
            }
            else
            {
                $doms.sceneContainer.css
                ({
                    "height": '',
                    "overflow": '',
                    "top": ''
                });

                window.scrollTo($(window).scrollLeft(), _lockingScrollTop);
            }

        },

        resize: function()
        {
            self.setSceneScrollLock();

            ImageViewer.resize();

            if(_currentContentClass && _currentContentClass.resize)
            {
                _currentContentClass.resize();
            }

            if(_currentContentClass)
            {
                self.resetHeight();
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


        var hash = Hash.getHash(),
            hashArray = Hash.analysis();
        if(hashArray.length === 0) hashArray = ['/Index'];

        //console.log(hashArray);

        var contentClass = _contentClassDic[hashArray[0]];

        if(contentClass)
        {
            ImageViewer.hide();
            CourseBooking.hide();

            _isHashLocking = true;

            if(_currentContentClass)
            {

                if(contentClass === _currentContentClass)
                {
                    toContentDetail();
                }
                else
                {
                    oldContentOut(checkVipContent);
                }
            }
            else
            {
                checkVipContent();
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

        function checkVipContent()
        {
            if(contentClass.isVipOnly)
            {
                //console.log('checkVipContent');
                Vip.getLoginStatus(function(isLogin)
                {
                    if(isLogin)
                    {
                        newContentIn();
                    }
                    else
                    {
                        _isHashLocking = false;

                        //console.log(window.history.length);
                        //if(window.history) window.history.back();

                        Vip.setHashAfterLogin(hash);
                        Hash.to('/Login');
                    }
                });
            }
            else
            {
                newContentIn();
            }
        }


        function newContentIn()
        {
            //console.log('newContentIn');

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