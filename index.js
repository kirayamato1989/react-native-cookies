import React from 'react';
import { NativeModules, Platform , DeviceInfo} from 'react-native';
const invariant = require('invariant');
const RNCookieManagerIOS = NativeModules.RNCookieManagerIOS;
const RNCookieManagerAndroid = NativeModules.RNCookieManagerAndroid;

let CookieManager;

if (Platform.OS === 'ios') {
    invariant(RNCookieManagerIOS,
        'react-native-cookies: Add RNCookieManagerIOS.h and RNCookieManagerIOS.m to your Xcode project');
    CookieManager = RNCookieManagerIOS;
} else if (Platform.OS === 'android') {
    invariant(RNCookieManagerAndroid,
        'react-native-cookies: Import libraries to android "react-native link react-native-cookies"');
    CookieManager = RNCookieManagerAndroid;
} else {
    invariant(CookieManager, 'react-native-cookies: Invalid platform. This library only supports Android and iOS.');
}


// 由于接入的那个库有那么点问题，所以这里对iOS做特殊处理
let functions = []
if (Platform.OS != 'ios')  {
    functions = [
        'setFromResponse',
        'getFromResponse',
        'clearByName',
        'getAll',
        'clearAll',
        'get',
        'set'  
    ];
}
else { 
    functions = [
        'setFromResponse',
        'getFromResponse',
        'clearByName',
    ]
}

module.exports = {

};

if (Platform.OS == 'ios') { // 这里是iOS有修改的地方，如果后续更新了该三方库，这里可能得做修改
    module.exports = {
        getAll: (useWebKit = false, enterPriseVersion=false) => {return enterPriseVersion ? CookieManager.getAll(useWebKit) : CookieManager.getAll()},
        clearAll: (useWebKit = false, enterPriseVersion=false) => {return enterPriseVersion ? CookieManager.clearAll(useWebKit) : CookieManager.clearAll()},
        get: (url, useWebKit = false, enterPriseVersion=false) => {return enterPriseVersion ? CookieManager.get(url, useWebKit) : CookieManager.get(url) },
        set: (cookie, useWebKit = false, enterPriseVersion=false) => {return enterPriseVersion ? CookieManager.set(cookie, useWebKit) : CookieManager.set(cookie)},
    }
}

for (var i = 0; i < functions.length; i++) {
    module.exports[functions[i]] = CookieManager[functions[i]];
}
