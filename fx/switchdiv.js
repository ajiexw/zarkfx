/*
 * <a href="div1" fx="switchdiv" >1</a>
 * <a href="div2" fx="switchdiv[event=mouseover]" >2</a>
 *
 * <div id="div1">content1</div>
 * <div id="div2">content2</div>
 *
 * <a href="diva" fx="switchdiv[group=some]" >1</a>
 * <a href="divb" fx="switchdiv[group=some]" >2</a>
 *
 * event可以是mouseover mouseout click 等事件
 * group是分组, 如果不写就是default组
 * 如果IE6 下出现页面跳动, 给被switch的div们再包一个div, 然后让这个div的高宽固定
 *
 * */

ZARK_FX.switchdiv = {};
ZARK_FX.switchdiv.switch_groups = {};

$('a['+ZARK_FX.FX+']').each(function(){
    var $this = $(this);
    if (ZARK_FX.parserFx($this.attr(ZARK_FX.FX)).switchdiv !== undefined){
        var attrs = ZARK_FX.parserFx($this.attr(ZARK_FX.FX)).switchdiv;
        var group = attrs.group !== undefined? attrs.group : 'default';
        var switchFunction = function(){
            $this.blur();
            for(var i in ZARK_FX.switchdiv.switch_groups[group]){
                $a = ZARK_FX.switchdiv.switch_groups[group][i];
                $($a.attr('href')).hide();
                $a.addClass('unchosed').removeClass('chosed');
            };
            $($this.attr('href')).show();
            $this.addClass('chosed').removeClass('unchosed');
            return false;
        };

        if(attrs['event'] === undefined){
            $this.click(switchFunction);
        }else{
            $this.bind(attrs['event'], switchFunction);
        };
        
        if(ZARK_FX.switchdiv.switch_groups[group] === undefined){
            ZARK_FX.switchdiv.switch_groups[group] = [];
        };
        ZARK_FX.switchdiv.switch_groups[group].push($this);

        if (ZARK_FX.switchdiv.switch_groups[group].length == 1){
            $this.addClass('chosed').removeClass('unchosed');
            $($this.attr('href')).show();
        }else{
            $($(this).attr('href')).hide();
            $(this).addClass('unchosed').removeClass('chosed');
        };


    };
});
