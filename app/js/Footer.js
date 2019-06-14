/**
 * Created by sav on 2018/10/10.
 */

(function(){

    var $doms = {},
        _linkageData,
        _linkageIndex = 0,
        _isMapOnlyMode = false,
        _isHideMode = true,
        _lat,
        _lng;


    var self = window.Footer =
    {
        init: function()
        {
            $doms.container = $("#footer");

            buildLinkages();
            buildFacebookPage();
            buildGoogleMap();


            if(Hash.getHash() !== "/Login")
            {
                self.toggleHideMode(false);
            }
        },

        toggleMapOnlyMode: function(isMapOnlyMode)
        {
            if(_isMapOnlyMode === isMapOnlyMode) return;
            _isMapOnlyMode = isMapOnlyMode;

            $doms.container.toggleClass('map-only-mode', _isMapOnlyMode);
        },

        toggleHideMode: function(isHideMode)
        {

            if(_isHideMode === isHideMode) return;
            _isHideMode = isHideMode;

            $doms.container.toggleClass('hide-mode', _isHideMode);
        },

        buildGoogleMap: buildGoogleMap,

        resize: function()
        {
            var vp = Main.viewport;
            if(vp.changed)
            {

                updateLinkage();
            }
        }
    };

    function buildLinkages()
    {
        $doms.linkage = $("#linkages");
        $doms.linkageContainer = $doms.linkage.find(".link-item-container");
        $doms.linkageArrowPrev = $doms.linkage.find(".arrow-prev");
        $doms.linkageArrowNext = $doms.linkage.find(".arrow-next");

        ApiProxy.callApi("linkages", {}, "linkages", function(response)
        {
            if(!response)
            {
                $doms.linkage.css("display", "none");

                return;
            }

            _linkageData = response;


            var i,
                dataObj,
                $linkItem;

            for(i=0;i<_linkageData.data_list.length;i++)
            {
                dataObj = _linkageData.data_list[i];
                $linkItem = createLinkItem(dataObj);

            }

            //$doms.linkageContainer.append("<div class='spacer'></div>");

            updateLinkage();

        }, null, true);
    }

    function createLinkItem(dataObj)
    {
        var $linkItem = dataObj.$linkItem = $("<a href='"+dataObj.link+"' target='_blank'><div class='link-item'></div></a>");
        $doms.linkageContainer.append($linkItem);

    }

    function updateLinkageImages()
    {
        if(!_linkageData) return;

        var i,
            dataObj,
            keyword = Main.viewport.index == 0? "mobile": "pc";

        for(i=0;i<_linkageData.data_list.length;i++)
        {
            dataObj = _linkageData.data_list[i];
            dataObj.$linkItem.find("div").css("background-image", "url("+dataObj[keyword]+")");

        }
    }

    function updateLinkage()
    {
        if(!_linkageData) return;

        updateLinkageImages();

        var vp = Main.viewport,
            rowSize = (vp.index == 0)? 2: 5,
            itemWidth = vp.index == 0? 320: 256,
            isScrollNeeded = (_linkageData.data_list.length > rowSize);

        var totalWidth = itemWidth * _linkageData.data_list.length;

        $doms.linkageContainer.width(totalWidth);

        TweenMax.killTweensOf($doms.linkageContainer);

        if(isScrollNeeded)
        {
            _linkageIndex = 0;
            $doms.linkage.toggleClass("centel-mode", false);
            $doms.linkageContainer.css("left", 0).css("margin-left", "");

            updateLinkageIndex();
        }
        else
        {
            $doms.linkage.toggleClass("centel-mode", true);

            var width = parseInt($doms.linkageContainer.width());
            $doms.linkageContainer.css("left", "50%").css("margin-left", -width * .5);

        }
    }

    function updateLinkageIndex()
    {
        var vp = Main.viewport,
            rowSize = vp.index == 0? 2: 5,
            hasPrev = !(_linkageIndex === 0),
            hasNext = ((_linkageData.data_list.length - rowSize - _linkageIndex) > 0);

        console.log(_linkageData.data_list.length - rowSize - _linkageIndex);

        console.log("hasNext = " + hasNext);

        $doms.linkageArrowPrev.toggleClass('hide-mode', !hasPrev);
        $doms.linkageArrowNext.toggleClass('hide-mode', !hasNext);

        $doms.linkageArrowPrev.unbind("click");
        $doms.linkageArrowNext.unbind("click");

        if(hasPrev)
        {
            $doms.linkageArrowPrev.bind("click", function(event)
            {
                event.preventDefault();

                linkageToIndex(_linkageIndex - 1);
            });
        }

        if(hasNext)
        {
            $doms.linkageArrowNext.bind("click", function(event)
            {
                event.preventDefault();

                linkageToIndex(_linkageIndex + 1);
            });

        }
    }

    function linkageToIndex(newIndex)
    {
        _linkageIndex = newIndex;

        var vp = Main.viewport,
            itemWidth = vp.index == 0? 320: 256,
            targetLeft = -_linkageIndex * itemWidth;

        TweenMax.to($doms.linkageContainer, .4,{left: targetLeft});


        updateLinkageIndex();
    }

    function buildFacebookPage()
    {
        //$doms.container.find(".facebook-page").append('<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Flihshingcare%2F&tabs=timeline&width=273&height=370&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=false&appId=" width="273" height="370" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>');
        $doms.container.find(".facebook-page").append('<iframe src="https://www.facebook.com/plugins/page.php?href='+window._fbpage_+'&tabs=timeline&width=273&height=370&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=false&appId=" width="273" height="370" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>');
    }

    function buildGoogleMap(mapContainer, withCustomIcon)
    {
        var mapDom = mapContainer || document.getElementById('map'),
            lat = Number(mapDom.getAttribute('lat')),
            lng = Number(mapDom.getAttribute('lng'));

        if(lat) _lat = lat;
        if(lng) _lng = lng;

        if(!lat) lat = _lat;
        if(!lng) lng = _lng;

        window.initMap = function()
        {
            //var myCenter = {lat: 25.159616, lng: 121.457664};
            var myCenter = {lat: lat, lng: lng};
            var map = new google.maps.Map(mapDom, {
                zoom: 18,
                center: myCenter,
//                disableDefaultUI: true,

                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: true
            });

            var markerIconUrl = 'images/'+window._site_+'/map-marker.png';

            var markerIcon = {
                //url: 'http://local.savorks.com/projects/sid/lishingcare/app/images/taipei/map-marker.png',
                url: markerIconUrl,
                //scaledSize: new google.maps.Size(40, 40),
//                origin: new google.maps.Point(0, 0),
//                anchor: new google.maps.Point(32,65),
                labelOrigin: new google.maps.Point(0,0)
            };

            var marker = new google.maps.Marker({
                position: myCenter,
                map: map,
                //label: 'test label',
                icon: withCustomIcon? markerIcon: null
            });


        };

        $('body').append('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBUz28xZ05DiXZuaR3JqXREm69h_EwjyEY&callback=initMap"></script>');

    }

}());
