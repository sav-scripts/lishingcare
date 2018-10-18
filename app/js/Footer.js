/**
 * Created by sav on 2018/10/10.
 */

(function(){

    var $doms = {},
        _isMapOnlyMode = false;

    var self = window.Footer =
    {
        init: function()
        {
            $doms.container = $("#footer");

            buildGoogleMap();
        },

        toggleMapOnlyMode: function(isMapOnlyMode)
        {
            if(_isMapOnlyMode === isMapOnlyMode) return;
            _isMapOnlyMode = isMapOnlyMode;

            $doms.container.toggleClass('map-only-mode', _isMapOnlyMode);
        }
    };



    function buildGoogleMap()
    {
        var mapDom = document.getElementById('map');

        window.initMap = function()
        {
            var myCenter = {lat: 25.159616, lng: 121.457664};
            var map = new google.maps.Map(mapDom, {
                zoom: 17,
                center: myCenter,
//                disableDefaultUI: true,

                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: true
            });


            var markerIcon = {
                url: 'http://image.flaticon.com/icons/svg/252/252025.svg',
                scaledSize: new google.maps.Size(40, 40),
//                origin: new google.maps.Point(0, 0),
//                anchor: new google.maps.Point(32,65),
                labelOrigin: new google.maps.Point(20,-20)
            };

            var marker = new google.maps.Marker({
                position: myCenter,
                map: map
            });
        };

        $('body').append('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBUz28xZ05DiXZuaR3JqXREm69h_EwjyEY&callback=initMap"></script>');

    }

}());
