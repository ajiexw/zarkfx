/*
 * Example 1:
 *     <div fx="scroll[default]" ></div>
 *
 * Example 2:
 *     <div fx="scroll[right=150;bottom=10;speed=2000]" style="height:50px; width:50px; background-color:red" >
 *
 * Options:
 *      default 使用默认样式
 *      speed   滚过去的时间
 *      targetid 滚动目标的id, 不填时滚到最顶部
 *      hide_height 超过一定高度后隐藏按钮
 *      top, left, right, bottom 按钮的位置, 不填时使用元素自己的位置, 否则使用绝对定位.
 *
 * */

var fx_name = 'scroll';
ZARK_FX[fx_name] = {defaults:{
    speed:          1000,
    hide_height:    200,
    top:            undefined,
    bottom:         undefined,
    left:           undefined,
    right:          undefined

}, scroll_objs:[], last_top: null};
var fx = ZARK_FX[fx_name];

$(window).scroll(function(){
    var this_top = $(document).scrollTop();
    if (fx.last_top === null || Math.abs(fx.last_top-this_top) >= 10){
        fx.last_top = this_top;
        for(var i in fx.scroll_objs){
            if (fx.scroll_objs[i].hide_height < this_top){
                fx.scroll_objs[i].$hide_obj.fadeIn();
            }else{
                fx.scroll_objs[i].$hide_obj.fadeOut();
            };
        };
    };
});

$('['+ZARK_FX.FX+']').each(function(){
    var $this = $(this);
    if (ZARK_FX.hasAttrs($this, fx_name)){
        var attrs = ZARK_FX.getAttrs($this, fx_name);
            attrs = $.extend(fx.defaults, attrs);  

        var $scroll_obj;
        if (attrs['default'] !== undefined){
            $this.hide();
            var scroll_to_top_id = ZARK_FX.getJSC();
            $('<div id="'+scroll_to_top_id+'" style="position: fixed; bottom: 50px; right: 50px; opacity: 1; cursor: pointer; display: block; background-color: rgb(255, 255, 255); width: 48px; height: 48px;"><img src="'+ZARK_FX.IMG_LIB_PATH+'/'+fx_name+'/default.png"><div>').appendTo('body');
            $scroll_obj = $('#'+scroll_to_top_id);
        }else{
            $scroll_obj = $this;
        };

        // bind event
        var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');// opera hack
        $scroll_obj.click(function(){
            var target_top = (attrs.targetid === undefined) ? 0 : $('#'+attrs.targetid).offset().top ;
            $body.animate({scrollTop: target_top}, parseInt(attrs.speed));
            return false;
        });

        // add to scroll_objs
        fx.scroll_objs.push({hide_height: attrs.hide_height, $hide_obj: $scroll_obj });

        // show or hide this obj
        var this_top = $(document).scrollTop();
        if (attrs.hide_height > this_top){
            $scroll_obj.hide();
        }else{
            $scroll_obj.show();
        };

        // set position
        if (attrs.top !== undefined || attrs.bottom !== undefined || attrs.left !== undefined || attrs.right !== undefined ) $scroll_obj.css('position','fixed').appendTo('body');
        if (attrs.bottom !== undefined) $scroll_obj.css('bottom', attrs.bottom + 'px');
        if (attrs.top !== undefined) $scroll_obj.css('top', attrs.top + 'px');
        if (attrs.right !== undefined) $scroll_obj.css('right', attrs.right + 'px');
        if (attrs.left !== undefined) $scroll_obj.css('left', attrs.left + 'px');

    };
});
