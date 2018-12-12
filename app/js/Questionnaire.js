(function (pkg)
{
    "use strict";

    var $doms = {},
        _isHiding = true,
        _rawQuestions =
            [
                "1.對本機構提供定型化契約內容是否滿意?",
                "2.對本機構提供母嬰指導衛教內容是否滿意?",
                "3.整體而言，對機構提供「住宿服務是否滿意」?",
                "4.整體而言，對機構提供「人員服務是否滿意」?",
                "5.整體而言，對機構提供「整體服務是否滿意」?",
                "6.是否推薦親朋好友到本機構做月子?",
                "7.若有再次入住的規劃，地點是否考慮本機構?",
                "8.房間空氣調節適中，光線充足?",
                "9.機構所提供的各項設施符合您的需求?",
                "10.房間內地板、走道及洗手間乾淨清潔?"
            ],
        _answerDic =
        {
            0: "很滿意",
            1: "滿意",
            2: "沒意見",
            3: "不滿意",
            4: "很不滿意"
        },
        _questionList = [];


    var self = pkg.Questionnaire =
    {

        init: function (cb)
        {
            $doms.container = $("#questionnaire");

            setupButtons();
            generateQuestions();

            $doms.container.css("visibility", "visible").detach();

            self.Dialog.init();
        },

        show: function (cb)
        {
            if (!_isHiding) return;
            _isHiding = false;


            //MainPage.setSceneScrollLock(true);

            $("body").append($doms.container);

            var tl = new TimelineMax;
            tl.set($doms.container, {autoAlpha: 0});
            tl.to($doms.container, .5, {autoAlpha: 1});
            tl.add(function ()
            {
                if (cb) cb.apply();
            });
        },

        hide: function (cb)
        {
            if (_isHiding) return;
            _isHiding = true;

            //MainPage.setSceneScrollLock(false);

            var tl = new TimelineMax;
            tl.to($doms.container, .5, {autoAlpha: 0});
            tl.add(function ()
            {
                $doms.container.detach();
                if (cb) cb.apply();
            });
        },

        resize: function (width, height, scale)
        {

        }
    };

    function setupButtons()
    {
        $doms.container.find(".btn-close").on("click", function(event)
        {
            event.preventDefault();

            self.hide();
        });

        $doms.container.find(".btn-skip").on("click", function(event)
        {
            event.preventDefault();

            self.hide();
        });

        $doms.container.find(".btn-send").on("click", function(event)
        {
            event.preventDefault();

            var result = getResult();

            if(result)
            {
                //console.log(result);
                Loading.progress('資料送出中...請稍候').show();

                var params =
                {
                    'answers': result
                };

                console.log(params);

                ApiProxy.callApi("questionnaire", params, false, function(response)
                {
                    Loading.hide();

                    if(response.error)
                    {
                        alert(response.error);
                    }
                    else
                    {
                        self.Dialog.flashIn("已送出成功！");
                        self.hide();

                    }

                }, null, true);
            }
            else
            {
                self.Dialog.flashIn('還有題目未填喔！');
            }
        });
    }

    function generateQuestions()
    {
        $doms.questionContainer = $doms.container.find(".question-container");
        var $sample = $doms.questionContainer.find(".question").detach(),
            $question;

        for(var i=0;i<_rawQuestions.length;i++){ generateOne(i); }

        function generateOne(index)
        {
            $question = $sample.clone();
            $doms.questionContainer.append($question);



            $question.find(".left-part").text(_rawQuestions[index]);

            var $options = $question.find(".option"),
                $optionSelect = $question.find(".option-select"),
                obj =
                {
                    $question: $question,
                    value: null
                };

            _questionList[index] = obj;

            $optionSelect.on("change", function()
            {
                //console.log($optionSelect[0].selectedIndex);


                var selectedIndex = $optionSelect[0].selectedIndex - 1;
                obj.value = _answerDic[selectedIndex];

                $options.toggleClass('checked', false);
                $($options[selectedIndex]).toggleClass('checked', true);

            });

            $options.each(function(index, dom)
            {
                var $option = $(dom).on("click", function(event)
                {
                    event.preventDefault();

                    $options.toggleClass('checked', false);
                    $option.toggleClass('checked', true);

                    //console.log($optionSelect[0]);

                    $optionSelect[0].selectedIndex  = index + 1;

                    obj.value = _answerDic[index];
                });
            });


        }
    }

    function getResult()
    {
        var unFilled = false,
            result = [];

        for(var i=0;i<_questionList.length;i++)
        {
            var obj = _questionList[i];
            if(obj.value === null)
            {
                unFilled = true;
                break;
            }

            result[i] = obj.value;
        }

        if(unFilled)
        {
            return false;
        }
        else
        {
            return result;
        }
    }

}(window));

(function (pkg)
{
    var $doms = {},
        _isPlaying = false,
        _isHiding = true;

    var self = pkg.Questionnaire.Dialog =
    {


        init: function (cb)
        {
            $doms.container = $("#questionnaire-dialog");

            $doms.container.css("visibility", "visible").detach();
        },

        setText: function(text)
        {
            $doms.container.find(".text").text(text);
        },

        flashIn: function(text)
        {
            if(_isPlaying) return;

            if(text) self.setText(text);

            _isPlaying = true;

            var tl = new TimelineMax;
            tl.add(self.show);
            tl.add(function()
            {
                self.hide();
                _isPlaying = false;

            }, 2);

        },

        show: function (cb)
        {
            if (!_isHiding) return;
            _isHiding = false;

            $("body").append($doms.container);

            var tl = new TimelineMax;
            tl.set($doms.container, {autoAlpha: 0});
            tl.to($doms.container, .2, {autoAlpha: 1});
            tl.add(function ()
            {
                if (cb) cb.apply();
            });
        },

        hide: function (cb)
        {
            if (_isHiding) return;
            _isHiding = true;

            var tl = new TimelineMax;
            tl.to($doms.container, .7, {autoAlpha: 0});
            tl.add(function ()
            {
                $doms.container.detach();
                if (cb) cb.apply();
            });
        }
    };
}(window));