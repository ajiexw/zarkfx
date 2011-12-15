/*
 *  <a fx="popvideo" href="http://player.youku.com/player.php/sid/XMzIwNzQyNzA0/v.swf" >
 *
 * */

ZARK_FX.getCSS(ZARK_FX.CSS_PATH + 'fancybox/fancybox.css');

ZARK_FX.getFrame('jquery-1.3.2', function($){
    ZARK_FX.run('popvideo', function(attrs){

        $(this).fancybox({
            'padding'           : 0,
            'autoScale'         : false,
            'transitionIn'      : 'none',
            'transitionOut'     : 'none',
            'overlayOpacity'    : 0.8,
            'hideOnOverlayClick': false
        });

    }, {}, 'fancybox');
});
