/**
 * Created by sav on 2018/10/2.
 */
(function(){

    var _loadedTemplates = {},
        _version = '0',
        _Loading = null;

    var self = window.MyLoader =
    {
        init: function(version)
        {
            _version = version;
        },

        loadTemplate: function(imageSetting, templates, cb, keepLoading, hideLoading)
        {
            if(_Loading && !hideLoading) _Loading.show();

            var startWeight = 0, weight = 100;

            if(imageSetting != null)
            {
                Utility.preloadImages(imageSetting.list, loadOne ,function(progress)
                {
                    if(_Loading && !hideLoading) _Loading.progress(progress/100);
                });
            }
            else loadOne(0);

            function loadOne(index)
            {
                if(templates.length == 0)
                {
                    if(_Loading && !hideLoading) _Loading.hide();
                    cb.apply(null); return;
                }
                if(index == null) index = 0;

                var templateSetting = templates[index],
                    url = templateSetting.url,
                    frameDom;

                if(templateSetting.startWeight) startWeight = templateSetting.startWeight;
                if(templateSetting.weight) weight = templateSetting.weight;

                if(_loadedTemplates[url])
                {
                    templateSetting.dom = _loadedTemplates[url];
                    loadComplete();
                }
                else
                {
                    if(_Loading && !hideLoading) _Loading.progress(startWeight *.01);

                    frameDom = document.createElement("div");

                    $(frameDom).load(url + "?v=" + _version, function()
                    {
                        _loadedTemplates[url] = frameDom;

                        var extractClass= templates.extractClass;
                        if(!extractClass) extractClass = "div:first";
                        var extractDom = templateSetting.dom = $(frameDom).find(extractClass)[0];

                        $(extractDom).toggleClass(extractClass, false);

                        $("#invisible-container").append(extractDom);

                        $(extractDom).waitForImages(function()
                        {
                            if(extractDom.parentNode) extractDom.parentNode.removeChild(extractDom);

                            if(_Loading && !hideLoading)
                            {
                                var progress = (startWeight + weight) / 100;
                                _Loading.progress(progress);
                            }

                            loadComplete();
                        }, function(loaded, count)
                        {

                            if(_Loading && !hideLoading)
                            {
                                var progress = (startWeight + loaded/count * weight) / 100;
                                _Loading.progress(progress);
                            }
                        }, true);
                    });
                }

                function loadComplete()
                {
                    index ++;
                    if(index >= templates.length)
                    {
                        if(_Loading && !hideLoading && !keepLoading) _Loading.hide();
                        cb.apply(null);
                    }
                    else loadOne(index);
                }


            }
        }
    };


}());