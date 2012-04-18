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

ZARK_FX.getFrame('jquery-1.3.2', function($){

    if(ZARK_FX.browser.ie6){ // ie6 hack
        
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
        var wrap_div_id = ZARK_FX.getJSC();
        var join_div_id = ZARK_FX.getJSC();
        $('<div id="'+wrap_div_id+'" style="display: none; position: absolute; top:0; left:0;"> <div style="position: absolute; top: 50%; left: 50%; "> <div id="'+join_div_id+'" style="position: relative; top: -50%; left: -50%; "></div></div></div>').appendTo('body');
        $('#'+wrap_div_id).height(document.documentElement.clientHeight).width(document.documentElement.clientWidth);

        $(window).scroll(function(){
            $('#'+wrap_div_id).css('top', getScrollTop());
        });
        */
    };

    ZARK_FX.run('browsercenter', function(attrs){
        var $this = $(this);
        if(ZARK_FX.browser.ie6){ // ie6 hack
            $this.css('top',(dochment.documentElement.clientHeight - $this.height()) / 2);
            $this.css('left',(document.documentElement.clientWidth  - $this.width())  / 2);
            $this.css('position', 'absolute');
            $(window).scroll(function(){
                $this.css('top', (dochment.documentElement.clientHeight - $this.height()) / 2 + getScrollTop());
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
