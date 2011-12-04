/*
 * Example 1:
 * <* fx="switch[switchid=div1]" >1</*>
 * <* fx="switch[event=mouseover;switchid=div2]" >1</*>
 * <* fx="switch[event=mouseover;switchid=c1;nochangeclass]" >1</*>
 *
 * <* id="div1">content1</*>
 * <* id="div2">content2</*>
 * <* class="c1">content3</*>
 *
 * Example 2:
 * <* fx="switch[switchid=diva;group=some]" >1</*>
 * <* id="diva">content1</*>
 *
 * 必须有switchid或switchclass中的一个或两个
 * 多个分组时用group参数
 * event可以是mouseover mouseout click 等事件
 * 如果IE6 下出现页面跳动, 给被switch的*们再包一个div, 然后让这个div的高宽固定
 *
 * */

ZARK_FX['switch'] = {};
ZARK_FX['switch'].switch_groups = {};

$('['+ZARK_FX.FX+']').each(function(){
    var $this = $(this);
    if (ZARK_FX.parserFx($this.attr(ZARK_FX.FX))['switch'] !== undefined){
        var attrs = ZARK_FX.parserFx($this.attr(ZARK_FX.FX))['switch'];
        var group = attrs.group !== undefined? attrs.group : 'default';

        var switchFunction = function(){
            for(var i in ZARK_FX['switch'].switch_groups[group]){
                var $a = ZARK_FX['switch'].switch_groups[group][i];
                var hide_id = ZARK_FX.parserFx($a.attr(ZARK_FX.FX))['switch'].switchid;
                var hide_cl = ZARK_FX.parserFx($a.attr(ZARK_FX.FX))['switch'].switchclass;
                if (hide_id !== undefined) $('#'+hide_id).hide();
                if (hide_cl !== undefined) $('.'+hide_cl).hide();
                $a.addClass('unchosed').removeClass('chosed');
            };
            var show_id = attrs.switchid;
            var show_cl = attrs.switchclass;
            if (show_id !== undefined) $('#'+show_id).show();
            if (show_cl !== undefined) $('.'+show_cl).show();
            if (attrs.nochangeclass === undefined) $this.addClass('chosed').removeClass('unchosed');
            if ($this.attr('nodeName') === 'A') {
                $this.blur();
                return false;
            };
        };

        // bind event
        if(attrs['event'] === undefined){
            $this.click(switchFunction);
        }else{
            $this.bind(attrs['event'], switchFunction);
        };
        
        // add $this to switch_groups
        if(ZARK_FX['switch'].switch_groups[group] === undefined){
            ZARK_FX['switch'].switch_groups[group] = [];
        };
        ZARK_FX['switch'].switch_groups[group].push($this);

        // show the first switched, and hide others
        if (ZARK_FX['switch'].switch_groups[group].length == 1){
            if (attrs.nochangeclass === undefined) $this.addClass('chosed').removeClass('unchosed');
            if (attrs.switchid !== undefined) $('#'+attrs.switchid).show();
        }else{
            if (attrs.switchid !== undefined) $('#'+attrs.switchid).hide();
            if (attrs.switchclass !== undefined) $('.'+attrs.switchclass).hide();
        };

        // change the first switcher's class
        if (ZARK_FX['switch'].switch_groups[group].length == 1){
            if (attrs.switchclass !== undefined) $('.'+attrs.switchclass).show();
        }else{
            if (attrs.nochangeclass === undefined) $(this).addClass('unchosed').removeClass('chosed');
        };

    };
});
