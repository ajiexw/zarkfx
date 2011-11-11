/*
 * 如果IE6 下出现页面跳动, 给被switch的div们再包一个div, 然后让这个div的高宽固定即可
 * */
var first_dom = true;
ZARK_FX.switchdiv = {};
ZARK_FX.switchdiv.switcha = [];

$('a['+ZARK_FX.FX+']').each(function(){
    var $this = $(this);
    if (ZARK_FX.parserFx($this.attr(ZARK_FX.FX)).switchdiv !== undefined){
        $this.click(function(){
            $this.blur();
            for(var i in ZARK_FX.switchdiv.switcha){
                $a = ZARK_FX.switchdiv.switcha[i];
                $($a.attr('href')).hide();
                $a.addClass('unchosed').removeClass('chosed');
            };
            $($this.attr('href')).show();
            $this.addClass('chosed').removeClass('unchosed');
            return false;
        });
        if (first_dom){
            $this.addClass('chosed').removeClass('unchosed');
            $($this.attr('href')).show();
            first_dom = false;
        }else{
            $($(this).attr('href')).hide();
            $(this).addClass('unchosed').removeClass('chosed');
        };
        ZARK_FX.switchdiv.switcha.push($this);
    };
});
