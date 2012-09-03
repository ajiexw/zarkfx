/*
 *
 * DOC_BEGIN
 *
 * Stay top
 * ========
 *
 * 当页面向下滚动时, 保持某个元素出现的页面的最顶部.
 *
 * 默认样式
 * --------
 * fx="staytop" 
 *
 * 向下滚动页面, 文字将停留在页面最顶部.
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="staytop" style="background-color:#66AAFF; width:300px;" >我可以是一个搜索框, 或者广告...</div>
 *     <div style="height:600px; width:300px;">这个div的存在只是为了把页面拉长.</div>
 *
 * DOC_END
 *
 */

FX.getFrame('jquery-1.3.2', function($){

    var getElementLeft = function(element){
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        while (current !== null){
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        return actualLeft;
    }
    var getElementTop = function(element){
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null){
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    };

    FX.run('staytop', function(attrs){

        var $this = $(this);
        var old_position = getElementTop(this);
        var old_width = $this.width();
        var window_width = $(window).width();
        var fixed_left = getElementLeft(this);
        $(window).scroll(function(){
            var scrollTop = $(document).scrollTop();
            if (scrollTop > old_position){
                if(attrs.fullwidth !== undefined){
                    $this.css('top',0).css('width',window_width).css('left','0px').css('position','fixed');
                }else{
                    $this.css('top',0).css('left',fixed_left).css('position','fixed');
                }
            }else{
                $this.css('position','static').css('top','').css('left','').css('width',old_width);
            };
        });
        $(window).scroll();

    });
});
