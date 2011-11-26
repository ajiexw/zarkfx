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
ZARK_FX.browsercenter = {};
if(ZARK_FX.browser.ie6){ // ie6 hack

    ZARK_FX.browsercenter.getScrollTop = function(){
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

    var wrap_div_id = ZARK_FX.getJSC();
    var join_div_id = ZARK_FX.getJSC();
    $('<div id="'+wrap_div_id+'" style=" position: absolute; top:0; left:0;"> <div style="position: absolute; top: 50%; left: 50%; "> <div id="'+join_div_id+'" style="position: relative; top: -50%; left: -50%; "></div></div></div>').appendTo('body');
    $('#'+wrap_div_id).height(document.documentElement.clientHeight).width(document.documentElement.clientWidth);
    $(window).scroll(function(){
        $('#'+wrap_div_id).css('top',ZARK_FX.browsercenter.getScrollTop());
    });

};

$('['+ZARK_FX.FX+']').each(function(){
    var $this = $(this);
    var attrs = ZARK_FX.parserFx($this.attr(ZARK_FX.FX)).browsercenter;
    if (attrs !== undefined){
        $this.css('display','block');
        if(ZARK_FX.browser.ie6){
            $this.appendTo('#'+join_div_id);
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
    };
});

