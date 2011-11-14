/*
 * <a fx="ie6png" ></a>
 * <span fx="ie6png" ></span>
 *
 * 注意: 如果你使用ctrl+F5刷新, 可能看不到效果
 *
 * */
if ($.browser.msie && ($.browser.version == "6.0") && (!$.support.style)) {
    var startPngFix = function(){
        $('['+ZARK_FX.FX+']').each(function(){
            var $this = $(this);
            if (ZARK_FX.parserFx($this.attr(ZARK_FX.FX)).ie6png !== undefined){
                DD_belatedPNG.fixPng(this);
            };
        });
    };
    $.getScript(ZARK_FX.PATH + ZARK_FX.JS_LIB_PATH + 'ddpng.js', startPngFix);
};
