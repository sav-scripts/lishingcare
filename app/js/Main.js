(function(){

    "use strict";
    var self = window.Main =
    {
        //apiPath: "//apecmonitoradm.sme.gov.tw/api/",
        apiPath: "//admin.lihshing-care.com/taipei/",

        localSettings:
        {
            isLocal: true
        },

        taipei:
        {
            apiPath: "//admin.lihshing-care.com/taipei/"
        },

        taichung:
        {
            apiPath: "//admin.lihshing-care.com/taichung/"
        },

        settings:
        {
            isLocal: false,

            useFakeData: false,
            debug: false,

            isiOS: false,
            isLineBrowser: false,

            liveToken: undefined
        },

        viewport:
        {
            width: 0,
            height: 0,
            ranges: [640],
            index: -1,
            imageType: undefined,
            imageTypeDic:
            {
                "0": "mobile",
                "1": "pc"
            },
            changed: false
        },

        init: function()
        {
            window._version = new Date().getTime();

            if( window.location.host == "local.savorks.com")
            {
                $.extend(self.settings, self.localSettings);
                //Main.settings.useFakeData = true;
            }

            if(Utility.urlParams.usefakedata == '1') Main.settings.useFakeData = true;

            if(Utility.urlParams.mapping == '1')
            {
                $('body').toggleClass('mapping', true);
            }

            if(Utility.urlParams.logger === '1') Logger.init(true).show().open();

            //if(Utility.urlParams.site)
            //{
            //    window._site_ = Utility.urlParams.site;
            //}

            if(window._site_ === 'taichung')
            {
                self.apiPath = self.taichung.apiPath;
            }

            ApiProxy.setApiPath(self.apiPath);


            self.settings.isLineBrowser = Boolean(navigator.userAgent.match('Line'));

            self.settings.isiOS = Utility.isiOS();
            window._CLICK_ = (self.settings.isiOS)? "touchend": "click";

            ApiProxy.init(window._FAKE_DATA_);



            if(Utility.urlParams['live'])
            {
                self.settings.liveToken = Utility.urlParams['live'];

                //VipLive.validTokenExist(self.settings.liveToken, function(isExist)
                //{
                //
                //});
            }


            MyLoader.init(window._version, MainPage.updateContentBySite);
            Nav.init();
            MainPage.init();

            $(window).on("resize", onResize);
            onResize();
        }
    };

    function onResize()
    {

        var vp = self.viewport,
            oldIndex = vp.index;

        //vp.width = $(window).width();
        //vp.height = $(window).height();

        //console.log($(window).width() / window.innerWidth);

        //console.log("innerWidth: " + window.innerWidth + ", innerHeight: " + window.innerHeight);
        //console.log("screenWidth: " + window.screen.width + ", screenHeight: " + window.screen.height);
        //
        //var minHeight = window.innerWidth * window.screen.height / window.screen.width;
        //console.log("min height: " + minHeight);
        //$("#scene-container").css("min-height", minHeight);

        //if($(window).width() / window.innerWidth === 1)
        //{
        //    $("#scene-container").css("min-height", window.innerHeight);
        //    //console.log(window.innerHeight);
        //}
        //else
        //{
        //    $("#scene-container").css("min-height", '');
        //}

        vp.width = window.innerWidth;
        vp.height = window.innerHeight;
        vp.index = vp.width <= vp.ranges[0]? 0: 1;

        vp.changed = oldIndex !== vp.index;

        if(vp.changed)
        {
            vp.imageType = vp.imageTypeDic[vp.index];
        }

        MainPage.resize();
        Nav.resize();
    }

}());
