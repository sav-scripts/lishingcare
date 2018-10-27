/**
 * Created by sav on 2018/9/28.
 */
(function(){

    var $doms = {},
        //_isScrollFixed = false,
        _isMobileMenuOpen = false,
        _logoutModeOn = false,
        _vipMenuOn = false;

    var self = window.Nav =
    {
        init: function()
        {
            $doms.container = $("#nav");

            window.addEventListener("scroll", function()
            {
                self.resize();
            });



            var $buttonContainer = $doms.buttonContainer = $doms.container.find(".button-group");


            //$doms.container.css
            //({
            //    "left": "",
            //    "margin-left": ""
            //});

            //window.history.pushState({}, "test", '');
            //console.log(window.history.state);

            $doms.menuIcon = $doms.container.find(".menu-icon").on("click", function(event)
            {
                event.preventDefault();

                self.switchMobileOpenMode();
            });

            $doms.logo = $doms.container.find(".logo").on("click", function(event)
            {
                event.preventDefault();

                self.switchMobileOpenMode(false);
                Hash.to('/Index');

            });

            $doms.aboutUs = $buttonContainer.find(".button:nth-child(1)").on("click", function(event)
            {
                event.preventDefault();

                self.switchMobileOpenMode(false);
                //Hash.to('/Index/AboutUs');
                Hash.to('/AboutUs');
            });

            $doms.news = $buttonContainer.find(".button:nth-child(3)").on("click", function(event)
            {
                event.preventDefault();

                self.switchMobileOpenMode(false);
                Hash.to('/News');

            });

            $doms.environmental = $buttonContainer.find(".button:nth-child(5)").on("click", function(event)
            {
                event.preventDefault();

                self.switchMobileOpenMode(false);
                Hash.to('/Environmental');

            });

            $doms.malt = $buttonContainer.find(".button:nth-child(7)").on("click", function(event)
            {
                event.preventDefault();


                self.switchMobileOpenMode(false);
                //Hash.to('/Index/Malt');
                Hash.to('/Malt');

            });

            $doms.care = $buttonContainer.find(".button:nth-child(9)").on("click", function(event)
            {
                event.preventDefault();

                self.switchMobileOpenMode(false);
                Hash.to('/Care');

            });

            $doms.contact = $buttonContainer.find(".button:nth-child(11)").on("click", function(event)
            {
                event.preventDefault();

                self.switchMobileOpenMode(false);
                Hash.to('/Contact');
                //self.toggleLogoutMode(!_logoutModeOn);

            });

            $doms.vip = $buttonContainer.find(".button:nth-child(13)").on("click", function(event)
            {
                event.preventDefault();

                self.toggleVipMenu(!_vipMenuOn);

            });

            /* vip menu */
            $doms.vipMenu = $doms.container.find(".vip-menu");

            $doms.vipMenuCover = $doms.container.find(".vip-menu-cover").on('click', function(event)
            {
                event.preventDefault();

                self.toggleVipMenu(false);
            });

            $doms.vipMenu.find(".button.baby").on("click", function(event)
            {
                event.preventDefault();

                self.switchMobileOpenMode(false);
                self.toggleVipMenu(false);
                Hash.to('/VipBaby/ForParents');

                //Vip.login(function()
                //{
                //    Hash.to('/VipBaby/ForParents');
                //});
            });

            $doms.vipMenu.find(".button.course").on("click", function(event)
            {
                event.preventDefault();

                self.switchMobileOpenMode(false);
                self.toggleVipMenu(false);
                Hash.to('/VipCourse');

            });

            $doms.vipMenu.find(".button.live").on("click", function(event)
            {
                event.preventDefault();

                self.switchMobileOpenMode(false);
                self.toggleVipMenu(false);

            });

            /* logout */
            $doms.logout = $doms.container.find(".btn-logout").on('click', function(event)
            {
                event.preventDefault();

                Vip.logout(function()
                {
                    self.switchMobileOpenMode(false);
                });
            });
        },

        switchMobileOpenMode: function(b)
        {
            if(b === undefined) b = !_isMobileMenuOpen;
            if(_isMobileMenuOpen === b) return;

            _isMobileMenuOpen = b;

            MainPage.setSceneScrollLock(_isMobileMenuOpen);

            $doms.container.toggleClass("open-mode", _isMobileMenuOpen);
        },

        toggleLogoutMode: function(b)
        {
            if(_logoutModeOn === b) return;

            _logoutModeOn = b;
            $doms.container.toggleClass("with-logout-btn", _logoutModeOn);
        },

        toggleVipMenu: function(b)
        {
            if(_vipMenuOn === b) return;

            $doms.vipMenu.toggleClass("mobile-mode", Main.viewport.index === 0);

            _vipMenuOn = b;
            $doms.vipMenu.toggleClass("activated", _vipMenuOn);
            $doms.vipMenuCover.toggleClass("activated", _vipMenuOn);
        },

        getHeight: function()
        {
            return Main.viewport.index === 0? 100: 60;
        },

        resize: function()
        {
            //if(!_isScrollFixed)
            //{
            //    _isScrollFixed = true;
            //    $doms.container.scrollToFixed
            //    ({
            //        preFixed: function()
            //        {
            //
            //            $doms.container.css
            //            ({
            //                "left": "",
            //                "margin-left": ""
            //            });
            //        }
            //    });
            //}
            //console.log("on resize");

            if(Main.viewport.changed)
            {
                $doms.vipMenu.toggleClass("mobile-mode", Main.viewport.index === 0);
            }

            var documentScrollLeft = $(document).scrollLeft();
            if(Main.viewport.width < 1280)
            {
                $doms.container.css
                ({
                    "left": "0",
                    "margin-left": -documentScrollLeft + "px"
                });
            }
            else
            {
                $doms.container.css
                ({
                    "left": "",
                    "margin-left": ""
                });
            }


        }
    };

}());