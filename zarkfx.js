(function($) {
    $(function(){
        if (!window['ZARK_FX']) window['ZARK_FX'] = {};
        ZARK_FX = window['ZARK_FX'];


        ZARK_FX.FX = 'fx';
        ZARK_FX.PATH = '../zarkfx/';
        ZARK_FX.JS_LIB_PATH  = ZARK_FX.PATH + 'jslib/';
        ZARK_FX.SWF_LIB_PATH = ZARK_FX.PATH + 'swf/';
        ZARK_FX.IMG_LIB_PATH = ZARK_FX.PATH + 'img/';
        ZARK_FX.loaded  = {};
        ZARK_FX.browser = {};
        ZARK_FX.browser.ie6 = $.browser.msie && ($.browser.version == "6.0") && (!$.support.style);
        
        var FX = ZARK_FX.FX;
        $.fn.ZARK_FX = {};

        ZARK_FX.JSC = (new Date).getTime();
        ZARK_FX.getJSC = function(){
            return 'zarkfx_'+ZARK_FX.JSC++;
        };

        ZARK_FX.getCSS = function(file_name){
            if ($.browser.msie) {
                var path = window.location.href.substring(0, window.location.href.lastIndexOf('/')+1) + ZARK_FX.PATH + file_name;
                document.createStyleSheet(path);
            }else{
                var linkobj=$('<link type="text/css" rel="stylesheet" />');
                linkobj.attr('href', ZARK_FX.PATH + file_name);  
                $('head').append(linkobj); 
            };
        };

        ZARK_FX.setDefaultInt = function(attrs, key, value){
            if (attrs[key] === undefined) { attrs[key] = value; }else{ attrs[key] = parseInt(attrs[key]); };
        };

        ZARK_FX.parserFx = function(fx_string){
            var ret_fx = {};
            var fxs = fx_string.split(" ");
            for(var i in fxs){
                var fx = fxs[i];
                if (fx.indexOf('[') > -1){
                    var fx_name = fx.substring(0,fx.indexOf('['))
                    ret_fx[fx_name] = {};
                    if (fx.indexOf('[') > -1){
                        var attrs = fx.substring(fx.indexOf('[')+1, fx.indexOf(']')).split(';');
                        for(var j in attrs){
                            if($.trim(attrs[j]) !== ''){
                                if(attrs[j].indexOf('=') > -1){
                                    var attr_name  = $.trim(attrs[j].substring(0, attrs[j].indexOf('=')));
                                    var attr_value = $.trim(attrs[j].substring(attrs[j].indexOf('=')+1));
                                    ret_fx[fx_name][attr_name] = attr_value;

                                }else{
                                    var attr_name = attrs[j];
                                    ret_fx[fx_name][attr_name] = true;
                                };
                            };
                        };
                    };
                }else{
                    var fx_name = fx;
                    ret_fx[fx_name] = {};
                };

            };
            return ret_fx;
        };

        ZARK_FX.getAttrs = function($obj, fx_name){
            return ZARK_FX.parserFx($obj.attr(ZARK_FX.FX))[fx_name];
        };

        ZARK_FX.hasAttrs = function($obj, fx_name){
            return ZARK_FX.parserFx($obj.attr(ZARK_FX.FX))[fx_name] !== undefined;
        };

        $('['+FX+']').each(function(){
            var obj = $(this);
            var fx_string = obj.attr(FX);
            var tag_name = obj.attr('tagName').toLowerCase();
            var parsered_fx = ZARK_FX.parserFx(fx_string);

            for(var k in parsered_fx){
                if(ZARK_FX.loaded[k] === undefined){
                    //alert(ZARK_FX.PATH+'fx/'+k+'.js');
                    $.getScript(ZARK_FX.PATH+'fx/'+k+'.js');
                };
                ZARK_FX.loaded[k] = true;
            };

        });

    });
})(jQuery);
