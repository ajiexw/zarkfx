/*
 * IE6不支持任何参数
 *
 * <* fx="browsercenter"></*>
 * <* fx="browsercenter[v;h]"></*>
 *
 * <* fx="browsercenter[vertical]"></*>
 * <* fx="browsercenter[v]"></*>
 *
 * <* fx="browsercenter[horizontal]"></*>
 * <* fx="browsercenter[h]"></*>
 *
 * 需要偏移量时使用 margin
 *
 * */

FX.getFrame('jquery-1.3.2', function($){

    var getScrollTop = function(){
        var scrollPos;
        if (typeof window.pageYOffset != 'undefined') {
            scrollPos = window.pageYOffset;
        }
        else if (typeof document.compatMode != 'undefined' &&
            document.compatMode != 'BackCompat') {
                scrollPos = document.documentElement.scrollTop;
            }
        else if (typeof document.body != 'undefined') {
            scrollPos = document.body.scrollTop;
        };
        return scrollPos;
    };

    FX.run('browsercenter', function(attrs){
        var $this = $(this);
        if(attrs.v !== undefined) attrs.vertical   = attrs.v;
        if(attrs.h !== undefined) attrs.horizontal = attrs.h;
        var is_ie6 = FX.detect.browser === 'IE' && FX.detect.version === 6;

        var fixPosition = function(){
            var center_top    = (document.documentElement.clientHeight - $this.height()) / 2,
                center_left   = (document.documentElement.clientWidth  - $this.width())  / 2;
            if(attrs.vertical===undefined && attrs.horizontal===undefined){
                $this.css('top',center_top);
                $this.css('left',center_left);
            }else{
                if(attrs.vertical !== undefined){
                    $this.css('top',center_top);
                };
                if(attrs.horizontal !== undefined){
                    $this.css('left',center_left);
                };
            };
        };
        fixPosition();

        if (is_ie6){
            $this.css('position', 'absolute');
            $(window).scroll(function(){
                var center_top = (document.documentElement.clientHeight - $this.height()) / 2;
                $this.css('top', center_top + getScrollTop());
            });
        }else{
            $this.css('position','fixed');
        }

        if (attrs.withResize){
            $(window).resize(fixPosition);
        };
            
    }, {
        withResize: true
    } );

});
