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

                $item.find(".time").text(eventData.time);
                $item.find(".name").text(eventData.name);
                $item.find(".teacher").text(eventData.teacher);

                var $memo = $item.find(".memo");

                if(eventData.memo)
                {
                    $memo.html(eventData.memo);
                }
                else
                {
                    $memo.detach();
                }

                var $itemBtn = $item.find(".item-btn");

                if(eventData.is_book_able == 'true')
                {
                    if(eventData.is_booked == 'true')
                    {
                        $itemBtn.toggleClass("cancel-mode", true);
                    }

                }
                else
                {
                    $itemBtn.toggleClass("full-mode", true);
                }



                $itemBtn.on("click", function(event)
                {
                    event.preventDefault();

                    if(eventData.is_book_able != 'true')
                    {
                        alert("這項課程的預約人數已滿喔!");
                        return;
                    }


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

                        if(response.error === 'is_full')
                        {
                            eventData.is_book_able = false;
                            $itemBtn.toggleClass("cancel-mode", false);
                            $itemBtn.toggleClass("full-mode", true);
                            //$item.toggleClass('booked', (eventData.is_booked == 'true'));
                        }
                        else if(response.error === "not_login")
                        {
                            Hash.to("/Login");
                        }
                        else if(!response.error)
                        {
                            eventData.is_booked = targetBookStatus;
                            $itemBtn.toggleClass("full-mode", false);
                            $itemBtn.toggleClass("cancel-mode", eventData.is_booked == 'true');
                            //$item.toggleClass('booked', (eventData.is_booked == 'true'));
                        }

                    }, null, true);
                });


            }

            return self;
        },

        show: function (cb)
        {
            if (!_isHiding) return;
            _isHiding = false;

            $("body").append($doms.container);

            MainPage.setSceneScrollLock(true);

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

            MainPage.setSceneScrollLock(false);

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