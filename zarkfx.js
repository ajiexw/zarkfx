(function($) {
    $(function(){
        if (!window['ZARK_FX']) window['ZARK_FX'] = {};
        ZARK_FX = window['ZARK_FX'];

        ZARK_FX.FX_NAME         = 'fx';
        ZARK_FX.PATH            = '';

        $("script").each(function() {
            if( /zarkfx.js$/.test(this.src) ) {
                ZARK_FX.PATH = this.src.replace(/zarkfx.js$/, "");
            }
        });

        ZARK_FX.JS_PATH         = ZARK_FX.PATH + 'jslib/';
        ZARK_FX.CSS_PATH        = ZARK_FX.PATH + 'css/';
        ZARK_FX.SWF_PATH        = ZARK_FX.PATH + 'swf/';
        ZARK_FX.IMG_PATH        = ZARK_FX.PATH + 'img/';
        ZARK_FX.FRAME_PATH      = ZARK_FX.PATH + 'frame/';
        ZARK_FX.loaded_fx       = {};
        ZARK_FX.loaded_scripts  = {};
        ZARK_FX.loaded_frames   = {};

        ZARK_FX.loaded_frames["jquery-" + $.fn.jquery] = jQuery;

        ZARK_FX.loaded_css      = {};
        ZARK_FX.browser         = {};
        ZARK_FX.browser.ie6     = $.browser.msie && ($.browser.version == "6.0") && (!$.support.style);

        // get UUID
        ZARK_FX.JSC = (new Date).getTime();
        ZARK_FX.getJSC = function(){
            return 'zarkfx_'+ZARK_FX.JSC++;
        };

        // 获得frame, 比如jquery1.3.2
        ZARK_FX.getFrame = function(frame_name, cb){
            if (ZARK_FX.loaded_frames[frame_name] === undefined){
                ZARK_FX.loaded_frames[frame_name] = 'loading';

                $.ajax({
                    async:      false,
                    cache:      true,
                    dataType:   'script',
                    type:       'GET',
                    url:        ZARK_FX.FRAME_PATH + frame_name + '.js'
                });

                ZARK_FX.loaded_frames[frame_name] = jQuery.noConflict(true);

                cb && cb(ZARK_FX.loaded_frames[frame_name]);

            }else if(ZARK_FX.loaded_frames[frame_name] === 'loading'){
                setTimeout(function(){
                    ZARK_FX.getFrame(frame_name, cb);
                }, 10);
            }else{
                cb && cb(ZARK_FX.loaded_frames[frame_name]);
            };
        };

        // 加载第三方库, 如果已经加载过, 则直接运行callback
        ZARK_FX.getScript = function(js_name, cb){
            if (js_name.length === 0) alert('error: load js name is empty');
            if (ZARK_FX.loaded_scripts[js_name] === undefined){
                ZARK_FX.loaded_scripts[js_name] = 'loading';
                $.ajax({
                    async:      false,
                    cache:      true,
                    dataType:   'script',
                    type:       'GET',
                    url:        ZARK_FX.JS_PATH + js_name + '.js'
                });
                ZARK_FX.loaded_scripts[js_name] = true;
                cb && cb();
            }else if(ZARK_FX.loaded_scripts[js_name] === 'loading'){
                setTimeout(function(){
                    ZARK_FX.getScript(js_name, cb);
                }, 10);
            }else{
                cb && cb();
            };
        };

        ZARK_FX.run = function(fx_name, cb, defaults, deps){
            var ready = function(){
                //todo 这里有一个隐患, 如果某个fx的名称包含另一个fx的名称, 那么选择器会出错
                $('['+ZARK_FX.FX_NAME+'*='+fx_name+']').each(function(){
                    var attrs_array = ZARK_FX.getFX(this, fx_name);
                    if (attrs_array !== undefined){
                        var i = 0;
                        for ( ; i < attrs_array.length; i++){
                            var attrs = attrs_array[i];
                            // change attrs's data type like defaults
                            // 不要使用jQuery的extend函数, 因为extend会改变attrs的数据类型
                            for(var k in defaults){
                                if (attrs[k] === undefined){
                                    attrs[k] = defaults[k];
                                }else{
                                    if(typeof(defaults[k]) === 'number')  attrs[k] = parseInt(attrs[k]);
                                    if(typeof(defaults[k]) === 'boolean') attrs[k] = attrs[k] === true;
                                };
                            };// change end
                            cb && cb.call(this, attrs);
                            // 处理全局参数(所有fx都有的参数)
                            if (attrs.finished === 'show'){
                                $(this).show();
                            };
                        };
                    };
                });
            };
            if (deps !== undefined){
                ZARK_FX.getScript(deps, ready);
            }else{
                ready();
            };
        };

        // 异步加载CSS
        ZARK_FX.getCSS = function(css_url){
            if (ZARK_FX.loaded_css[css_url] === undefined){
                if (document.createStyleSheet) {
                    document.createStyleSheet(css_url);
                }else{
                    var linkobj=$('<link type="text/css" rel="stylesheet" />');
                    linkobj.attr('href', css_url);
                    $('head').append(linkobj); 
                };
                ZARK_FX.loaded_css[css_url] = true;
            };
        };

        // 解析fx字符串, 返回一个list, 每个list元素类型为dict, 代表一个fx的attrs
        // 如某html node上多次调用同一个fx, 那么返回的list长度大于1
        ZARK_FX.parseFX = function(fx_string){

            var parseOne = function(s_fx){
                var re_strip = /^\s+|\s+$/g;
                var re_var_name = /^[A-z_][A-z_0-9]*$/;

                var res = {name: "", attrs: {}, remain: ""};
                var err = {idx: 0, msg: "", fx_name: "Unknown FX"};

                var idx = s_fx.search(/\S/);
                if(idx == -1) {
                    return res;
                };
                err.idx = idx;

                var idx2 = idx + s_fx.slice(idx).search(/[\s\[]/);
                if(idx2 < idx) {
                    idx2 = s_fx.length;
                };
                res.name = s_fx.slice(idx, idx2);

                if( !re_var_name.test(res.name) ) {
                    err.msg = "Illegal FX name.";
                    throw err;
                };
                err.fx_name = res.name;

                idx = s_fx.indexOf("[", idx2);
                if( (idx == -1) || (s_fx.slice(idx2, idx).search(/\S/) != -1) ) {
                    res.remain = s_fx.slice(idx2);
                    return res;
                };

                var state = 0, escaped, t;
                var key, value;
                for(idx+=1; idx<s_fx.length; idx+=1) {
                    switch(state) {
                        case 0: // init
                            key = "";
                            value = "";
                            err.idx = idx;
                            state = 1;
                            idx -= 1;
                            break;
                        case 1: // parse key
                            if( /[;\]]/.test(s_fx.charAt(idx)) ) {
                                key = key.replace(re_strip, "");
                                if(key != "") {
                                    if( !re_var_name.test(key) ) {
                                        err.msg = "Illegal FX attr name.";
                                        throw err;
                                    };
                                    res.attrs[key] = true;
                                };
                                if(s_fx.charAt(idx) == ";") {
                                    state = 0;
                                } else {
                                    state = "finished";
                                };
                            } else if(s_fx.charAt(idx) == "=") {
                                key = key.replace(re_strip, "");
                                if( !re_var_name.test(key) ) {
                                    err.msg = "Illegal FX attr name.";
                                    throw err;
                                };
                                err.idx = idx + 1;
                                state = 2;
                                escaped = 0;
                            } else {
                                key += s_fx.charAt(idx);
                            };
                            break;
                        case 2: // parse value
                            if(escaped == 0) {
                                if(s_fx.charAt(idx) == "&") {
                                    escaped = 1;
                                } else if(s_fx.charAt(idx) == ";") {
                                    res.attrs[key] = value;
                                    state = 0;
                                } else if(s_fx.charAt(idx) == "]") {
                                    res.attrs[key] = value;
                                    state = "finished";
                                } else {
                                    value += s_fx.charAt(idx);
                                }
                            } else if(escaped == 1) {
                                if(s_fx.charAt(idx) == "u") {
                                    t = "0000";
                                    escaped = 2;
                                } else {
                                    if(s_fx.charAt(idx) == "'") {
                                        value += '"';
                                    } else if(s_fx.charAt(idx) == '"') {
                                        value += "'";
                                    } else {
                                        value += s_fx.charAt(idx);
                                    };
                                    escaped = 0;
                                };
                            } else if(escaped == 2) { // "&uxxxx;"
                                if(s_fx.charAt(idx) == ";") {
                                    eval('t = "\\u' + t + '"');
                                    value += t;
                                    escaped = 0;
                                } else if( /[A-Fa-f0-9]/.test(s_fx.charAt(idx)) ) {
                                    t = t.slice(1) + s_fx.charAt(idx);
                                } else {
                                    err.idx = idx;
                                    err.msg = "Illegal character in hex environment.";
                                    throw err;
                                };
                            };
                            break;
                    };
                    if(state == "finished") {
                        break;
                    };
                };

                if(state != "finished") {
                    err.idx = idx;
                    err.msg = "Unexpected ending.";
                    throw err;
                };

                res.remain = s_fx.slice(idx + 1);

                return res;
            }; // end of parseOne

            var t, out, ret_fxs = {};
            t = fx_string;
            while(t != "") {
                try {
                    out = parseOne(t);
                    if(out.name != "") {
                        if (typeof ret_fxs[out.name] === 'undefined'){
                            ret_fxs[out.name] = [];
                        }
                        ret_fxs[out.name].push(out.attrs);
                    };
                    t = out.remain;
                } catch(err) {
                    if (err.idx !== undefined) {
                        alert( err.fx_name + ": " + (err.idx + fx_string.length - t.length) + ": " + err.msg );
                    } else {
                        throw err;
                    };
                    break;
                };
            };
            return ret_fxs;
        };

        ZARK_FX.getFX = function(obj, fx_name){
            return ZARK_FX.parseFX($(obj).attr(ZARK_FX.FX_NAME))[fx_name];
        };

        ZARK_FX.splitValue = function(value){ 
            //此函数暂时不支持value里面包含逗号的情况, 需要改进
            return value.split(',')
        };

        ZARK_FX.hasFX = function(obj, fx_name){
            return typeof ZARK_FX.parseFX($(obj).attr(ZARK_FX.FX_NAME))[fx_name] !== 'undefined';
        };

        // 加载并执行所有ZARK_FX.FX_NAME
        $('['+ZARK_FX.FX_NAME+']').each(function(){
            var fx_string = $(this).attr(ZARK_FX.FX_NAME);
            for(var k in ZARK_FX.parseFX(fx_string)){
                if(ZARK_FX.loaded_fx[k] === undefined){
                    $.getScript(ZARK_FX.PATH+'fx/'+k+'.js');
                    ZARK_FX.loaded_fx[k] = true;
                };
            };
        });

    });
})(jQuery);
