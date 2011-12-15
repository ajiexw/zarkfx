(function($ZARK) {
    $ZARK(function(){
        if (!window['ZARK_FX']) window['ZARK_FX'] = {};
        ZARK_FX = window['ZARK_FX'];

        ZARK_FX.FX_NAME = 'fx';
        ZARK_FX.PATH = '/plugins/zarkfx/';
        ZARK_FX.JS_PATH         = ZARK_FX.PATH + 'jslib/';
        ZARK_FX.CSS_PATH        = ZARK_FX.PATH + 'css/';
        ZARK_FX.SWF_PATH        = ZARK_FX.PATH + 'swf/';
        ZARK_FX.IMG_PATH        = ZARK_FX.PATH + 'img/';
        ZARK_FX.FRAME_PATH      = ZARK_FX.PATH + 'frame/';
        ZARK_FX.loaded_fx       = {};
        ZARK_FX.loaded_scripts  = {};
        ZARK_FX.loaded_frames   = {};
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
                var temp_$, temp_jquery;
                if ($ !== undefined) { temp_$ = $; $ = null; };
                if (jQuery !== undefined) { temp_jquery = jQuery; jQuery = null; };

                $ZARK.ajax({
                    async:      false,
                    cache:      true,
                    dataType:   'script',
                    type:       'GET',
                    url:        ZARK_FX.FRAME_PATH + frame_name + '.js'
                });

                ZARK_FX.loaded_frames[frame_name] = jQuery.noConflict(true);

                if (temp_$ !== undefined) { $ = temp_$; };
                if (temp_jquery !== undefined) { jQuery = temp_jquery; };

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
                        attrs = $ZARK.extend(defaults, attrs);
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
            if ($ZARK.browser.msie) {
                var path = window.location.href.substring(0, window.location.href.lastIndexOf('/')+1) + ZARK_FX.PATH + file_url;
                document.createStyleSheet(path);
            }else{
                var linkobj=$ZARK('<link type="text/css" rel="stylesheet" />');
                linkobj.attr('href', file_url);
                $ZARK('head').append(linkobj); 
            };
        };

        // 解析fx字符串, 返回一个字典
        ZARK_FX.parserFx = function(fx_string){
            var ret_fx = {};
            var fxs = fx_string.split(" ");
            for(var i in fxs){
                var fx = fxs[i];
                if ($ZARK.trim(fx).length > 0){
                    if (fx.indexOf('[') > -1){
                        var fx_name = fx.substring(0,fx.indexOf('['))
                        ret_fx[fx_name] = {};
                        if (fx.indexOf('[') > -1){
                            var attrs = fx.substring(fx.indexOf('[')+1, fx.indexOf(']')).split(';');
                            for(var j in attrs){
                                if($ZARK.trim(attrs[j]) !== ''){
                                    if(attrs[j].indexOf('=') > -1){
                                        var attr_name  = $ZARK.trim(attrs[j].substring(0, attrs[j].indexOf('=')));
                                        var attr_value = $ZARK.trim(attrs[j].substring(attrs[j].indexOf('=')+1));
                                        ret_fx[fx_name][attr_name] = attr_value;

                                    }else{
                                        var attr_name = attrs[j];
                                        ret_fx[fx_name][attr_name] = true;
                                    };
                                };
                            };
                        };
                    }else{
                        ret_fx[fx] = {};
                    };
                }
            };
            return ret_fx;
        };

        ZARK_FX.getFX = function(obj, fx_name){
            return ZARK_FX.parserFx($ZARK(obj).attr(ZARK_FX.FX_NAME))[fx_name];
        };

        ZARK_FX.hasFX = function(obj, fx_name){
            return ZARK_FX.parserFx($ZARK(obj).attr(ZARK_FX.FX_NAME))[fx_name] !== undefined;
        };

        // 加载并执行所有ZARK_FX.FX_NAME
        $ZARK('['+ZARK_FX.FX_NAME+']').each(function(){
            var fx_string = $ZARK(this).attr(ZARK_FX.FX_NAME);
            for(var k in ZARK_FX.parserFx(fx_string)){
                if(ZARK_FX.loaded_fx[k] === undefined){
                    $ZARK.getScript(ZARK_FX.PATH+'fx/'+k+'.js');
                    ZARK_FX.loaded_fx[k] = true;
                };
            };
        });

    });
})(jQuery);
