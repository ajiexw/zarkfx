(function($ZARK) {
    $ZARK(function(){
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

        ZARK_FX.loaded_frames["jquery-" + $ZARK.fn.jquery] = jQuery;

        ZARK_FX.loaded_css      = {};
        ZARK_FX.browser         = {};
        ZARK_FX.browser.ie6     = $ZARK.browser.msie && ($ZARK.browser.version == "6.0") && (!$ZARK.support.style);

        // get UUID
        ZARK_FX.JSC = (new Date).getTime();
        ZARK_FX.getJSC = function(){
            return 'zarkfx_'+ZARK_FX.JSC++;
        };

        // 获得frame, 比如jquery1.3.2
        ZARK_FX.getFrame = function(frame_name, cb){
            if (ZARK_FX.loaded_frames[frame_name] === undefined){
                ZARK_FX.loaded_frames[frame_name] = 'loading';

                $ZARK.ajax({
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
                $ZARK.ajax({
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
                $ZARK('['+ZARK_FX.FX_NAME+'*='+fx_name+']').each(function(){
                    var attrs = ZARK_FX.getFX(this, fx_name);
                    if (attrs !== undefined){
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
                    };
                });
            };
            if (deps !== undefined){
                ZARK_FX.getScript(deps, ready);
            }else{
                ready();
            };
        };

        // 异步加载第三方CSS
        ZARK_FX.getCSS = function(file_url){
            if (ZARK_FX.loaded_css[file_url] === undefined){
                if ($ZARK.browser.msie) {
                    var path = window.location.href.substring(0, window.location.href.lastIndexOf('/')+1) + ZARK_FX.PATH + file_url;
                    document.createStyleSheet(path);
                }else{
                    var linkobj=$ZARK('<link type="text/css" rel="stylesheet" />');
                    linkobj.attr('href', file_url);
                    $ZARK('head').append(linkobj); 
                };
                ZARK_FX.loaded_css[file_url] = true;
            };
        };

        // 解析fx字符串, 返回一个字典
        ZARK_FX.parseFX = function(fx_string){

            var parseOne = function(s_fx){
                var re_strip = /^\s+|\s+$/g;
                var re_lstrip = /^\s+/g;
                var re_var_name = /^[A-z_][A-z_0-9]*$/;

                var res = {name: "", attrs: {}, remain: ""};
                var err = {idx: 0, msg: "", fx_name:""};

                var bracket_idx = s_fx.indexOf("[");
                var space_idx = s_fx.indexOf(" ");
                var state;

                s_fx = s_fx.replace(re_lstrip, "");

                if ( (space_idx !== -1) && (bracket_idx !== -1) && (space_idx < bracket_idx) && (s_fx.slice(space_idx, bracket_idx).replace(re_strip, "").length>0)){
                    res.name = s_fx.slice(0, space_idx);
                    res.remain = s_fx.slice(space_idx);
                    state = "finished";
                }else if(bracket_idx !== -1){
                    res.name = s_fx.slice(0, bracket_idx);
                    res.remain = s_fx.slice(bracket_idx);
                    state = 0;
                }else if(space_idx !== -1){
                    res.name = s_fx.slice(0, space_idx);
                    res.remain = s_fx.slice(space_idx);
                    state = "finished";
                }else{
                    res.name = s_fx.slice(0);
                    res.remain = ""
                    state = "finished";
                };

                res.name = res.name.replace(re_strip, "");
                if( !re_var_name.test(res.name) ) {
                    err.msg = "Illegal FX name.";
                    err.fx_name = res.name;
                    throw err;
                };

                if (bracket_idx !== -1){
                    var escaped, t;
                    var key, value;
                    var idx = bracket_idx;
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
                                if( /[;\]]/.test(s_fx[idx]) ) {
                                    key = key.replace(re_strip, "");
                                    if(key != "") {
                                        if( !re_var_name.test(key) ) {
                                            err.fx_name = res.name;
                                            err.msg = "Illegal FX attr name.";
                                            throw err;
                                        };
                                        res.attrs[key] = true;
                                    };
                                    if(s_fx[idx] == ";") {
                                        state = 0;
                                    } else {
                                        state = "finished";
                                    };
                                } else if(s_fx[idx] == "=") {
                                    key = key.replace(re_strip, "");
                                    if( !re_var_name.test(key) ) {
                                        err.fx_name = res.name;
                                        err.msg = "Illegal FX attr name.";
                                        throw err;
                                    };
                                    err.idx = idx + 1;
                                    state = 2;
                                    escaped = 0;
                                } else {
                                    key += s_fx[idx];
                                };
                                break;
                            case 2: // parse value
                                if(escaped == 0) {
                                    if(s_fx[idx] == "&") {
                                        escaped = 1;
                                    } else if(s_fx[idx] == ";") {
                                        res.attrs[key] = value;
                                        state = 0;
                                    } else if(s_fx[idx] == "]") {
                                        res.attrs[key] = value;
                                        state = "finished";
                                    } else {
                                        value += s_fx[idx];
                                    }
                                } else if(escaped == 1) {
                                    if(s_fx[idx] == "u") {
                                        t = "0000";
                                        escaped = 2;
                                    } else {
                                        if(s_fx[idx] == "'") {
                                            value += '"';
                                        } else {
                                            value += s_fx[idx];
                                        };
                                        escaped = 0;
                                    };
                                } else if(escaped == 2) { // "&uxxxx;"
                                    if(s_fx[idx] == ";") {
                                        eval('t = "\\u' + t + '"');
                                        value += t;
                                        escaped = 0;
                                    } else if( /[A-Fa-f0-9]/.test(s_fx[idx]) ) {
                                        t = t.slice(1) + s_fx[idx];
                                    } else {
                                        err.fx_name = res.name;
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
                        err.fx_name = res.name;
                        err.idx = idx;
                        err.msg = "Unexpected ending.";
                        throw err;
                    };

                    res.remain = s_fx.slice(idx + 1);
                
                };// end if (bracket_idx !== -1)

                res.remain = res.remain.replace(re_strip, "");

                return res;
            };// end parseOne

            var t, out, ret_fxs = {};
            t = fx_string;
            while(t != "") {
                try {
                    out = parseOne(t);
                    ret_fxs[out.name] = out.attrs;
                    t = out.remain;
                } catch(err) {
                    if (err.idx !== undefined) {
                        alert( err.fx_name + ": "+ (err.idx + fx_string.length - t.length) + ": " + err.msg );
                    }else{
                        throw err;
                    };
                    break;
                };
            };
            return ret_fxs;
        };

        ZARK_FX.getFX = function(obj, fx_name){
            return ZARK_FX.parseFX($ZARK(obj).attr(ZARK_FX.FX_NAME))[fx_name];
        };

        ZARK_FX.hasFX = function(obj, fx_name){
            return ZARK_FX.parseFX($ZARK(obj).attr(ZARK_FX.FX_NAME))[fx_name] !== undefined;
        };

        // 加载并执行所有ZARK_FX.FX_NAME
        $ZARK('['+ZARK_FX.FX_NAME+']').each(function(){
            var fx_string = $ZARK(this).attr(ZARK_FX.FX_NAME);
            for(var k in ZARK_FX.parseFX(fx_string)){
                if(ZARK_FX.loaded_fx[k] === undefined){
                    $ZARK.getScript(ZARK_FX.PATH+'fx/'+k+'.js');
                    ZARK_FX.loaded_fx[k] = true;
                };
            };
        });

    });
})(jQuery);
