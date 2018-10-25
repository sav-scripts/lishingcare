/**
 * Created by sav on 2018/9/28.
 */
(function(){

    var $doms = {},
        _logoutModeOn = false,
        _vipMenuOn = false;

    var self = window.Nav =
    {
        init: function()
        {
            $doms.container = $("#nav");

            //window.addEventListener("scroll", function()
            //{
            //    self.resize();
            //});

            $doms.container.scrollToFixed();

            var $buttonContainer = $doms.buttonContainer = $doms.container.find(".button-group");


            $doms.container.css
            ({
                "left": "",
                "margin-left": ""
            });

            //window.history.pushState({}, "test", '');
            //console.log(window.history.state);

            $doms.logo = $doms.container.find(".logo").on("click", function(event)
            {
                event.preventDefault();

                Hash.to('/Index');

            });

            $doms.aboutUs = $buttonContainer.find(".button:nth-child(1)").on("click", function(event)
            {
                event.preventDefault();

                //Hash.to('/Index/AboutUs');
                Hash.to('/AboutUs');
            });

            $doms.news = $buttonContainer.find(".button:nth-child(3)").on("click", function(event)
            {
                event.preventDefault();

                Hash.to('/News');

            });

            $doms.environmental = $buttonContainer.find(".button:nth-child(5)").on("click", function(event)
            {
                event.preventDefault();

                Hash.to('/Environmental');

            });

            $doms.malt = $buttonContainer.find(".button:nth-child(7)").on("click", function(event)
            {
                event.preventDefault();

                //Hash.to('/Index/Malt');
                Hash.to('/Malt');

            });

            $doms.care = $buttonContainer.find(".button:nth-child(9)").on("click", function(event)
            {
                event.preventDefault();

                Hash.to('/Care');

            });

            $doms.contact = $buttonContainer.find(".button:nth-child(11)").on("click", function(event)
            {
                event.preventDefault();

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

            $doms.vipMenu.find(".button:nth-child(1)").on("click", function(event)
            {
                event.preventDefault();

                self.toggleVipMenu(false);
                Hash.to('/VipBaby/ForParents');

                //Vip.login(function()
                //{
                //    Hash.to('/VipBaby/ForParents');
                //});
            });

            $doms.vipMenu.find(".button:nth-child(3)").on("click", function(event)
            {
                event.preventDefault();

                self.toggleVipMenu(false);
                Hash.to('/VipCourse');

            });

            $doms.vipMenu.find(".button:nth-child(5)").on("click", function(event)
            {
                event.preventDefault();

                self.toggleVipMenu(false);

            });

            /* logout */
            $doms.logout = $doms.container.find(".btn-logout").on('click', function(event)
            {
                event.preventDefault();

                Vip.logout();
            });
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
            /*
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
            */

        }
    };

}());