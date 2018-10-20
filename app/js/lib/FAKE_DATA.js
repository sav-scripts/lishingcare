/*
    _FAKE_DATA_ 最上層的每個變數, 都代表一隻 API (除了名稱後面是 .send, 那表示是那隻 api 前端會送出的資料)

    比如說 login 這隻 api, 前端送出資料在 "login.send" , 後端回應在 "login"

    大部分 API 沒有前端送出, 所以就沒有 .send 了

 */


window._FAKE_DATA_ =
{
    /*** API 登入 ***/
    "login.send":
    {
        "name":"John",
        "password":"12345",
        "g_recaptcha_response": "xxxxxx"
    },

    "login":
    {
        "error": ''
    },

    /*** API 檢查登入狀態 ***/
    "login_status":
    {
        // 已登入的話傳回 true (string)
        "status": 'false'
    },

    /*** API 登出 ***/
    "logout":
    {
        "error": ''
    },

    /*** API 首頁 ***/
    "index":
    {
        "error": '',

        // 輪播圖
        "banner":
        {
            // 輪播圖, pc: 1280 x 706
            "images":
            [
                {
                    "pc": "./test/images/index-key-image-1.jpg",
                    "mobile": ""
                },

                {
                    "pc": "./test/images/index-key-image-2.jpg",
                    "mobile": ""
                }
            ]
        },

        // 環境設施
        "environmental":
        {
            "description":
            "麗格緊鄰淡水河畔，擁有39間客房，<br>"+
            "以飯店式的高級訂製空間美學，融入產後照護空間。<br>"+
            "其中39間房格局寬敞，搭配大面採光，淡水景致盡收眼底，<br>"+
            "房內盡享自然天光的照拂，由外而內身心靈徹底放鬆。",

            // 首頁用縮圖, pc: 377 x 251
            "images":
            {
                "rooms": {
                    "pc": "./test/images/index-environmental-sample-1.jpg",
                    "mobile": ""
                },
                "public_area": {
                    "pc": "./test/images/index-environmental-sample-2.jpg",
                    "mobile": ""
                },
                "baby_room": {
                    "pc": "./test/images/index-environmental-sample-3.jpg",
                    "mobile": ""
                }
            }
        }

    },

    /*** API 最新消息 ***/
    "news":
    {
        "error": '',

        //"main_title": "10月開幕優惠開跑，歡迎預約參觀",

        "data_list":
        [
            {
                "year": "2018",
                "month": "10",
                "day": "01",

                "title":"慶開幕",

                "detail":
                    "麗格產後護理之家即將在淡水開幕！<br/>"+
                    "專為產後媽媽打造六星飯店護褓空間，<br/>"+
                    "即日起至今年12月前入住，<br/>"+
                    "享新會員優惠。<br/>"+
                    "請洽預約專線 02-8626-9555",

                // 圖片, 固定兩張, pc: 350 x 264
                "images":
                [
                    {
                        "pc": "./test/images/news-image-1.jpg",
                        "mobile": ""
                    },

                    {
                        "pc": "./test/images/news-image-2.jpg",
                        "mobile": ""
                    }
                ]
}
        ]
    },

    /*** API 環境設施 ***/
    "environmental":
    {
        "error": '',

        // 輪播圖
        "banner":
        {
            // 輪播圖, pc: 1280 x 393
            "images":
            [
                {
                    "pc": "./test/images/env-key-image-1.jpg",
                    "mobile": ""
                },

                {
                    "pc": "./test/images/env-key-image-2.jpg",
                    "mobile": ""
                }
            ]
        },

        // 設施
        "facilites":
        {
            "title": "像度假‧也像回家",
            "detail":
                "麗格緊鄰淡水河畔，擁有39間客房，<br/>"+
                "以飯店式的高級訂製空間美學，融入產後照護空間。<br/>"+
                "其中39間房格局寬敞，搭配大面採光，<br/>"+
                "淡水景致盡收眼底，<br/>"+
                "在房內盡享自然天光的照拂，<br/>"+
                "由外而內身心靈徹底放鬆。",

            // facilites 頂端描述圖片, pc: 640 x 444
            "image":{
                "pc": "./test/images/env-part-1-image.jpg",
                "mobile": ""
            },

            // 房型設定, 分小型房 small 和大型房 large 兩種
            "rooms":
            [
                {
                    "type": "small",
                    "name": "精緻房",
                    "size": "7~9坪",
                    "view": "海景 / 城市",

                    // 縮圖:
                    //   小型房 pc: 376 x 250,
                    //   大型房 pc: 776 x 400
                    "thumb":{
                        "pc": "./test/images/env-room-1.jpg",
                        "mobile": ""
                    },

                    // 全尺寸圖片
                    "full_image":{
                        "pc": "./test/images/env-room-1.full.jpg",
                        "mobile": ""
                    }
                },

                {
                    "type": "small",
                    "name": "精緻房",
                    "size": "7~9坪",
                    "view": "海景 / 城市",

                    "thumb":{
                        "pc": "./test/images/env-room-2.jpg",
                        "mobile": ""
                    },

                    "full_image":{
                        "pc": "./test/images/env-room-2.full.jpg",
                        "mobile": ""
                    }
                },

                {
                    "type": "small",
                    "name": "精緻房",
                    "size": "7~9坪",
                    "view": "海景 / 城市",

                    "thumb":{
                        "pc": "./test/images/env-room-3.jpg",
                        "mobile": ""
                    },

                    "full_image":{
                        "pc": "./test/images/env-room-3.full.jpg",
                        "mobile": ""
                    }
                },

                {
                    "type": "small",
                    "name": "精緻房",
                    "size": "7~9坪",
                    "view": "海景 / 城市",

                    "thumb":{
                        "pc": "./test/images/env-room-4.jpg",
                        "mobile": ""
                    },

                    "full_image":{
                        "pc": "./test/images/env-room-4.full.jpg",
                        "mobile": ""
                    }
                },

                {
                    "type": "large",
                    "name": "精緻房",
                    "size": "7~9坪",
                    "view": "海景 / 城市",

                    "thumb":{
                        "pc": "./test/images/env-room-5.jpg",
                        "mobile": ""
                    },

                    "full_image":{
                        "pc": "./test/images/env-room-5.full.jpg",
                        "mobile": ""
                    }
                }

            ],

            // 設施特色
            "features":
            [
                {
                    "title": "住的安心",
                    "detail": "全室採用門禁感應管理系統"
                },

                {
                    "title": "住的安心",
                    "detail": "全室採用門禁感應管理系統"
                },

                {
                    "title": "住的安心",
                    "detail": "全室採用門禁感應管理系統"
                },

                {
                    "title": "住的安心",
                    "detail": "全室採用門禁感應管理系統"
                },

                {
                    "title": "住的安心",
                    "detail": "全室採用門禁感應管理系統"
                },

                {
                    "title": "住的安心",
                    "detail": "全室採用門禁感應管理系統"
                },

                {
                    "title": "住的安心",
                    "detail": "全室採用門禁感應管理系統"
                },

                {
                    "title": "住的安心",
                    "detail": "全室採用門禁感應管理系統"
                }

            ]
        },

        "public_area":
        [
            {
                "title":"六星級產後會所",

                "thumb":{
                    "pc": "./test/images/env-part-4-image-1.jpg",
                    "mobile": ""
                },

                "full_image":{
                    "pc": "./test/images/env-part-4-image-1.full.jpg",
                    "mobile": ""
                }
            },

            {
                "title":"接待大廳",

                "thumb":{
                    "pc": "./test/images/env-part-4-image-2.jpg",
                    "mobile": ""
                },

                "full_image":{
                    "pc": "./test/images/env-part-4-image-2.full.jpg",
                    "mobile": ""
                }
            },

            {
                "title":"公共空間",

                "thumb":{
                    "pc": "./test/images/env-part-4-image-3.jpg",
                    "mobile": ""
                },

                "full_image":{
                    "pc": "./test/images/env-part-4-image-3.full.jpg",
                    "mobile": ""
                }
            },

            {
                "title":"多功能教室",

                "thumb":{
                    "pc": "./test/images/env-part-4-image-4.jpg",
                    "mobile": ""
                },

                "full_image":{
                    "pc": "./test/images/env-part-4-image-4.full.jpg",
                    "mobile": ""
                }
            }

        ]
    }
};
