/*
 * 不支持IE6
 * <div fx="staytop"></div>
 *
 * */
ZARK_FX.staytop = {};
ZARK_FX.staytop.getElementLeft = function(element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}
ZARK_FX.staytop.getElementTop = function(element){
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null){
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
};
$('div['+ZARK_FX.FX+']').each(function(){
    var $this = $(this);
    if (ZARK_FX.parserFx($this.attr(ZARK_FX.FX)).staytop !== undefined){
        var old_position = ZARK_FX.staytop.getElementTop(this);
        var fixed_left = ZARK_FX.staytop.getElementLeft(this);
        $(window).scroll(function(){
            if (document.documentElement.scrollTop > old_position){
                $this.css('top',0).css('left',fixed_left).css('position','fixed');
            }else{
                $this.css('position','static').css('top','').css('left','');
            };
        });
        $(window).scroll();
    };
});
