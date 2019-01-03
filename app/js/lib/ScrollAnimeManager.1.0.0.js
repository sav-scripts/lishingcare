/**
 * Created by sav on 2018/12/13.
 */
(function(){

    var _registedDic = {};

    var self = window.ScrollAnimeManager =
    {
        regist: function(id)
        {
            if(!_registedDic[id]) _registedDic[id] = {};
        },

        registAnime: function(id, animeName, timeline, topTest, bottomTest)
        {
            if(!_registedDic[id]) self.regist(id);

            var registObj = _registedDic[id];

            if(topTest)
            {
                if(isElement(topTest))
                {
                    topTest = {dom: topTest, topOffset: 0, bottomOffset: 0};
                }
                if(!topTest.topOffset) topTest.topOffset = 0;
                if(!topTest.bottomOffset) topTest.bottomOffset = 0;
            }

            if(bottomTest)
            {
                if(isElement(bottomTest))
                {
                    bottomTest = {dom: bottomTest, topOffset: 0, bottomOffset: 0};
                }

                if(!bottomTest.topOffset) bottomTest.topOffset = 0;
                if(!bottomTest.bottomOffset) bottomTest.bottomOffset = 0;
            }

            registObj[animeName] =
            {
                played: false,
                name: animeName,
                timeline: timeline,
                topTest: topTest,
                bottomTest: bottomTest
            };
        },

        completeAll: function(id)
        {
            if(!_registedDic[id])
            {
                console.error("id: [" + id + "] is not registed");
                return;
            }

            var registObj = _registedDic[id];

            var animeName, obj;

            for(animeName in registObj)
            {
                obj = registObj[animeName];
                obj.played = true;
                obj.timeline.progress(1);
                obj.timeline.pause();
            }
        },

        switchListener: function(id, switchOn)
        {
            if(!_registedDic[id])
            {
                console.error("id: [" + id + "] is not registed");
                return;
            }

            var registObj = _registedDic[id];

            if(switchOn)
            {
                ScrollListener.addListener(id, onScroll);

                //self._tlTitle._played = false;
                //self._tlTitle.time(0);

                var animeName, obj;

                for(animeName in registObj)
                {
                    obj = registObj[animeName];
                    obj.played = false;
                    //obj.timeline.time(0);
                    obj.timeline.restart();
                    obj.timeline.pause();
                }

                onScroll();
            }
            else
            {
                ScrollListener.removeListener(id);
            }

            function onScroll()
            {
                var animeName, obj;

                for(animeName in registObj)
                {
                    obj = registObj[animeName];
                    if(!obj.played)
                    {
                        var topCheck = obj.topTest? ScrollListener.testDom(obj.topTest.dom, obj.topTest.topOffset, obj.topTest.bottomOffset).topInside: true,
                            bottomCheck = obj.bottomTest? ScrollListener.testDom(obj.bottomTest.dom, obj.bottomTest.topOffset, obj.bottomTest.bottomOffset).bottomInside: true;

                        //console.log(ScrollListener.testDom(obj.topTestDom, obj.topTestOffset, 0));
                        //console.log(obj.topTestOffset);

                        if(topCheck && bottomCheck)
                        {
                            obj.played = true;
                            obj.timeline.restart();
                        }
                    }
                }
            }
        }
    };

    function isElement(obj) {
        try {
            //Using W3 DOM2 (works for FF, Opera and Chrome)
            return obj instanceof HTMLElement;
        }
        catch(e){
            //Browsers not supporting W3 DOM2 don't have HTMLElement and
            //an exception is thrown and we end up here. Testing some
            //properties that all elements have (works on IE7)
            return (typeof obj==="object") &&
                (obj.nodeType===1) && (typeof obj.style === "object") &&
                (typeof obj.ownerDocument ==="object");
        }
    }

}());