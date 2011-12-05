/*
 * 不支持IE6
 * <div fx="staytop"></div>
 *
 * */
ZARK_FX.getFrame('jquery-1.3.2', function($){

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

    ZARK_FX.run('staytop', function(attrs){

        var $this = $(this);
        var old_position = getElementTop(this);
        var fixed_left = getElementLeft(this);
        $(window).scroll(function(){
            if (document.documentElement.scrollTop > old_position){
                $this.css('top',0).css('left',fixed_left).css('position','fixed');
            }else{
                $this.css('position','static').css('top','').css('left','');
            };
        });
        $(window).scroll();

    });
});
