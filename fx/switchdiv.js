/*
 * <a href="div1" fx="switchdiv[switchid=div1]" >1</a>
 * <a href="div2" fx="switchdiv[event=mouseover;switchid=div2]" >1</a>
 *
 * <div id="div1">content1</div>
 * <div id="div2">content2</div>
 *
 * 必须有switchid
 * event可以是mouseover mouseout click 等事件
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
                var hide_id = ZARK_FX.parserFx($a.attr(ZARK_FX.FX)).switchdiv.switchid;
                $('#'+hide_id).hide();
                $a.addClass('unchosed').removeClass('chosed');
            };
            var show_id = attrs.switchid;
            $('#'+show_id).show();
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
            $('#'+attrs.switchid).show();
        }else{
            $('#'+attrs.switchid).hide();
            $(this).addClass('unchosed').removeClass('chosed');
        };


    };
});
