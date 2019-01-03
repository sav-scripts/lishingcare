/**
 * Created by sav on 2018/10/19.
 */
(function(){

    var _captchaToken,
        _isLogin = false,
        _isInit = false,
        _isHiding = true,
        _hashAfterLogin,
        _testLoginIsDone = false,
        _vip_token,
        $doms;

    var self = window.Vip =
    {
        $doms: undefined,

        setHashAfterLogin: function(hash)
        {
            _hashAfterLogin = hash;
        },

        init: function(onReady)
        {

            if (_isInit)
            {
                onReady.call();
                return;
            }

            self.$doms = $doms = {};

            window.onCaptchaDone = function(response)
            {
                // g-recaptcha-response
                _captchaToken = response;

                console.log('got g-recaptcha-response: ' + response);
            };

            /*
            ApiProxy.callApi("login_status", {}, false, function(response)
            {
                if(response.status == 'true')
                {
                    _isLogin = true;
                    Nav.toggleLogoutMode(true);
                }

                build();

                _isInit = true;
                onReady.call();
            });
            */


            build();

            _isInit = true;
            onReady.call();

            function build()
            {
                $doms.container = $("#login-ui");
                $doms.parent = $("#scene-container").find(".content-container");

                $doms.userNameInput = $doms.container.find(".user-name-input");
                $doms.passwordInput = $doms.container.find(".password-input");

                $doms.btnSend = $doms.container.find(".btn-send").on("click", function(event)
                {
                    event.preventDefault();

                    if(!_captchaToken)
                    {
                        alert("請先完成驗證");

                        return;
                    }

                    Loading.progress('登入中...請稍候').show();

                    var params =
                    {
                        'name': $doms.userNameInput[0].value,
                        'password': $doms.passwordInput[0].value,
                        'g_recaptcha_response': _captchaToken
                    };

                    console.log(params);

                    ApiProxy.callApi("login", params, false, function(response)
                    {
                        Loading.hide();

                        if(response.error)
                        {
                            self.reset();
                            alert(response.error);
                        }
                        else
                        {
                            if(Main.settings.useFakeData)
                            {
                                window._FAKE_DATA_.login_status.status = 'true';
                            }

                            if(response.pop_questionnaire === "true")
                            {
                                Questionnaire.show();
                            }

                            self.getLoginStatus(function(isLogin)
                            {
                                if(isLogin)
                                {
                                    if(_hashAfterLogin)
                                    {
                                        Hash.to(_hashAfterLogin);
                                    }
                                    else
                                    {
                                        Hash.to("/Index");
                                    }
                                }
                                else
                                {
                                    console.error("got false login status after a successful login, this should't happen");
                                }
                            });
                        }

                    }, null, true);
                });

                $doms.container.detach();

                //self.showLoginUI();
            }
        },

        login: function(onLogin)
        {
        },

        getLoginStatus: function(cb)
        {
            //console.log("Vip getLoginStatus called");
            ApiProxy.callApi("login_status", {}, false, function(response)
            {
                //console.log('login status: ' + response.status);

                if(response.status == 'true')
                {
                    _isLogin = true;
                    _vip_token = response.vip_token;
                    Nav.toggleLogoutMode(true);
                }
                else
                {
                    _isLogin = false;
                    _vip_token = null;
                    Nav.toggleLogoutMode(false);
                }

                if(cb) cb.call(null, _isLogin);
            });
        },

        getVipToken: function()
        {
            return _vip_token;
        },

        reset: function()
        {
            _captchaToken = null;
            grecaptcha.reset();
            $doms.userNameInput[0].value = '';
            $doms.passwordInput[0].value = '';
        },


        logout: function(onSuccess)
        {
            if(MainPage.getIsHashLocking()) return;

            ApiProxy.callApi("logout", {}, false, function()
            {
                _isLogin = false;

                if(Main.settings.useFakeData)
                {
                    window._FAKE_DATA_.login_status.status = 'false';
                }


                if(Main.settings.useFakeData)
                {
                    _testLoginIsDone = false;
                }

                Nav.toggleLogoutMode(false);

                MainPage.blockNoneVipContent();

                if(onSuccess) onSuccess.call();

            });
        },

        show: function (cb)
        {
            if (!_isHiding)
            {
                cb.call();
                return;
            }

            _isHiding = false;

            self.resize();

            Footer.toggleHideMode(true);

            $doms.parent.append($doms.container);

            var tl = new TimelineMax;
            tl.set($doms.container, {autoAlpha: 0});
            tl.to($doms.container, .4, {autoAlpha: 1});
            tl.add(function ()
            {
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
                Footer.toggleHideMode(false);

                _isHiding = true;

                MainPage.setContentMaskMinHeight(true);
                $doms.container.css("height", '');


                $doms.container.detach();
                if (cb) cb.call();
            });

        },

        resize: function()
        {
            if(!_isHiding)
            {
                var minHeight = MainPage.setContentMaskMinHeight();
                if(minHeight)
                {
                    $doms.container.css("height", minHeight);
                }
            }
        }
    };

}());