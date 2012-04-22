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

    if(FX.detect.browser === 'IE' && FX.detect.version === 6){ // ie6 hack
        
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

        /*
        var wrap_div_id = FX.getJSC();
        var join_div_id = FX.getJSC();
        $('<div id="'+wrap_div_id+'" style="display: none; position: absolute; top:0; left:0;"> <div style="position: absolute; top: 50%; left: 50%; "> <div id="'+join_div_id+'" style="position: relative; top: -50%; left: -50%; "></div></div></div>').appendTo('body');
        $('#'+wrap_div_id).height(document.documentElement.clientHeight).width(document.documentElement.clientWidth);

        $(window).scroll(function(){
            $('#'+wrap_div_id).css('top', getScrollTop());
        });
        */
    };

    FX.run('browsercenter', function(attrs){
        var $this = $(this);
        if(FX.detect.browser === 'IE' && FX.detect.version === 6){ // ie6 hack
            // IE6暂时置为固定， 不随浏览器滚动而滚动
            var center_top    = (document.documentElement.clientHeight - $this.height()) / 2;
            var center_left   = (document.documentElement.clientWidth  - $this.width())  / 2;
            $this.css('top',center_top);
            $this.css('left',center_left);
            $this.css('position', 'absolute');
            $(window).scroll(function(){
                $this.css('top', center_top + getScrollTop());
            });
            // $this.appendTo('#'+join_div_id);
        }else{
            var center_top    = (document.documentElement.clientHeight - $this.height()) / 2;
            var center_left   = (document.documentElement.clientWidth  - $this.width())  / 2;
            if(attrs.v !== undefined) attrs.vertical   = attrs.v;
            if(attrs.h !== undefined) attrs.horizontal = attrs.h;
            $this.css('position','fixed');
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
            
    });

});
