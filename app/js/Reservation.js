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

                $doms.fields =
                {
                    name: $doms.container.find(".field .name"),
                    phone: $doms.container.find(".field .phone"),
                    date: $doms.container.find(".field .date"),
                    time: $doms.container.find(".field .time"),
                    birth_date: $doms.container.find(".field .birth-date"),
                    email: $doms.container.find(".field .e-mail"),
                    memo: $doms.container.find(".field .memo")
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

                $doms.fields.date.daterangepicker
                ({
                    locale: locale,
                    opens: "center",
                    singleDatePicker: true
                });

                $doms.fields.birth_date.daterangepicker
                ({
                    //buttonClasses: 'dp-btn',
                    locale: locale,
                    opens: "center"
                });

                $doms.btnSend = $doms.container.find(".btn-send").on("click", function(event)
                {
                    event.preventDefault();

                    var formObj = checkForm();

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
                                alert("預約成功文案");

                                self.reset();
                            }

                        }, null, true);
                    }
                });

                $doms.container.detach();
            }
        },

        toContent: function (hash)
        {
        },

        reset: function()
        {
            $doms.fields.name[0].value = '';
            $doms.fields.phone[0].value = '';
            $doms.fields.date[0].value = '';
            $doms.fields.time[0].selectedIndex = 0;
            $doms.fields.birth_date[0].value = '';
            $doms.fields.email[0].value = '';
            $doms.fields.memo[0].value = '';
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

        }
    };

    function checkForm()
    {
        var formObj={};
        var dom;


        //console.log($doms.fields.memo[0].value);

        dom = $doms.fields.name[0];
        if(PatternSamples.onlySpace.test(dom.value))
        {
            alert('請輸入您的名字'); dom.focus(); return;
        }else formObj.name = dom.value;

        //dom = $doms.fields.phone[0];
        //if(!PatternSamples.phone.test(dom.value))
        //{
        //    alert('請輸入正確的手機號碼'); dom.focus(); return;
        //}
        //else formObj.phone = dom.value;


        dom = $doms.fields.phone[0];
        if(PatternSamples.onlySpace.test(dom.value))
        {
            alert('請輸入連絡電話'); dom.focus(); return;
        }
        else formObj.phone = dom.value;

        dom = $doms.fields.date[0];
        if(PatternSamples.onlySpace.test(dom.value))
        {
            alert('請輸入希望參觀日期'); dom.focus(); return;
        }
        else formObj.date = dom.value;

        formObj.time = $doms.fields.time[0].value;

        dom = $doms.fields.birth_date[0];
        if(PatternSamples.onlySpace.test(dom.value))
        {
            alert('請輸入預產期'); dom.focus(); return;
        }
        else formObj.birth_date = dom.value;

        dom = $doms.fields.email[0];
        if(!PatternSamples.email.test(dom.value))
        {
            alert('請輸入正確的電子郵件信箱'); dom.focus(); return;
        }
        else formObj.email = dom.value;

        formObj.memo = $doms.fields.memo[0].value;

        //console.log(formObj);

        return formObj;

    }
}());