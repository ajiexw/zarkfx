/*
 *
 * DOC_BEGIN
 *
 * Scroll
 * ======
 *
 * 滚动效果
 *
 * 滚动到顶部
 * ----------
 * fx="scroll[speed=500;hide_height=-1]"
 *
 * 点击下面的"Scroll"就会滚动到顶部
 *
 * .. zarkfx:: :demo:
 *
 *     <p fx="scroll[speed=500;hide_height=-1]" style="color:#66AAFF; " >Scroll</p>
 *
 * 瞬间到达顶部
 * ------------
 * fx="scroll[speed=0;hide_height=-1]"
 *
 * 点击下面的"Go Top"瞬间到达顶部
 *
 * .. zarkfx:: :demo:
 *
 *     <p fx="scroll[speed=0;hide_height=-1]" style="color:#66AAFF; " >Scroll</p>
 *
 * 滚动到某个标签
 * --------------
 * fx="scroll[speed=500;targetid=destination]"
 *
 * 点击"Scroll to"滚动到id等于destination的标签
 *
 * .. zarkfx:: :demo:
 *
 *     <p id="destination">come on baby.</p>
 *     <p fx="scroll[speed=500;targetid=destination]" style="color:#66AAFF; " >Scroll to</p>
 *
 * 把滚动按钮放到距离右下角100px的地方
 * -----------------------------------
 * fx="scroll[speed=500;right=100;bottom=100;hide_height=0]"
 *
 * 点击右下角的红色按钮, 滚动到顶部时按钮消失.
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="scroll[speed=500;right=100;bottom=100;hide_height=0]" style="width:30px; height:30px; background-color:red; "></div>
 *
 * 使用默认样式
 * ------------
 * fx="scroll[style=default]"
 *
 * 滚动按钮变成一个向上箭头出现在右下角.
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="scroll[style=default]"></div>
 *
 *
 * DOC_END
 *
 */

ZARK_FX.getFrame('jquery-1.3.2', function($){

    var scroll_objs = []
    var last_top = null;
    $(window).scroll(function(){
        var this_top = $(document).scrollTop();
        if (last_top === null || Math.abs(last_top-this_top) >= 10 || this_top === 0){
            last_top = this_top;
            for(var i in scroll_objs){
                if (scroll_objs[i].hide_height < this_top){
                    scroll_objs[i].$hide_obj.fadeIn();
                }else{
                    scroll_objs[i].$hide_obj.fadeOut();
                };
            };
        };
    });

    ZARK_FX.run('scroll', function(attrs){
        var $this = $(this);
        var $scroll_obj;
        var fx_name = 'scroll';
        if (attrs.style === 'default' ){
            $this.hide();
            var scroll_to_top_id = ZARK_FX.getJSC();
            $('<div id="'+scroll_to_top_id+'" style="position: fixed; bottom: 50px; right: 50px; opacity: 1; cursor: pointer; display: block; background-color: rgb(255, 255, 255); width: 48px; height: 48px;"><img src="'+ZARK_FX.IMG_PATH+fx_name+'/default.png"><div>').appendTo('body');
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
        scroll_objs.push({hide_height: attrs.hide_height, $hide_obj: $scroll_obj });

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
    
    }, {
        speed:          0,
        hide_height:    200,
        top:            undefined,
        bottom:         undefined,
        left:           undefined,
        right:          undefined,
        targetid:       undefined,
        style:          'none'
    });
});
