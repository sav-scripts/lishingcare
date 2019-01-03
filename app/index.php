<?php

$taichunt_hosts = array("taichung.lihshing-care.com");
$isTaichung = false;
//$isTaichung = true;

if(in_array($_SERVER['HTTP_HOST'], $taichunt_hosts))
{
    $isTaichung = true;
}

if($isTaichung === false)
{
    $site = 'taipei';
    $site_shortname = 'tp';
    $address = '新北市淡水區淡金路6號1樓';
    $googleMap = "https://www.google.com.tw/maps/place/251%E6%96%B0%E5%8C%97%E5%B8%82%E6%B7%A1%E6%B0%B4%E5%8D%80%E6%B7%A1%E9%87%91%E8%B7%AF6%E8%99%9F/@25.1594371,121.4571995,19.46z/data=!4m5!3m4!1s0x3442afed7ac9b59d:0xae71800ff13829f4!8m2!3d25.1596106!4d121.4576637";
    $mapLat = '25.159616';
    $mapLng = '121.457664';
    $fb_name = '麗格產後護理之家';
    $facebookPageLink = 'https://www.facebook.com/%E9%BA%97%E6%A0%BC%E7%94%A2%E5%BE%8C%E8%AD%B7%E7%90%86%E4%B9%8B%E5%AE%B6-2169925723254680/';
}
else
{
    $site = 'taichung';
    $site_shortname = 'tc';
    $address = '台中市北區太平路75巷30號1樓';
    $googleMap = "https://www.google.com.tw/maps/place/%E9%BA%97%E9%A6%A8%E7%94%A2%E5%BE%8C%E8%AD%B7%E7%90%86%E4%B9%8B%E5%AE%B6/@24.1467657,120.6826545,20.04z/data=!4m13!1m7!3m6!1s0x34693d6bff1bc24d:0x7ca78975e7752c95!2zNDA05Y-w5Lit5biC5YyX5Y2A5aSq5bmz6LevNzXlt7czMOiZnzE!3b1!8m2!3d24.1466367!4d120.6834572!3m4!1s0x34693d4b337c1781:0xf3123139becf9b89!8m2!3d24.1466288!4d120.6832273";
    $mapLat = '24.146638';
    $mapLng = '120.683228';
    $fb_name = '麗馨產後護理之家';
    $facebookPageLink = 'https://www.facebook.com/lihshingcare/';
}


//$site = '';
//$site_shortname = 'tp';
$site_name = '麗格產後護理之家';
$meta_title = '麗格產後護理之家';
$meta_description = '';
$meta_keyword = '';
$meta_url = '';
$service_email = '';
$ga_id = '';
$copyright = 'CopyRight (c) 2018　LIHSIN POSTPARTUM CAREー All Rights Reserved.';

$tel = '0286269555';
$telText = '02-8626-9555';

//@include dirname(__FILE__)."/site_setting.php";

$test_hosts = array("local.savorks.com");
if(!in_array($_SERVER['HTTP_HOST'], $test_hosts))
{
    @include dirname(__FILE__)."/api/information_".$site_shortname.".php";
}


?>

<!DOCTYPE html>
<html>
<head lang="en">
    <title><?=$site_name?></title>

    <meta property="og:title" content="<?=$meta_title?>" />
    <meta property="og:keyword" content="<?=$meta_keyword?>" />
    <meta property="og:type" content="health" />
    <meta property="og:url" content="<?=$meta_url?>" />
    <meta property="og:description" content="<?=$meta_description?>" />

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">

    <link rel="stylesheet" href="styles/main.css">

    <script type="text/javascript">

        window._site_ = '<?=$site?>';
        window._fbname_ = '<?=$fb_name?>';
        window._fbpage_ = '<?=$facebookPageLink?>';

    </script>

</head>
<body onload="Main.init();">


    <div id="loading">

        <div id="loading-icon"></div>
        <div id="loading-text">99</div>

    </div>

    <script src="js/lib/Loading.js"></script>
    <script>
        Loading.init();
        //        Loading.progress('LOADING').show();
    </script>

    <div id="invisible-wrapper">

        <div id="invisible-container" class="scene-container">

            <div id="image-viewer">

                <div class="cover"></div>
                <div class="container">
                    <div class="middle-wrapper">

                        <div class="image-container"></div>

                        <div class="ui">
                            <div class="bottom-ui">
                                <div class="btn-prev"></div>
                                <div class="progress">
                                    <span class="current-index">1</span> / <span class="total-number">10</span>
                                </div>
                                <div class="btn-next"></div>

                            </div>

                            <div class="btn-close">RETURN</div>
                        </div>

                    </div>
                </div>


            </div>

            <div id="login-ui">

                <!--<div class="cover"></div>-->

                <div class="container">

                    <div class="title">會　員　登　入</div>
                    <div class="row">
                        <input title="" class="user-name-input" placeholder="輸入帳號">
                    </div>
                    <div class="row">
                        <input title="" class="password-input" placeholder="輸入密碼" type="password">
                    </div>

                    <div class="row">
                        <div class="captcha g-recaptcha" data-sitekey="6LeE3nUUAAAAACqrRPyLTSxdQjWZ5S46KhBXIaK-" data-callback="onCaptchaDone" data-size="normal"></div>
                    </div>


                    <div class="btn-send">確定送出</div>

                </div>

            </div>

        </div>

    </div>

    <div id="layout">

        <div class="pc-layout">
    <!--        <img class="layout" src="images/layout/index.jpg">-->
<!--            <img class="layout" src="images/layout/news.jpg">-->
            <!--<img class="layout" src="images/layout/about-us.jpg">-->
<!--            <img class="layout" src="images/layout/malt.jpg">-->
            <!--<img class="layout" src="images/layout/contact.jpg">-->
<!--            <img class="layout" src="images/layout/care.jpg">-->
<!--            <img class="layout" src="images/layout/environmental.jpg">-->
<!--            <img class="layout" src="images/layout/vip-baby-1.jpg">-->
<!--            <img class="layout" src="images/layout/vip-baby-2.jpg">-->
<!--            <img class="layout" src="images/layout/vip-baby-3.jpg">-->
            <!--<img class="layout" src="images/layout/vip-course.jpg">-->
    <!--        <img class="layout" src="images/layout/reservation.jpg">-->
        </div>

        <div class="mobile-layout">
    <!--        <img class="layout" src="images/layout/index.m.jpg">-->
<!--            <img class="layout" src="images/layout/news.m.jpg">-->
    <!--        <img class="layout" src="images/layout/about-us.m.jpg">-->
<!--            <img class="layout" src="images/layout/malt.m.jpg">-->
    <!--        <img class="layout" src="images/layout/contact.m.jpg">-->
<!--            <img class="layout" src="images/layout/care.m.jpg">-->
<!--            <img class="layout" src="images/layout/environmental.m.jpg">-->
<!--            <img class="layout" src="images/layout/vip-baby-1.m.jpg">-->
<!--            <img class="layout" src="images/layout/vip-baby-2.m.jpg">-->
<!--            <img class="layout" src="images/layout/vip-baby-3.m.jpg">-->
            <!--<img class="layout" src="images/layout/vip-course.m.jpg">-->
    <!--        <img class="layout" src="images/layout/reservation.m.jpg">-->

        </div>
    </div>

    <div id="scene-container" class="scene-container">


        <div id="nav">

            <div class="white-bleed"></div>
            <div class="bg"></div>

            <div class="vip-menu-cover"></div>

            <div class="table-container">
                <div class="middle-wrapper">
                    <div class="button-group">

                        <div class="button"></div><div class="gap"></div>
                        <div class="button"></div><div class="gap"></div>
                        <div class="button"></div><div class="gap"></div>
                        <div class="button"></div><div class="gap"></div>
                        <div class="button"></div><div class="gap"></div>
                        <div class="button"></div><div class="gap"></div>
                        <div class="button pc-only"></div>

                        <div class="btn-logout"></div>

                    </div>




                    <div class="vip-menu">
                        <div class="title"></div>
                        <div class="button baby">寶寶記錄</div><div class="gap"></div>
                        <div class="button course">媽媽課程</div><div class="gap"></div>
                        <div class="button live">即時影像</div>

                        <div class="btn-logout"></div>

                    </div>

                </div>
            </div>




            <div class="logo site-dif <?=$site?>"></div>
            <div class="menu-icon"></div>

            <div class="brown-bar"></div>

        </div>

        <div class="top-bleed"></div>

        <div class="content-mask">

            <div class="content-container"></div>

        </div>


        <div id="footer" class="hide-mode">

            <div class="pink-bg"></div>

            <div class="mode-1-content">

                <div class="logo site-dif <?=$site?>"></div>
                <div class="misc-image site-dif <?=$site?>"></div>

                <a href="tel:<?=$tel;?>"><div class="field-tel"><?=$telText?></div></a>
                <a target="_blank" href="<?=$googleMap?>"><div class="field-address"><?=$address?></div></a>
                <a target="_blank" href="<?=$facebookPageLink?>"><div class="field-facebook"><?=$fb_name?></div></a>

                <a target="_blank" href="<?=$googleMap?>"><div class="btn-map"></div></a>
                <a target="_blank" href="<?=$facebookPageLink?>"><div class="btn-facebook"></div></a>

                <div class="facebook-page"">
                    <!--<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FLihPaoLand%2F&tabs=timeline&width=273&height=370&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=false&appId=" width="273" height="370" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>-->
                </div>

            </div>

            <div class="mode-2-content">
                <div class="top-part">
                    <div class="title-image"></div>
                    <div class="title-text site-dif"></div>
                    <a href="tel:<?=$tel;?>"><div class="tel"><span class="tel-icon"></span><?=$telText;?></div></a>
                    <a target="_blank" href="<?=$googleMap?>"><div class="address"><span class="address-icon"></span><?=$address?></div></a>
                </div>
                <div class="bottom-part">

                </div>
            </div>

            <div id="map" class="map" lat="<?=$mapLat?>" lng="<?=$mapLng?>"></div>

        </div>

        <div class="copy-right">

            <div class="text"><?=$copyright?></div>
        </div>

        <div id="questionnaire">

            <div class="cover"></div>

            <div class="container">

                <div class="title-image"></div>
                <div class="btn-close"></div>
                <div class="btn-skip"></div>
                <div class="btn-send"></div>

                <div class="question-container">


                    <div class="row row-title">

                        <div class="left-part"></div>
                        <div class="right-part">
                            <div class="col">很滿意</div>
                            <div class="col">滿意</div>
                            <div class="col">沒意見</div>
                            <div class="col">不滿意</div>
                            <div class="col">很不滿意</div>

                        </div>

                    </div>

                    <div class="row question">

                        <div class="left-part">1.對本機構提供定型化契約內容是否滿意?</div>
                        <div class="right-part">

                            <div class="col"><div class="option"></div></div>
                            <div class="col"><div class="option"></div></div>
                            <div class="col"><div class="option"></div></div>
                            <div class="col"><div class="option"></div></div>
                            <div class="col"><div class="option"></div></div>

                        </div>

                        <div class="select-part">


                            <select class="option-select" title="">
                                <option disabled selected value>請選擇</option>
                                <option value="很滿意">很滿意</option>
                                <option value="滿意">滿意</option>
                                <option value="沒意見">沒意見</option>
                                <option value="不滿意">不滿意</option>
                                <option value="很不滿意">很不滿意</option>
                            </select>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        <div id="questionnaire-dialog">
            <div class="cover"></div>
            <div class="container">
                <div class="text"></div>
            </div>

        </div>


    </div>

    <!--<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBUz28xZ05DiXZuaR3JqXREm69h_EwjyEY&callback=initMap"></script>-->




    <script src='https://www.google.com/recaptcha/api.js'></script>
<!--    <script src="http://cdn.sobekrepository.org/includes/gmaps-markerwithlabel/1.9.1/gmaps-markerwithlabel-1.9.1.min.js"></script>-->

    <script src="https://code.jquery.com/jquery-1.x-git.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>

    <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css"  property=""/>



<!--    <script src="js/lib/jquery-scrolltofixed-min.js"></script>-->

    <!-- build:js js/optimized.js -->
    <script src="js/lib/jsmpeg.min.js"></script>
    <script src="js/lib/qrcode.min.js"></script>
    <script src="js/lib/Logger.js"></script>
    <script src="js/lib/jquery.pep.js"></script>
    <script src="js/Main.js"></script>
    <script src="js/lib/Utility.0.0.15.js"></script>
    <script src="js/lib/jquery.waitforimages.min.js"></script>
    <script src="js/lib/ScrollListener.1.0.1.js"></script>
    <script src="js/lib/ScrollAnimeManager.1.0.0.js"></script>
    <script src="js/lib/MyLoader.js"></script>
    <script src="js/lib/Helper.1.0.4.js"></script>
    <script src="js/lib/Hash.1.0.0.js"></script>
    <script src="js/ApiProxy.js"></script>
    <script src="js/Nav.js"></script>
    <script src="js/MainPage.js"></script>
    <script src="js/Footer.js"></script>
    <script src="js/Index.js"></script>
    <script src="js/AboutUs.js"></script>
    <script src="js/Care.js"></script>
    <script src="js/Malt.js"></script>
    <script src="js/News.js"></script>
    <script src="js/Reservation.js"></script>
    <script src="js/Contact.js"></script>
    <script src="js/ImageSlider.js"></script>
    <script src="js/Environmental.js"></script>
    <script src="js/Environmental.SubPage.js"></script>
    <script src="js/Calender.js"></script>
    <script src="js/Vip.js"></script>
    <script src="js/VipBaby.js"></script>
    <script src="js/VipCourse.js"></script>
    <script src="js/VipLive.js"></script>
    <script src="js/OpenLive.js"></script>
    <script src="js/CourseBooking.js"></script>
    <script src="js/ImageViewer.js"></script>
    <script src="js/Questionnaire.js"></script>
    <!-- endbuild -->

    <script type="text/javascript">
        if(Utility.urlParams.usefakedata == '1')
        {
            document.write('<script src="js/lib/FAKE_DATA.js"><\/script>');
        }
    </script>

</body>
</html>