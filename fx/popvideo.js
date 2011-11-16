/*
 *  <a fx="popvideo" href="http://player.youku.com/player.php/sid/XMzIwNzQyNzA0/v.swf" >
 *
 * */

ZARK_FX.popvideo = {};

var initFancybox = function(){
    $('a['+ZARK_FX.FX+']').each(function(){
        var $this = $(this);
        if(ZARK_FX.parserFx($this.attr(ZARK_FX.FX)).popvideo !== undefined){
            var attrs = ZARK_FX.parserFx($this.attr(ZARK_FX.FX)).popvideo;
            $this.fancybox({
                'padding'           : 0,
                'autoScale'         : false,
                'transitionIn'      : 'none',
                'transitionOut'     : 'none',
                'overlayOpacity'    : 0.8,
                'hideOnOverlayClick': false
            });
        };
    });
};

ZARK_FX.getCSS('plugin/fancybox/fancybox.css');
$.getScript(ZARK_FX.PATH + ZARK_FX.JS_LIB_PATH + 'fancybox.js', initFancybox);
