(function($) {
    $(function(){
        if (!window['ZARK_FX']) window['ZARK_FX'] = {};
        ZARK_FX = window['ZARK_FX'];


        ZARK_FX.FX = 'fx';
        ZARK_FX.PATH = '../zarkfx/';
        ZARK_FX.JS_LIB_PATH = 'jslib/';
        ZARK_FX.loaded = {};
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
                                var attr_name = $.trim(attrs[j].substring(0, attrs[j].indexOf('=')));
                                var attr_value = $.trim(attrs[j].substring(attrs[j].indexOf('=')+1));
                                ret_fx[fx_name][attr_name] = attr_value;
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
