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

    "login.response":
    {
        "error": '',
        "pop_questionnaire": "true"
    },

    /*** API 檢查登入狀態 ***/
    "login_status":
    {
        // 已登入的話傳回 true (string)
        "status": 'true',

        // 會員的唯一識別碼, 一個可以做為網址參數的字串, 供 trade_vip_camera_token api 送出使用
        "vip_token":"adsfaxcvwr123wsdfe"
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
            // 輪播圖, pc: 1280 x 706, mobile: 640 x 550
            "images":
            [
                {
                    "pc": "./test/images/index-key-image-1.jpg",
                    "mobile": "./test/images/index-key-image-1.m.jpg"
                },

                {
                    "pc": "./test/images/index-key-image-2.jpg",
                    "mobile": "./test/images/index-key-image-2.m.jpg"
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

            // 首頁用縮圖, pc: 377 x 251, mobile: 590 x 393
            "images":
            {
                "rooms": {
                    "pc": "./test/images/index-environmental-sample-1.jpg",
                    "mobile": "./test/images/index-environmental-sample-1.m.jpg"
                },
                "public_area": {
                    "pc": "./test/images/index-environmental-sample-2.jpg",
                    "mobile": "./test/images/index-environmental-sample-2.m.jpg"
                },
                "baby_room": {
                    "pc": "./test/images/index-environmental-sample-3.jpg",
                    "mobile": "./test/images/index-environmental-sample-3.m.jpg"
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

                // 圖片, 固定兩張, pc: 350 x 264, mobile: 502 x 380
                "images":
                [
                    {
                        "pc": "./test/images/news-image-1.jpg",
                        "mobile": "./test/images/news-image-1.m.jpg"
                    },

                    {
                        "pc": "./test/images/news-image-2.jpg",
                        "mobile": "./test/images/news-image-2.m.jpg"
                    }
                ]
            },
            {
                "year": "2018",
                "month": "10",
                "day": "30",

                "title":"慶開幕2",

                "detail":
                "麗格產後護理之家即將在淡水開幕！<br/>"+
                "享新會員優惠。<br/>"+
                "請洽預約專線 02-8626-9555",

                // 圖片, 固定兩張, pc: 350 x 264, mobile: 502 x 380
                "images":
                    [
                        {
                            "pc": "./test/images/news-image-1.jpg",
                            "mobile": "./test/images/news-image-1.m.jpg"
                        },

                        {
                            "pc": "./test/images/news-image-2.jpg",
                            "mobile": "./test/images/news-image-2.m.jpg"
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
            // 輪播圖, pc: 1280 x 393, mobile: 640 x 393
            "images":
            [
                {
                    "pc": "./test/images/env-key-image-1.jpg",
                    "mobile": "./test/images/env-key-image-1.m.jpg"
                },

                {
                    "pc": "./test/images/env-key-image-2.jpg",
                    "mobile": "./test/images/env-key-image-2.m.jpg"
                }
            ]
        },

        // 設施
        "facilites":
        {
            /*
            "title": "像度假‧也像回家",
            "detail":
                "麗格緊鄰淡水河畔，擁有39間客房，<br/>"+
                "以飯店式的高級訂製空間美學，融入產後照護空間。<br/>"+
                "其中39間房格局寬敞，搭配大面採光，<br/>"+
                "淡水景致盡收眼底，<br/>"+
                "在房內盡享自然天光的照拂，<br/>"+
                "由外而內身心靈徹底放鬆。",

            // facilites 頂端描述圖片, pc: 640 x 444, mobile: 無
            "image":{
                "pc": "./test/images/env-part-1-image.jpg",
                "mobile": ""
            },
            */

            "rooms":
            [
                {
                    // 唯一 id, 使用可接在網址 hash 的文字格式
                    "id": "001",

                    // 縮圖, pc: 250 x 745, mobile: 600 x 292
                    "thumb":{
                        "pc": "./test/images/env-part-2-image-1.jpg",
                        "mobile": "./test/images/env-part-2-image-1.m.jpg"
                    },

                    "name_ch": "精緻房",
                    "name_en": "Superior Room",

                    // 內頁輪播圖, pc: 1280 x 730, mobile: 640 x 390
                    "images":
                        [
                            {
                                "pc": "./test/images/env-room-sample-1.jpg",
                                "mobile": "./test/images/env-room-sample-1.m.jpg"
                            },
                            {
                                "pc": "./test/images/env-room-sample-2.jpg",
                                "mobile": "./test/images/env-room-sample-2.m.jpg"
                            },
                            {
                                "pc": "./test/images/env-room-sample-3.jpg",
                                "mobile": "./test/images/env-room-sample-3.m.jpg"
                            }
                        ],

                    // 特色說明
                    "features":
                        "<li>精品級飯店設計，一進房灑落的暖黃光，為空間營造放鬆氛圍。</li>"+
                        "<li>獨立筒雙人床、坐躺兩用的貴妃椅，讓產後媽媽和新手爸爸，可以充分享受休息時光。</li>",

                    // 設備介紹
                    "equipments":
                        "<li>全室採用門禁感應管理系統</li>"+
                        "<li>全自動免治馬桶</li>"+
                        "<li>超五星雙人加大獨立統床墊</li>"+
                        "<li>免費提供電動吸乳器、獨立奶瓶消毒鍋</li>"+
                        "<li>全熱交換器、緊急呼叫鈴系統</li>"+
                        "<li>全室寬頻無線上網</li>"+
                        "<li>浴室附高級沐浴盥洗組、暖風設備</li>"+
                        "<li>24小時寶寶及時影像觀看系統</li>"
                },
                {
                    "id": "002",
                    "thumb":{
                        "pc": "./test/images/env-part-2-image-2.jpg",
                        "mobile": "./test/images/env-part-2-image-2.m.jpg"
                    },

                    "name_ch": "典雅房",
                    "name_en": "Elegant Room",

                    "images":
                        [
                            {
                                "pc": "./test/images/env-room-sample-1.jpg",
                                "mobile": "./test/images/env-room-sample-1.m.jpg"
                            },
                            {
                                "pc": "./test/images/env-room-sample-2.jpg",
                                "mobile": "./test/images/env-room-sample-2.m.jpg"
                            },
                            {
                                "pc": "./test/images/env-room-sample-3.jpg",
                                "mobile": "./test/images/env-room-sample-3.m.jpg"
                            }
                        ],
                    "features":
                    "<li>獨立筒雙人床、坐躺兩用的貴妃椅，讓產後媽媽和新手爸爸，可以充分享受休息時光。</li>",
                    "equipments":
                    "<li>24小時寶寶及時影像觀看系統</li>"
                },
                {
                    "id": "003",
                    "thumb":{
                        "pc": "./test/images/env-part-2-image-3.jpg",
                        "mobile": "./test/images/env-part-2-image-3.m.jpg"
                    },

                    "name_ch": "豪華房",
                    "name_en": "Deluxe Room",

                    "images":
                        [
                            {
                                "pc": "./test/images/env-room-sample-1.jpg",
                                "mobile": "./test/images/env-room-sample-1.m.jpg"
                            },
                            {
                                "pc": "./test/images/env-room-sample-2.jpg",
                                "mobile": "./test/images/env-room-sample-2.m.jpg"
                            },
                            {
                                "pc": "./test/images/env-room-sample-3.jpg",
                                "mobile": "./test/images/env-room-sample-3.m.jpg"
                            }
                        ],
                    "features":
                        "<li>獨立筒雙人床、坐躺兩用的貴妃椅，讓產後媽媽和新手爸爸，可以充分享受休息時光。</li>",
                    "equipments":
                        "<li>24小時寶寶及時影像觀看系統</li>"
                },
                {
                    "id": "004",
                    "thumb":{
                        "pc": "./test/images/env-part-2-image-4.jpg",
                        "mobile": "./test/images/env-part-2-image-4.m.jpg"
                    },

                    "name_ch": "貴賓房",
                    "name_en": "VIP Room",

                    "images":
                        [
                            {
                                "pc": "./test/images/env-room-sample-1.jpg",
                                "mobile": "./test/images/env-room-sample-1.m.jpg"
                            },
                            {
                                "pc": "./test/images/env-room-sample-2.jpg",
                                "mobile": "./test/images/env-room-sample-2.m.jpg"
                            },
                            {
                                "pc": "./test/images/env-room-sample-3.jpg",
                                "mobile": "./test/images/env-room-sample-3.m.jpg"
                            }
                        ],
                    "features":
                        "<li>獨立筒雙人床、坐躺兩用的貴妃椅，讓產後媽媽和新手爸爸，可以充分享受休息時光。</li>",
                    "equipments":
                        "<li>24小時寶寶及時影像觀看系統</li>"
                },
                {
                    "id": "005",
                    "thumb":{
                        "pc": "./test/images/env-part-2-image-5.jpg",
                        "mobile": "./test/images/env-part-2-image-5.m.jpg"
                    },

                    "name_ch": "尊爵房",
                    "name_en": "Monarch Room",

                    "images":
                        [
                            {
                                "pc": "./test/images/env-room-sample-1.jpg",
                                "mobile": "./test/images/env-room-sample-1.m.jpg"
                            },
                            {
                                "pc": "./test/images/env-room-sample-2.jpg",
                                "mobile": "./test/images/env-room-sample-2.m.jpg"
                            },
                            {
                                "pc": "./test/images/env-room-sample-3.jpg",
                                "mobile": "./test/images/env-room-sample-3.m.jpg"
                            }
                        ],
                    "features":
                        "<li>獨立筒雙人床、坐躺兩用的貴妃椅，讓產後媽媽和新手爸爸，可以充分享受休息時光。</li>",
                    "equipments":
                        "<li>24小時寶寶及時影像觀看系統</li>"
                }
            ],

            // 房型設定, 分小型房 small 和大型房 large 兩種
            /*
            "rooms":
            [
                {
                    "type": "small",
                    "name": "精緻房",
                    "size": "7~9坪",
                    "view": "海景 / 城市",

                    // 縮圖:
                    //   小型房 pc: 376 x 250, mobile: 558 x 370
                    //   大型房 pc: 776 x 400, mobile: 558 x 370 (mobile 上 大型房和小型房圖片尺寸一樣)
                    "thumb":{
                        "pc": "./test/images/env-room-1.jpg",
                        "mobile": "./test/images/env-room-1.m.jpg"
                    },

                    // 點開後大圖, 多張
                    "full_image":
                        [
                            {
                                "pc": "./test/images/full-sample-1.jpg",
                                "mobile": "./test/images/full-sample-1.m.jpg"
                            },

                            {
                                "pc": "./test/images/full-sample-2.jpg",
                                "mobile": "./test/images/full-sample-2.m.jpg"
                            }
                        ]
                },

                {
                    "type": "small",
                    "name": "精緻房",
                    "size": "7~9坪",
                    "view": "海景 / 城市",

                    "thumb":{
                        "pc": "./test/images/env-room-2.jpg",
                        "mobile": "./test/images/env-room-2.m.jpg"
                    },

                    "full_image":
                        [
                            {
                                "pc": "./test/images/full-sample-1.jpg",
                                "mobile": "./test/images/full-sample-1.m.jpg"
                            },

                            {
                                "pc": "./test/images/full-sample-2.jpg",
                                "mobile": "./test/images/full-sample-2.m.jpg"
                            }
                        ]
                },

                {
                    "type": "small",
                    "name": "精緻房",
                    "size": "7~9坪",
                    "view": "海景 / 城市",

                    "thumb":{
                        "pc": "./test/images/env-room-3.jpg",
                        "mobile": "./test/images/env-room-3.m.jpg"
                    },

                    "full_image":
                        [
                            {
                                "pc": "./test/images/full-sample-1.jpg",
                                "mobile": "./test/images/full-sample-1.m.jpg"
                            },

                            {
                                "pc": "./test/images/full-sample-2.jpg",
                                "mobile": "./test/images/full-sample-2.m.jpg"
                            },

                            {
                                "pc": "./test/images/full-sample-1.jpg",
                                "mobile": "./test/images/full-sample-1.m.jpg"
                            },

                            {
                                "pc": "./test/images/full-sample-2.jpg",
                                "mobile": "./test/images/full-sample-2.m.jpg"
                            }
                        ]
                },

                {
                    "type": "small",
                    "name": "精緻房",
                    "size": "7~9坪",
                    "view": "海景 / 城市",

                    "thumb":{
                        "pc": "./test/images/env-room-4.jpg",
                        "mobile": "./test/images/env-room-4.m.jpg"
                    },

                    "full_image":
                        [
                            {
                                "pc": "./test/images/full-sample-1.jpg",
                                "mobile": "./test/images/full-sample-1.m.jpg"
                            },

                            {
                                "pc": "./test/images/full-sample-2.jpg",
                                "mobile": "./test/images/full-sample-2.m.jpg"
                            }
                        ]
                },

                {
                    "type": "large",
                    "name": "精緻房",
                    "size": "7~9坪",
                    "view": "海景 / 城市",

                    "thumb":{
                        "pc": "./test/images/env-room-5.jpg",
                        "mobile": "./test/images/env-room-5.m.jpg"
                    },

                    "full_image":
                        [
                            {
                                "pc": "./test/images/full-sample-1.jpg",
                                "mobile": "./test/images/full-sample-1.m.jpg"
                            }
                        ]
                }

            ],
            */

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


                // 縮圖: pc: 376 x 222, mobile: 538 x 320
                "thumb":{
                    "pc": "./test/images/env-part-4-image-1.jpg",
                    "mobile": "./test/images/env-part-4-image-1.m.jpg"
                },


                // 點開後大圖, 多張
                "full_image":
                    [
                        {
                            "pc": "./test/images/full-sample-1.jpg",
                            "mobile": "./test/images/full-sample-1.m.jpg"
                        }
                    ]
            },

            {
                "title":"接待大廳",

                "thumb":{
                    "pc": "./test/images/env-part-4-image-2.jpg",
                    "mobile": "./test/images/env-part-4-image-2.m.jpg"
                },

                "full_image":
                    [
                        {
                            "pc": "./test/images/full-sample-1.jpg",
                            "mobile": "./test/images/full-sample-1.m.jpg"
                        }
                    ]
            },

            {
                "title":"公共空間",

                "thumb":{
                    "pc": "./test/images/env-part-4-image-3.jpg",
                    "mobile": "./test/images/env-part-4-image-3.m.jpg"
                },

                "full_image":
                    [
                        {
                            "pc": "./test/images/full-sample-1.jpg",
                            "mobile": "./test/images/full-sample-1.m.jpg"
                        }
                    ]
            },

            {
                "title":"多功能教室",

                "thumb":{
                    "pc": "./test/images/env-part-4-image-4.jpg",
                    "mobile": "./test/images/env-part-4-image-4.m.jpg"
                },

                "full_image":
                    [
                        {
                            "pc": "./test/images/full-sample-1.jpg",
                            "mobile": "./test/images/full-sample-1.m.jpg"
                        }
                    ]
            }

        ]
    },

    /*** 媽媽課程 ***/
    "vip_course":
    {
        // 特殊錯誤訊息:
        // "not_login" => 使用者已登出
        "error": '',

        // 課程清單, 請依照先後排序 (最早的排第一)
        "course_list":
        [
            {
                // 課程 id, 唯一值
                "id": "1",

                "year": "2018",
                "month": "11",
                "date": "5",

                // 課程時段, 純文字
                "time": "14:30 ~ 15:30",

                // 課程名稱
                "name": "新生兒常見照護問題",

                // 老師
                "teacher": "張三",

                // 備註 (選擇性的, 可為空值)
                "memo": "課程人數限定 30 人",

                // 可預約狀態 true => 可預約(人數未滿或不限人數), false => 不可預約(人數已滿)
                "is_book_able": "true",

                // 預約狀態, 字串, 已預約: "true", 未預約: "false"
                "is_booked": "false"
            },

            {
                "id": "2",
                "year": "2018",
                "month": "11",
                "date": "5",
                "time": "15:30 ~ 16:30",
                "name": "新生兒常見照護問題 II",
                "teacher": "張三",
                "memo": "",
                "is_book_able": "false",
                "is_booked": "true"
            },

            {
                "id": "3",
                "year": "2018",
                "month": "11",
                "date": "8",
                "time": "14:30 ~ 15:30",
                "name": "媽媽教育",
                "teacher": "張三",
                "memo": "",
                "is_book_able": "true",
                "is_booked": "false"
            },

            {
                "id": "4",
                "year": "2018",
                "month": "12",
                "date": "8",
                "time": "14:30 ~ 15:30",
                "name": "媽媽教育",
                "teacher": "張三",
                "memo": "",
                "is_book_able": "true",
                "is_booked": "false"
            },

            {
                "id": "5",
                "year": "2019",
                "month": "1",
                "date": "8",
                "time": "14:30 ~ 15:30",
                "name": "媽媽教育",
                "teacher": "張三",
                "memo": "",
                "is_book_able": "true",
                "is_booked": "false"
            }
        ]
    },


    /*** 媽媽課程 改變預約 ***/
    "vip_course_booking.send":
    {
        // 課程 id
        "course_id": "1",

        // 目標預約狀態, 字串, 已預約: "true", 未預約: "false"
        "set_to_booked": "true"
    },

    "vip_course_booking":
    {
        // 特殊錯誤訊息:
        // "is_full" => 要求的課程在使用者操作間變成滿員, 導致無法預約
        // "not_login" => 使用者已登出
        "error": ''
    },

    /*** 預約參觀 ***/
    "reservation.send":
    {
        "name": "聯絡人名稱",
        "phone": "電話",
        "date": "參觀日期",
        "time": "參觀時段",
        "birth_date": "預產期",
        "email": "電子信箱",
        "memo": "備註"
    },

    "reservation":
    {
        // 特殊錯誤訊息:
        // "not_login" => 使用者已登出
        "error": ''
    },


    /*** 寶寶紀錄 ***/
    "vip_baby":
    {
        // 特殊錯誤訊息:
        // "not_login" => 使用者已登出
        "error": '',

        // 獻給父母(廢棄)
        //"for_parents":
        //{
        //    "title": "獻給我最愛的爸爸、媽媽",
        //    "detail":
        //        "首先… 感謝爸比＆媽咪讓我降臨在這個"+
        //        "世界上。 幼小的我，肯定會在半夜時哇"+
        //        "哇大哭而驚擾你們的美夢 ; 抑或是搗蛋"+
        //        "地大小便。<br/><br/>"+
        //
        //        "然而，未能用言語表達的我，對於爸比"+
        //        "＆媽咪的辛勞，以及悉心呵護的神情，"+
        //        "貫注於我的愛，我完全感受其中，我深"+
        //        "愛你們。<br/><br/>"+
        //
        //        "感謝爸比＆媽咪不辭辛勞地照顧我，為"+
        //        "我的新生帶來滿滿的愛與歡樂，讓我感"+
        //        "受這世界的美好。"
        //
        //},

        // 關於我
        "about_me":
        {
            //"title": "張三豐",
            "name": "張三豐",
            "gender": "男",
            "birthday": "1999 / 99 / 99",
            "constellation": "射手座",
            "zodiac": "虎",
            "blood": "O 型",
            "height": "170cm",
            "weight": "60kg",
            "head": "很大",

            // 寶寶照片, pc: 292 x 244, mobile: 509 x 590
            "photo":
            {
                "pc": "./test/images/vip-baby-2-sample.jpg",
                "mobile": "./test/images/vip-baby-2-sample.m.jpg"
            }

        },

        // 成長紀錄
        "record":
        {
            "title": "我的第一張照片",
            "detail":"今天…是我來到嘉禾的第一天，有點緊張又有點興奮，護理師阿姨很慎重的幫我拍一張美美照要送給媽咪和爸比，我要睜大眼睛看鏡頭。今天…是我來到嘉禾的第一天，有點緊張又有點興奮，護理師阿姨很慎重的幫我拍一張美美照要送給媽咪和爸比，我要睜大眼睛看鏡頭。",

            // 寶寶照片, pc: 290 x 290, mobile: 394 x 394
            "photo":
            {
                "pc": "./test/images/vip-baby-3-baby-sample.jpg",
                "mobile": "./test/images/vip-baby-3-baby-sample.m.jpg"
            }

        }
    },

    // 公開分享視訊網址呼叫
    "trade_vip_camera_token.send":
    {
        // 會員的唯一識別碼, 根據此碼傳回對應的 web socket url
        "vip_token": "adsfaxcvwr123wsdfe"
    },

    "trade_vip_camera_token.response":
    {
        // 錯誤訊息, 如果該會員已退房, 視訊網址過期, 傳回: "outdated"
        "error": "",

        "ws_url": "ws://x.x.x.x/xxx"
    }


};
