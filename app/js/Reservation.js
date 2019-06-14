(function ()
{

    var $doms,
        _isInit = false,
        _isHiding = true;

    var self = window.Reservation =
    {
        $doms: undefined,

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
                    {url: "templates/_reservation.html", startWeight: 0, weight: 100, dom: null}
                ];

            MyLoader.loadTemplate(null, templates, function loadComplete()
            {
                build(templates);
                _isInit = true;
                onReady.apply(null);

            }, 0);

            function build(templates)
            {
                $("#invisible-container").append(templates[0].dom);
                $doms.parent = $("#scene-container").find(".content-container");
                $doms.container = $("#reservation");

                
                setupDom($doms.container);

                $doms.container.detach();
            }
        },

        toContent: function (hash)
        {
        },

        reset: function($fields)
        {
            $fields.name[0].value = '';
            $fields.phone[0].value = '';
            $fields.date[0].value = '';
            $fields.time[0].selectedIndex = 0;
            $fields.birth_date[0].value = '';
            $fields.email[0].value = '';
            $fields.memo[0].value = '';
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

        setupDom: setupDom
    };
    
    function setupDom($container)
    {
        
        
        var $fields =
        {
            name: $container.find(".field .name"),
            phone: $container.find(".field .phone"),
            date: $container.find(".field .date"),
            time: $container.find(".field .time"),
            birth_date: $container.find(".field .birth-date"),
            email: $container.find(".field .e-mail"),
            memo: $container.find(".field .memo")
        };

        var locale =
        {
            "format": "YYYY-MM-DD",
            "separator": " - ",
            "applyLabel": "套用",
            "cancelLabel": "取消",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "weekLabel": "W",
            "daysOfWeek": [
                "Su",
                "Mo",
                "Tu",
                "We",
                "Th",
                "Fr",
                "Sa"
            ],
            "monthNames": [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            "firstDay": 1
        };

        $fields.date.daterangepicker
        ({
            locale: locale,
            opens: "center",
            singleDatePicker: true
        });

        $fields.birth_date.daterangepicker
        ({
            //buttonClasses: 'dp-btn',
            locale: locale,
            opens: "center"
        });

        $container.find(".btn-send").on("click", function(event)
        {
            event.preventDefault();

            var formObj = checkForm($fields);

            if(formObj)
            {
                ApiProxy.callApi("reservation", formObj, false, function(response)
                {
                    if(response.error)
                    {
                        alert(response.error);
                    }
                    else
                    {
                        alert("謝謝您的預約，將有專人與您聯繫。");

                        self.reset($fields);
                    }

                }, null, true);
            }
        });
    }

    function checkForm($fields)
    {
        var formObj={};
        var dom;


        //console.log($fields.memo[0].value);

        dom = $fields.name[0];
        if(PatternSamples.onlySpace.test(dom.value))
        {
            alert('請輸入您的名字'); dom.focus(); return;
        }else formObj.name = dom.value;

        //dom = $fields.phone[0];
        //if(!PatternSamples.phone.test(dom.value))
        //{
        //    alert('請輸入正確的手機號碼'); dom.focus(); return;
        //}
        //else formObj.phone = dom.value;


        dom = $fields.phone[0];
        if(PatternSamples.onlySpace.test(dom.value))
        {
            alert('請輸入連絡電話'); dom.focus(); return;
        }
        else formObj.phone = dom.value;

        dom = $fields.date[0];
        if(PatternSamples.onlySpace.test(dom.value))
        {
            alert('請輸入希望參觀日期'); dom.focus(); return;
        }
        else formObj.date = dom.value;

        formObj.time = $fields.time[0].value;

        dom = $fields.birth_date[0];
        if(PatternSamples.onlySpace.test(dom.value))
        {
            alert('請輸入預產期'); dom.focus(); return;
        }
        else formObj.birth_date = dom.value;

        dom = $fields.email[0];
        if(!PatternSamples.email.test(dom.value))
        {
            alert('請輸入正確的電子郵件信箱'); dom.focus(); return;
        }
        else formObj.email = dom.value;

        formObj.memo = $fields.memo[0].value;

        //console.log(formObj);

        return formObj;

    }
}());