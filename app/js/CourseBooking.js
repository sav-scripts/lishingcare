/**
 * Created by sav on 2018/10/22.
 */
(function(){

    var $doms = {},
        _isHiding = true;

    var self = window.CourseBooking =
    {
        init: function()
        {
            $doms.container = $("#course-booking");

            //$doms.container.find(".container").on("click", function(event)
            //{
            //    event.preventDefault();
            //
            //    if(event.target.className === 'middle-wrapper')
            //    {
            //        self.hide();
            //    }
            //
            //});

            $doms.itemContainer = $doms.container.find(".item-container");
            $doms.itemSample = $doms.itemContainer.find(".item:nth-child(1)");
            $doms.itemContainer.empty();

            $doms.container.find(".btn-confirm").on("click", function(event)
            {
                event.preventDefault();

                VipCourse.getCalender().updateDate();
                self.hide();

            });

            //$doms.container.find(".btn-cancel").on("click", function(event)
            //{
            //    event.preventDefault();
            //
            //    self.hide();
            //
            //});

            $doms.container.detach();

            //self.show();
        },

        update: function(courseArray)
        {
            $doms.itemContainer.empty();

            var i;

            for(i=0;i<courseArray.length;i++){ createItem(i);}

            function createItem(index)
            {
                var eventData = courseArray[index],
                    $item = $doms.itemSample.clone();

                $doms.itemContainer.append($item);

                $item.find(".time .detail").text(eventData.time);
                $item.find(".name .detail").text(eventData.name);

                $item.toggleClass('booked', (eventData.is_booked == 'true'));

                $item.on("click", function(event)
                {
                    event.preventDefault();

                    var targetBookStatus = eventData.is_booked == 'true'? 'false': 'true';

                    var params =
                    {
                        "course_id": eventData.id,
                        "set_to_booked": targetBookStatus
                    };


                    Loading.progress("更新中...").show();

                    ApiProxy.callApi("vip_course_booking", params, false, function(response)
                    {
                        Loading.hide();
                        eventData.is_booked = targetBookStatus;
                        $item.toggleClass('booked', (eventData.is_booked == 'true'));

                    });
                });


            }

            return self;
        },

        show: function (cb)
        {
            if (!_isHiding) return;
            _isHiding = false;

            $("body").append($doms.container);

            //MainPage.setSceneScrollLock(true);

            var tl = new TimelineMax;
            tl.set($doms.container, {autoAlpha: 0});
            tl.to($doms.container, .4, {autoAlpha: 1});
            tl.add(function ()
            {
                if (cb) cb.apply();
            });

            return self;
        },

        hide: function (cb)
        {
            if (_isHiding) return;
            _isHiding = true;

            //MainPage.setSceneScrollLock(false);

            var tl = new TimelineMax;
            tl.to($doms.container, .4, {autoAlpha: 0});
            tl.add(function ()
            {
                $doms.container.detach();
                if (cb) cb.apply();
            });

            return self;
        },

        resize: function ()
        {

        }
    };


}());