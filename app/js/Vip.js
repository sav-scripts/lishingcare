/**
 * Created by sav on 2018/10/19.
 */
(function(){

    var _isUIOn = false,
        _captchaToken,
        _isLogin = false,
        _isInit = false,
        _isHiding = true,
        _hashAfterLogin,
        _testLoginIsDone = false,
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

                    var params =
                    {
                        'name': $doms.userNameInput[0].value,
                        'password': $doms.passwordInput[0].value,
                        'g_recaptcha_response': _captchaToken
                    };

                    console.log(params);

                    ApiProxy.callApi("login", params, false, function(response)
                    {
                        if(response.error)
                        {
                            self.reset();
                        }
                        else
                        {
                            if(Main.settings.useFakeData)
                            {
                                window._FAKE_DATA_.login_status.status = 'true';
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
                                    console.error("got un login status after a successful login, this should't happen");
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
            ApiProxy.callApi("login_status", {}, false, function(response)
            {
                console.log('login status: ' + response.status);

                if(response.status == 'true')
                {
                    _isLogin = true;
                    Nav.toggleLogoutMode(true);
                }
                else
                {
                    _isLogin = false;
                    Nav.toggleLogoutMode(false);
                }

                if(cb) cb.call(null, _isLogin);
            });
        },

        reset: function()
        {
            _captchaToken = null;
            grecaptcha.reset();
        },


        logout: function()
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

            });
        },

        show: function (cb)
        {
            if (!_isHiding)
            {
                cb.call();
                return;
            }

            Footer.toggleHideMode(true);

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
                Footer.toggleHideMode(false);

                _isHiding = true;
                $doms.container.detach();
                if (cb) cb.call();
            });

        }
    };


}());