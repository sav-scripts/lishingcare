(function ()
{

    var $doms,
        _isInit = false,
        _data,
        _calender,
        _isHiding = true;

    var self = window.VipCourse =
    {
        $doms: undefined,

        isVipOnly: true,

        getCalender: function()
        {
            return _calender;
        },

        init: function (onReady)
        {
            if (_isInit)
            {
                onReady.call();
                return;
            }

            self.$doms = $doms = {};

            var templates =
                [
                    {url: "templates/_vip_course.html", startWeight: 0, weight: 100, dom: null}
                ];

            MyLoader.loadTemplate(null, templates, function loadComplete()
            {
                build(templates, function()
                {
                    _isInit = true;
                    onReady.apply(null);
                });

            }, 0);

            function build(templates, cb)
            {
                $("#invisible-container").append(templates[0].dom);
                $doms.parent = $("#scene-container").find(".content-container");
                $doms.container = $("#vip-course");

                CourseBooking.init();

                $doms.calenderContainer = $doms.container.find(".calender-container");

                /* load calender */
                (function(){
                    var frameDom = document.createElement("div");

                    $(frameDom).load("./templates/calender.html" + "?v=" + _version, function()
                    {
                        var $sample = $(frameDom).find(".my-calender").detach();
                        _calender = new Calender($sample.clone(), null, $doms.calenderContainer, onDateClicked);
                        _calender.show();

                        updateCalenderSize();

                        loadCourseData();
                    });

                }());

                function loadCourseData()
                {
                    ApiProxy.callApi("vip_course", {}, false, function(response)
                    {
                        _data = response;

                        //_data.course_list = [];

                        for(var i=0;i<_data.course_list.length;i++)
                        {
                            var obj = _data.course_list[i];
                            obj.year = parseInt(obj.year);
                            obj.month = parseInt(obj.month);
                            obj.day = parseInt(obj.day);
                            _calender.addEvent(obj);
                        }

                        _calender.toEventByIndex(0);

                        end();
                    });
                }

                function end()
                {
                    $doms.container.detach();
                    cb.call();
                }
            }

            function onDateClicked(eventDataArray)
            {
                //console.log("clicked");
                CourseBooking.update(eventDataArray).show();
            }
        },

        toContent: function (hash)
        {
        },

        show: function (cb)
        {
            if (!_isHiding)
            {
                cb.call();
                return;
            }

            $doms.parent.append($doms.container);

            var tl = new TimelineMax;
            tl.set($doms.container, {autoAlpha: 0});
            tl.to($doms.container, .4, {autoAlpha: 1});
            tl.add(function ()
            {
                _isHiding = false;
                if (cb) cb.call();
            });
        },

        hide: function (cb)
        {
            if (_isHiding)
            {
                cb.call();
                return;
            }

            var tl = new TimelineMax;
            tl.to($doms.container, .4, {autoAlpha: 0});
            tl.add(function ()
            {
                _isHiding = true;
                $doms.container.detach();
                if (cb) cb.call();
            });

        },

        resize: function()
        {
            if(Main.viewport.changed)
            {
                updateCalenderSize();
            }
        }
    };

    function updateCalenderSize()
    {
        var calenderWidth = $doms.calenderContainer.find(".my-calender").width();
        $doms.calenderContainer.width(calenderWidth);

    }
}());