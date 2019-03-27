/**
 * Created by sav on 2019/1/9.
 */
(function(){

    var _isHiding = true,
        _isInit = false,
        _qrcode,
        _qrcodeUrl,
        $doms = {};

    var self = window.LiveQrcode =
    {
        init: function($container)
        {
            if(_isInit) return;
            _isInit = true;

            $doms.container = $container;

            $doms.container.find(".btn-close").on("click", hideSelf);
            $doms.container.find(".btn-close-2").on("click", hideSelf);



            //$doms.btnDownload = $doms.container.find(".btn-download");

            $doms.btnDownload = $doms.container.find(".btn-download").on("click", function(event)
            {
                event.preventDefault();

                //window.open(_qrcodeUrl);
                //return;

                var canvas = $doms.qrCodeBlock.find("canvas")[0];

                //window.open(canvas.toDataURL("image/png"));
                //window.open("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oMCRUiMrIBQVkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAADElEQVQI12NgoC4AAABQAAEiE+h1AAAAAElFTkSuQmCC", "_blank");

                //return;

                var uri = canvas.toDataURL("image/png");

                if(Main.settings.isiOS)
                {
                    window.open(uri);
                }
                else
                {
                    var a = $("<a>")
                        .attr("href", uri)
                        .attr("download", "qrcode.png")
                        .appendTo("body");

                    a[0].click();

                    a.remove();
                }
            });


            function hideSelf(event)
            {
                event.preventDefault();

                self.hide();
            }

            $doms.qrCodeBlock = $doms.container.find(".qr-code");
            _qrcode = new QRCode($doms.qrCodeBlock[0], {
                text: 'empty',
                width: 340,
                height: 340,
                colorDark : "#000000",
                colorLight : "#fef6ea"
            });

            $container.css('display', 'block').detach();

            $doms.parent = $('body');
        },

        setQrcode: function(qrcodeUrl)
        {
            _qrcodeUrl = qrcodeUrl;
            _qrcode.makeCode(_qrcodeUrl);

            //$doms.qrCodeBlock.find("img").on("click", function(event)
            //{
            //    event.preventDefault();
            //
            //    window.open(_qrcodeUrl, "_blank");
            //});
        },

        show: function (cb)
        {
            if (!_isHiding) return;
            _isHiding = false;

            $doms.parent.append($doms.container);

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

            var tl = new TimelineMax;
            tl.to($doms.container, .5, {autoAlpha: 0});
            tl.add(function ()
            {
                $doms.container.detach();
                if (cb) cb.apply();
            });
        }
    };

}());