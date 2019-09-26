var Terminal = {
    // 辨别移动终端类型
    platform: function () {

        var u = navigator.userAgent, app = navigator.appVersion;

        return {

            // android终端或者uc浏览器

            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,

            // 是否为iPhone或者QQHD浏览器

            iPhone: u.indexOf('iPhone') > -1,

            // 是否iPad

            iPad: u.indexOf('iPad') > -1

        };

    }(),

    // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
function downClient(parms) {
    try {
        var openApp = false;
        //增加唤起App功能，请提前引入callapp-lib.min.js
        if (openApp&&parms != undefined) {
            var appurl = getCnkiAppUrl(parms);
            if (appurl!='') {
                callCnkiApp(appurl);
                return;
            }   
        }
        if (is_weibo()) {
            location.href = "https://wap.cnki.net/appdownload.html";
        }
        else if (Terminal.platform.iPhone || Terminal.platform.iPad) {
            location.href = "https://itunes.apple.com/cn/app/id598116103";
        }
        else {
            if (wap_is_weixin() || is_androidqqin()) {
                location.href = "https://wap.cnki.net/appdownload.html";
            }
            else {
                location.href = "https://wap.cnki.net/apk/down.aspx";
            }
        }
    } catch (e) {
        location.href = "https://wap.cnki.net/appdownload.html";
    }

}
function wap_is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
function is_androidqqin() {
    if (/MQQBrowser/i.test(navigator.userAgent) && /QQ/i.test((navigator.userAgent).split('MQQBrowser'))) {
        return true;
    } else {
        return false;
    }
}
function is_weibo() {
    if (/WeiBo/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}
function callCnkiApp(appurl) {
    var callOption = {
        scheme: {
            protocol: "cnki",
        },
        appstore: 'https://wap.cnki.net/appdownload.html',
        yingyongbao: 'https://wap.cnki.net/appdownload.html?from=wechat',
        fallback: 'https://wap.cnki.net/appdownload.html',
        timeout: 3000
    };
    var callLib = new CallApp(callOption);
    callLib.open({
        path: appurl,
    });
    return true;
}
var defaulturlparm = {
    token: '',
    type: '',
    code: '',
    name: '',
    year: '',
    period: '',
    sku: '',
    collectionid: '',
    url: ''
};
function getCnkiAppUrl(parms) {
    var appurl = "";
    var urlhost = "wap.cnki.net/cnkiapp.aspx";

    try {
        var tokentype = parms.token.substr(0, 1);
        var tokentypeB = parms.token.substr(1, 1);
        switch (tokentype) {
            case 'A':
                appurl = urlhost+'?token=' + parms.token + '&Type=' + parms.type + '&Code=' + parms.code;
                break;
            case 'B':
                if (parms.token.indexOf('BE0') >= 0) {
                    appurl = urlhost+'?token=' + parms.token;
                }
                else {
                    switch (tokentypeB) {
                        case 'A':
                            appurl = urlhost+'?token=' + parms.token + '&Code=' + parms.code + '&Year=' + parms.year + '&Period=' + parms.period;
                            break;
                        case 'B':
                            appurl = urlhost+'?token=' + parms.token + '&Code=' + parms.code + '&Type=' + parms.type + '&Name=' + parms.name;
                            break;
                        case 'C':
                            appurl = urlhost+'?token=' + parms.token;
                            break;
                        case 'D':
                            appurl = urlhost+'?token=' + parms.token + '&Code=' + parms.code + '&Name=' + parms.name;
                            break;
                        default:
                    }
                }
                break;
            case 'G':
                if (parms.token.indexOf('GE0') >= 0) {
                    appurl = urlhost+'?token=' + parms.token;
                }
                else {
                    switch (tokentypeB) {
                        case 'A':
                            appurl = urlhost+'?token=' + parms.token + '&Sku=' + parms.sku;
                            break;
                        case 'C':
                            appurl = urlhost+'?token=' + parms.token;
                            break;
                        case 'D':
                            appurl = urlhost+'?token=' + parms.token + '&Code=' + parms.code + '&Name=' + parms.name;
                            break;
                        default:
                    }
                }
                break;
            case 'E':
                switch (tokentypeB) {
                    case 'A':
                        appurl = urlhost+'?token=' + parms.token + '&CollectionID=' + parms.collectionid;
                        break;
                    case 'C':
                        appurl = urlhost+'?token=' + parms.token;
                        break;
                    case 'D':
                        appurl = urlhost+'?token=' + parms.token + '&Code=' + parms.code + '&Name=' + parms.name;
                        break;
                    default:
                }
                break;
            case 'S':
                appurl = urlhost+'?token=' + parms.token + '&Name=' + parms.name + '&Url=' + parms.url;
                break;
            default:
        }
    } catch (e) {
        console.log(e);
    }
    return appurl;
}

//function getCnkiAppParm(type, model, filename) {
//    var prams = defaulturlparm;
//    switch (type) {
//        case "article":

//            break;
//        case "cjfd":
//            break;
//        case "xkbk":
//            break;
//        case "ckbk":
//            break;
//        default:
//    }
//}

